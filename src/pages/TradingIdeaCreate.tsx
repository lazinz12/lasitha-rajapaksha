
import Header from "@/components/Header";
import TradingIdeaForm from "@/components/trading/TradingIdeaForm";

const TradingIdeaCreate = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <TradingIdeaForm />
      </div>
    </div>
  );
};

export default TradingIdeaCreate;
