
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Button } from "./button";

interface FileUploaderProps {
  onUpload: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
  maxFiles?: number;
}

export const FileUploader = ({
  onUpload,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  maxFileSizeMB = 2,
  maxFiles = 5
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileValidation = (file: File): boolean => {
    // Check file type
    if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type)) {
      toast.error(`File type not supported. Please upload: ${acceptedFileTypes.join(", ")}`);
      return false;
    }

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      toast.error(`File is too large. Maximum size: ${maxFileSizeMB}MB`);
      return false;
    }

    return true;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (uploadedFiles.length + files.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    let validFiles = files.filter(file => handleFileValidation(file));
    
    if (validFiles.length > 0) {
      setIsUploading(true);
      
      // Process each valid file
      validFiles.forEach(file => {
        onUpload(file);
        setUploadedFiles(prev => [...prev, file]);
      });
      
      setIsUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files || []);
    
    if (uploadedFiles.length + files.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    let validFiles = files.filter(file => handleFileValidation(file));
    
    if (validFiles.length > 0) {
      setIsUploading(true);
      
      // Process each valid file
      validFiles.forEach(file => {
        onUpload(file);
        setUploadedFiles(prev => [...prev, file]);
      });
      
      setIsUploading(false);
    }
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <div
        className={`border-2 border-dashed rounded-md p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center">
          <Upload className="h-10 w-10 text-muted-foreground mb-2" />
          <p className="mb-2 text-sm text-muted-foreground">
            <span className="font-semibold">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-muted-foreground">
            {acceptedFileTypes.join(", ")} (Max: {maxFileSizeMB}MB, up to {maxFiles} files)
          </p>
          {isUploading && <p className="mt-2 text-sm text-primary">Uploading...</p>}
          
          {uploadedFiles.length > 0 && (
            <div className="mt-4 w-full">
              <p className="text-sm font-medium mb-2">Uploaded files ({uploadedFiles.length}/{maxFiles}):</p>
              <div className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                    <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => removeFile(index)}
                      className="h-6 w-6 p-0"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(",")}
          className="hidden"
          multiple={true}
          disabled={uploadedFiles.length >= maxFiles}
        />
        <Label 
          htmlFor="file-upload" 
          className="absolute inset-0 cursor-pointer opacity-0 z-0"
        >
          Upload file
        </Label>
      </div>
    </div>
  );
};
