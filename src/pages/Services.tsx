import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Code, Palette, Zap, Globe, Shield, Headphones } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Full-Stack Development",
    description: "Complete web applications with modern technologies",
    features: ["React & TypeScript", "Node.js Backend", "Database Design", "API Development"],
    price: "From $2,500",
    category: "Development"
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Beautiful and intuitive user interfaces",
    features: ["Responsive Design", "User Research", "Prototyping", "Design Systems"],
    price: "From $1,200",
    category: "Design"
  },
  {
    icon: Zap,
    title: "Automation Tools",
    description: "Custom tools to streamline your workflow",
    features: ["Process Automation", "Data Processing", "Custom Scripts", "Integration"],
    price: "From $800",
    category: "Automation"
  },
  {
    icon: Globe,
    title: "SEO Optimization",
    description: "Improve your search engine visibility",
    features: ["Technical SEO", "Content Optimization", "Performance Tuning", "Analytics"],
    price: "From $600",
    category: "Marketing"
  }
];

const packages = [
  {
    name: "Starter",
    price: "$1,500",
    description: "Perfect for small projects and landing pages",
    features: [
      "5 pages maximum",
      "Responsive design",
      "Basic SEO setup",
      "Contact form",
      "1 month support"
    ],
    popular: false
  },
  {
    name: "Professional",
    price: "$3,500",
    description: "Ideal for business websites and web applications",
    features: [
      "Up to 15 pages",
      "Custom functionality",
      "Advanced SEO",
      "Database integration",
      "3 months support",
      "Performance optimization"
    ],
    popular: true
  },
  {
    name: "Enterprise",
    price: "$6,500",
    description: "Complex applications with custom requirements",
    features: [
      "Unlimited pages",
      "Complex functionality",
      "Full SEO suite",
      "Multiple integrations",
      "6 months support",
      "Performance monitoring",
      "Priority support"
    ],
    popular: false
  }
];

const Services = () => {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Services & Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Professional web development services tailored to your needs. 
            From simple websites to complex applications.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-center mb-12">What I Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">
                      {service.category}
                    </Badge>
                    <service.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center text-sm">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <p className="font-semibold text-lg text-primary">{service.price}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pricing Packages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-4">Package Deals</h2>
          <p className="text-center text-muted-foreground mb-12">
            Choose a package that fits your project size and requirements
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                <Card className={`h-full ${pkg.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {pkg.popular && (
                    <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      Most Popular
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                    <p className="text-3xl font-bold text-primary">{pkg.price}</p>
                    <p className="text-muted-foreground">{pkg.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {pkg.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full" 
                      variant={pkg.popular ? "default" : "outline"}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold mb-8">Additional Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card>
              <CardContent className="pt-6 text-center">
                <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Security Audit</h3>
                <p className="text-muted-foreground text-sm">
                  Comprehensive security review and vulnerability assessment
                </p>
                <p className="font-semibold mt-2">From $400</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Headphones className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Maintenance</h3>
                <p className="text-muted-foreground text-sm">
                  Ongoing support, updates, and maintenance services
                </p>
                <p className="font-semibold mt-2">$200/month</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6 text-center">
                <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="font-semibold mb-2">Rush Delivery</h3>
                <p className="text-muted-foreground text-sm">
                  Expedited development with priority timeline
                </p>
                <p className="font-semibold mt-2">+50% fee</p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;