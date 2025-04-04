
import Header from "@/components/Header";
import TradingIdeaList from "@/components/trading/TradingIdeaList";

const TradingIdeas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <TradingIdeaList />
      </div>
    </div>
  );
};

export default TradingIdeas;
