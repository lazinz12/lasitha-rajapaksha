
import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

interface TradingIdeaImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  initialIndex: number;
}

const TradingIdeaImageModal = ({
  isOpen,
  onClose,
  images,
  title,
  initialIndex = 0,
}: TradingIdeaImageModalProps) => {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  
  // Update activeIndex when initialIndex changes
  useEffect(() => {
    setActiveIndex(initialIndex);
  }, [initialIndex]);
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl p-0 bg-black/95"
        side="bottom"
      >
        <div className="relative h-full flex flex-col">
          <div className="absolute top-2 right-2 z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex-grow p-4 pt-12">
            <Carousel className="w-full" opts={{ startIndex: activeIndex }}>
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="flex justify-center items-center">
                      <img
                        src={img}
                        alt={`${title} - Image ${index + 1}`}
                        className="max-h-[80vh] object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious 
                className={`${isMobile ? 'left-2' : '-left-10'} bg-white/10 hover:bg-white/20 text-white`}
              />
              <CarouselNext 
                className={`${isMobile ? 'right-2' : '-right-10'} bg-white/10 hover:bg-white/20 text-white`}
              />
            </Carousel>
          </div>
          
          <div className="p-2 bg-black/80 text-white text-center">
            <p className="text-sm">Image {activeIndex + 1} of {images.length}</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TradingIdeaImageModal;
