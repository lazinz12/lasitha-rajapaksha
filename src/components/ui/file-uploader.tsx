
import { ChangeEvent, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { FileDropZone } from "./file-dropzone";
import { FileList } from "./file-list";

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

  const handleFilesSelected = (files: File[]) => {
    if (uploadedFiles.length + files.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} files.`);
      return;
    }
    
    const validFiles = files.filter(file => handleFileValidation(file));
    
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFilesSelected(files);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="relative">
      <FileDropZone 
        onFilesDropped={handleFilesSelected}
        isUploading={isUploading}
        maxFiles={maxFiles}
        maxFileSizeMB={maxFileSizeMB}
        acceptedFileTypes={acceptedFileTypes}
      />
      
      {uploadedFiles.length > 0 && (
        <FileList 
          files={uploadedFiles}
          maxFiles={maxFiles}
          onRemove={removeFile}
        />
      )}
      
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
  );
};
