
import { useState } from "react";
import { Upload } from "lucide-react";

interface FileDropZoneProps {
  onFilesDropped: (files: File[]) => void;
  isUploading: boolean;
  maxFiles: number;
  maxFileSizeMB: number;
  acceptedFileTypes: string[];
}

export const FileDropZone = ({
  onFilesDropped,
  isUploading,
  maxFiles,
  maxFileSizeMB,
  acceptedFileTypes
}: FileDropZoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

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
    onFilesDropped(files);
  };

  return (
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
      </div>
    </div>
  );
};
