
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
  profiles?: { email: string } | null;
}

const TradingIdeaList = () => {
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  const { data: ideas, isLoading } = useQuery({
    queryKey: ["trading-ideas", sortBy],
    queryFn: async () => {
      // Use raw query to fetch trading ideas
      let query = supabase.rpc('select_trading_ideas');

      if (sortBy === "latest") {
        query = supabase.rpc('select_trading_ideas_by_date');
      } else if (sortBy === "most-liked") {
        query = supabase.rpc('select_trading_ideas_by_likes');
      } else if (sortBy === "trending") {
        query = supabase.rpc('select_trading_ideas_trending');
      }

      // Fallback to manual query if RPC isn't available yet
      if (!query) {
        query = supabase.from('trading_ideas')
          .select('*, profiles(email)')
          .eq('published', true);

        if (sortBy === "latest") {
          query = query.order("created_at", { ascending: false });
        } else if (sortBy === "most-liked") {
          query = query.order("likes", { ascending: false });
        } else if (sortBy === "trending") {
          // For trending, we're just sorting by recency for now
          query = query.order("created_at", { ascending: false });
        }
      }

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching trading ideas:", error);
        throw error;
      }
      
      return data as TradingIdea[];
    },
  });

  if (isLoading) {
    return (
      <div className="container py-8 grid grid-cols-1 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-lg bg-gray-100 animate-pulse h-64"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="container py-8">
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
        {ideas?.length === 0 && (
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
