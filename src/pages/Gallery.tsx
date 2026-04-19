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
  // New images from the recent trip
  { id: 7, src: "/gallery/picnic-group.jpg", alt: "Group photo of students and teachers during outdoor trip", category: "Trips & Events" },
  { id: 8, src: "/gallery/pool-fun.jpg", alt: "Student having fun in the pool during the outing", category: "Trips & Events" },
  { id: 9, src: "/gallery/student-portrait.jpg", alt: "Cheerful student enjoying the school event", category: "Trips & Events" },
  { id: 10, src: "/gallery/water-slide-action.jpg", alt: "Students sliding down a water slide with excitement", category: "Trips & Events" },
  { id: 11, src: "/gallery/water-slide-top.jpg", alt: "Students preparing to go down the water slide", category: "Trips & Events" },
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

