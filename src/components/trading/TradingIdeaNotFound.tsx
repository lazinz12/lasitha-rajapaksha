
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TradingIdeaNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="p-8 text-center">
      <h1 className="text-2xl font-bold mb-4">Trading Idea Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The trading idea you're looking for doesn't exist or has been removed.
      </p>
      <Button onClick={() => navigate("/trading-ideas")}>Return to Trading Ideas</Button>
    </Card>
  );
};

export default TradingIdeaNotFound;
