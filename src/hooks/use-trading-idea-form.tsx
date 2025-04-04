
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { generateSlug } from "@/utils/slugUtils";

interface TradingIdeaData {
  id?: string;
  title: string;
  description: string;
  image_url: string;
  additional_images?: string[] | null;
  published?: boolean;
  slug?: string;
  youtube_url?: string;
}

export function useTradingIdeaForm(initialData: TradingIdeaData | null = null, isEdit = false) {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [youtubeUrl, setYoutubeUrl] = useState(initialData?.youtube_url || "");
  const [imageUrls, setImageUrls] = useState<string[]>(
    initialData 
      ? [initialData.image_url, ...(initialData.additional_images || [])]
      : []
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setYoutubeUrl(initialData.youtube_url || "");
      
      const allImages = [
        initialData.image_url,
        ...(initialData.additional_images || [])
      ].filter(Boolean);
      
      setImageUrls(allImages);
    }
  }, [initialData]);
  
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
      
      const slug = isEdit && initialData?.slug 
        ? initialData.slug 
        : generateSlug(title);
      
      console.log(`${isEdit ? "Updating" : "Submitting"} trading idea with data:`, {
        title,
        description,
        image_url: imageUrls[0],
        additional_images: imageUrls.slice(1),
        youtube_url: youtubeUrl,
        slug,
        author_id: session.user.id,
        ...(isEdit && initialData?.id ? { id: initialData.id } : {})
      });
      
      const data = {
        title,
        description,
        image_url: imageUrls[0],
        additional_images: imageUrls.slice(1),
        youtube_url: youtubeUrl,
        slug,
        author_id: session.user.id,
        published: true
      };
      
      const operation = isEdit 
        ? supabase
            .from('trading_ideas')
            .update(data)
            .eq('id', initialData?.id)
        : supabase
            .from('trading_ideas')
            .insert(data);
            
      const result = await operation.select('id, slug').single();
      
      if (result.error) {
        console.error(`Error ${isEdit ? "updating" : "submitting"} trading idea:`, result.error);
        toast.error(`Failed to ${isEdit ? "update" : "submit"} trading idea`);
        setIsSubmitting(false);
        return;
      }
      
      console.log(`Trading idea ${isEdit ? "updated" : "submitted"} successfully:`, result.data);
      toast.success(`Trading idea ${isEdit ? "updated" : "shared"} successfully!`);
      
      // Add a longer delay to ensure the database has time to process
      setTimeout(() => {
        navigate(`/trading-ideas/${result.data.slug}`);
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
    youtubeUrl,
    setYoutubeUrl,
    imageUrls,
    setImageUrls,
    isSubmitting,
    handleSubmit
  };
}
