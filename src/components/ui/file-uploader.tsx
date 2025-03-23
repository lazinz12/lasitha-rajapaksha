
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Upload } from "lucide-react";

interface FileUploaderProps {
  onUpload: (file: File) => void;
  acceptedFileTypes?: string[];
  maxFileSizeMB?: number;
}

export const FileUploader = ({
  onUpload,
  acceptedFileTypes = ["image/jpeg", "image/png"],
  maxFileSizeMB = 2
}: FileUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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
    const file = e.target.files?.[0];
    if (!file) return;

    if (handleFileValidation(file)) {
      setIsUploading(true);
      onUpload(file);
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

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (handleFileValidation(file)) {
      setIsUploading(true);
      onUpload(file);
      setIsUploading(false);
    }
  };

  return (
    <div>
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
            {acceptedFileTypes.join(", ")} (Max: {maxFileSizeMB}MB)
          </p>
          {isUploading && <p className="mt-2 text-sm text-primary">Uploading...</p>}
        </div>
        <Input
          id="file-upload"
          type="file"
          onChange={handleFileChange}
          accept={acceptedFileTypes.join(",")}
          className="hidden"
        />
        <Label htmlFor="file-upload" className="w-full h-full absolute inset-0 cursor-pointer opacity-0">
          Upload file
        </Label>
      </div>
    </div>
  );
};
