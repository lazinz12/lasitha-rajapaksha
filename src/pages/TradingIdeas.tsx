
import Header from "@/components/Header";
import TradingIdeaList from "@/components/trading/TradingIdeaList";

const TradingIdeas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold">Trading Ideas</h1>
        </div>
        <TradingIdeaList />
      </div>
    </div>
  );
};

export default TradingIdeas;
