import React, { useEffect } from "react";
import { loadImage, removeBackground } from "@/utils/backgroundRemovalService";

interface BackgroundRemovalProcessorProps {
  image: File | null;
  imagePreview: string | null;
  backgroundMode: "transparent" | "color" | "blur";
  backgroundColor: string;
  blurAmount: number;
  featherEdges: boolean;
  featherAmount: number;
  enhanceQuality: boolean;
  setResultUrl: (url: string) => void;
  setLoading: (loading: boolean) => void;
}

export const BackgroundRemovalProcessor: React.FC<BackgroundRemovalProcessorProps> = ({
  image,
  imagePreview,
  backgroundMode,
  backgroundColor,
  blurAmount,
  featherEdges,
  featherAmount,
  enhanceQuality,
  setResultUrl,
  setLoading,
}) => {
  const processImage = async () => {
    if (!image) return;
    
    try {
      // Load the image
      const img = await loadImage(image);
      
      // Remove background
      const resultBlob = await removeBackground(img);
      
      // Apply background based on selected mode
      const resultCanvas = document.createElement('canvas');
      const resultCtx = resultCanvas.getContext('2d');
      
      if (!resultCtx) {
        throw new Error('Could not get result canvas context');
      }
      
      // Create an image from the result blob
      const resultImg = new Image();
      resultImg.src = URL.createObjectURL(resultBlob);
      
      await new Promise<void>((resolve) => {
        resultImg.onload = () => {
          resultCanvas.width = resultImg.width;
          resultCanvas.height = resultImg.height;
          
          // Apply selected background
          if (backgroundMode === "color") {
            // Fill with solid color
            resultCtx.fillStyle = backgroundColor;
            resultCtx.fillRect(0, 0, resultCanvas.width, resultCanvas.height);
          } else if (backgroundMode === "blur") {
            // Create a blurred version of the original image
            const bgCanvas = document.createElement('canvas');
            bgCanvas.width = resultImg.width;
            bgCanvas.height = resultImg.height;
            const bgCtx = bgCanvas.getContext('2d');
            
            if (bgCtx) {
              // Draw and blur the original image
              bgCtx.filter = `blur(${blurAmount}px)`;
              bgCtx.drawImage(img, 0, 0, resultImg.width, resultImg.height);
              resultCtx.drawImage(bgCanvas, 0, 0);
            }
          }
          // For transparent mode, do nothing to keep transparency
          
          // Draw the processed image with transparency
          resultCtx.drawImage(resultImg, 0, 0);
          
          // Apply quality enhancement if enabled
          if (enhanceQuality) {
            resultCtx.filter = 'contrast(1.1) saturate(1.1)';
            resultCtx.globalCompositeOperation = 'source-atop';
            resultCtx.drawImage(resultCanvas, 0, 0);
            resultCtx.filter = 'none';
            resultCtx.globalCompositeOperation = 'source-over';
          }
          
          resolve();
        };
      });
      
      // Convert to data URL
      const dataUrl = resultCanvas.toDataURL('image/png');
      setResultUrl(dataUrl);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (image && imagePreview) {
      setLoading(true);
      processImage();
    }
  }, []);

  return null;
};
