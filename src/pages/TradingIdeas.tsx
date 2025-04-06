
import Header from "@/components/Header";
import TradingIdeaList from "@/components/trading/TradingIdeaList";
import { Card, CardContent } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const TradingIdeas = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="min-h-screen bg-gray-50">
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
