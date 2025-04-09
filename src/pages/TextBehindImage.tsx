
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Download, Image as ImageIcon, Type, RefreshCw, Check } from "lucide-react";
import Header from "@/components/Header";
import { ColorPicker } from "@/components/tools/ColorPicker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TextBehindImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState<string>("YOUR TEXT");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [fontSize, setFontSize] = useState<number>(160);
  const [textOpacity, setTextOpacity] = useState<number>(1);
  const [imageOpacity, setImageOpacity] = useState<number>(0.9);
  const [fontWeight, setFontWeight] = useState<string>("900");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
  const [loading, setLoading] = useState<boolean>(false);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fonts = [
    "Arial", "Helvetica", "Verdana", "Tahoma", "Trebuchet MS", 
    "Impact", "Arial Black", "Times New Roman", "Georgia", "Palatino",
    "Courier New", "Lucida Console", "Comic Sans MS"
  ];

  const fontWeights = [
    { value: "400", label: "Normal" },
    { value: "700", label: "Bold" },
    { value: "900", label: "Black" }
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0]);
  };

  const handleOpacityChange = (value: number[]) => {
    setTextOpacity(value[0]);
  };
  
  const handleImageOpacityChange = (value: number[]) => {
    setImageOpacity(value[0]);
  };

  useEffect(() => {
    if (imagePreview) {
      generateImage();
    }
  }, [text, textColor, fontSize, textOpacity, imageOpacity, fontWeight, fontFamily, imagePreview]);

  const generateImage = () => {
    if (!image || !imagePreview) {
      return;
    }

    setLoading(true);

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      // Set canvas dimensions to match the image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Clear the canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Set up the text styling
      ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
      ctx.fillStyle = textColor;
      ctx.globalAlpha = textOpacity;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      
      // Calculate line height
      const lineHeight = fontSize * 1.2;
      
      // Split text into lines
      const lines = text.split('\n');
      
      // Draw each line of text centered
      const x = canvas.width / 2;
      const y = (canvas.height / 2) - ((lines.length - 1) * lineHeight / 2);
      
      lines.forEach((line, index) => {
        ctx.fillText(line, x, y + (index * lineHeight));
      });
      
      // Draw the image with transparency
      ctx.globalAlpha = imageOpacity;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Save the result
      try {
        const dataUrl = canvas.toDataURL("image/png");
        setResultUrl(dataUrl);
      } catch (error) {
        console.error("Error generating image:", error);
      }
      
      setLoading(false);
    };
    
    img.src = imagePreview;
  };

  const downloadImage = () => {
    if (!resultUrl) return;
    
    try {
      const link = document.createElement("a");
      link.href = resultUrl;
      link.download = "text-behind-image.png";
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
          <h1 className="text-3xl font-bold mb-2">Text Behind Image Generator</h1>
          <p className="text-muted-foreground">
            Create images with large text behind them - perfect for professional-looking watermarks
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <Label>Upload Image</Label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <p className="text-sm text-muted-foreground">
                  Click to upload or drag and drop<br />
                  PNG, JPG or GIF (max. 10MB)
                </p>
              </div>
            </div>

            {/* Text Input */}
            <div className="space-y-2">
              <Label htmlFor="text">Text</Label>
              <Textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text to place behind the image"
                className="min-h-[100px] font-bold"
              />
            </div>

            {/* Text Styling */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <ColorPicker value={textColor} onChange={setTextColor} />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Font Size: {fontSize}px</Label>
                </div>
                <Slider
                  value={[fontSize]}
                  min={50}
                  max={300}
                  step={10}
                  onValueChange={handleFontSizeChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Font Family</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Font" />
                    </SelectTrigger>
                    <SelectContent>
                      {fonts.map(font => (
                        <SelectItem key={font} value={font} style={{ fontFamily: font }}>
                          {font}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Font Weight</Label>
                  <Select value={fontWeight} onValueChange={setFontWeight}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Weight" />
                    </SelectTrigger>
                    <SelectContent>
                      {fontWeights.map(weight => (
                        <SelectItem key={weight.value} value={weight.value}>
                          {weight.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Text Opacity: {Math.round(textOpacity * 100)}%</Label>
                </div>
                <Slider
                  value={[textOpacity]}
                  min={0.1}
                  max={1}
                  step={0.1}
                  onValueChange={handleOpacityChange}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Image Opacity: {Math.round(imageOpacity * 100)}%</Label>
                </div>
                <Slider
                  value={[imageOpacity]}
                  min={0.3}
                  max={1}
                  step={0.1}
                  onValueChange={handleImageOpacityChange}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={generateImage} 
                className="w-full" 
                disabled={!image || loading}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
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
            <div className="border rounded-lg overflow-hidden bg-black/5 flex flex-col">
              {resultUrl ? (
                <div className="relative overflow-hidden">
                  <canvas ref={canvasRef} className="hidden" />
                  {loading ? (
                    <div className="flex items-center justify-center p-8 min-h-[300px]">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <img
                      src={resultUrl}
                      alt="Text Behind Image Preview"
                      className="max-w-full h-auto"
                    />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    Generated Preview
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-center p-8 text-muted-foreground">
                    <Type className="mx-auto h-12 w-12 mb-4" />
                    <p>Upload an image and add text to see the preview</p>
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
                <span>Large text placed behind images for professional effects</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" /> 
                <span>Perfect for watermarks, branding, and creative design</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Check className="h-4 w-4 text-green-500" /> 
                <span>Customize font, size, opacity and more</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextBehindImage;
