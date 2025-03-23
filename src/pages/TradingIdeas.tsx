
import Header from "@/components/Header";
import TradingIdeaList from "@/components/trading/TradingIdeaList";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";

const TradingIdeas = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Trading Ideas</h1>
          <Link to="/trading-ideas/new">
            <Button className="gap-1">
              <PlusCircle className="h-4 w-4" /> Share Idea
            </Button>
          </Link>
        </div>
        <TradingIdeaList />
      </div>
    </div>
  );
};

export default TradingIdeas;
