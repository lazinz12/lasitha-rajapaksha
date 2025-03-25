
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface TradingIdea {
  id: string;
  title: string;
  description: string;
  image_url: string;
  additional_images?: string[] | null;
  created_at: string;
  likes: number;
  comments?: number;
  profiles?: { email: string } | null;
  slug?: string;
  author_id?: string | null;
}

export const useTradingIdea = (slug: string | undefined) => {
  const [likesCount, setLikesCount] = useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["trading-idea", slug],
    queryFn: async () => {
      try {
        console.log("Fetching trading idea with slug:", slug);
        
        if (!slug) {
          console.error("No slug provided");
          return null;
        }
        
        // First try - direct query with tracing
        console.log("Attempting direct query with slug:", slug);
        const { data, error } = await supabase
          .from('trading_ideas')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
        
        if (error) {
          console.error("Error in initial query:", error);
          throw error;
        }
        
        if (data) {
          console.log("SUCCESS - Trading idea found:", data);
          setLikesCount(data.likes || 0);
          
          // If author_id exists, get profile data
          if (data.author_id) {
            try {
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('email')
                .eq('id', data.author_id)
                .maybeSingle();
                
              if (profileError) {
                console.error("Error fetching profile data:", profileError);
              } else if (profileData) {
                console.log("Author profile found:", profileData);
                return { ...data, profiles: profileData } as TradingIdea;
              }
            } catch (profileFetchError) {
              console.error("Error in profile fetch:", profileFetchError);
              // Continue with just the idea data if profile fetch fails
            }
          }
          
          return data as TradingIdea;
        }
        
        // If we got here, no data was found
        console.error("No trading idea found with slug:", slug);
        return null;
      } catch (fetchError) {
        console.error("Error while fetching trading idea:", fetchError);
        return null;
      }
    },
    enabled: !!slug,
    retry: 2,
    retryDelay: 1000,
  });

  return { 
    idea: data, 
    isLoading, 
    error, 
    likesCount 
  };
};
