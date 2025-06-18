
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Shield, 
  Type, 
  Search, 
  Link as LinkIcon,
  Image,
  Palette,
  Calculator,
  Code,
  FileText,
  Hash,
  Download,
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
  Eye,
  Layers,
  PaintBucket,
  Ruler,
  TrendingUp,
  Target,
  BarChart3
} from "lucide-react";

const tools = [
  {
    title: "SEO Analyzer & Checker",
    description: "Comprehensive on-page SEO analysis tool to optimize your website for search engines. Check title tags, meta descriptions, headings, and more.",
    icon: Search,
    path: "/tools/seo-checker",
    category: "Core SEO",
    featured: true,
    seoScore: 95,
  },
  {
    title: "Backlink Checker & Analyzer",
    description: "Analyze your website's backlink profile to improve domain authority and search rankings. Essential for SEO link building strategies.",
    icon: LinkIcon,
    path: "/tools/backlink-checker",
    category: "Core SEO",
    featured: true,
    seoScore: 90,
  },
  {
    title: "Image SEO Optimizer (Metadata Remover)",
    description: "Optimize images for SEO by removing unnecessary metadata while preserving quality. Improve page load speed and search rankings.",
    icon: Shield,
    path: "/tools/metadata-remover",
    category: "Image SEO",
    featured: true,
    seoScore: 85,
  },
  {
    title: "Text SEO Optimizer (Case Converter)",
    description: "Optimize text content for SEO with proper case formatting. Convert to title case for headings, sentence case for descriptions.",
    icon: Type,
    path: "/tools/case-converter",
    category: "Content SEO",
    featured: true,
    seoScore: 80,
  },
  {
    title: "Schema Markup Generator (QR Code)",
    description: "Generate QR codes with schema markup for local SEO and business listings. Improve search visibility and user engagement.",
    icon: QrCode,
    path: "/tools/qr-generator",
    category: "Local SEO",
    featured: true,
    seoScore: 75,
  },
  {
    title: "SEO Password Generator",
    description: "Generate secure passwords for SEO tools and analytics platforms. Protect your SEO data and website security.",
    icon: Lock,
    path: "/tools/password-generator",
    category: "SEO Security",
    featured: false,
    seoScore: 70,
  },
  {
    title: "Color Accessibility Checker",
    description: "Ensure your website colors meet accessibility standards for better SEO rankings. Google considers accessibility in search rankings.",
    icon: Palette,
    path: "/tools/color-converter",
    category: "Technical SEO",
    featured: false,
    seoScore: 65,
  },
  {
    title: "Image Format Optimizer",
    description: "Convert images to SEO-friendly formats (WebP, AVIF) to improve page load speed and Core Web Vitals scores.",
    icon: FileImage,
    path: "/tools/image-converter",
    category: "Image SEO",
    featured: false,
    seoScore: 85,
  },
  {
    title: "SEO Image Cropper",
    description: "Crop images to optimal dimensions for SEO. Proper image sizing improves page load speed and user experience.",
    icon: Crop,
    path: "/tools/image-cropper",
    category: "Image SEO",
    featured: false,
    seoScore: 75,
  },
  {
    title: "Base64 SEO Encoder",
    description: "Encode small images as Base64 for faster loading and better Core Web Vitals. Reduce HTTP requests for SEO optimization.",
    icon: Binary,
    path: "/tools/base64",
    category: "Technical SEO",
    featured: false,
    seoScore: 70,
  },
  {
    title: "URL SEO Optimizer",
    description: "Encode and optimize URLs for better search engine crawling and indexing. Clean URLs improve SEO rankings.",
    icon: Globe,
    path: "/tools/url-encoder",
    category: "Technical SEO",
    featured: false,
    seoScore: 80,
  },
  {
    title: "JSON-LD Schema Formatter",
    description: "Format and validate JSON-LD structured data for better search engine understanding and rich snippets.",
    icon: Braces,
    path: "/tools/json-formatter",
    category: "Schema SEO",
    featured: false,
    seoScore: 90,
  },
  {
    title: "SEO Regex Tester",
    description: "Test regular expressions for SEO redirects, .htaccess rules, and URL pattern matching for better site structure.",
    icon: Regex,
    path: "/tools/regex-tester",
    category: "Technical SEO",
    featured: false,
    seoScore: 75,
  },
  {
    title: "SEO Hash Generator",
    description: "Generate hash values for content integrity and security. Important for website security and search engine trust.",
    icon: Hash,
    path: "/tools/hash-generator",
    category: "SEO Security",
    featured: false,
    seoScore: 70,
  },
  {
    title: "SEO Content Generator",
    description: "Generate SEO-optimized placeholder content for testing and development. Maintain content structure during design.",
    icon: FileText,
    path: "/tools/lorem-ipsum",
    category: "Content SEO",
    featured: false,
    seoScore: 65,
  },
  {
    title: "SEO Word Counter & Analyzer",
    description: "Analyze content length, keyword density, and readability for SEO optimization. Ensure optimal content length for rankings.",
    icon: AlignLeft,
    path: "/tools/word-counter",
    category: "Content SEO",
    featured: false,
    seoScore: 85,
  },
  {
    title: "Conversion Rate Calculator",
    description: "Calculate conversion rates and SEO ROI metrics. Track the impact of SEO improvements on business goals.",
    icon: Percent,
    path: "/tools/percentage-calculator",
    category: "SEO Analytics",
    featured: false,
    seoScore: 75,
  },
  {
    title: "SEO Unit Converter",
    description: "Convert units for technical SEO measurements, file sizes, and performance metrics. Essential for Core Web Vitals optimization.",
    icon: Ruler,
    path: "/tools/unit-converter",
    category: "Technical SEO",
    featured: false,
    seoScore: 70,
  },
  {
    title: "Random SEO Test Data Generator",
    description: "Generate random data for SEO testing and development. Create test content without affecting live SEO performance.",
    icon: Shuffle,
    path: "/tools/random-number",
    category: "SEO Testing",
    featured: false,
    seoScore: 60,
  },
  {
    title: "Brand Color Palette Generator",
    description: "Create consistent brand color palettes for better user experience and brand recognition, important ranking factors.",
    icon: PaintBucket,
    path: "/tools/color-palette",
    category: "Brand SEO",
    featured: false,
    seoScore: 70,
  },
  {
    title: "CSS Gradient SEO Optimizer",
    description: "Create optimized CSS gradients that load faster and improve Core Web Vitals scores for better SEO rankings.",
    icon: Layers,
    path: "/tools/gradient-maker",
    category: "Technical SEO",
    featured: false,
    seoScore: 65,
  },
  {
    title: "EXIF SEO Data Viewer",
    description: "View and optimize image EXIF data for local SEO and image search optimization. Important for image SEO rankings.",
    icon: Eye,
    path: "/tools/exif-viewer",
    category: "Image SEO",
    featured: false,
    seoScore: 80,
  },
  {
    title: "Image Compressor for SEO",
    description: "Compress images for faster loading and better Core Web Vitals. Essential tool for technical SEO and page speed optimization.",
    icon: Download,
    path: "/tools/image-compressor",
    category: "Image SEO",
    featured: false,
    seoScore: 90,
  },
  {
    title: "HTML Entity SEO Encoder",
    description: "Encode HTML entities for better search engine crawling and content security. Prevent SEO issues with special characters.",
    icon: Code,
    path: "/tools/html-entity",
    category: "Technical SEO",
    featured: false,
    seoScore: 75,
  },
  {
    title: "Markdown SEO Preview",
    description: "Preview and optimize Markdown content for SEO. Perfect for content creators and technical SEO documentation.",
    icon: FileText,
    path: "/tools/markdown-preview",
    category: "Content SEO",
    featured: false,
    seoScore: 80,
  },
  {
    title: "SEO Base Converter",
    description: "Convert numbers between different bases for technical SEO calculations and hexadecimal color optimization.",
    icon: Calculator,
    path: "/tools/base-converter",
    category: "Technical SEO",
    featured: false,
    seoScore: 65,
  },
  {
    title: "String Encoder for SEO",
    description: "Encode strings for URL optimization and search engine compatibility. Essential for international SEO and UTF-8 optimization.",
    icon: Type,
    path: "/tools/string-encoder",
    category: "Technical SEO",
    featured: false,
    seoScore: 75,
  },
];

