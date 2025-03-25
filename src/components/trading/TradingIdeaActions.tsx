
import { useState } from "react";
import { Heart, MessageSquare, Share2, Bookmark, Twitter, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TradingIdeaActionsProps {
  initialLikes: number;
  onCommentClick: () => void;
}

const TradingIdeaActions = ({ initialLikes, onCommentClick }: TradingIdeaActionsProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [bookmarked, setBookmarked] = useState(false);

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
        
        <Button variant="ghost" onClick={onCommentClick}>
          <MessageSquare className="h-5 w-5 mr-1" />
          Comment
        </Button>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent("Check out this trading idea")}`, '_blank')}
        >
          <Twitter className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
        >
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
  );
};

export default TradingIdeaActions;
