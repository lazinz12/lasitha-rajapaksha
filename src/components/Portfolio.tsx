import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Backlink Bazarl",
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
    title: "Ad Publisher Network",
    description: "Custom ad publisher network built with Supabase backend, providing automated ad management and monetization opportunities for publishers.",
    link: "#",
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80"
  },
  {
    title: "E-Commerce Analytics Dashboard",
    description: "Django and React-based analytics dashboard for e-commerce platforms, featuring real-time tracking of sales, user behavior, and inventory management.",
    link: "#",
    category: "Analytics",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
  }
];

export const Portfolio = () => {
  return (
    <section id="portfolio" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
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
            >
              <Card className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm">
                      {project.category}
                    </span>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{project.title}</span>
                    <ExternalLink className="h-5 w-5 text-gray-400 hover:text-primary transition-colors" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{project.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};