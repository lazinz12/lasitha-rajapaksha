
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
  
  const sideClass = isMobile ? "bottom" : "right";
  const modalWidthClass = isMobile 
    ? "w-full" 
    : "sm:max-w-screen-md md:max-w-screen-lg lg:max-w-screen-xl";
  
  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent
        className={`${modalWidthClass} p-0 bg-black/95 overflow-hidden`}
        side={sideClass}
      >
        <div className="flex flex-col h-full max-h-screen">
          {/* Header with close button and image counter */}
          <div className="flex justify-between items-center p-3 bg-black/80 text-white sticky top-0 z-10">
            <h3 className="text-sm font-medium truncate max-w-[70%]">
              {title} - Image {activeIndex + 1} of {images.length}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Main image carousel */}
          <div className="flex-grow relative overflow-hidden">
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
                  <CarouselItem key={index} className="flex justify-center items-center">
                    <div className="flex justify-center items-center h-[calc(100vh-10rem)] max-h-[70vh] md:h-[calc(100vh-12rem)] w-full px-2">
                      <img
                        src={img}
                        alt={`${title} - Image ${index + 1}`}
                        className="max-h-full max-w-full object-contain mx-auto"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
            
            {/* Custom navigation buttons */}
            <TooltipProvider>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 z-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
                      onClick={handlePrevious}
                      disabled={activeIndex === 0}
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">Previous</TooltipContent>
                </Tooltip>
              </div>
              
              <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="bg-black/30 hover:bg-black/50 text-white rounded-full h-10 w-10"
                      onClick={handleNext}
                      disabled={activeIndex === images.length - 1}
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="left">Next</TooltipContent>
                </Tooltip>
              </div>
            </TooltipProvider>
          </div>
          
          {/* Thumbnail navigation bar */}
          {!isMobile && images.length > 1 && (
            <div className="p-2 bg-black/80 flex justify-center gap-2 overflow-x-auto sticky bottom-0">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-16 h-16 flex-shrink-0 transition-all ${
                    activeIndex === index 
                      ? 'border-2 border-white opacity-100 scale-105' 
                      : 'border border-gray-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default TradingIdeaImageModal;
