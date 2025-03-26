
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/slugUtils";

export function useTradingIdeaForm() {
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
      
      console.log("Submitting trading idea with data:", {
        title,
        description,
        image_url: imageUrls[0],
        additional_images: imageUrls.slice(1),
        slug,
        author_id: session.user.id
      });
      
      // Using upsert to ensure we don't get conflicts
      const { error, data } = await supabase
        .from('trading_ideas')
        .upsert({
          title,
          description,
          image_url: imageUrls[0],
          additional_images: imageUrls.slice(1),
          slug,
          author_id: session.user.id,
          published: true
        })
        .select('id, slug')
        .single();
      
      if (error) {
        console.error("Error submitting trading idea:", error);
        toast.error("Failed to submit trading idea");
        setIsSubmitting(false);
        return;
      }
      
      console.log("Trading idea submitted successfully:", data);
      toast.success("Trading idea shared successfully!");
      
      if (!data || !data.slug) {
        console.error("No data returned from submission");
        toast.error("Error retrieving submission data");
        setIsSubmitting(false);
        return;
      }
      
      // Add a longer delay to ensure the database has time to process
      setTimeout(() => {
        navigate(`/trading-ideas/${data.slug}`);
        setIsSubmitting(false);
      }, 1500);
      
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
      setIsSubmitting(false);
    }
  };

  return {
    title,
    setTitle,
    description,
    setDescription,
    imageUrls,
    setImageUrls,
    isSubmitting,
    handleSubmit
  };
}
