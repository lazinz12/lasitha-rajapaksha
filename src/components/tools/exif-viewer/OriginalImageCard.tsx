
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

interface OriginalImageCardProps {
  imagePreview: string | null;
  resetAll: () => void;
}

export const OriginalImageCard = ({ 
  imagePreview,
  resetAll
}: OriginalImageCardProps) => {
  return (
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
  );
};
