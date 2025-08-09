
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Helmet } from "react-helmet";
import { supabase } from "@/integrations/supabase/client";

type Photo = {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  alt_text: string;
  display_order: number | null;
};

// Fallback photos in case database is empty
const fallbackPhotos: Photo[] = [
  {
    id: "1",
    title: "Professional Workspace",
    description: "A modern workspace setup with laptop and technology",
    image_url: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop",
    alt_text: "A woman sitting on a bed using a laptop",
    display_order: 1
  },
  {
    id: "2", 
    title: "Technology Focus",
    description: "Modern laptop setup for development work",
    image_url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
    alt_text: "Turned on gray laptop computer",
    display_order: 2
  },
  {
    id: "3",
    title: "Circuit Board Details", 
    description: "Close-up view of electronic components",
    image_url: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
    alt_text: "Macro photography of black circuit board",
    display_order: 3
  },
  {
    id: "4",
    title: "Programming Environment",
    description: "Java programming displayed on monitor",
    image_url: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop", 
    alt_text: "Monitor showing Java programming",
    display_order: 4
  },
  {
    id: "5",
    title: "MacBook Development",
    description: "Professional development setup with MacBook Pro",
    image_url: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
    alt_text: "Person using MacBook Pro",
    display_order: 5
  },
  {
    id: "6",
    title: "Code Editor",
    description: "Development environment with code on screen",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    alt_text: "Code editor showing programming",
    display_order: 6
  }
];

export const PhotoGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<null | Photo>(null);
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    const toTitle = (name: string) =>
      name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase());

    try {
      console.log("Fetching photos from Supabase table photo_gallery...");
      const { data, error } = await supabase
        .from("photo_gallery")
        .select("*")
        .order("display_order", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        console.log("Photos fetched from table:", data.length);
        setPhotos(data);
        return;
      }

      console.log("No rows in photo_gallery, listing storage bucket 'gallery'...");
      const { data: files, error: listError } = await supabase.storage
        .from("gallery")
        .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } });

      if (listError) throw listError;

      if (files && files.length > 0) {
        const photosFromStorage: Photo[] = files
          .filter((f) => f.name && /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(f.name))
          .map((f, idx) => {
            const { data: pub } = supabase.storage.from("gallery").getPublicUrl(f.name);
            const title = toTitle(f.name);
            return {
              id: f.name,
              title,
              description: null,
              image_url: pub.publicUrl,
              alt_text: title,
              display_order: idx + 1,
            } as Photo;
          });
        console.log("Photos built from storage files:", photosFromStorage.length);
        setPhotos(photosFromStorage);
        return;
      }

      console.log("No files found in storage bucket 'gallery'.");
      setPhotos([]);
    } catch (err) {
      console.error("Error loading gallery:", err);
      try {
        console.log("Attempting to list storage bucket 'gallery' after error...");
        const { data: files } = await supabase.storage
          .from("gallery")
          .list("", { limit: 1000, sortBy: { column: "name", order: "asc" } });

        if (files && files.length > 0) {
          const photosFromStorage: Photo[] = files
            .filter((f) => f.name && /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(f.name))
            .map((f, idx) => {
              const { data: pub } = supabase.storage.from("gallery").getPublicUrl(f.name);
              const title = toTitle(f.name);
              return {
                id: f.name,
                title,
                description: null,
                image_url: pub.publicUrl,
                alt_text: title,
                display_order: idx + 1,
              } as Photo;
            });
          setPhotos(photosFromStorage);
          return;
        }
      } catch (e) {
        console.error("Also failed to list storage bucket:", e);
      }
      setError("Unable to load gallery");
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  };

  const getImageSchema = (photo: Photo, index: number) => {
    return {
      "@context": "https://schema.org",
      "@type": "ImageObject",
      "contentUrl": photo.image_url,
      "url": `${currentUrl}#photo-${index + 1}`,
      "name": photo.title,
      "description": photo.description,
      "caption": photo.alt_text,
      "encodingFormat": "image/jpeg",
      "width": "800",
      "height": "600",
      "thumbnailUrl": photo.image_url,
      "author": {
        "@type": "Person",
        "name": "Lasitha Rajapaksha",
        "url": "https://lasitharajapaksha.netlify.app"
      },
      "copyrightHolder": {
        "@type": "Person",
        "name": "Lasitha Rajapaksha"
      },
      "datePublished": "2024-01-01",
      "dateModified": "2025-01-07",
      "license": "https://creativecommons.org/licenses/by/4.0/",
      "acquireLicensePage": "https://lasitharajapaksha.netlify.app/photo-gallery",
      "keywords": ["professional", "technology", "workspace", "developer", "entrepreneur"]
    };
  };

  return (
    <section className="py-16 bg-background">
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            "name": "Lasitha Rajapaksha Photo Gallery",
            "description": "A collection of professional photos showcasing Lasitha Rajapaksha's career and activities",
            "url": currentUrl,
            "author": {
              "@type": "Person",
              "name": "Lasitha Rajapaksha",
              "url": "https://lasitharajapaksha.netlify.app"
            },
            "datePublished": "2024-01-01",
            "dateModified": "2025-01-07",
            "numberOfItems": photos.length,
            "image": photos.map((photo, index) => getImageSchema(photo, index)),
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": photos.map((photo, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "item": getImageSchema(photo, index)
              }))
            }
          })}
        </script>
      </Helmet>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Photo Gallery</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4">Loading gallery...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              <p>Error loading photos: {error}</p>
              <p className="text-sm text-muted-foreground mt-2">Showing sample photos instead</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo, index) => (
                <motion.div
                  key={photo.id}
                  id={`photo-${index + 1}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer" itemScope itemType="https://schema.org/ImageObject">
                    <CardContent className="p-0">
                      <img
                        src={photo.image_url}
                        alt={photo.alt_text}
                        title={photo.title}
                        loading={index < 3 ? "eager" : "lazy"}
                        fetchPriority={index < 3 ? "high" : "auto"}
                        width="800"
                        height="600"
                        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                        itemProp="contentUrl"
                        onError={(e) => {
                          console.error("Image failed to load:", photo.image_url);
                        }}
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold" itemProp="name">{photo.title}</h3>
                        <p className="text-sm text-muted-foreground" itemProp="description">{photo.description}</p>
                        <meta itemProp="author" content="Lasitha Rajapaksha" />
                        <meta itemProp="datePublished" content="2024-01-01" />
                        <meta itemProp="encodingFormat" content="image/jpeg" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

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
                  src={selectedPhoto.image_url}
                  alt={selectedPhoto.alt_text}
                  title={selectedPhoto.title}
                  className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                />
                <div className="text-white text-center mt-4">
                  <h3 className="text-xl font-semibold mb-2">{selectedPhoto.title}</h3>
                  <p className="text-gray-300">{selectedPhoto.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};
