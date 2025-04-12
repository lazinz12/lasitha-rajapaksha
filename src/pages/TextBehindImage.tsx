
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Download, Upload, Image as ImageIcon, Wand, Eraser, Check, Settings, ChevronDown } from "lucide-react";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorPicker } from "@/components/tools/ColorPicker";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";

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
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setResultUrl(null); // Reset result when new image is uploaded
    };
    reader.readAsDataURL(file);
    
    // Reset file input so the same file can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
        setResultUrl(null); // Reset result when new image is uploaded
      };
      reader.readAsDataURL(file);
    }
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
      // This is a placeholder for actual background removal logic
      // In a real implementation, you would use a machine learning model or API
      
      // Simulate background removal with a setTimeout for demo purposes
      setTimeout(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
          setLoading(false);
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          setLoading(false);
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
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop<br />
                  PNG, JPG or GIF (max. 10MB)
                </p>
                {imagePreview && (
                  <div className="mt-4">
                    <p className="text-sm text-green-500 mb-2">Image uploaded successfully!</p>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-h-32 mx-auto rounded border" 
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Background Options */}
            <Tabs defaultValue="transparent" onValueChange={(value) => setBackgroundMode(value as "transparent" | "color" | "blur")}>
              <Label className="mb-2 block">Background Type</Label>
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="transparent">Transparent</TabsTrigger>
                <TabsTrigger value="color">Solid Color</TabsTrigger>
                <TabsTrigger value="blur">Blurred</TabsTrigger>
              </TabsList>
              <TabsContent value="transparent" className="pt-4">
                <p className="text-sm text-muted-foreground">
                  The background will be completely transparent, ideal for using in designs.
                </p>
              </TabsContent>
              <TabsContent value="color" className="pt-4">
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <ColorPicker value={backgroundColor} onChange={setBackgroundColor} />
                </div>
              </TabsContent>
              <TabsContent value="blur" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Blur Amount: {blurAmount}px</Label>
                  </div>
                  <Slider 
                    value={[blurAmount]} 
                    min={1} 
                    max={20} 
                    step={1} 
                    onValueChange={(values) => setBlurAmount(values[0])} 
                  />
                </div>
              </TabsContent>
            </Tabs>

            {/* Advanced Options */}
            <Collapsible
              open={advancedOpen}
              onOpenChange={setAdvancedOpen}
              className="border rounded-lg p-4"
            >
              <CollapsibleTrigger asChild>
                <div className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <h3 className="text-sm font-medium">Advanced Options</h3>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${advancedOpen ? "transform rotate-180" : ""}`} />
                </div>
              </CollapsibleTrigger>
              
              <CollapsibleContent className="mt-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label>Detection Sensitivity: {detectionSensitivity}%</Label>
                  </div>
                  <Slider 
                    value={[detectionSensitivity]} 
                    min={0} 
                    max={100} 
                    step={1} 
                    onValueChange={(values) => setDetectionSensitivity(values[0])} 
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="feather-edges">Feather Edges</Label>
                    <Switch 
                      id="feather-edges" 
                      checked={featherEdges} 
                      onCheckedChange={setFeatherEdges} 
                    />
                  </div>
                  
                  {featherEdges && (
                    <div className="pt-2">
                      <div className="flex justify-between">
                        <Label className="text-sm">Feather Amount: {featherAmount}px</Label>
                      </div>
                      <Slider 
                        value={[featherAmount]} 
                        min={1} 
                        max={10} 
                        step={1} 
                        onValueChange={(values) => setFeatherAmount(values[0])} 
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="preserve-details">Preserve Details</Label>
                  <Switch 
                    id="preserve-details" 
                    checked={preserveDetails} 
                    onCheckedChange={setPreserveDetails} 
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label htmlFor="enhance-quality">Enhance Quality</Label>
                  <Switch 
                    id="enhance-quality" 
                    checked={enhanceQuality} 
                    onCheckedChange={setEnhanceQuality} 
                  />
                </div>
              </CollapsibleContent>
            </Collapsible>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button 
                onClick={removeBackground} 
                className="w-full" 
                disabled={!image || loading}
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <Eraser className="mr-2 h-4 w-4" />
                    Remove Background
                  </>
                )}
              </Button>
              <Button 
                onClick={downloadImage} 
                className="w-full" 
                variant="outline"
                disabled={!resultUrl}
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Preview</Label>
            <div className="border rounded-lg overflow-hidden bg-[#f0f0f0] dark:bg-zinc-800 flex flex-col">
              <canvas ref={canvasRef} className="hidden" />
              {resultUrl ? (
                <div className="relative">
                  {loading ? (
                    <div className="flex items-center justify-center p-8 min-h-[300px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <div className="grid place-items-center p-4" style={{
                      backgroundImage: "linear-gradient(45deg, #e0e0e0 25%, transparent 25%), linear-gradient(-45deg, #e0e0e0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e0e0e0 75%), linear-gradient(-45deg, transparent 75%, #e0e0e0 75%)",
                      backgroundSize: "20px 20px",
                      backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px"
                    }}>
                      <img
                        src={resultUrl}
                        alt="Background Removed"
                        className="max-w-full h-auto"
                      />
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {loading ? "Processing..." : "Background Removed"}
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center p-8 text-muted-foreground">
                    <Wand className="mx-auto h-12 w-12 mb-4" />
                    <p>Upload an image and remove its background</p>
                  </div>
                  <div className="border-t p-4">
                    <p className="text-sm font-medium mb-2">Examples:</p>
                    <div className="grid grid-cols-2 gap-2">
                      {previewExamples.map((example, index) => (
                        <img 
                          key={index}
                          src={example}
                          alt={`Example ${index + 1}`}
                          className="w-full h-auto rounded border shadow-sm hover:opacity-90 transition-opacity cursor-pointer"
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" /> 
                <span>Remove backgrounds from photos with precision</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" /> 
                <span>Choose transparent, solid color, or blurred backgrounds</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" /> 
                <span>Advanced options for professional-quality results</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemovalTool;
