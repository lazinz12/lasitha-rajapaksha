
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Admin from "@/pages/Admin";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import EditedPhotos from "@/pages/EditedPhotos";
import PhotoGallery from "@/pages/PhotoGallery";
import MetadataRemover from "@/pages/MetadataRemover";
import TradingIdeas from "@/pages/TradingIdeas";
import TradingIdeaCreate from "@/pages/TradingIdeaCreate";
import TradingIdeaDetail from "@/pages/TradingIdeaDetail";
import TradingIdeaEdit from "@/pages/TradingIdeaEdit";
import TextBehindImage from "@/pages/TextBehindImage";
import FounderCEO from "@/pages/FounderCEO";
import CompressGo from "@/pages/CompressGo";
import CaseConverter from "@/pages/CaseConverter";
import SeoChecker from "@/pages/SeoChecker";
import BacklinkChecker from "@/pages/BacklinkChecker";
import BackgroundRemover from "@/pages/BackgroundRemover";
import Tools from "@/pages/Tools";
import QrGenerator from "@/pages/QrGenerator";
import PasswordGenerator from "@/pages/PasswordGenerator";
import ColorConverter from "@/pages/ColorConverter";
import ImageConverter from "@/pages/ImageConverter";
import ImageCropper from "@/pages/ImageCropper";
import Base64Tool from "@/pages/Base64Tool";
import UrlEncoder from "@/pages/UrlEncoder";
import JsonFormatter from "@/pages/JsonFormatter";
import RegexTester from "@/pages/RegexTester";
import LoremIpsum from "@/pages/LoremIpsum";
import WordCounter from "@/pages/WordCounter";
import PercentageCalc from "@/pages/PercentageCalc";
import UnitConverter from "@/pages/UnitConverter";
import RandomNumber from "@/pages/RandomNumber";
import ColorPalette from "@/pages/ColorPalette";
import GradientMaker from "@/pages/GradientMaker";
import ExifViewer from "@/pages/ExifViewer";
import ImageCompressor from "@/pages/ImageCompressor";
import HtmlEntity from "@/pages/HtmlEntity";
import MarkdownPreview from "@/pages/MarkdownPreview";
import BaseConverter from "@/pages/BaseConverter";
import StringEncoder from "@/pages/StringEncoder";
import Calculator from "@/pages/Calculator";
import HashGenerator from "@/pages/HashGenerator";
import Services from "@/pages/Services";
import { SeasonalEffects } from "@/components/SeasonalEffects";
import { LiveChatWidget } from "@/components/LiveChatWidget";

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
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
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
              <Route path="/photo-gallery" element={<PhotoGallery />} />
              <Route path="/trading-ideas" element={<TradingIdeas />} />
              <Route path="/trading-ideas/new" element={<TradingIdeaCreate />} />
              <Route path="/trading-ideas/:slug" element={<TradingIdeaDetail />} />
              <Route path="/trading-ideas/edit/:slug" element={<TradingIdeaEdit />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/tools/text-behind-image" element={<TextBehindImage />} />
              <Route path="/tools/metadata-remover" element={<MetadataRemover />} />
              <Route path="/tools/case-converter" element={<CaseConverter />} />
              <Route path="/tools/seo-checker" element={<SeoChecker />} />
              <Route path="/tools/backlink-checker" element={<BacklinkChecker />} />
              <Route path="/tools/background-remover" element={<BackgroundRemover />} />
              <Route path="/tools/qr-generator" element={<QrGenerator />} />
              <Route path="/tools/password-generator" element={<PasswordGenerator />} />
              <Route path="/tools/color-converter" element={<ColorConverter />} />
              <Route path="/tools/image-converter" element={<ImageConverter />} />
              <Route path="/tools/image-cropper" element={<ImageCropper />} />
              <Route path="/tools/base64" element={<Base64Tool />} />
              <Route path="/tools/url-encoder" element={<UrlEncoder />} />
              <Route path="/tools/json-formatter" element={<JsonFormatter />} />
              <Route path="/tools/regex-tester" element={<RegexTester />} />
              <Route path="/tools/hash-generator" element={<HashGenerator />} />
              <Route path="/tools/lorem-ipsum" element={<LoremIpsum />} />
              <Route path="/tools/word-counter" element={<WordCounter />} />
              <Route path="/tools/percentage-calculator" element={<PercentageCalc />} />
              <Route path="/tools/unit-converter" element={<UnitConverter />} />
              <Route path="/tools/random-number" element={<RandomNumber />} />
              <Route path="/tools/color-palette" element={<ColorPalette />} />
              <Route path="/tools/gradient-maker" element={<GradientMaker />} />
              <Route path="/tools/exif-viewer" element={<ExifViewer />} />
              <Route path="/tools/image-compressor" element={<ImageCompressor />} />
              <Route path="/tools/html-entity" element={<HtmlEntity />} />
              <Route path="/tools/markdown-preview" element={<MarkdownPreview />} />
              <Route path="/tools/base-converter" element={<BaseConverter />} />
              <Route path="/tools/string-encoder" element={<StringEncoder />} />
              <Route path="/tools/calculator" element={<Calculator />} />
              <Route path="/founder" element={<FounderCEO />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects/compressgo" element={<CompressGo />} />
            </Routes>
            <LiveChatWidget />
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
