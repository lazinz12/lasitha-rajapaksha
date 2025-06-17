
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Upload, Download, Minimize2 } from "lucide-react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [quality, setQuality] = useState([80]);
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [isCompressing, setIsCompressing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setOriginalSize(file.size);
        const reader = new FileReader();
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
          setCompressedImage(null);
          setCompressedSize(0);
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

  const compressImage = async () => {
    if (!originalImage || !canvasRef.current) return;

    setIsCompressing(true);
    
    try {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Could not get canvas context');

      const img = new Image();
      img.onload = () => {
        // Set canvas dimensions
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Compress the image
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality[0] / 100);
        
        // Calculate compressed size (approximate)
        const compressedSizeBytes = Math.round((compressedDataUrl.length * 3) / 4);
        
        setCompressedImage(compressedDataUrl);
        setCompressedSize(compressedSizeBytes);
        setIsCompressing(false);
        
        toast({
          title: "Success",
          description: "Image compressed successfully!",
        });
      };
      
      img.onerror = () => {
        setIsCompressing(false);
        toast({
          title: "Error",
          description: "Failed to load image",
          variant: "destructive",
        });
      };
      
      img.src = originalImage;
    } catch (error) {
      setIsCompressing(false);
      toast({
        title: "Error",
        description: "Failed to compress image",
        variant: "destructive",
      });
    }
  };

  const downloadCompressed = () => {
    if (!compressedImage) return;
    
    const link = document.createElement('a');
    link.href = compressedImage;
    link.download = `compressed-q${quality[0]}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCompressionRatio = (): string => {
    if (originalSize === 0 || compressedSize === 0) return '0%';
    const ratio = ((originalSize - compressedSize) / originalSize) * 100;
    return `${ratio.toFixed(1)}%`;
  };

  return (
    <>
      <Helmet>
        <title>Image Compressor - Reduce Image File Size | Lasitha Rajapaksha</title>
        <meta name="description" content="Free online tool to compress images without losing quality. Optimize images for web, reduce file size, and speed up your website." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Minimize2 className="h-8 w-8" />
            Image Compressor
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload & Settings</CardTitle>
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
                      <p className="text-gray-500">Upload an image to compress</p>
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

                {originalImage && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Quality: {quality[0]}%
                      </label>
                      <Slider
                        value={quality}
                        onValueChange={setQuality}
                        max={100}
                        min={10}
                        step={5}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Smaller file</span>
                        <span>Better quality</span>
                      </div>
                    </div>

                    <div className="text-sm space-y-1">
                      <div className="flex justify-between">
                        <span>Original size:</span>
                        <span className="font-mono">{formatFileSize(originalSize)}</span>
                      </div>
                      {compressedSize > 0 && (
                        <>
                          <div className="flex justify-between">
                            <span>Compressed size:</span>
                            <span className="font-mono">{formatFileSize(compressedSize)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Size reduction:</span>
                            <span className="font-mono text-green-600">{getCompressionRatio()}</span>
                          </div>
                        </>
                      )}
                    </div>

                    <Button 
                      onClick={compressImage} 
                      disabled={isCompressing}
                      className="w-full"
                    >
                      {isCompressing ? "Compressing..." : "Compress Image"}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Compressed Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center min-h-64">
                  {compressedImage ? (
                    <div className="space-y-4">
                      <img 
                        src={compressedImage} 
                        alt="Compressed" 
                        className="max-w-full max-h-48 mx-auto rounded"
                      />
                      <div className="text-sm text-gray-600">
                        <p>Quality: {quality[0]}%</p>
                        <p>Size: {formatFileSize(compressedSize)}</p>
                      </div>
                      <Button onClick={downloadCompressed}>
                        <Download className="h-4 w-4 mr-2" />
                        Download Compressed
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">Compressed image will appear here</p>
                    </div>
                  )}
                </div>
                <canvas ref={canvasRef} className="hidden" />
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Compression Guide</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div>
                  <h4 className="font-semibold mb-2">Quality Settings:</h4>
                  <ul className="space-y-1">
                    <li>• <strong>90-100%:</strong> Highest quality, larger files</li>
                    <li>• <strong>70-90%:</strong> Good quality, balanced size</li>
                    <li>• <strong>50-70%:</strong> Moderate quality, smaller files</li>
                    <li>• <strong>10-50%:</strong> Lower quality, smallest files</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Best Practices:</h4>
                  <ul className="space-y-1">
                    <li>• Use 80-85% for web images</li>
                    <li>• Higher quality for print materials</li>
                    <li>• Lower quality for thumbnails</li>
                    <li>• Test different settings for best results</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default ImageCompressor;
