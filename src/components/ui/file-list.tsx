
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FileListProps {
  files: File[];
  maxFiles: number;
  onRemove: (index: number) => void;
}

export const FileList = ({ files, maxFiles, onRemove }: FileListProps) => {
  return (
    <div className="mt-4 w-full">
      <p className="text-sm font-medium mb-2">Uploaded files ({files.length}/{maxFiles}):</p>
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
            <span className="text-sm truncate max-w-[200px]">{file.name}</span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => onRemove(index)}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Remove</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
