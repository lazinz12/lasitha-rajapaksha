
import { useState } from "react";
import { Heart, MessageSquare, Share2, Bookmark, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";

interface TradingIdeaActionsProps {
  initialLikes: number;
  onCommentClick: () => void;
}

const TradingIdeaActions = ({ initialLikes, onCommentClick }: TradingIdeaActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [bookmarked, setBookmarked] = useState(false);
  const isMobile = useIsMobile();

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

  return (
    <div className={`border-t pt-4 ${isMobile ? 'flex flex-col gap-3' : 'flex justify-between items-center'}`}>
      <div className={`flex ${isMobile ? 'justify-between w-full' : 'space-x-4'}`}>
        <Button
          variant="ghost"
          size={isMobile ? "sm" : "default"}
          className={`gap-1 ${liked ? 'text-red-500' : ''}`}
          onClick={handleLike}
        >
          <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
          {likesCount > 0 ? likesCount : ""} {!isMobile && "Like"}
        </Button>
        
        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "default"}
          onClick={onCommentClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {!isMobile && "Comment"}
        </Button>
      </div>
      
      <div className={`flex ${isMobile ? 'justify-between w-full' : 'space-x-2'}`}>
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Check out this trading idea")}`, '_blank')}
        >
          <Twitter className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8"
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
        >
          <Facebook className="h-3 w-3" />
        </Button>
        <Button 
          variant="outline" 
          size="icon"
          className="h-8 w-8"
          onClick={handleShare}
        >
          <Share2 className="h-3 w-3" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`h-8 w-8 ${bookmarked ? 'text-blue-500' : ''}`}
          onClick={handleBookmark}
        >
          <Bookmark className={`h-3 w-3 ${bookmarked ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </div>
  );
};

export default TradingIdeaActions;
