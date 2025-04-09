
import React, { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      if (e.key === "ArrowLeft") {
        if (activeIndex > 0) setActiveIndex(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
      } else if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, activeIndex, images.length, onClose]);

  const handlePrevious = () => {
    if (activeIndex > 0) setActiveIndex(activeIndex - 1);
  };

  const handleNext = () => {
    if (activeIndex < images.length - 1) setActiveIndex(activeIndex + 1);
  };
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className="p-0 w-full h-full max-w-none bg-black/95 overflow-hidden"
        side="right"
      >
        <div className="flex flex-col h-full relative">
          {/* Close button - positioned absolutely in top-right */}
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-50 text-white/80 hover:bg-black/30 hover:text-white rounded-full"
          >
            <X className="h-6 w-6" />
          </Button>
          
          {/* Main image carousel - takes full height and width */}
          <div className="flex-grow flex items-center justify-center w-full h-full">
            <Carousel 
              className="w-full h-full" 
              opts={{ startIndex: activeIndex }}
              setApi={(api) => {
                api?.on('select', () => {
                  setActiveIndex(api.selectedScrollSnap());
                });
              }}
            >
              <CarouselContent>
                {images.map((img, index) => (
                  <CarouselItem key={index} className="flex justify-center items-center h-full">
                    <div className="flex justify-center items-center h-full w-full">
                      <img
                        src={img}
                        alt={`${title} - Image ${index + 1}`}
                        className="max-h-[85vh] max-w-full object-contain"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white/90 hover:text-white rounded-full h-10 w-10"
                  onClick={handlePrevious}
                  disabled={activeIndex === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white/90 hover:text-white rounded-full h-10 w-10"
                  onClick={handleNext}
                  disabled={activeIndex === images.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </>
            )}
          </div>
          
          {/* Image caption/title at bottom */}
          {title && (
            <div className="w-full text-center py-4 text-white/90 bg-black/80 absolute bottom-0 left-0 right-0">
              {title}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TradingIdeaImageModal;
