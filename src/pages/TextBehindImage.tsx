
import React, { useState, useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import Header from "@/components/Header";
import { ImageUploader } from "@/components/tools/background-removal/ImageUploader";
import { BackgroundOptions } from "@/components/tools/background-removal/BackgroundOptions";
import { AdvancedOptions } from "@/components/tools/background-removal/AdvancedOptions";
import { ActionButtons } from "@/components/tools/background-removal/ActionButtons";
import { ResultPreview } from "@/components/tools/background-removal/ResultPreview";
import { BackgroundRemovalProcessor } from "@/components/tools/background-removal/BackgroundRemovalProcessor";

const BackgroundRemovalTool = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [advancedOpen, setAdvancedOpen] = useState<boolean>(false);
  const [backgroundMode, setBackgroundMode] = useState<"transparent" | "color" | "blur">("transparent");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const [blurAmount, setBlurAmount] = useState<number>(5);
  const [detectionSensitivity, setDetectionSensitivity] = useState<number>(50);
  const [featherEdges, setFeatherEdges] = useState<boolean>(true);
  const [featherAmount, setFeatherAmount] = useState<number>(3);
  const [preserveDetails, setPreserveDetails] = useState<boolean>(true);
  const [enhanceQuality, setEnhanceQuality] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageChange = (file: File) => {
    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setResultUrl(null); // Reset result when new image is uploaded
    };
    reader.readAsDataURL(file);
  };

  const removeBackground = async () => {
    if (!image || !imagePreview) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Simulate processing time
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
          setLoading(false);
          toast({
            title: "Error",
            description: "Canvas not available",
            variant: "destructive",
          });
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setLoading(false);
          toast({
            title: "Error",
            description: "Canvas context not available",
            variant: "destructive",
          });
          return;
        }

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
          } catch (error) {
            console.error("Error generating image:", error);
            toast({
              title: "Error",
              description: "Failed to generate the image",
              variant: "destructive",
            });
          }
          
          setLoading(false);
        };
        
        img.src = imagePreview;
        
        img.onerror = () => {
          setLoading(false);
          toast({
            title: "Error",
            description: "Failed to load the image",
            variant: "destructive",
          });
        };
      }, 1500); // Simulate processing time
    } catch (error) {
      console.error("Error removing background:", error);
      toast({
        title: "Error",
        description: "Failed to remove background",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const downloadImage = () => {
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
  };

  const previewExamples = [
    "/lovable-uploads/7ec82679-39c2-48dc-b5be-df474aec5bb6.png",
    "/lovable-uploads/1181ccfe-63b7-4a81-80cc-d997607c84f8.png"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Image Background Removal Tool</h1>
          <p className="text-muted-foreground">
            Remove backgrounds from your images with advanced customization options
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Upload Image</Label>
              <ImageUploader 
                imagePreview={imagePreview} 
                onImageChange={handleImageChange} 
              />
            </div>

            {/* Background Options */}
            <BackgroundOptions
              backgroundMode={backgroundMode}
              backgroundColor={backgroundColor}
              blurAmount={blurAmount}
              onBackgroundModeChange={setBackgroundMode}
              onBackgroundColorChange={setBackgroundColor}
              onBlurAmountChange={setBlurAmount}
            />

            {/* Advanced Options */}
            <AdvancedOptions
              advancedOpen={advancedOpen}
              detectionSensitivity={detectionSensitivity}
              featherEdges={featherEdges}
              featherAmount={featherAmount}
              preserveDetails={preserveDetails}
              enhanceQuality={enhanceQuality}
              onAdvancedOpenChange={setAdvancedOpen}
              onDetectionSensitivityChange={setDetectionSensitivity}
              onFeatherEdgesChange={setFeatherEdges}
              onFeatherAmountChange={setFeatherAmount}
              onPreserveDetailsChange={setPreserveDetails}
              onEnhanceQualityChange={setEnhanceQuality}
            />

            {/* Action Buttons */}
            <ActionButtons
              onRemoveBackground={removeBackground}
              onDownloadImage={downloadImage}
              loading={loading}
              hasImage={!!image}
              hasResult={!!resultUrl}
            />
          </div>

          <div className="space-y-4">
            <Label>Preview</Label>
            <ResultPreview
              resultUrl={resultUrl}
              loading={loading}
              previewExamples={previewExamples}
            />
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
};

export default BackgroundRemovalTool;
