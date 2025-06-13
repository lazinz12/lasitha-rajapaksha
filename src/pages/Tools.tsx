import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Scissors,
  Download,
  Upload,
  Zap,
  Settings
} from "lucide-react";

const tools = [
  {
    title: "Image Metadata Remover",
    description: "Remove EXIF data and metadata from your images to protect privacy and reduce file size.",
    icon: Shield,
    path: "/tools/metadata-remover",
    category: "Privacy",
    featured: true,
  },
  {
    title: "Case Converter",
    description: "Convert text between different cases: uppercase, lowercase, title case, camelCase, and more.",
    icon: Type,
    path: "/tools/case-converter",
    category: "Text",
    featured: true,
  },
  {
    title: "SEO Checker",
    description: "Analyze your webpage's SEO performance and get insights to improve search rankings.",
    icon: Search,
    path: "/tools/seo-checker",
    category: "SEO",
    featured: true,
  },
  {
    title: "Backlink Checker",
    description: "Check and analyze website backlinks to understand your site's backlink profile.",
    icon: LinkIcon,
    path: "/tools/backlink-checker",
    category: "SEO",
    featured: false,
  },
  {
    title: "Background Remover",
    description: "Remove backgrounds from images using AI technology with high precision.",
    icon: Image,
    path: "/tools/background-remover",
    category: "Image",
    featured: true,
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
];

const categories = ["All", "Privacy", "Text", "SEO", "Image", "Design"];

const Tools = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredTools = selectedCategory === "All" 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  const featuredTools = tools.filter(tool => tool.featured);

  return (
    <>
      <Helmet>
        <title>Free Online Tools - Web Development & SEO Tools | Lasitha Rajapaksha</title>
        <meta 
          name="description" 
          content="Access free online tools for web development, SEO analysis, image processing, text conversion, and more. Professional tools for developers and marketers." 
        />
        <meta 
          name="keywords" 
          content="free online tools, web development tools, SEO tools, image tools, text converter, metadata remover, case converter" 
        />
        <meta property="og:title" content="Free Online Tools - Web Development & SEO Tools" />
        <meta property="og:description" content="Access professional-grade online tools for web development, SEO, and content creation." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              Free Online Tools
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
              Professional-grade tools for web development, SEO analysis, image processing, and content creation. 
              All tools are free to use and work directly in your browser.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>Fast • Secure • No Registration Required</span>
            </div>
          </div>

          {/* Featured Tools */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Featured Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-lg group-hover:scale-105 border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          <tool.icon className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="secondary">{tool.category}</Badge>
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
            <h2 className="text-2xl font-bold mb-6">All Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredTools.map((tool) => (
                <Link key={tool.path} to={tool.path} className="group">
                  <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-primary/30">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                          <tool.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                        <Badge variant="outline" className="text-xs">
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
            <h3 className="text-2xl font-bold mb-4">Need a Custom Tool?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Can't find the tool you need? I'm always working on new tools to help developers and content creators. 
              Feel free to reach out with your suggestions!
            </p>
            <Link to="/founder">
              <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors">
                Contact Me
              </button>
            </Link>
          </section>
        </main>
      </div>
    </>
  );
};

export default Tools;
