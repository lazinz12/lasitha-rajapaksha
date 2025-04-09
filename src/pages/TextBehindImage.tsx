
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/components/ui/use-toast";
import { Download, Image as ImageIcon, Type } from "lucide-react";
import Header from "@/components/Header";
import { ColorPicker } from "@/components/tools/ColorPicker";

const TextBehindImage = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [text, setText] = useState<string>("Your text here");
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [fontSize, setFontSize] = useState<number>(32);
  const [textOpacity, setTextOpacity] = useState<number>(0.7);
  const [loading, setLoading] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

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

  const generateImage = () => {
    if (!image || !imagePreview) {
      toast({
        title: "No image selected",
        description: "Please select an image first",
        variant: "destructive",
      });
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

      // Draw the text first (behind the image)
      ctx.fillStyle = textColor;
      ctx.globalAlpha = textOpacity;
      ctx.font = `${fontSize}px Arial`;
      
      // Calculate line height
      const lineHeight = fontSize * 1.2;
      
      // Split text into lines
      const lines = text.split('\n');
      
      // Calculate text position - centered
      const x = canvas.width / 2;
      const y = (canvas.height / 2) - ((lines.length - 1) * lineHeight / 2);
      
      // Draw each line of text
      ctx.textAlign = 'center';
      lines.forEach((line, index) => {
        ctx.fillText(line, x, y + (index * lineHeight));
      });
      
      // Draw the image with transparency
      ctx.globalAlpha = 0.8; // Make image slightly transparent to see text
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      setLoading(false);
    };
    
    img.src = imagePreview;
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    try {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Text Behind Image Generator</h1>
          <p className="text-muted-foreground">
            Create images with hidden text behind them
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
              <Label htmlFor="text">Text to Hide Behind Image</Label>
              <Textarea
                id="text"
                value={text}
                onChange={handleTextChange}
                placeholder="Enter text to hide behind the image"
                className="min-h-[100px]"
              />
            </div>

            {/* Text Styling */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Text Color</Label>
                <div className="flex space-x-2 items-center">
                  <div 
                    className="w-10 h-10 rounded-md border" 
                    style={{ backgroundColor: textColor }}
                  />
                  <Input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-14 h-10"
                  />
                  <Input
                    type="text"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="w-28"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Font Size: {fontSize}px</Label>
                </div>
                <Slider
                  value={[fontSize]}
                  min={12}
                  max={72}
                  step={1}
                  onValueChange={handleFontSizeChange}
                />
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
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={generateImage} 
                className="w-full" 
                disabled={!image || loading}
              >
                <Type className="mr-2 h-4 w-4" />
                Generate
              </Button>
              <Button 
                onClick={downloadImage} 
                className="w-full" 
                disabled={!canvasRef.current || loading}
                variant="outline"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Preview</Label>
            <div className="border rounded-lg p-4 flex items-center justify-center bg-black/5 min-h-[300px]">
              {imagePreview ? (
                <div className="relative">
                  <canvas ref={canvasRef} className="max-w-full h-auto hidden" />
                  {loading ? (
                    <div className="flex items-center justify-center p-8">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  ) : (
                    <img
                      src={canvasRef.current?.toDataURL() || imagePreview}
                      alt="Preview"
                      className="max-w-full h-auto"
                    />
                  )}
                </div>
              ) : (
                <div className="text-center p-8 text-muted-foreground">
                  <Type className="mx-auto h-12 w-12 mb-4" />
                  <p>Upload an image and add text to see the preview</p>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              The text will be hidden behind the image but can be revealed in certain lighting conditions or when printed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextBehindImage;
