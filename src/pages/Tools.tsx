
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Link as LinkIcon,
  Shield,
  Type,
  Image,
  Palette,
  Calculator,
  Code,
  FileText,
  Hash,
  Scissors,
  Download,
  Upload,
  Zap,
  Settings,
  QrCode,
  Lock,
  Crop,
  Shuffle,
  Binary,
  Percent,
  AlignLeft,
  Globe,
  FileImage,
  Regex,
  Braces,
  RotateCcw,
  Eye,
  Layers,
  PaintBucket,
  Ruler,
  Timer,
  TrendingUp
} from "lucide-react";

const seoTools = [
  {
    title: "SEO Checker",
    description: "Comprehensive SEO analysis tool to check your webpage's optimization, meta tags, keywords, and get actionable insights to improve search rankings.",
    icon: Search,
    path: "/tools/seo-checker",
    category: "SEO",
    featured: true,
  },
  {
    title: "Backlink Checker",
    description: "Analyze your website's backlink profile and discover linking domains to understand your site's authority and improve link building strategy.",
    icon: LinkIcon,
    path: "/tools/backlink-checker",
    category: "SEO",
    featured: true,
  },
  {
    title: "Image Metadata Remover",
    description: "Remove EXIF data and metadata from images to protect privacy, reduce file size, and optimize images for better SEO performance.",
    icon: Shield,
    path: "/tools/metadata-remover",
    category: "SEO",
    featured: true,
  },
  {
    title: "Case Converter",
    description: "Convert text between different cases for SEO-optimized content: title case for headlines, sentence case for descriptions, and more.",
    icon: Type,
    path: "/tools/case-converter",
    category: "SEO",
    featured: true,
  },
];

const otherTools = [
  {
    title: "Background Remover",
    description: "Remove backgrounds from images using AI technology with high precision.",
    icon: Image,
    path: "/tools/background-remover",
    category: "Image",
    featured: false,
  },
  {
    title: "Color Converter",
    description: "Convert colors between different formats: HEX, RGB, HSL, and more.",
    icon: Palette,
    path: "/tools/color-converter",
    category: "Design",
    featured: false,
  },
  {
    title: "Text Behind Image",
    description: "Create stunning text behind image effects for your designs.",
    icon: FileText,
    path: "/tools/text-behind-image",
    category: "Design",
    featured: false,
  },
  {
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, or any content with customizable options.",
    icon: QrCode,
    path: "/tools/qr-generator",
    category: "Utility",
    featured: false,
  },
  {
    title: "Password Generator",
    description: "Create secure passwords with customizable length and character types.",
    icon: Lock,
    path: "/tools/password-generator",
    category: "Security",
    featured: false,
  },
  {
    title: "Image Converter",
    description: "Convert images between different formats: JPG, PNG, WebP, GIF, and more.",
    icon: FileImage,
    path: "/tools/image-converter",
    category: "Image",
    featured: false,
  },
  {
    title: "Image Cropper",
    description: "Crop and resize images with precision for perfect dimensions.",
    icon: Crop,
    path: "/tools/image-cropper",
    category: "Image",
    featured: false,
  },
  {
    title: "Base64 Encoder/Decoder",
    description: "Encode and decode text or files to/from Base64 format.",
    icon: Binary,
    path: "/tools/base64",
    category: "Developer",
    featured: false,
  },
  {
    title: "URL Encoder/Decoder",
    description: "Encode and decode URLs for web-safe transmission.",
    icon: Globe,
    path: "/tools/url-encoder",
    category: "Developer",
    featured: false,
  },
  {
    title: "JSON Formatter",
    description: "Format, validate, and beautify JSON data with syntax highlighting.",
    icon: Braces,
    path: "/tools/json-formatter",
    category: "Developer",
    featured: false,
  },
  {
    title: "RegEx Tester",
    description: "Test and debug regular expressions with real-time matching.",
    icon: Regex,
    path: "/tools/regex-tester",
    category: "Developer",
    featured: false,
  },
  {
    title: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256, and other hash values for text or files.",
    icon: Hash,
    path: "/tools/hash-generator",
    category: "Security",
    featured: false,
  },
  {
    title: "Lorem Ipsum Generator",
    description: "Generate placeholder text for your designs and mockups.",
    icon: FileText,
    path: "/tools/lorem-ipsum",
    category: "Text",
    featured: false,
  },
  {
    title: "Word Counter",
    description: "Count words, characters, paragraphs, and reading time for any text.",
    icon: AlignLeft,
    path: "/tools/word-counter",
    category: "Text",
    featured: false,
  },
  {
    title: "Percentage Calculator",
    description: "Calculate percentages, percentage change, and percentage of a number.",
    icon: Percent,
    path: "/tools/percentage-calculator",
    category: "Calculator",
    featured: false,
  },
  {
    title: "Unit Converter",
    description: "Convert between different units: length, weight, temperature, and more.",
    icon: Ruler,
    path: "/tools/unit-converter",
    category: "Calculator",
    featured: false,
  },
  {
    title: "Random Number Generator",
    description: "Generate random numbers within specified ranges for various purposes.",
    icon: Shuffle,
    path: "/tools/random-number",
    category: "Utility",
    featured: false,
  },
  {
    title: "Color Palette Generator",
    description: "Generate beautiful color palettes for your design projects.",
    icon: PaintBucket,
    path: "/tools/color-palette",
    category: "Design",
    featured: false,
  },
  {
    title: "Gradient Maker",
    description: "Create CSS gradients with live preview and copy-paste code.",
    icon: Layers,
    path: "/tools/gradient-maker",
    category: "Design",
    featured: false,
  },
  {
    title: "EXIF Viewer",
    description: "View and analyze EXIF metadata from your digital photos.",
    icon: Eye,
    path: "/tools/exif-viewer",
    category: "Image",
    featured: false,
  },
  {
    title: "Image Compressor",
    description: "Compress images to reduce file size while maintaining quality.",
    icon: Download,
    path: "/tools/image-compressor",
    category: "Image",
    featured: false,
  },
  {
    title: "HTML Entity Encoder",
    description: "Encode and decode HTML entities for safe web content display.",
    icon: Code,
    path: "/tools/html-entity",
    category: "Developer",
    featured: false,
  },
  {
    title: "Markdown Preview",
    description: "Preview Markdown content with live rendering and syntax highlighting.",
    icon: FileText,
    path: "/tools/markdown-preview",
    category: "Developer",
    featured: false,
  },
  {
    title: "Number Base Converter",
    description: "Convert numbers between binary, decimal, hexadecimal, and octal.",
    icon: Calculator,
    path: "/tools/base-converter",
    category: "Calculator",
    featured: false,
  },
  {
    title: "String Encoder",
    description: "Encode and decode strings using various encoding methods.",
    icon: Type,
    path: "/tools/string-encoder",
    category: "Developer",
    featured: false,
  },
];

