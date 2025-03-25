
import { useParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TradingIdeaLoading from "@/components/trading/TradingIdeaLoading";
import TradingIdeaNotFound from "@/components/trading/TradingIdeaNotFound";
import TradingIdeaActions from "@/components/trading/TradingIdeaActions";
import TradingIdeaComments from "@/components/trading/TradingIdeaComments";
import TradingIdeaImages from "@/components/trading/TradingIdeaImages";
import { useTradingIdea } from "@/hooks/use-trading-idea";

const TradingIdeaDetail = () => {
  const { slug } = useParams();
  const commentSectionRef = useRef<HTMLDivElement>(null);
  
  // Debug the slug
  useEffect(() => {
    console.log("Current slug param:", slug);
  }, [slug]);

  const { idea, isLoading, error, likesCount } = useTradingIdea(slug);

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8">
          <TradingIdeaLoading />
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
          <TradingIdeaNotFound />
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
          
          <TradingIdeaImages 
            mainImage={idea.image_url}
            title={idea.title}
            additionalImages={idea.additional_images}
          />
          
          <CardContent>
            <div className="prose max-w-none mb-8">
              {idea.description.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            
            <TradingIdeaActions 
              initialLikes={likesCount} 
              onCommentClick={scrollToComments} 
            />
            
            <div ref={commentSectionRef}>
              <TradingIdeaComments />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingIdeaDetail;
