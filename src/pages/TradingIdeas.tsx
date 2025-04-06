
import Header from "@/components/Header";
import TradingIdeaList from "@/components/trading/TradingIdeaList";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet";

const TradingIdeas = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Trading Ideas - Lasitha Rajapaksha | Forex Trading Insights</title>
        <meta name="description" content="Discover valuable forex trading ideas, insights, and analysis by Lasitha Rajapaksha. Learn strategies for successful market trading." />
        <meta name="keywords" content="forex trading, trading ideas, market analysis, lasitha rajapaksha, trading strategies" />
        <meta property="og:title" content="Trading Ideas - Lasitha Rajapaksha" />
        <meta property="og:description" content="Discover valuable forex trading ideas, insights, and analysis by Lasitha Rajapaksha." />
        <meta property="og:type" content="website" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="/trading-ideas" />
      </Helmet>
      
      <Header />
      <div className={`container mx-auto ${isMobile ? 'py-4 px-3' : 'py-8'}`}>
        <Card className="bg-white shadow-sm border-gray-100">
          <CardContent className={`${isMobile ? 'p-3' : 'p-6'}`}>
            <TradingIdeaList />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingIdeas;
