import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditedPhoto } from "@/integrations/supabase/types/index.d";
import { useIsMobile } from "@/hooks/use-mobile";

export const EditedPhotoGallery = () => {
  const [photos, setPhotos] = useState<EditedPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<EditedPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from("edited_photos").select("*").order("created_at", {
        ascending: false
      });
      if (error) throw error;
      setPhotos(data as EditedPhoto[] || []);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const openPhotoModal = (photo: EditedPhoto, index: number) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    setDialogOpen(true);
  };

  const goToNextPhoto = () => {
    if (photos.length === 0) return;
    const nextIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
    setSelectedPhoto(photos[nextIndex]);
  };

  const goToPrevPhoto = () => {
    if (photos.length === 0) return;
    const prevIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(prevIndex);
    setSelectedPhoto(photos[prevIndex]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') {
      goToNextPhoto();
    } else if (e.key === 'ArrowLeft') {
      goToPrevPhoto();
    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
                className="aspect-square relative rounded-md overflow-hidden border group cursor-pointer"
                onClick={() => openPhotoModal(photo, index)}
              >
                <img
                  src={photo.image_url}
                  alt=""
                  className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
                />
              </div>
            ))}
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogContent 
              className="sm:max-w-4xl max-w-[95vw] p-0 bg-black/90" 
              onKeyDown={handleKeyDown}
            >
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={closeDialog} 
                className="absolute right-2 top-2 z-20 rounded-full bg-black/20 hover:bg-black/40 text-white"
              >
                <X className="h-5 w-5" />
              </Button>
              <div className="relative w-full h-full flex items-center justify-center">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={goToPrevPhoto} 
                  className={`absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`}
                >
                  <ChevronLeft className={isMobile ? "h-5 w-5" : "h-8 w-8"} />
                </Button>
                <div className="flex items-center justify-center max-h-[80vh] w-full">
                  {photos[currentIndex] && (
                    <img 
                      src={photos[currentIndex].image_url} 
                      alt="" 
                      className="max-h-[80vh] max-w-full object-contain" 
                    />
                  )}
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={goToNextPhoto} 
                  className={`absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full ${isMobile ? 'h-8 w-8' : 'h-10 w-10'}`}
                >
                  <ChevronRight className={isMobile ? "h-5 w-5" : "h-8 w-8"} />
                </Button>
                {!isMobile && (
                  <div className="absolute bottom-4 left-0 right-0 text-center text-white/70 text-sm">
                    {currentIndex + 1} / {photos.length}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};
