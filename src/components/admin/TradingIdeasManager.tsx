
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Edit, Trash, Eye } from "lucide-react";

interface TradingIdea {
  id: string;
  title: string;
  slug: string;
  created_at: string;
  published: boolean;
}

const TradingIdeasManager = () => {
  const [ideas, setIdeas] = useState<TradingIdea[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchTradingIdeas = async () => {
    try {
      const { data, error } = await supabase
        .from("trading_ideas")
        .select("id, title, slug, created_at, published")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching trading ideas:", error);
        toast.error("Failed to load trading ideas");
        return;
      }

      setIdeas(data || []);
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTradingIdeas();
  }, []);

  const handleCreateIdea = () => {
    navigate("/trading-ideas/new");
  };

  const handleEditIdea = (slug: string) => {
    navigate(`/trading-ideas/edit/${slug}`);
  };

  const handleDeleteIdea = async (id: string) => {
    if (!confirm("Are you sure you want to delete this trading idea?")) {
      return;
    }

    try {
      const { error } = await supabase
        .from("trading_ideas")
        .delete()
        .eq("id", id);

      if (error) {
        console.error("Error deleting trading idea:", error);
        toast.error("Failed to delete trading idea");
        return;
      }

      toast.success("Trading idea deleted successfully");
      fetchTradingIdeas();
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
    }
  };

  const handleViewIdea = (slug: string) => {
    window.open(`/trading-ideas/${slug}`, "_blank");
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Trading Ideas</CardTitle>
        <Button onClick={handleCreateIdea} className="gap-1">
          <PlusCircle className="h-4 w-4" /> Create New
        </Button>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-16 rounded-md bg-gray-100 animate-pulse"></div>
            ))}
          </div>
        ) : ideas.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No trading ideas found</p>
            <Button 
              variant="outline" 
              className="mt-4 gap-1"
              onClick={handleCreateIdea}
            >
              <PlusCircle className="h-4 w-4" /> Create Your First Trading Idea
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {ideas.map((idea) => (
              <div 
                key={idea.id} 
                className="border rounded-md p-4 flex justify-between items-center"
              >
                <div>
                  <h3 className="font-medium">{idea.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {new Date(idea.created_at).toLocaleDateString()}
                    </span>
                    <span 
                      className={`px-2 py-0.5 rounded-full text-xs ${
                        idea.published 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {idea.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleViewIdea(idea.slug)}
                    title="View"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleEditIdea(idea.slug)}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleDeleteIdea(idea.id)}
                    title="Delete"
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TradingIdeasManager;
