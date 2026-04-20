/**
 * optimize-images.mjs
 * -----------------------------------------------
 * Batch-converts source images to WebP using sharp.
 * Run before every production build:
 *   npm run optimize-images
 *
 * Outputs:
 *  src/assets/*.jpg|png  →  src/assets-optimized/{name}.webp
 *  public/gallery-images/*.{jpg,jpeg,JPG}  →  public/gallery-webp/{name}.webp
 *  public/favicon.png   →  public/favicon-opt.webp  (informational only)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

// ─── Helpers ────────────────────────────────────────────────────────────────

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function humanSize(bytes) {
  return (bytes / 1024).toFixed(1) + ' KB';
}

async function convertToWebP(inputPath, outputPath, options = {}) {
  const { maxWidth = 1920, quality = 80 } = options;
  const inputStat = fs.statSync(inputPath);

  const pipeline = sharp(inputPath).rotate(); // auto-rotate based on EXIF
  const meta = await sharp(inputPath).metadata();

  if (meta.width && meta.width > maxWidth) {
    pipeline.resize(maxWidth, null, { withoutEnlargement: true });
  }

  await pipeline.webp({ quality }).toFile(outputPath);

  const outputStat = fs.statSync(outputPath);
  const savings = (((inputStat.size - outputStat.size) / inputStat.size) * 100).toFixed(1);
  console.log(
    `  ✓  ${path.basename(inputPath).padEnd(40)} ${humanSize(inputStat.size).padStart(10)}  →  ${humanSize(outputStat.size).padStart(10)}  (${savings}% smaller)`
  );
}

// ─── 1. src/assets → src/assets-optimized ───────────────────────────────────

const SRC_ASSETS = path.join(ROOT, 'src', 'assets');
const SRC_ASSETS_OUT = path.join(ROOT, 'src', 'assets-optimized');
ensureDir(SRC_ASSETS_OUT);

const srcExtensions = ['.jpg', '.jpeg', '.png', '.JPG', '.JPEG', '.PNG'];

console.log('\n📦  src/assets → WebP');
const srcFiles = fs.readdirSync(SRC_ASSETS).filter(f => srcExtensions.includes(path.extname(f)));
for (const file of srcFiles) {
  const input = path.join(SRC_ASSETS, file);
  const name = path.basename(file, path.extname(file));
  const output = path.join(SRC_ASSETS_OUT, `${name}.webp`);
  await convertToWebP(input, output, {
    // Hero image: 1920px wide max, logo: keep full (will render small)
    maxWidth: file.includes('logo') ? 200 : 1920,
    quality: file.includes('logo') ? 90 : 82,
  });
}

// ─── 2. public/gallery-images → public/gallery-webp ─────────────────────────

const GALLERY_IN = path.join(ROOT, 'public', 'gallery-images');
const GALLERY_OUT = path.join(ROOT, 'public', 'gallery-webp');
ensureDir(GALLERY_OUT);

console.log('\n🖼   public/gallery-images → WebP');
const galleryFiles = fs.readdirSync(GALLERY_IN).filter(f => {
  const ext = path.extname(f).toLowerCase();
  return ['.jpg', '.jpeg', '.png'].includes(ext);
});

for (const file of galleryFiles) {
  const input = path.join(GALLERY_IN, file);
  const name = path.basename(file, path.extname(file));
  // Sanitize filename — remove spaces and special chars
  const safeName = name.replace(/[^a-zA-Z0-9_-]/g, '_');
  const output = path.join(GALLERY_OUT, `${safeName}.webp`);
  await convertToWebP(input, output, {
    maxWidth: 1400,
    quality: 75,
  });
}

// ─── 3. public/favicon.png → public/favicon-opt.webp (reference) ────────────

const FAVICON_IN = path.join(ROOT, 'public', 'favicon.png');
if (fs.existsSync(FAVICON_IN)) {
  console.log('\n🔖  public/favicon.png → optimized PNG (48×48 for favicon, 512×512 for PWA)');
  // Favicon must stay PNG for broad browser support — but we resize it
  const FAVICON_48_OUT = path.join(ROOT, 'public', 'favicon-48.png');
  const FAVICON_192_OUT = path.join(ROOT, 'public', 'favicon-192.png');
  const FAVICON_512_OUT = path.join(ROOT, 'public', 'favicon-512.png');

  await sharp(FAVICON_IN).resize(48, 48).png({ compressionLevel: 9, quality: 90 }).toFile(FAVICON_48_OUT);
  await sharp(FAVICON_IN).resize(192, 192).png({ compressionLevel: 9, quality: 90 }).toFile(FAVICON_192_OUT);
  await sharp(FAVICON_IN).resize(512, 512).png({ compressionLevel: 9, quality: 90 }).toFile(FAVICON_512_OUT);

  const orig = fs.statSync(FAVICON_IN).size;
  const resized = fs.statSync(FAVICON_48_OUT).size;
  console.log(`  ✓  favicon-48.png: ${humanSize(orig)}  →  ${humanSize(resized)}`);
}

console.log('\n✅  Image optimization complete!\n');
