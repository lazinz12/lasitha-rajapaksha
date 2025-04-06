
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
import YouTubeEmbed from "@/components/trading/YouTubeEmbed";
import { useTradingIdea } from "@/hooks/use-trading-idea";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

const TradingIdeaDetail = () => {
  const { slug } = useParams();
  const commentSectionRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Debug the slug
  useEffect(() => {
    console.log("Current slug param:", slug);
  }, [slug]);

  const { idea, isLoading, error, likesCount } = useTradingIdea(slug);

  useEffect(() => {
    if (error) {
      console.error("Error loading trading idea:", error);
      toast.error("Failed to load trading idea");
    }
  }, [error]);

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

  // Format description with proper paragraph spacing
  const formattedDescription = idea.description
    .split('\n')
    .filter(para => para.trim() !== ''); // Remove empty paragraphs

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{idea.title} - Trading Idea | Lasitha Rajapaksha</title>
        <meta name="description" content={idea.description.substring(0, 160)} />
        <meta name="keywords" content={`forex trading, ${idea.title.toLowerCase()}, market analysis, trading strategy, lasitha rajapaksha`} />
        <meta property="og:title" content={`${idea.title} - Trading Idea | Lasitha Rajapaksha`} />
        <meta property="og:description" content={idea.description.substring(0, 160)} />
        <meta property="og:image" content={idea.image_url} />
        <meta property="og:type" content="article" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`/trading-ideas/${slug}`} />
      </Helmet>

      <Header />
      <div className={`container mx-auto ${isMobile ? 'py-4 px-2' : 'py-8'}`}>
        <Card>
          <CardHeader className={isMobile ? 'p-4' : ''}>
            <CardTitle className={isMobile ? 'text-2xl' : 'text-4xl'}>{idea.title}</CardTitle>
            <CardDescription>
              By {idea.profiles?.email || "Anonymous"} on {format(new Date(idea.created_at), "MMM dd, yyyy")}
            </CardDescription>
          </CardHeader>
          
          <TradingIdeaImages 
            mainImage={idea.image_url}
            title={idea.title}
            additionalImages={idea.additional_images}
          />
          
          {idea.youtube_url && (
            <div className={isMobile ? 'px-2' : 'px-6'}>
              <YouTubeEmbed url={idea.youtube_url} title={idea.title} />
            </div>
          )}
          
          <CardContent className={isMobile ? 'p-4' : ''}>
            <div className="prose max-w-none mb-6">
              {formattedDescription.map((paragraph, index) => (
                <p key={index} className={`${isMobile ? 'text-sm' : ''} mb-4`}>{paragraph}</p>
              ))}
            </div>
            
            <TradingIdeaActions 
              initialLikes={likesCount} 
              onCommentClick={scrollToComments} 
            />
            
            <div ref={commentSectionRef} className="mt-6">
              <TradingIdeaComments />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingIdeaDetail;
