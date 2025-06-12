
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import EditedPhotos from "@/pages/EditedPhotos";
import MetadataRemover from "@/pages/MetadataRemover";
import TradingIdeas from "@/pages/TradingIdeas";
import TradingIdeaCreate from "@/pages/TradingIdeaCreate";
import TradingIdeaDetail from "@/pages/TradingIdeaDetail";
import TradingIdeaEdit from "@/pages/TradingIdeaEdit";
import TextBehindImage from "@/pages/TextBehindImage";
import FounderCEO from "@/pages/FounderCEO";
import CompressGo from "@/pages/CompressGo";
import { SeasonalEffects } from "@/components/SeasonalEffects";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <BrowserRouter>
            <SeasonalEffects />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/edited-photos" element={<EditedPhotos />} />
              <Route path="/trading-ideas" element={<TradingIdeas />} />
              <Route path="/trading-ideas/new" element={<TradingIdeaCreate />} />
              <Route path="/trading-ideas/:slug" element={<TradingIdeaDetail />} />
              <Route path="/trading-ideas/edit/:slug" element={<TradingIdeaEdit />} />
              <Route path="/tools/text-behind-image" element={<TextBehindImage />} />
              <Route path="/tools/metadata-remover" element={<MetadataRemover />} />
              <Route path="/founder" element={<FounderCEO />} />
              <Route path="/projects/compressgo" element={<CompressGo />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </React.StrictMode>
  );
}

export default App;
