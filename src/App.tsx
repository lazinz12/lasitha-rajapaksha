import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import CaseConverter from "@/pages/CaseConverter";
import BacklinkChecker from "@/pages/BacklinkChecker";
import SeoChecker from "@/pages/SeoChecker";
import ImageConverter from "@/pages/ImageConverter";
import ColorConverter from "@/pages/ColorConverter";
import QrGenerator from "@/pages/QrGenerator";
import PasswordGenerator from "@/pages/PasswordGenerator";
import WordCounter from "@/pages/WordCounter";
import LoremIpsum from "@/pages/LoremIpsum";
import StringEncoder from "@/pages/StringEncoder";
import MarkdownPreview from "@/pages/MarkdownPreview";
import JsonFormatter from "@/pages/JsonFormatter";
import Base64Tool from "@/pages/Base64Tool";
import UrlEncoder from "@/pages/UrlEncoder";
import HtmlEntity from "@/pages/HtmlEntity";
import RegexTester from "@/pages/RegexTester";
import UnitConverter from "@/pages/UnitConverter";
import Calculator from "@/pages/Calculator";
import BaseConverter from "@/pages/BaseConverter";
import PercentageCalc from "@/pages/PercentageCalc";
import RandomNumber from "@/pages/RandomNumber";
import ImageCompressor from "@/pages/ImageCompressor";
import ImageCropper from "@/pages/ImageCropper";
import ColorPalette from "@/pages/ColorPalette";
import GradientMaker from "@/pages/GradientMaker";
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
            
            {/* Text Tools */}
            <Route path="/tools/case-converter" element={<CaseConverter />} />
            <Route path="/tools/word-counter" element={<WordCounter />} />
            <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/tools/string-encoder" element={<StringEncoder />} />
            <Route path="/tools/markdown-preview" element={<MarkdownPreview />} />
            
            {/* Developer Tools */}
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/base64" element={<Base64Tool />} />
            <Route path="/tools/url-encoder" element={<UrlEncoder />} />
            <Route path="/tools/html-entity" element={<HtmlEntity />} />
            <Route path="/tools/regex-tester" element={<RegexTester />} />
            
            {/* Math & Numbers */}
            <Route path="/tools/unit-converter" element={<UnitConverter />} />
            <Route path="/tools/calculator" element={<Calculator />} />
            <Route path="/tools/base-converter" element={<BaseConverter />} />
            <Route path="/tools/percentage-calc" element={<PercentageCalc />} />
            <Route path="/tools/random-number" element={<RandomNumber />} />
            
            {/* SEO Tools */}
            <Route path="/tools/backlink-checker" element={<BacklinkChecker />} />
            <Route path="/tools/seo-checker" element={<SeoChecker />} />
            
            {/* Image Tools */}
            <Route path="/tools/image-converter" element={<ImageConverter />} />
            <Route path="/tools/image-compressor" element={<ImageCompressor />} />
            <Route path="/tools/image-cropper" element={<ImageCropper />} />
            
            {/* Color Tools */}
            <Route path="/tools/color-converter" element={<ColorConverter />} />
            <Route path="/tools/color-palette" element={<ColorPalette />} />
            <Route path="/tools/gradient-maker" element={<GradientMaker />} />
            
            {/* Other Tools */}
            <Route path="/tools/qr-generator" element={<QrGenerator />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
