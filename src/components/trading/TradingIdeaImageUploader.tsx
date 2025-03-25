
import { toast } from "sonner";
import { FileUploader } from "../ui/file-uploader";
import { supabase } from "@/integrations/supabase/client";

interface TradingIdeaImageUploaderProps {
  imageUrls: string[];
  setImageUrls: (urls: string[]) => void;
}

const TradingIdeaImageUploader = ({ imageUrls, setImageUrls }: TradingIdeaImageUploaderProps) => {
  const handleImageUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError, data } = await supabase
        .storage
        .from('trading-ideas')
        .upload(filePath, file);
        
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase
        .storage
        .from('trading-ideas')
        .getPublicUrl(filePath);
        
      setImageUrls(prev => [...prev, publicUrl]);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <div className="space-y-4">
      <FileUploader 
        onUpload={handleImageUpload}
        acceptedFileTypes={["image/jpeg", "image/png", "image/gif"]}
        maxFileSizeMB={5}
        maxFiles={5}
      />
      
      {imageUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
          {imageUrls.map((url, idx) => (
            <div key={idx} className="relative aspect-video border rounded-md overflow-hidden">
              <img 
                src={url} 
                alt={`Chart ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
              {idx === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TradingIdeaImageUploader;
