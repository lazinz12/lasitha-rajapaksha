import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { FileUploader } from "../ui/file-uploader";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/slugUtils";

const TradingIdeaForm = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !description || imageUrls.length === 0) {
      toast.error("Please fill all fields and upload at least one image");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("You must be logged in to share trading ideas");
        navigate("/login");
        return;
      }
      
      const slug = generateSlug(title);
      
      const { error } = await supabase
        .from('trading_ideas')
        .insert({
          title,
          description,
          image_url: imageUrls[0],
          additional_images: imageUrls.slice(1),
          slug,
          author_id: session.user.id,
          published: true
        });
      
      if (error) {
        console.error("Error submitting trading idea:", error);
        toast.error("Failed to submit trading idea");
        return;
      }
      
      toast.success("Trading idea shared successfully!");
      navigate(`/trading-ideas/${slug}`);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };
  
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
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Share Your Trading Idea</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="E.g., 'EURUSD Bullish Breakout Setup'"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full relative z-10"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="image">Chart Images (Maximum 5)</Label>
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
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your trading idea, analysis, and potential entry/exit points..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-32"
              required
            />
          </div>
          
          <CardFooter className="px-0 pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting || !title || !description || imageUrls.length === 0}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};

export default TradingIdeaForm;
