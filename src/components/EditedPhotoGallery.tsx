import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Image, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditedPhoto } from "@/integrations/supabase/types/index.d";
export const EditedPhotoGallery = () => {
  const [photos, setPhotos] = useState<EditedPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<EditedPhoto | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
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
  return <div className="space-y-8">
      {loading ? <div className="text-center py-12">
          <p className="text-gray-500">Loading gallery...</p>
        </div> : photos.length === 0 ? <div className="text-center py-12 border border-dashed rounded-lg">
          <Image className="h-12 w-12 mx-auto text-gray-400 mb-2" />
          <p className="text-gray-500">No photos in gallery yet</p>
        </div> : <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {photos.map((photo, index) => <Dialog key={photo.id}>
                <DialogTrigger asChild>
                  <div className="aspect-square relative rounded-md overflow-hidden border group cursor-pointer">
                    <img src={photo.image_url} alt="" className="w-full h-full object-cover group-hover:opacity-90 transition-opacity" onClick={() => openPhotoModal(photo, index)} />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl" onKeyDown={handleKeyDown}>
                  <div className="relative w-full h-full">
                    <Button variant="ghost" size="icon" onClick={goToPrevPhoto} className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full">
                      <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <div className="flex items-center justify-center">
                      <img src={photos[currentIndex]?.image_url} alt="" className="max-h-[80vh] max-w-full object-contain" />
                    </div>
                    <Button variant="ghost" size="icon" onClick={goToNextPhoto} className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/20 hover:bg-black/40 text-white rounded-full">
                      <ChevronRight className="h-8 w-8" />
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>)}
          </div>
          
          
        </div>}
    </div>;
};