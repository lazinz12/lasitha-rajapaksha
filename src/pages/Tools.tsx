
import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Link as LinkIcon,
  Shield,
  Type,
  TrendingUp,
  Star,
  Filter,
  ArrowRight,
  Zap,
  Target,
  BarChart3,
  Eye
} from "lucide-react";

const primarySeoTools = [
  {
    title: "SEO Checker & Website Analyzer",
    description: "Complete SEO audit tool to analyze your website's on-page SEO, meta tags, headings, keyword density, page speed, and technical SEO factors. Get detailed recommendations to improve your Google rankings.",
    icon: Search,
    path: "/tools/seo-checker",
    category: "Core SEO",
    featured: true,
    benefits: "Boost Rankings • Technical SEO • On-Page Analysis"
  },
  {
    title: "Backlink Checker & Link Analysis",
    description: "Analyze your website's backlink profile, domain authority, and referring domains. Discover who's linking to your competitors and find new link building opportunities to improve your search rankings.",
    icon: LinkIcon,
    path: "/tools/backlink-checker",
    category: "Link Building",
    featured: true,
    benefits: "Domain Authority • Link Building • Competitor Analysis"
  },
  {
    title: "Image SEO & Metadata Optimizer",
    description: "Remove EXIF metadata from images to improve page load speed and protect privacy. Optimize images for SEO by cleaning metadata that can slow down your website and hurt search rankings.",
    icon: Shield,
    path: "/tools/metadata-remover",
    category: "Technical SEO",
    featured: true,
    benefits: "Page Speed • Image SEO • Privacy Protection"
  },
  {
    title: "SEO Content & Case Converter",
    description: "Optimize your content for search engines with proper text formatting. Convert text to title case for headlines, sentence case for meta descriptions, and other SEO-friendly formats.",
    icon: Type,
    path: "/tools/case-converter",
    category: "Content SEO",
    featured: true,
    benefits: "Content Optimization • Meta Tags • Headlines"
  },
];

const additionalSeoTools = [
  {
    title: "EXIF Data Viewer & SEO Image Optimizer",
    description: "View and remove EXIF metadata from images to improve SEO performance, reduce file sizes, and protect user privacy for better search engine optimization.",
    icon: Eye,
    path: "/tools/exif-viewer",
    category: "Technical SEO",
    benefits: "Image SEO • File Size • Privacy"
  },
  {
    title: "Website Performance Image Compressor",
    description: "Compress images without losing quality to improve page load speed, Core Web Vitals, and search engine rankings. Essential for technical SEO.",
    icon: Zap,
    path: "/tools/image-compressor",
    category: "Performance SEO",
    benefits: "Page Speed • Core Web Vitals • User Experience"
  },
];

const Tools = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const allTools = [...primarySeoTools, ...additionalSeoTools];
  const filteredTools = allTools.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Core SEO", "Link Building", "Technical SEO", "Content SEO", "Performance SEO"];

  return (
    <>
      <Helmet>
        <title>Free SEO Tools 2024 - Website Optimization & Analysis Tools | Lasitha Rajapaksha</title>
        <meta 
          name="description" 
          content="Professional SEO tools to improve Google rankings. Free website analyzer, backlink checker, image optimizer, and content tools. Boost your search engine visibility with our comprehensive SEO toolkit." 
        />
        <meta 
          name="keywords" 
          content="seo tools, website analyzer, google ranking checker, backlink analysis, seo audit, keyword research, meta tag optimizer, image seo, page speed test, technical seo tools, free seo checker, search engine optimization" 
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta property="og:title" content="Free SEO Tools 2024 - Website Optimization & Analysis" />
        <meta property="og:description" content="Professional SEO tools to improve Google rankings. Free website analyzer, backlink checker, and optimization tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lasitharajapaksha.netlify.app/tools" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free SEO Tools 2024 - Website Optimization" />
        <meta name="twitter:description" content="Professional SEO tools to improve Google rankings and website performance." />
        <link rel="canonical" href="https://lasitharajapaksha.netlify.app/tools" />
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Free SEO Tools",
            "description": "Professional SEO tools for website optimization and Google ranking improvement",
            "url": "https://lasitharajapaksha.netlify.app/tools",
            "applicationCategory": "SEO Tools",
            "operatingSystem": "Web Browser",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            }
          })}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-6 md:py-8">
          {/* Hero Section - Optimized for SEO */}
          <section className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Free SEO Tools for Google Rankings
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Professional SEO analysis and optimization tools to improve your website's search engine rankings. 
              Analyze, optimize, and boost your Google visibility with our comprehensive SEO toolkit.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span>Improve Rankings</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <span>Analyze Performance</span>
              </div>
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span>Optimize Content</span>
              </div>
            </div>
            
            {/* Search and Filter */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search SEO tools..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" className="sm:w-auto">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Tools
                </Button>
              </div>
              
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-muted hover:bg-muted-foreground/10 text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Primary SEO Tools */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold">Essential SEO Tools</h2>
                <p className="text-muted-foreground">Core tools every website needs for better Google rankings</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {primarySeoTools.filter(tool => 
                tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchTerm.toLowerCase())
              ).map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:scale-[1.02] border-2 border-blue-100 dark:border-blue-900/20 group-hover:border-blue-300 dark:group-hover:border-blue-700">
                    <CardHeader className="pb-4">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white group-hover:scale-110 transition-transform">
                          <tool.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                              {tool.category}
                            </Badge>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                              Free
                            </Badge>
                          </div>
                          <CardTitle className="text-lg group-hover:text-blue-600 transition-colors mb-2">
                            {tool.title}
                          </CardTitle>
                          <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                            {tool.benefits}
                          </p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-sm leading-relaxed mb-4">
                        {tool.description}
                      </CardDescription>
                      <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm group-hover:gap-3 transition-all">
                        <span>Start Analysis</span>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Additional SEO Tools */}
          {filteredTools.length > primarySeoTools.length && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Advanced SEO Tools</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalSeoTools.filter(tool => 
                  tool.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  tool.description.toLowerCase().includes(searchTerm.toLowerCase())
                ).map((tool) => (
                  <Link key={tool.path} to={tool.path} className="group">
                    <Card className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:border-blue-300 dark:group-hover:border-blue-700">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="p-2 rounded-lg bg-muted group-hover:bg-blue-100 dark:group-hover:bg-blue-900/20 transition-colors">
                            <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-blue-600 transition-colors" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {tool.category}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors leading-tight">
                          {tool.title}
                        </CardTitle>
                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          {tool.benefits}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <CardDescription className="text-sm line-clamp-3 mb-3">
                          {tool.description}
                        </CardDescription>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium text-sm">
                          <span>Use Tool</span>
                          <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Custom SEO Solutions?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Looking for tailored SEO strategies or custom optimization tools for your specific industry? 
              I specialize in developing advanced SEO solutions that drive real results.
            </p>
            <Link to="/founder">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-8 py-3">
                Get Custom SEO Strategy
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default Tools;
