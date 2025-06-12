
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Shield, Zap, Users, Globe, Code, Award } from "lucide-react";
import Header from "@/components/Header";

const CompressGo = () => {
  // Schema.org structured data for CompressGo
  const compressGoSchemaData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CompressGo",
    "url": "https://compress-go.com/",
    "description": "Free online file compression tool that prioritizes privacy with client-side processing",
    "applicationCategory": "Utility",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Lasitha Rajapaksha"
    },
    "features": [
      "Image Compression",
      "Video Compression", 
      "PDF Compression",
      "Client-side Processing",
      "Privacy Protection",
      "Batch Processing"
    ]
  };

  const features = [
    {
      icon: Shield,
      title: "Privacy First",
      description: "All compression happens in your browser. Files never leave your device, ensuring complete privacy and security."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Advanced compression algorithms optimized for speed without compromising quality."
    },
    {
      icon: Users,
      title: "User Friendly",
      description: "Simple drag-and-drop interface that anyone can use without technical knowledge."
    },
    {
      icon: Globe,
      title: "No Downloads",
      description: "Works entirely in your web browser - no software installation required."
    }
  ];

  const stats = [
    { number: "1M+", label: "Files Compressed" },
    { number: "150+", label: "Countries Served" },
    { number: "99.9%", label: "Uptime" },
    { number: "0$", label: "Cost to Users" }
  ];

  const technologies = [
    "React.js", "TypeScript", "Web Workers", "Canvas API", "File API",
    "Compression Algorithms", "PWA", "Responsive Design"
  ];

  return (
    <>
      <Helmet>
        <title>CompressGo - Free Online File Compression Tool | Privacy-First Solution</title>
        <meta
          name="description"
          content="CompressGo is a free online file compression platform that processes files entirely in your browser for maximum privacy. Compress images, videos, and PDFs without uploading to servers."
        />
        <meta name="keywords" content="compress go, compressgo, file compression, image compression, video compression, pdf compression, privacy, free tool, lasitha rajapaksha" />
        <script type="application/ld+json">
          {JSON.stringify(compressGoSchemaData)}
        </script>
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="container py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <img 
                src="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png" 
                alt="CompressGo Logo"
                className="mx-auto h-32 w-auto"
              />
            </motion.div>
            
            <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CompressGo
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              The most advanced free online file compression platform that prioritizes your privacy 
              by processing everything locally in your browser.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <motion.a
                href="https://compress-go.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Visit CompressGo
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.a>
              
              <motion.a
                href="https://compress-go.com/founder"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Meet the Founder
                <ExternalLink className="ml-2 h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose CompressGo?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardHeader className="text-center">
                      <feature.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-center">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">About CompressGo</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    CompressGo was founded in 2022 by <strong>Lasitha Rajapaksha</strong> with a simple yet powerful vision: 
                    to provide the world's most privacy-focused file compression platform.
                  </p>
                  <p>
                    Unlike traditional compression services that upload your files to remote servers, 
                    CompressGo processes everything locally in your browser using advanced web technologies 
                    and optimized compression algorithms.
                  </p>
                  <p>
                    The platform supports multiple file formats including images (JPEG, PNG, WebP), 
                    videos (MP4, AVI, MOV), and documents (PDF), making it a comprehensive solution 
                    for all your compression needs.
                  </p>
                  <p>
                    With over 1 million files compressed and users from 150+ countries, 
                    CompressGo has become the trusted choice for individuals and businesses 
                    who prioritize both efficiency and privacy.
                  </p>
                </div>
              </div>
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative overflow-hidden rounded-lg"
                >
                  <img 
                    src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&w=800&q=80"
                    alt="Privacy and Security Concept"
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-lg font-semibold">Privacy by Design</div>
                    <div className="text-sm opacity-90">Your files never leave your device</div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Code className="mr-2 h-5 w-5" />
                  Technology Stack
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-sm">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-center mb-12">Achievements & Recognition</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Privacy Excellence</h3>
                  <p className="text-muted-foreground">Recognized for implementing industry-leading privacy protection</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">User Choice Award</h3>
                  <p className="text-muted-foreground">Highly rated by users worldwide for ease of use</p>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Performance Leader</h3>
                  <p className="text-muted-foreground">Fastest compression times in the industry</p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-12"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Experience CompressGo?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join millions of users who trust CompressGo for their file compression needs. 
              Fast, secure, and completely free.
            </p>
            <motion.a
              href="https://compress-go.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-lg font-semibold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Compressing Now
              <ExternalLink className="ml-2 h-5 w-5" />
            </motion.a>
          </motion.div>
        </main>
      </div>
    </>
  );
};

export default CompressGo;
