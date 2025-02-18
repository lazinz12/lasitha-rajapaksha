
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const photos = [
  "/lovable-uploads/466d961c-54d9-4f65-806b-4fd67c7a576f.png",
  "/lovable-uploads/14d93f04-6714-47e4-a394-a83fb0162145.png",
  "/lovable-uploads/229372d1-31e6-47b0-939d-6fc41db097ba.png",
  "/lovable-uploads/814d838d-05de-4cbe-bc8e-988de002a903.png",
  "/lovable-uploads/943186fb-9400-4a47-8177-4831ac6adaf3.png",
  "/lovable-uploads/62dee6dc-d96e-4899-8699-431924f43627.png",
  "/lovable-uploads/c680c35a-cc4e-4630-8807-e626a9c8fa2e.png",
  "/lovable-uploads/7eb21480-f309-4af4-9348-78986f7b03a7.png",
  "/lovable-uploads/0bc79958-0322-420d-91f3-e444bd9f76e3.png",
  "/lovable-uploads/758f9b8e-9e75-45a8-bd2a-38dcebefd18a.png"
];

export const PhotoGallery = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">Photo Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <img
                      src={photo}
                      alt={`Gallery image ${index + 1}`}
                      className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
