
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, MessageSquare, Share2, Bookmark, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";

interface TradingIdeaCardProps {
  idea: {
    id: string;
    title: string;
    description: string;
    image_url: string;
    created_at: string;
    likes: number;
    comments: number;
    slug: string;
    author?: {
      email: string;
    };
  };
}

const TradingIdeaCard = ({ idea }: TradingIdeaCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(idea.likes || 0);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
    setLikesCount(liked ? likesCount - 1 : likesCount + 1);
    // In a real app, you would update this in the database
  };

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
    toast.success(bookmarked ? "Removed from bookmarks" : "Added to bookmarks");
    // In a real app, you would update this in the database
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/trading-ideas/${idea.slug}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardHeader className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{idea.title}</CardTitle>
            <CardDescription>
              {idea.author ? `By ${idea.author.email} · ` : ""}
              {format(new Date(idea.created_at), "MMM dd, yyyy")}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleShare}>Copy Link</DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(`${window.location.origin}/trading-ideas/${idea.slug}`)}&text=${encodeURIComponent(idea.title)}`, '_blank')}>
                Share on Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`${window.location.origin}/trading-ideas/${idea.slug}`)}`, '_blank')}>
                Share on Facebook
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => window.open(`https://t.me/share/url?url=${encodeURIComponent(`${window.location.origin}/trading-ideas/${idea.slug}`)}&text=${encodeURIComponent(idea.title)}`, '_blank')}>
                Share on Telegram
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <Link to={`/trading-ideas/${idea.slug}`}>
        <div className="relative aspect-[16/9] bg-gray-100 overflow-hidden">
          <img
            src={idea.image_url}
            alt={idea.title}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <p className="line-clamp-3">{idea.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`gap-1 ${liked ? 'text-red-500' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
            {likesCount > 0 ? likesCount : ""}
          </Button>
          <Link to={`/trading-ideas/${idea.slug}#comments`}>
            <Button variant="ghost" size="sm" className="gap-1">
              <MessageSquare className="h-4 w-4" />
              {idea.comments > 0 ? idea.comments : ""}
            </Button>
          </Link>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBookmark}
            className={bookmarked ? 'text-blue-500' : ''}
          >
            <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TradingIdeaCard;
