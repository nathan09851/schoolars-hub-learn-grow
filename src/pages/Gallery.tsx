import { useState } from "react";
import SEO from "@/components/SEO";
import Layout from "@/components/Layout";
import SectionTitle from "@/components/SectionTitle";
import { localBusinessJsonLd } from "@/lib/structuredData";
import { AnimatedSection } from "@/components/AnimatedSection";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";

// Image categories for filtering
const categories = ["All", "Campus", "Trips & Events"];

// Gallery images implementation
const galleryImages = [
  { id: 1, src: "/gallery/media__1776553220783.jpg", alt: "Students engaged in a class discussion", category: "Campus" },
  { id: 2, src: "/gallery/media__1776553220792.jpg", alt: "Student eating a snack during break", category: "Campus" },
  { id: 3, src: "/gallery/media__1776553221092.jpg", alt: "Students talking near the campus garden", category: "Campus" },
  { id: 4, src: "/gallery/media__1776555466477.jpg", alt: "Student with a backpack", category: "Campus" },
  { id: 5, src: "/gallery/media__1776553221134.jpg", alt: "Students enjoying outdoor time", category: "Campus" },
  { id: 6, src: "/gallery/media__1776553221130.jpg", alt: "Students collaborating on a project", category: "Campus" },
  // Trip & Event Images (Updated with actual filenames)
  { id: 7, src: "/gallery/IMG_1691.JPG", alt: "Student splashing in the pool during the school trip", category: "Trips & Events" },
  { id: 8, src: "/gallery/IMG_1731.JPG", alt: "Cheerful student enjoying the pool outing", category: "Trips & Events" },
  { id: 9, src: "/gallery/IMG_2054.JPG", alt: "Students having fun in the water", category: "Trips & Events" },
  { id: 10, src: "/gallery/IMG_1726.JPG", alt: "Exciting moment during the school picnic", category: "Trips & Events" },
  { id: 11, src: "/gallery/IMG_1752.JPG", alt: "Students participating in outdoor activities", category: "Trips & Events" },
  { id: 12, src: "/gallery/IMG_1757.JPG", alt: "Fun times at the water park", category: "Trips & Events" },
  { id: 13, src: "/gallery/IMG_1765.JPG", alt: "Student groups enjoying the sunny day", category: "Trips & Events" },
  { id: 14, src: "/gallery/IMG_1771.JPG", alt: "Laughter and joy during the field trip", category: "Trips & Events" },
  { id: 15, src: "/gallery/IMG_1782.JPG", alt: "Memories from the annual school outing", category: "Trips & Events" },
  { id: 16, src: "/gallery/IMG_1819.JPG", alt: "Students bonding outside the classroom", category: "Trips & Events" },
  { id: 17, src: "/gallery/IMG_1862.JPG", alt: "Water slide fun with students", category: "Trips & Events" },
  { id: 18, src: "/gallery/IMG_1864.JPG", alt: "Exciting slide action at the park", category: "Trips & Events" },
  { id: 19, src: "/gallery/IMG_1869.JPG", alt: "Group of students at the top of the slide", category: "Trips & Events" },
  { id: 20, src: "/gallery/IMG_1871.JPG", alt: "Getting ready for a splash", category: "Trips & Events" },
  { id: 21, src: "/gallery/IMG_1954.JPG", alt: "Student smiling for a photo at the event", category: "Trips & Events" },
  { id: 22, src: "/gallery/IMG_2037.JPG", alt: "Candid moment of student life", category: "Trips & Events" },
  { id: 23, src: "/gallery/IMG_2038.JPG", alt: "Friends enjoying the school trip together", category: "Trips & Events" },
  { id: 24, src: "/gallery/WhatsApp Image 2026-04-08 at 3.31.34 PM.jpeg", alt: "Group photo of students and teachers", category: "Trips & Events" },
];


const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <Layout>
      <SEO
        title="Gallery | Schoolars Hub Goa"
        description="View photos of our campus, events, and student life at Schoolars Hub coaching centre in Goa."
        canonical="/gallery"
        jsonLd={localBusinessJsonLd}
      />

      <div className="section-shell pb-20 pt-10 md:pt-16">
        <div className="container px-4">
          <SectionTitle
            title="Campus Life & Events"
            subtitle="Take a look at the supportive and engaging environment we've built for our students and their families."
            eyebrow="Gallery"
          />

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-12 mt-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 text-sm font-medium ${
                  activeCategory === category
                    ? "bg-primary text-white shadow-lg scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Masonry Layout */}
          <div className="mx-auto max-w-6xl min-h-[400px]">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div:not(:first-child)]:mt-4">
              {filteredImages.map((image, index) => (
                <div key={`${image.id}-${activeCategory}`}>
                  <AnimatedSection
                    variant="fade-up"
                    delay={index * 50}
                    className="break-inside-avoid relative overflow-hidden rounded-2xl group cursor-pointer"
                  >
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="relative overflow-hidden rounded-2xl">
                          <div className="absolute inset-0 bg-slate-900/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-10 flex items-center justify-center">
                            <span className="text-white text-sm font-medium bg-primary/80 px-4 py-2 rounded-full backdrop-blur-sm transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                              View Photo
                            </span>
                          </div>
                          <img
                            alt={image.alt}
                            className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 ease-out group-hover:scale-105 bg-slate-100"
                            loading="lazy"
                            src={image.src}
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
                        <div className="relative group">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                          />
                          <div className="bg-white/90 backdrop-blur-md p-4 mt-2 rounded-lg">
                            <p className="text-slate-800 font-medium text-center">{image.alt}</p>
                            <p className="text-slate-500 text-xs text-center mt-1 uppercase tracking-wider">{image.category}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </AnimatedSection>
                </div>
              ))}
            </div>
            
            {filteredImages.length === 0 && (
              <div className="text-center py-20">
                <p className="text-slate-400">No images found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Gallery;

