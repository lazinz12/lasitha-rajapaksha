
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2 } from "lucide-react";

interface ExifMetadataCardProps {
  exifData: { [key: string]: string | number } | null;
  resetAll: () => void;
}

export const ExifMetadataCard = ({
  exifData,
  resetAll
}: ExifMetadataCardProps) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <FileText className="h-4 w-4" />
            EXIF Metadata
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={resetAll}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All
          </Button>
        </div>
        
        {exifData && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(exifData).map(([key, value]) => (
              <div key={key} className="flex flex-col">
                <span className="text-sm font-medium text-gray-500">{key}</span>
                <span className="font-mono text-sm">{value}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
