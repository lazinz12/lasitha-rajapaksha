
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Heart, MessageSquare, Share2, Bookmark, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface TradingIdea {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  likes: number;
  comments?: number;
  profiles?: { email: string } | null;
  slug?: string;
}

const TradingIdeaDetail = () => {
  const { slug } = useParams();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");

  const { data: idea, isLoading } = useQuery({
    queryKey: ["trading-idea", slug],
    queryFn: async () => {
      try {
        // Try to use RPC first
        const { data, error } = await (supabase.rpc('get_trading_idea_by_slug', { 
          slug_param: slug || '' 
        }) as any);
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setLikesCount(data.likes || 0);
          return data as TradingIdea;
        }
        
        throw new Error("Idea not found");
      } catch (rpcError) {
        console.log("Falling back to manual query", rpcError);
        // Fallback to manual query if RPC isn't available yet
        const { data: manualData, error: manualError } = await supabase
          .from('trading_ideas')
          .select('*, profiles(email)')
          .eq('slug', slug as string)
          .eq('published', true)
          .maybeSingle();
        
        if (manualError) throw manualError;
        if (manualData) {
          setLikesCount(manualData.likes || 0);
          return manualData as unknown as TradingIdea;
        }
        
        return null;
      }
    },
  });

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    toast.success(liked ? "Removed like" : "Added like");
    // In a real app, you would update this in the database
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Removed from bookmarks" : "Added to bookmarks");
    // In a real app, you would update this in the database
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  const handleAddComment = () => {
    if (!comment.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }
    
    toast.success("Comment added successfully");
    setComment("");
    // In a real app, you would add this to the database
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded mb-4 w-1/3"></div>
            <div className="h-6 bg-gray-200 rounded mb-8 w-1/4"></div>
            <div className="h-96 bg-gray-200 rounded mb-8"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-2/3"></div>
            <div className="h-6 bg-gray-200 rounded mb-4 w-3/4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!idea) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <h1 className="text-4xl font-bold mb-8">Trading Idea Not Found</h1>
          <p>The trading idea you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl">{idea.title}</CardTitle>
            <CardDescription>
              By {idea.profiles?.email || "Anonymous"} on {format(new Date(idea.created_at), "MMM dd, yyyy")}
            </CardDescription>
          </CardHeader>
          <div className="px-6">
            <img
              src={idea.image_url}
              alt={idea.title}
              className="w-full h-auto rounded-md mb-6"
            />
          </div>
          <CardContent>
            <div className="prose max-w-none mb-8">
              {idea.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <div className="flex justify-between items-center border-t pt-4">
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  className={`gap-1 ${liked ? 'text-red-500' : ''}`}
                  onClick={handleLike}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  {likesCount > 0 ? likesCount : ""} Like
                </Button>
                
                <Button variant="ghost" onClick={() => document.getElementById('comment-section')?.focus()}>
                  <MessageSquare className="h-5 w-5 mr-1" />
                  Comment
                </Button>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="icon" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(idea.title)}`, '_blank')}>
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}>
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={handleShare}>
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleBookmark}
                  className={bookmarked ? 'text-blue-500' : ''}
                >
                  <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
                </Button>
              </div>
            </div>
            
            <div className="mt-10" id="comments">
              <h3 className="text-xl font-semibold mb-6">Comments</h3>
              
              <div className="space-y-6 mb-8">
                {/* This would be populated with actual comments in a real app */}
                <div className="bg-muted/40 p-4 rounded-md">
                  <p className="text-center text-muted-foreground">No comments yet. Be the first to share your thoughts!</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Add a comment</h4>
                <Textarea
                  id="comment-section"
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-end">
                  <Button onClick={handleAddComment}>Post Comment</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingIdeaDetail;
