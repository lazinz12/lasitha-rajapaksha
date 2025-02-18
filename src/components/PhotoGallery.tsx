
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

// Declare the Instagram Embed script type
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process(): void;
      };
    };
  }
}

// Instagram posts to embed (replace with your actual Instagram post URLs)
const instagramPosts = [
  'https://www.instagram.com/p/LATEST_POST_ID_1/',
  'https://www.instagram.com/p/LATEST_POST_ID_2/',
  'https://www.instagram.com/p/LATEST_POST_ID_3/'
];

const photos = [
  {
    url: "/lovable-uploads/466d961c-54d9-4f65-806b-4fd67c7a576f.png",
    alt: "Lasitha Rajapaksha photo 1",
    title: "Lasitha Rajapaksha - Professional Shot"
  },
  {
    url: "/lovable-uploads/14d93f04-6714-47e4-a394-a83fb0162145.png",
    alt: "Lasitha Rajapaksha photo 2",
    title: "Lasitha Rajapaksha - Trading Session"
  },
  {
    url: "/lovable-uploads/229372d1-31e6-47b0-939d-6fc41db097ba.png",
    alt: "Lasitha Rajapaksha photo 3",
    title: "Lasitha Rajapaksha - Business Meeting"
  },
  {
    url: "/lovable-uploads/814d838d-05de-4cbe-bc8e-988de002a903.png",
    alt: "Lasitha Rajapaksha photo 4",
    title: "Lasitha Rajapaksha - Speaking Event"
  },
  {
    url: "/lovable-uploads/943186fb-9400-4a47-8177-4831ac6adaf3.png",
    alt: "Lasitha Rajapaksha photo 5",
    title: "Lasitha Rajapaksha - Workshop"
  },
  {
    url: "/lovable-uploads/62dee6dc-d96e-4899-8699-431924f43627.png",
    alt: "Lasitha Rajapaksha photo 6",
    title: "Lasitha Rajapaksha - Development Session"
  },
  {
    url: "/lovable-uploads/c680c35a-cc4e-4630-8807-e626a9c8fa2e.png",
    alt: "Lasitha Rajapaksha photo 7",
    title: "Lasitha Rajapaksha - Team Meeting"
  },
  {
    url: "/lovable-uploads/7eb21480-f309-4af4-9348-78986f7b03a7.png",
    alt: "Lasitha Rajapaksha photo 8",
    title: "Lasitha Rajapaksha - Conference"
  },
  {
    url: "/lovable-uploads/0bc79958-0322-420d-91f3-e444bd9f76e3.png",
    alt: "Lasitha Rajapaksha photo 9",
    title: "Lasitha Rajapaksha - Networking Event"
  },
  {
    url: "/lovable-uploads/758f9b8e-9e75-45a8-bd2a-38dcebefd18a.png",
    alt: "Lasitha Rajapaksha photo 10",
    title: "Lasitha Rajapaksha - Office Work"
  }
];

export const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<null | typeof photos[0]>(null);

  useEffect(() => {
    // Load Instagram embed script
    const script = document.createElement('script');
    script.src = '//www.instagram.com/embed.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Photo Gallery</h2>
          
          {/* Instagram Feed Section */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold text-center mb-8">Instagram Feed</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instagramPosts.map((post, index) => (
                <div key={index} className="instagram-embed-container">
                  <blockquote 
                    className="instagram-media" 
                    data-instgrm-permalink={post}
                    data-instgrm-version="14"
                    style={{
                      background: '#FFF',
                      border: '0',
                      borderRadius: '3px',
                      boxShadow: '0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15)',
                      margin: '1px',
                      maxWidth: '540px',
                      minWidth: '326px',
                      padding: '0',
                      width: '99.375%'
                    }}
                  >
                  </blockquote>
                </div>
              ))}
            </div>
          </div>

          {/* Regular Photo Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedPhoto(photo)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                  <CardContent className="p-0">
                    <img
                      src={photo.url}
                      alt={photo.alt}
                      title={photo.title}
                      loading="lazy"
                      className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Modal for full-size image view */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedPhoto(null)}
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.5 }}
                className="relative max-w-7xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                >
                  <X size={24} />
                </button>
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.alt}
                  title={selectedPhoto.title}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                />
                <p className="text-white text-center mt-4 text-lg">{selectedPhoto.title}</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
