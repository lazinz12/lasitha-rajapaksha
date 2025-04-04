
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import TradingIdeaForm from "@/components/trading/TradingIdeaForm";

const TradingIdeaCreate = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/login");
        toast.error("You must be logged in to create trading ideas");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        navigate("/trading-ideas");
        toast.error("Only admins can create trading ideas");
        return;
      }

      setIsAdmin(true);
      setIsLoading(false);
    };

    checkAdmin();
  }, [navigate]);

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
        <TradingIdeaForm />
      </div>
    </div>
  );
};

export default TradingIdeaCreate;
