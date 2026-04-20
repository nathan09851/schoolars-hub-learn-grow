/**
 * download-fonts.mjs
 * Downloads the exact woff2 subset files from Google Fonts for self-hosting.
 * Run once: node scripts/download-fonts.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FONTS_DIR = path.join(__dirname, '..', 'public', 'fonts');

if (!fs.existsSync(FONTS_DIR)) {
  fs.mkdirSync(FONTS_DIR, { recursive: true });
}

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const req = https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (progressive enhancement)' } }, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlink(dest, () => {});
        download(res.headers.location, dest).then(resolve).catch(reject);
        return;
      }
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    });
    req.on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Google Fonts CDN provides latin subset woff2 via these stable CSS API URLs.
// We fetch the CSS with a modern User-Agent to get woff2, then extract the URLs.
async function fetchGoogleFontCSS(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function extractAndDownloadFonts(cssUrl, outputPrefix) {
  console.log(`\nFetching: ${cssUrl}`);
  const css = await fetchGoogleFontCSS(cssUrl);
  
  // Extract all woff2 URLs from the CSS
  const urlMatches = [...css.matchAll(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g)];
  
  if (urlMatches.length === 0) {
    console.log('  No woff2 URLs found, trying fallback...');
    return;
  }

  // For variable fonts, take the LAST match (usually the latin subset)
  const latinMatch = urlMatches[urlMatches.length - 1];
  const woff2Url = latinMatch[1];
  const outputPath = path.join(FONTS_DIR, `${outputPrefix}.woff2`);
  
  console.log(`  Downloading: ${woff2Url}`);
  await download(woff2Url, outputPath);
  const size = (fs.statSync(outputPath).size / 1024).toFixed(1);
  console.log(`  ✓  Saved: ${outputPrefix}.woff2 (${size} KB)`);
}

// Plus Jakarta Sans variable (200-800) — latin
await extractAndDownloadFonts(
  'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200..800&display=swap&subset=latin',
  'plus-jakarta-sans'
);

// Lora normal variable — latin  
await extractAndDownloadFonts(
  'https://fonts.googleapis.com/css2?family=Lora:wght@400..700&display=swap&subset=latin',
  'lora'
);

// Lora italic — latin
await extractAndDownloadFonts(
  'https://fonts.googleapis.com/css2?family=Lora:ital,wght@1,400..700&display=swap&subset=latin',
  'lora-italic'
);

console.log('\n✅  Fonts downloaded to public/fonts/\n');
