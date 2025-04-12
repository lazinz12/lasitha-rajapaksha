
import React, { useRef } from "react";
import { UploadCloud, Image } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

interface BGRemoveUploaderProps {
  image: File | null;
  imagePreview: string | null;
  setImage: (file: File) => void;
}

export const BGRemoveUploader: React.FC<BGRemoveUploaderProps> = ({
  image,
  imagePreview,
  setImage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, JPEG)",
        variant: "destructive",
      });
      return;
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 10MB",
        variant: "destructive",
      });
      return;
    }

    setImage(file);
    
    // Reset file input so the same file can be selected again
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.add("border-primary");
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary");
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.classList.remove("border-primary");
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file (PNG, JPG, JPEG)",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 10MB",
          variant: "destructive",
        });
        return;
      }
      
      setImage(file);
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <Label className="mb-3 block font-medium">Upload Image</Label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            className="hidden"
            onChange={handleImageChange}
          />
          
          {!imagePreview ? (
            <>
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-sm text-muted-foreground">
                Click to upload or drag and drop<br />
                PNG, JPG or JPEG (max. 10MB)
              </p>
            </>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-green-600 font-medium">Image uploaded successfully!</p>
              <div className="relative mx-auto max-w-[200px]">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-h-40 mx-auto rounded border shadow-sm object-contain" 
                />
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                  <Image className="h-3 w-3" />
                  <span>{image?.name.length ? image.name.length > 15 ? `${image.name.substring(0, 15)}...` : image.name : 'Image'}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Click or drop to replace with a different image
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
