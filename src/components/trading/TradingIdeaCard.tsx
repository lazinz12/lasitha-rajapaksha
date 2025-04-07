
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, MessageSquare, Image } from "lucide-react";
import { format } from "date-fns";

interface TradingIdea {
  id: string;
  title: string;
  description: string;
  image_url: string;
  created_at: string;
  likes: number;
  comments: number;
  slug: string;
  additional_images?: string[] | null;
  profiles?: { email: string } | null;
}

interface TradingIdeaCardProps {
  idea: TradingIdea;
}

const TradingIdeaCard = ({ idea }: TradingIdeaCardProps) => {
  const truncateDescription = (text: string, maxLength: number = 120) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const authorEmail = idea.profiles?.email || "Anonymous";
  const formattedDate = format(new Date(idea.created_at), "MMM dd, yyyy");
  const hasAdditionalImages = idea.additional_images && idea.additional_images.length > 0;

  return (
    <Link to={`/trading-ideas/${idea.slug}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          <img
            src={idea.image_url}
            alt={idea.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
          {hasAdditionalImages && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white rounded-full p-1.5 flex items-center">
              <Image className="h-4 w-4 mr-1" />
              <span className="text-xs">{idea.additional_images?.length + 1}</span>
            </div>
          )}
        </div>
        <CardContent className="pt-4 flex-grow">
          <h3 className="text-xl font-semibold mb-2 line-clamp-2">{idea.title}</h3>
          <div className="text-sm text-muted-foreground mb-3">
            By {authorEmail} • {formattedDate}
          </div>
          <p className="text-muted-foreground">
            {truncateDescription(idea.description)}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between py-3 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Heart className="h-4 w-4" />
            <span>{idea.likes}</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>{idea.comments}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TradingIdeaCard;
