
import React from "react";
import { Button } from "@/components/ui/button";
import { Eraser, Download } from "lucide-react";

interface ActionButtonsProps {
  onRemoveBackground: () => void;
  onDownloadImage: () => void;
  loading: boolean;
  hasImage: boolean;
  hasResult: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onRemoveBackground,
  onDownloadImage,
  loading,
  hasImage,
  hasResult,
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
            <Eraser className="mr-2 h-4 w-4" />
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
