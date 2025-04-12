
import React, { useRef, useEffect } from "react";

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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const processImage = async () => {
    if (!image || !imagePreview || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "Anonymous";
    
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the original image
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // For demonstration purposes, we're creating a fake "background removed" effect
      // First draw the background
      if (backgroundMode === "color") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (backgroundMode === "blur") {
        // Draw the original image blurred
        ctx.filter = `blur(${blurAmount}px)`;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.filter = 'none';
      } else {
        // For transparent background, we don't need to do anything
        // Just ensure the canvas is cleared
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // Simulate subject extraction
      // This is a very basic simulation for demo purposes
      // Get the center coordinates
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Create a radial gradient for feathering edges
      const radius = Math.min(canvas.width, canvas.height) * 0.4;
      const featherRadius = featherEdges ? featherAmount * 20 : 0;
      
      // Draw the "subject" (center portion of the image)
      ctx.save();
      
      // Create a clipping region for the subject
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.closePath();
      
      // Apply feathering if enabled
      if (featherEdges) {
        // Create a soft mask
        const gradient = ctx.createRadialGradient(
          centerX, centerY, radius - featherRadius,
          centerX, centerY, radius
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Use composite operation to apply the original image only where the mask is
        ctx.globalCompositeOperation = 'source-in';
      } else {
        ctx.clip();
      }
      
      // Draw the original image (only visible in the clipped/masked region)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      ctx.restore();
      
      // Apply quality enhancement if enabled (simulated effect)
      if (enhanceQuality) {
        ctx.filter = 'contrast(1.1) saturate(1.1)';
        ctx.globalCompositeOperation = 'source-atop';
        ctx.drawImage(canvas, 0, 0);
        ctx.filter = 'none';
        ctx.globalCompositeOperation = 'source-over';
      }
      
      // Convert to data URL and set as result
      try {
        const dataUrl = canvas.toDataURL('image/png');
        setResultUrl(dataUrl);
        setLoading(false);
      } catch (error) {
        console.error("Error generating image:", error);
        setLoading(false);
      }
    };
    
    img.src = imagePreview;
    
    img.onerror = () => {
      setLoading(false);
    };
  };

  return (
    <canvas ref={canvasRef} className="hidden" data-testid="background-removal-canvas" />
  );
};
