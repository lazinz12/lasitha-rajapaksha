
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
        
        // First try - direct query
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
            }
          }
          
          return data as TradingIdea;
        }
        
        // If we get here, no data was found on the first try
        console.log("No trading idea found on first try. Waiting and retrying...");
        
        // Introduce a delay and retry
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Second attempt
        const { data: secondTryData, error: secondTryError } = await supabase
          .from('trading_ideas')
          .select('*')
          .eq('slug', slug)
          .maybeSingle();
          
        if (secondTryError) {
          console.error("Error in second query attempt:", secondTryError);
          throw secondTryError;
        }
        
        if (secondTryData) {
          console.log("SUCCESS on second try - Trading idea found:", secondTryData);
          setLikesCount(secondTryData.likes || 0);
          return secondTryData as TradingIdea;
        }
        
        console.error("No trading idea found with slug after retries:", slug);
        return null;
      } catch (fetchError) {
        console.error("Error while fetching trading idea:", fetchError);
        throw fetchError;
      }
    },
    enabled: !!slug,
    retry: 3,
    retryDelay: attempt => Math.min(attempt > 1 ? 2000 : 1000, 5000),
    staleTime: 30000, // Keep data fresh for 30 seconds
  });

  return { 
    idea: data, 
    isLoading, 
    error, 
    likesCount 
  };
};
