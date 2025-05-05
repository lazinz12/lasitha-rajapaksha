
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { extractExifData } from "@/utils/exifUtils";
import { ImageUploader } from "./exif-viewer/ImageUploader";
import { OriginalImageCard } from "./exif-viewer/OriginalImageCard";
import { CleanedImageCard } from "./exif-viewer/CleanedImageCard";
import { ExifMetadataCard } from "./exif-viewer/ExifMetadataCard";

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
      processExifData(file);
    };
    
    reader.readAsDataURL(file);
  };

  const processExifData = async (file: File) => {
    try {
      const { exifData: extractedExif, cleanedImageUrl } = await extractExifData(file);
      
      if (extractedExif) {
        setExifData(extractedExif);
      } else {
        toast({
          title: "Error",
          description: "Failed to extract image metadata.",
          variant: "destructive",
        });
      }
      
      if (cleanedImageUrl) {
        setCleanedImage(cleanedImageUrl);
      }
    } catch (error) {
      console.error("Error processing EXIF data:", error);
      toast({
        title: "Error",
        description: "Failed to process the image.",
        variant: "destructive",
      });
    }
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
        <ImageUploader onImageSelected={handleFileSelected} />
      ) : (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <OriginalImageCard 
                imagePreview={imagePreview}
                resetAll={resetAll}
              />
            </div>
            
            <div className="flex-1">
              <CleanedImageCard
                cleanedImage={cleanedImage}
                imageName={image?.name}
              />
            </div>
          </div>
          
          <ExifMetadataCard
            exifData={exifData}
            resetAll={resetAll}
          />
        </>
      )}
    </div>
  );
};
