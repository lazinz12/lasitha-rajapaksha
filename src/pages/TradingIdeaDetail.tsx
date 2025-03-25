
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Heart, MessageSquare, Share2, Bookmark, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

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

const TradingIdeaDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [comment, setComment] = useState("");

  // Debug the slug
  useEffect(() => {
    console.log("Current slug param:", slug);
  }, [slug]);

  const { data: idea, isLoading, error } = useQuery({
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

  if (error) {
    console.error("Error in trading idea detail:", error);
    toast.error("Failed to load trading idea");
  }

  if (!idea) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Trading Idea Not Found</h1>
            <p className="text-muted-foreground mb-6">The trading idea you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/trading-ideas")}>Return to Trading Ideas</Button>
          </Card>
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
            
            {idea.additional_images && idea.additional_images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {idea.additional_images.map((image, index) => (
                  <img 
                    key={index}
                    src={image}
                    alt={`${idea.title} - Additional image ${index + 1}`}
                    className="w-full h-auto rounded-md"
                  />
                ))}
              </div>
            )}
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