const categories = ["All", "SEO", "Image", "Design", "Utility", "Security", "Developer", "Text", "Calculator"];

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allTools = [...seoTools, ...otherTools];
  const filteredTools = selectedCategory === "All" 
    ? allTools 
    : allTools.filter(tool => tool.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Free SEO Tools - Website Analysis & Optimization | Lasitha Rajapaksha</title>
        <meta 
          name="description" 
          content="Access professional SEO tools for website analysis, backlink checking, image optimization, and content optimization. Free online tools to improve your search engine rankings." 
        />
        <meta 
          name="keywords" 
          content="seo tools, website analysis, backlink checker, seo checker, metadata remover, search engine optimization, website optimization, free seo tools" 
        />
        <meta property="og:title" content="Free SEO Tools - Website Analysis & Optimization" />
        <meta property="og:description" content="Professional SEO tools to analyze and optimize your website for better search engine rankings." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Free SEO Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Professional-grade SEO tools to analyze, optimize, and improve your website's search engine rankings. 
              All tools are free to use and work directly in your browser.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <TrendingUp className="h-4 w-4" />
              <span>Boost Rankings • Increase Traffic • Optimize Content</span>
            </div>
          </div>

          {/* SEO Tools Section */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Search className="h-6 w-6" />
              Essential SEO Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {seoTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:scale-105 border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <tool.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">SEO</Badge>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center md:justify-start">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted hover:bg-muted-foreground/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* All Tools Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              {selectedCategory === "All" ? "All Tools" : `${selectedCategory} Tools`} 
              ({filteredTools.length})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                          <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <Badge 
                          variant={tool.category === "SEO" ? "default" : "outline"} 
                          className={`text-xs ${tool.category === "SEO" ? "bg-primary text-primary-foreground" : ""}`}
                        >
                          {tool.category}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm line-clamp-2">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Need Custom SEO Tools?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking for specific SEO analysis or custom optimization tools? I'm always developing new tools to help 
              businesses improve their search engine rankings and online visibility.
            </p>
            <Link to="/founder">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Me for Custom Tools
              </button>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default Tools;