const categories = ["All", "Core SEO", "Content SEO", "Image SEO", "Technical SEO", "Local SEO", "Schema SEO", "SEO Analytics", "SEO Security", "Brand SEO", "SEO Testing"];

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTools = tools.filter(tool => {
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredTools = tools.filter(tool => tool.featured).slice(0, 6);

  return (
    <>
      <Helmet>
        <title>Free SEO Tools - 27+ Professional SEO Analysis & Optimization Tools | Lasitha Rajapaksha</title>
        <meta 
          name="description" 
          content="Access 27+ free professional SEO tools for website optimization, analysis, and ranking improvement. SEO checker, backlink analyzer, image optimizer, and more SEO tools for better Google rankings." 
        />
        <meta 
          name="keywords" 
          content="free SEO tools, SEO analyzer, backlink checker, website SEO audit, on-page SEO checker, keyword density checker, meta tag analyzer, image SEO optimizer, Core Web Vitals, Google ranking tools, SEO audit tools, website optimization tools, search engine optimization, SEO analysis, technical SEO tools, local SEO tools, content SEO tools, image SEO tools, schema markup generator, JSON-LD validator, SEO performance checker, website speed test, SEO rank checker, competitor analysis tools, SEO reporting tools" 
        />
        <meta property="og:title" content="Free SEO Tools - Professional Website Optimization Tools" />
        <meta property="og:description" content="27+ professional SEO tools to improve your website's search engine rankings. Free SEO analyzer, backlink checker, and optimization tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lasitharajapaksha.netlify.app/tools" />
        <link rel="canonical" href="https://lasitharajapaksha.netlify.app/tools" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Free SEO Tools Suite",
            "description": "Professional SEO tools for website optimization and search engine ranking improvement",
            "url": "https://lasitharajapaksha.netlify.app/tools",
            "author": {
              "@type": "Person",
              "name": "Lasitha Rajapaksha"
            },
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "reviewCount": "150"
            },
            "applicationCategory": "SEO Tools",
            "operatingSystem": "Web Browser"
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Free Professional SEO Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-6">
              Boost your website's search engine rankings with our comprehensive suite of 27+ free SEO tools. 
              Analyze, optimize, and improve your website's performance for better Google rankings and increased organic traffic.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-green-500" />
                <span>Fast & Accurate</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-blue-500" />
                <span>Privacy Protected</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-purple-500" />
                <span>Improve Rankings</span>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto mb-8">
              <Input
                type="text"
                placeholder="Search SEO tools..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
          </div>

          {/* Featured SEO Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-primary" />
              Essential SEO Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:scale-105 border-2 border-primary/20 hover:border-primary/40">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <tool.icon className="h-6 w-6 text-primary" />
                          </div>
                          <Badge variant="secondary">{tool.category}</Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">{tool.seoScore}%</span>
                        </div>
                      </div>
                      <CardTitle className="group-hover:text-primary transition-colors text-lg">
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
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
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

          {/* All SEO Tools Grid */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              All SEO Tools ({filteredTools.length})
              {searchTerm && <span className="text-primary"> - "{searchTerm}"</span>}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                            <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <BarChart3 className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-green-600">{tool.seoScore}%</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors">
                        {tool.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm line-clamp-3">
                        {tool.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* SEO Benefits Section */}
          <section className="mt-16 bg-gradient-to-r from-primary/5 to-blue-600/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Why Use Our SEO Tools?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Improve Rankings</h4>
                <p className="text-sm text-muted-foreground">
                  Optimize your website for better search engine rankings and increased organic traffic.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Fast Analysis</h4>
                <p className="text-sm text-muted-foreground">
                  Get instant SEO insights and recommendations to improve your website's performance.
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Privacy Protected</h4>
                <p className="text-sm text-muted-foreground">
                  All tools process data securely without storing your information permanently.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="mt-16 text-center bg-muted/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Boost Your SEO?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Start optimizing your website today with our comprehensive SEO tools. 
              Improve your search rankings, increase organic traffic, and grow your online presence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/tools/seo-checker">
                <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                  Start SEO Analysis
                </button>
              </Link>
              <Link to="/founder">
                <button className="border border-primary text-primary hover:bg-primary/10 px-6 py-3 rounded-lg font-medium transition-colors">
                  Get SEO Consultation
                </button>
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Tools;
