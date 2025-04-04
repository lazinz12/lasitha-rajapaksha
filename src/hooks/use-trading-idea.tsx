
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TradingIdea {
  id: string;
  title: string;
  description: string;
  image_url: string;
  additional_images?: string[] | null;
  slug: string;
  created_at: string;
  likes: number;
  comments: number;
  youtube_url?: string | null;
  author_id: string;
  profiles?: { email: string } | null;
}

export function useTradingIdea(slug: string | undefined) {
  const [idea, setIdea] = useState<TradingIdea | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchTradingIdea = async () => {
      if (!slug) {
        setIsLoading(false);
        return;
      }
      
      try {
        console.log("Fetching trading idea with slug:", slug);
        
        // Fetch trading idea
        const { data, error } = await supabase
          .from("trading_ideas")
          .select(`
            id, 
            title, 
            description, 
            image_url, 
            additional_images, 
            slug, 
            created_at, 
            likes, 
            comments,
            youtube_url,
            author_id
          `)
          .eq("slug", slug)
          .single();

        if (error) {
          console.error("Error fetching trading idea:", error);
          setError(error);
          setIsLoading(false);
          return;
        }

        if (!data) {
          console.log("No trading idea found with slug:", slug);
          setIsLoading(false);
          return;
        }

        // Create a complete trading idea object with profiles property
        const tradingIdeaWithProfiles: TradingIdea = {
          ...data,
          profiles: null // Initialize profiles as null
        };

        // Fetch author profile if author_id exists
        if (data.author_id) {
          const { data: authorData, error: authorError } = await supabase
            .from("profiles")
            .select("email")
            .eq("id", data.author_id)
            .single();

          if (!authorError && authorData) {
            tradingIdeaWithProfiles.profiles = authorData;
          }
        }

        console.log("Trading idea data:", tradingIdeaWithProfiles);
        setIdea(tradingIdeaWithProfiles);
        setLikesCount(tradingIdeaWithProfiles.likes || 0);
        setIsLoading(false);
      } catch (err) {
        console.error("Error in useTradingIdea hook:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
        setIsLoading(false);
      }
    };

    fetchTradingIdea();
  }, [slug]);

  return { idea, isLoading, error, likesCount };
}
