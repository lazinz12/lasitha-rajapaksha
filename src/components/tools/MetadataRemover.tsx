
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Download, X, FileImage } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ImageFile {
  original: File;
  preview: string;
  cleanedUrl?: string;
  metadata?: Record<string, any>;
}

export const MetadataRemover = () => {
  const [imageFile, setImageFile] = useState<ImageFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = e.target?.result as string;
      setImageFile({
        original: file,
        preview,
      });
      processImage(file, preview);
    };
    reader.readAsDataURL(file);
  };

  const processImage = async (file: File, preview: string) => {
    setIsProcessing(true);
    
    try {
      // Extract basic metadata
      const metadata = {
        "File Name": file.name,
        "File Size": `${(file.size / 1024).toFixed(2)} KB`,
        "File Type": file.type,
        "Last Modified": new Date(file.lastModified).toLocaleString(),
      };

      // Create cleaned version by drawing to canvas
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          toast({
            title: "Error",
            description: "Failed to process image.",
            variant: "destructive",
          });
          setIsProcessing(false);
          return;
        }

        // Set canvas dimensions to match image
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        
        // Draw image to canvas (this strips metadata)
        ctx.drawImage(img, 0, 0);
        
        // Convert back to blob
        canvas.toBlob((blob) => {
          if (blob) {
            const cleanedUrl = URL.createObjectURL(blob);
            setImageFile(prev => prev ? {
              ...prev,
              cleanedUrl,
              metadata
            } : null);
          }
          setIsProcessing(false);
        }, file.type, 0.95);
      };
      
      img.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to load image.",
          variant: "destructive",
        });
        setIsProcessing(false);
      };
      
      img.src = preview;
    } catch (error) {
      console.error("Error processing image:", error);
      toast({
        title: "Error",
        description: "Failed to process image.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
  };

  const downloadCleanedImage = () => {
    if (!imageFile?.cleanedUrl) return;
    
    const link = document.createElement('a');
    link.href = imageFile.cleanedUrl;
    link.download = `cleaned_${imageFile.original.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "Cleaned image downloaded successfully!",
    });
  };

  const resetTool = () => {
    if (imageFile?.preview && imageFile.preview.startsWith('blob:')) {
      URL.revokeObjectURL(imageFile.preview);
    }
    if (imageFile?.cleanedUrl) {
      URL.revokeObjectURL(imageFile.cleanedUrl);
    }
    setImageFile(null);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {!imageFile ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileImage className="h-5 w-5" />
              Upload Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8">
              <div className="text-center">
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <div className="mb-4">
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <span className="text-lg font-medium">Choose an image</span>
                    <p className="text-sm text-muted-foreground mt-1">
                      Supports JPG, PNG, GIF, WebP and other image formats
                    </p>
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </div>
                <Button asChild>
                  <label htmlFor="image-upload" className="cursor-pointer">
                    Select Image
                  </label>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Original and Cleaned Images */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Image */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Original Image</CardTitle>
                <Badge variant="destructive">Contains Metadata</Badge>
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  <img
                    src={imageFile.preview}
                    alt="Original"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{imageFile.metadata?.["File Size"]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type:</span>
                    <span>{imageFile.metadata?.["File Type"]}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Cleaned Image */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Cleaned Image</CardTitle>
                {imageFile.cleanedUrl ? (
                  <Badge variant="secondary">Metadata Removed</Badge>
                ) : (
                  <Badge variant="outline">Processing...</Badge>
                )}
              </CardHeader>
              <CardContent>
                <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
                  {imageFile.cleanedUrl ? (
                    <img
                      src={imageFile.cleanedUrl}
                      alt="Cleaned"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-muted-foreground">Processing...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Button
                    onClick={downloadCleanedImage}
                    disabled={!imageFile.cleanedUrl || isProcessing}
                    className="w-full"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Cleaned Image
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Metadata Information */}
          {imageFile.metadata && (
            <Card>
              <CardHeader>
                <CardTitle>Image Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {Object.entries(imageFile.metadata).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                      <span className="font-medium text-muted-foreground">{key}:</span>
                      <span className="text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Reset Button */}
          <div className="flex justify-center">
            <Button variant="outline" onClick={resetTool}>
              <X className="h-4 w-4 mr-2" />
              Process Another Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
