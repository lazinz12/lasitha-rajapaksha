
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, Wand2 } from "lucide-react";

interface BGRemoveActionBarProps {
  hasImage: boolean;
  hasResult: boolean;
  loading: boolean;
  onRemoveBackground: () => void;
  onDownloadImage: () => void;
}

export const BGRemoveActionBar: React.FC<BGRemoveActionBarProps> = ({
  hasImage,
  hasResult,
  loading,
  onRemoveBackground,
  onDownloadImage,
}) => {
  return (
    <div className="flex gap-4">
      <Button 
        onClick={onRemoveBackground} 
        className="w-full" 
        disabled={!hasImage || loading}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            <span>Processing...</span>
          </div>
        ) : (
          <>
            <Wand2 className="mr-2 h-4 w-4" />
            Remove Background
          </>
        )}
      </Button>
      
      <Button 
        onClick={onDownloadImage} 
        className="w-full" 
        variant="outline"
        disabled={!hasResult}
      >
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
    </div>
  );
};
