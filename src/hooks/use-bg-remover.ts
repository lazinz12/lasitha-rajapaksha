import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/components/ui/use-toast";
import { loadImage, removeBackground } from "@/utils/backgroundRemovalService";

export function useBGRemover() {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [backgroundMode, setBackgroundMode] = useState<"transparent" | "color" | "blur">("transparent");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [blurAmount, setBlurAmount] = useState<number>(5);
  const [featherEdges, setFeatherEdges] = useState<boolean>(true);
  const [featherAmount, setFeatherAmount] = useState<number>(3);
  const [enhanceQuality, setEnhanceQuality] = useState<boolean>(false);
  
  const { toast } = useToast();

  // Handle image upload
  const handleImageChange = useCallback((file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setResultUrl(null); // Reset result when new image is uploaded
    };
    reader.readAsDataURL(file);
  }, []);

  // Process the image to remove background
  const processImage = useCallback(async () => {
    if (!image || !imagePreview) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setProgress(5);

    try {
      // Load the image
      setProgress(20);
      const img = await loadImage(image);
      
      // Remove background
      setProgress(40);
      const resultBlob = await removeBackground(img);
      setProgress(70);
      
      // Apply background based on selected mode
      const resultCanvas = document.createElement('canvas');
      const resultCtx = resultCanvas.getContext('2d', { willReadFrequently: true });
      
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
              const tempImg = new Image();
              tempImg.src = imagePreview;
              tempImg.onload = () => {
                bgCtx.drawImage(tempImg, 0, 0, resultImg.width, resultImg.height);
                resultCtx.drawImage(bgCanvas, 0, 0);
              };
            }
          }
          // For transparent mode, do nothing to keep transparency
          
          // Apply feathering if enabled
          if (featherEdges) {
            const tempCanvas = document.createElement('canvas');
            tempCanvas.width = resultImg.width;
            tempCanvas.height = resultImg.height;
            const tempCtx = tempCanvas.getContext('2d');
            
            if (tempCtx) {
              tempCtx.filter = `blur(${featherAmount}px)`;
              tempCtx.drawImage(resultImg, 0, 0);
              resultCtx.drawImage(tempCanvas, 0, 0);
            }
          } else {
            // Draw the processed image with transparency
            resultCtx.drawImage(resultImg, 0, 0);
          }
          
          // Apply quality enhancement if enabled
          if (enhanceQuality) {
            resultCtx.filter = 'contrast(1.1) saturate(1.1)';
            resultCtx.globalCompositeOperation = 'source-atop';
            resultCtx.drawImage(resultCanvas, 0, 0);
            resultCtx.filter = 'none';
            resultCtx.globalCompositeOperation = 'source-over';
          }
          
          setProgress(90);
          resolve();
        };
      });
      
      // Convert to data URL
      const dataUrl = resultCanvas.toDataURL('image/png');
      setResultUrl(dataUrl);
      setProgress(100);
      
      toast({
        title: "Success!",
        description: "Background successfully removed",
      });
    } catch (error) {
      console.error('Error processing image:', error);
      toast({
        title: "Error",
        description: "Failed to process the image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [image, imagePreview, backgroundMode, backgroundColor, blurAmount, featherEdges, featherAmount, enhanceQuality, toast]);

  // Download the processed image
  const downloadImage = useCallback(() => {
    if (!resultUrl) return;
    
    try {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = "removed-background.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Success!",
        description: "Your image has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download the image",
        variant: "destructive",
      });
    }
  }, [resultUrl, toast]);

  return {
    image,
    imagePreview,
    resultUrl,
    loading,
    progress,
    backgroundMode,
    backgroundColor,
    blurAmount,
    featherEdges,
    featherAmount,
    enhanceQuality,
    setImage: handleImageChange,
    setBackgroundMode,
    setBackgroundColor,
    setBlurAmount,
    setFeatherEdges,
    setFeatherAmount,
    setEnhanceQuality,
    processImage,
    downloadImage,
  };
}
