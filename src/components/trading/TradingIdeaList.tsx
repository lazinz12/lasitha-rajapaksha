
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import TradingIdeaCard from "./TradingIdeaCard";
import { Button } from "@/components/ui/button";
import { TrendingUp, Star, Clock } from "lucide-react";
import { useState } from "react";

type SortOption = "trending" | "latest" | "most-liked";

interface TradingIdea {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  likes: number;
  comments: number;
  slug: string;
  // Make the profiles optional since we're having issues with the join
  profiles?: { email: string } | null;
  author_id?: string;
}

const TradingIdeaList = () => {
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const { data: ideas, isLoading } = useQuery({
    queryKey: ["trading-ideas", sortBy],
    queryFn: async () => {
      console.log("Fetching trading ideas with sort option:", sortBy);
      
      try {
        let query = supabase
          .from('trading_ideas')
          .select('*')
          .eq('published', true);
          
        if (sortBy === "latest") {
          query = query.order("created_at", { ascending: false });
        } else if (sortBy === "most-liked") {
          query = query.order("likes", { ascending: false });
        } else if (sortBy === "trending") {
          // For trending, we can use created_at as a simple proxy
          // In a real app, you might want a more sophisticated algorithm
          query = query.order("created_at", { ascending: false });
        }
        
        const { data, error } = await query;
            
        if (error) {
          console.error("Error fetching trading ideas:", error);
          throw error;
        }
        
        // For each trading idea, try to get the author's email
        const ideasWithAuthorEmails = await Promise.all(
          (data || []).map(async (idea) => {
            if (idea.author_id) {
              try {
                const { data: profileData } = await supabase
                  .from('profiles')
                  .select('email')
                  .eq('id', idea.author_id)
                  .single();
                  
                return {
                  ...idea,
                  profiles: profileData || { email: "Anonymous" }
                };
              } catch (err) {
                console.log("Couldn't fetch profile for author:", idea.author_id);
                return {
                  ...idea,
                  profiles: { email: "Anonymous" }
                };
              }
            }
            
            return {
              ...idea,
              profiles: { email: "Anonymous" }
            };
          })
        );
        
        console.log("Fetched trading ideas:", ideasWithAuthorEmails);
        return ideasWithAuthorEmails as TradingIdea[];
      } catch (error) {
        console.error("Error fetching trading ideas:", error);
        throw error;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="py-8 grid grid-cols-1 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-64"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Trading Ideas</h1>
        <div className="flex gap-2">
          <Button
            variant={sortBy === "trending" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("trending")}
            className="gap-1"
          >
            <TrendingUp className="h-4 w-4" /> Trending
          </Button>
          <Button
            variant={sortBy === "latest" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("latest")}
            className="gap-1"
          >
            <Clock className="h-4 w-4" /> Latest
          </Button>
          <Button
            variant={sortBy === "most-liked" ? "default" : "outline"}
            size="sm"
            onClick={() => setSortBy("most-liked")}
            className="gap-1"
          >
            <Star className="h-4 w-4" /> Most Liked
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ideas?.map((idea) => (
          <TradingIdeaCard key={idea.id} idea={idea} />
        ))}
        {(!ideas || ideas.length === 0) && (
          <div className="col-span-full text-center py-12">
            <TrendingUp className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No trading ideas yet</h3>
            <p className="text-gray-500">Be the first to share your trading insights!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingIdeaList;
