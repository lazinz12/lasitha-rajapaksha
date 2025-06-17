
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Crop, RotateCcw } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const ImageCropper = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [cropWidth, setCropWidth] = useState(400);
  const [cropHeight, setCropHeight] = useState(400);
  const [aspectRatio, setAspectRatio] = useState("custom");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const aspectRatios = {
    "1:1": 1,
    "4:3": 4/3,
    "16:9": 16/9,
    "3:4": 3/4,
    "9:16": 9/16,
    "custom": null
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
          setCroppedImage(null);
        };
        reader.readAsDataURL(file);
      } else {
        toast({
          title: "Error",
          description: "Please select a valid image file",
          variant: "destructive",
        });
      }
    }
  };

  const handleAspectRatioChange = (ratio: string) => {
    setAspectRatio(ratio);
    if (ratio !== "custom" && aspectRatios[ratio as keyof typeof aspectRatios]) {
      const aspectValue = aspectRatios[ratio as keyof typeof aspectRatios];
      if (aspectValue) {
        setCropHeight(Math.round(cropWidth / aspectValue));
      }
    }
  };

  const cropImage = () => {
    if (!originalImage || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = cropWidth;
      canvas.height = cropHeight;
      
      // Calculate crop area (center crop)
      const scale = Math.max(cropWidth / img.width, cropHeight / img.height);
      const scaledWidth = img.width * scale;
      const scaledHeight = img.height * scale;
      const x = (scaledWidth - cropWidth) / 2;
      const y = (scaledHeight - cropHeight) / 2;
      
      ctx.drawImage(img, -x, -y, scaledWidth, scaledHeight);
      
      const croppedDataUrl = canvas.toDataURL('image/png');
      setCroppedImage(croppedDataUrl);
      
      toast({
        title: "Success",
        description: "Image cropped successfully!",
      });
    };
    img.src = originalImage;
  };

  const downloadCroppedImage = () => {
    if (!croppedImage) return;
    
    const link = document.createElement('a');
    link.href = croppedImage;
    link.download = `cropped-${cropWidth}x${cropHeight}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetCrop = () => {
    setCroppedImage(null);
    setCropWidth(400);
    setCropHeight(400);
    setAspectRatio("custom");
  };

  return (
    <>
      <Helmet>
        <title>Image Cropper - Crop Images Online | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to crop images with custom dimensions and aspect ratios." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Crop className="h-8 w-8" />
            Image Cropper
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload & Configure</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  {originalImage ? (
                    <img 
                      src={originalImage} 
                      alt="Original" 
                      className="max-w-full max-h-48 mx-auto rounded"
                    />
                  ) : (
                    <div className="space-y-4 py-8">
                      <Upload className="h-12 w-12 mx-auto text-gray-400" />
                      <p className="text-gray-500">Upload an image to crop</p>
                    </div>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button 
                    onClick={() => fileInputRef.current?.click()}
                    className="mt-4"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Aspect Ratio:</label>
                    <select
                      value={aspectRatio}
                      onChange={(e) => handleAspectRatioChange(e.target.value)}
                      className="w-full border rounded px-3 py-2"
                    >
                      <option value="custom">Custom</option>
                      <option value="1:1">Square (1:1)</option>
                      <option value="4:3">Landscape (4:3)</option>
                      <option value="16:9">Widescreen (16:9)</option>
                      <option value="3:4">Portrait (3:4)</option>
                      <option value="9:16">Mobile (9:16)</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Width (px):</label>
                      <Input
                        type="number"
                        value={cropWidth}
                        onChange={(e) => {
                          const width = parseInt(e.target.value) || 400;
                          setCropWidth(width);
                          if (aspectRatio !== "custom" && aspectRatios[aspectRatio as keyof typeof aspectRatios]) {
                            const aspectValue = aspectRatios[aspectRatio as keyof typeof aspectRatios];
                            if (aspectValue) {
                              setCropHeight(Math.round(width / aspectValue));
                            }
                          }
                        }}
                        min="1"
                        max="2000"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Height (px):</label>
                      <Input
                        type="number"
                        value={cropHeight}
                        onChange={(e) => setCropHeight(parseInt(e.target.value) || 400)}
                        min="1"
                        max="2000"
                        disabled={aspectRatio !== "custom"}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      onClick={cropImage} 
                      disabled={!originalImage}
                      className="flex-1"
                    >
                      <Crop className="h-4 w-4 mr-2" />
                      Crop Image
                    </Button>
                    <Button onClick={resetCrop} variant="outline">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Cropped Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-h-64">
                  {croppedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={croppedImage} 
                        alt="Cropped" 
                        className="max-w-full mx-auto rounded border"
                      />
                      <p className="text-sm text-gray-500">{cropWidth} × {cropHeight} pixels</p>
                      <Button onClick={downloadCroppedImage}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Cropped image will appear here</p>
                    </div>
                  )}
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default ImageCropper;
