
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { StaggeredTransmission } from "@/components/animations/StaggeredTransmission";
import { TransmissionAnimation } from "@/components/animations/TransmissionAnimation";
import { TextTransmission } from "@/components/animations/TextTransmission";

const projects = [
  {
    title: "Backlink Shop",
    description: "A web platform connecting backlink providers with buyers, featuring AI-powered personalized itineraries, tag-based filtering, and real-time notifications for enhanced user engagement.",
    link: "#",
    category: "Web Development",
    image: "/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png",
    isInternal: false
  },
  {
    title: "Auto-Trading Bots for MT5",
    description: "Advanced trading bots utilizing Telegram API signals and Azure OpenAI for predictive trading strategies. Features risk-reward optimization and automated entry/exit management.",
    link: "#",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80",
    isInternal: false
  },
  {
    title: "Invoice Generator",
    description: "A comprehensive web application for creating professional invoices with customizable templates, client management, item tracking, and PDF export capabilities.",
    link: "https://invoicegeneratorr.netlify.app/",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
    isInternal: false
  },
  {
    title: "Compress-Go",
    description: "An efficient online image compression tool that reduces file sizes while maintaining quality. Features batch processing, various compression algorithms, and format conversion options.",
    link: "/projects/compressgo",
    category: "Web Tools",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80",
    isInternal: true
  }
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-muted/30 relative overflow-hidden">
      <TransmissionAnimation direction="up" duration={0.8}>
        <div className="container mx-auto px-4">
          <motion.div className="text-center mb-12">
            <TextTransmission 
              text="Featured Projects" 
              className="text-3xl font-bold text-primary mb-4"
            />
            <TransmissionAnimation direction="up" delay={0.3}>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Showcasing my expertise in trading automation, web development, and analytics
              </p>
            </TransmissionAnimation>
          </motion.div>
          
          <StaggeredTransmission staggerDelay={0.2} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden bg-card/80 backdrop-blur-sm">
                    {project.isInternal ? (
                      <Link to={project.link} className="block">
                        <div className="relative h-64 overflow-hidden">
                          <motion.img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="absolute top-2 right-2">
                            <motion.span 
                              className="bg-primary text-white px-3 py-1 rounded-full text-sm"
                              whileHover={{ backgroundColor: "#6E59A5" }}
                            >
                              {project.category}
                            </motion.span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <motion.span
                              whileHover={{ color: "#9b87f5" }}
                              transition={{ duration: 0.2 }}
                            >
                              {project.title}
                            </motion.span>
                            <motion.div
                              whileHover={{ scale: 1.2, rotate: 45 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </motion.div>
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{project.description}</p>
                        </CardContent>
                      </Link>
                    ) : (
                      <>
                        <div className="relative h-64 overflow-hidden">
                          <motion.img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                          <div className="absolute top-2 right-2">
                            <motion.span 
                              className="bg-primary text-white px-3 py-1 rounded-full text-sm"
                              whileHover={{ backgroundColor: "#6E59A5" }}
                            >
                              {project.category}
                            </motion.span>
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <motion.span
                              whileHover={{ color: "#9b87f5" }}
                              transition={{ duration: 0.2 }}
                            >
                              {project.title}
                            </motion.span>
                            {project.link !== "#" && (
                              <motion.a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Visit ${project.title} project`}
                                whileHover={{ scale: 1.2, rotate: 45 }}
                                transition={{ duration: 0.2 }}
                              >
                                <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                              </motion.a>
                            )}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{project.description}</p>
                        </CardContent>
                      </>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </StaggeredTransmission>
        </div>
      </TransmissionAnimation>
    </section>
  );
};
