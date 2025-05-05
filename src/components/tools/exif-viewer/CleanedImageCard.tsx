
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface CleanedImageCardProps {
  cleanedImage: string | null;
  imageName: string | null;
}

export const CleanedImageCard = ({ 
  cleanedImage,
  imageName
}: CleanedImageCardProps) => {
  const { toast } = useToast();
  
  const downloadCleanedImage = () => {
    if (!cleanedImage) return;
    
    const link = document.createElement('a');
    link.href = cleanedImage;
    link.download = `cleaned-${imageName || 'image'}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Success",
      description: "Cleaned image downloaded successfully.",
    });
  };
  
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Cleaned Image</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={downloadCleanedImage}
            disabled={!cleanedImage}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download
          </Button>
        </div>
        {cleanedImage && (
          <div className="relative aspect-square w-full overflow-hidden rounded-md">
            <img
              src={cleanedImage}
              alt="Cleaned"
              className="object-contain w-full h-full"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
