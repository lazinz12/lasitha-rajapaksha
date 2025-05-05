
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Backlink Shop",
    description: "A web platform connecting backlink providers with buyers, featuring AI-powered personalized itineraries, tag-based filtering, and real-time notifications for enhanced user engagement.",
    link: "#",
    category: "Web Development",
    image: "/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png"
  },
  {
    title: "Auto-Trading Bots for MT5",
    description: "Advanced trading bots utilizing Telegram API signals and Azure OpenAI for predictive trading strategies. Features risk-reward optimization and automated entry/exit management.",
    link: "#",
    category: "Trading",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Invoice Generator",
    description: "A comprehensive web application for creating professional invoices with customizable templates, client management, item tracking, and PDF export capabilities.",
    link: "https://invoicegeneratorr.netlify.app/",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "Compress-Go",
    description: "An efficient online image compression tool that reduces file sizes while maintaining quality. Features batch processing, various compression algorithms, and format conversion options.",
    link: "https://compress-go.netlify.app/",
    category: "Web Tools",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=1200&q=80"
  }
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-gray-50 relative overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto px-4"
      >
        <motion.div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Showcasing my expertise in trading automation, web development, and analytics
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              className="group"
            >
              <Card className="hover:shadow-xl transition-all duration-300 overflow-hidden bg-white/80 backdrop-blur-sm">
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
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${project.title} project`}
                      whileHover={{ scale: 1.2, rotate: 45 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ExternalLink className="h-5 w-5 text-gray-400 group-hover:text-primary transition-colors" />
                    </motion.a>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
