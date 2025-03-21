
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Image } from "lucide-react";
import { EditedPhoto } from "@/integrations/supabase/types/index.d";

export const EditedPhotoGallery = () => {
  const [photos, setPhotos] = useState<EditedPhoto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("edited_photos")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      
      setPhotos(data as EditedPhoto[] || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {loading ? (
        <div className="text-center py-12">
          <p className="text-gray-500">Loading gallery...</p>
        </div>
      ) : photos.length === 0 ? (
        <div className="text-center py-12 border border-dashed rounded-lg">
          <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No photos in gallery yet</p>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="aspect-square relative rounded-md overflow-hidden border group">
                <img
                  src={photo.image_url}
                  alt=""
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Slideshow View</h2>
            <Carousel className="w-full max-w-md mx-auto">
              <CarouselContent>
                {photos.map((photo) => (
                  <CarouselItem key={photo.id}>
                    <div className="p-1">
                      <div className="flex aspect-square items-center justify-center p-2">
                        <img
                          src={photo.image_url}
                          alt=""
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </Carousel>
          </Card>
        </div>
      )}
    </div>
  );
};
