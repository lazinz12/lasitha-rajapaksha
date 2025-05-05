
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { FileUploader } from "@/components/ui/file-uploader";
import { Download, Trash2, FileText, Upload } from "lucide-react";

interface ExifData {
  [key: string]: string | number;
}

export const ExifViewer = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [exifData, setExifData] = useState<ExifData | null>(null);
  const [cleanedImage, setCleanedImage] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileSelected = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file.",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      setImagePreview(dataUrl);
      extractExifData(file);
    };
    
    reader.readAsDataURL(file);
  };

  const extractExifData = async (file: File) => {
    try {
      // Create a new image element
      const img = new Image();
      img.src = URL.createObjectURL(file);
      
      img.onload = async () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          toast({
            title: "Error",
            description: "Could not create canvas context.",
            variant: "destructive",
          });
          return;
        }
        
        // Get EXIF data using FileReader and ArrayBuffer
        const reader = new FileReader();
        reader.onload = (e) => {
          const buffer = e.target?.result as ArrayBuffer;
          const view = new DataView(buffer);
          
          // Simple EXIF parser - in a real app, you'd use a library
          const exif: ExifData = {
            "File Name": file.name,
            "File Size": `${(file.size / 1024).toFixed(2)} KB`,
            "File Type": file.type,
            "Last Modified": new Date(file.lastModified).toLocaleString(),
          };
          
          // Check if the file has EXIF data
          const hasExif = checkForExif(view);
          if (hasExif) {
            exif["EXIF Data"] = "Present";
          } else {
            exif["EXIF Data"] = "Not found";
          }
          
          setExifData(exif);
          
          // Draw the image to the canvas (which strips metadata)
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          
          // Convert the canvas to a data URL
          const cleanedDataUrl = canvas.toDataURL(file.type);
          setCleanedImage(cleanedDataUrl);
        };
        
        reader.readAsArrayBuffer(file);
      };
    } catch (error) {
      console.error("Error extracting EXIF data:", error);
      toast({
        title: "Error",
        description: "Failed to extract image metadata.",
        variant: "destructive",
      });
    }
  };

  const checkForExif = (view: DataView): boolean => {
    // Simple check for EXIF magic number
    if (view.byteLength < 14) return false;
    
    // Check for JPEG marker
    if (view.getUint8(0) !== 0xFF || view.getUint8(1) !== 0xD8) {
      return false;
    }
    
    // Look for EXIF app marker
    let offset = 2;
    while (offset < view.byteLength - 2) {
      if (view.getUint8(offset) === 0xFF && view.getUint8(offset + 1) === 0xE1) {
        return true; // Found EXIF APP1 marker
      }
      offset += 1;
    }
    
    return false;
  };

  const downloadCleanedImage = () => {
    if (!cleanedImage) return;
    
    const link = document.createElement('a');
    link.href = cleanedImage;
    link.download = `cleaned-${image?.name || 'image'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "Cleaned image downloaded successfully.",
    });
  };

  const resetAll = () => {
    setImage(null);
    setImagePreview(null);
    setExifData(null);
    setCleanedImage(null);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {!image ? (
        <Card>
          <CardContent className="pt-6">
            <FileUploader
              onUpload={handleFileSelected}
              acceptedFileTypes={['.jpeg', '.jpg', '.png', '.gif', '.tiff']}
              maxFileSizeMB={5}
              maxFiles={1}
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Original Image</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetAll}
                      className="flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Another
                    </Button>
                  </div>
                  {imagePreview && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                      <img
                        src={imagePreview}
                        alt="Original"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
            
            <div className="flex-1">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium">Cleaned Image</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={downloadCleanedImage}
                      disabled={!cleanedImage}
                      className="flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                  </div>
                  {cleanedImage && (
                    <div className="relative aspect-square w-full overflow-hidden rounded-md">
                      <img
                        src={cleanedImage}
                        alt="Cleaned"
                        className="object-contain w-full h-full"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  EXIF Metadata
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetAll}
                  className="flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear All
                </Button>
              </div>
              
              {exifData && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(exifData).map(([key, value]) => (
                    <div key={key} className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500">{key}</span>
                      <span className="font-mono text-sm">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};
