
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import TradingIdeaForm from "@/components/trading/TradingIdeaForm";

const TradingIdeaEdit = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [tradingIdea, setTradingIdea] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        toast.error("You must be logged in to edit trading ideas");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        navigate("/trading-ideas");
        toast.error("Only admins can edit trading ideas");
        return;
      }

      setIsAdmin(true);
      
      // Fetch the trading idea
      if (slug) {
        const { data, error } = await supabase
          .from("trading_ideas")
          .select("*")
          .eq("slug", slug)
          .single();
          
        if (error) {
          console.error("Error fetching trading idea:", error);
          toast.error("Failed to load trading idea");
          navigate("/trading-ideas");
          return;
        }
        
        if (!data) {
          toast.error("Trading idea not found");
          navigate("/trading-ideas");
          return;
        }
        
        setTradingIdea(data);
      }
      
      setIsLoading(false);
    };

    checkAdmin();
  }, [navigate, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto py-8 flex items-center justify-center">
          <div className="w-full max-w-3xl h-64 bg-gray-100 animate-pulse rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
        <TradingIdeaForm initialData={tradingIdea} isEdit={true} />
      </div>
    </div>
  );
};

export default TradingIdeaEdit;
