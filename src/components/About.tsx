
import { motion } from "framer-motion";
import { Code, LineChart, BarChart4, Bot } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const About = () => {
  const features = [
    { 
      icon: <Code className="h-8 w-8 text-blue-600" />, 
      title: "Development", 
      description: "Expertise in web & software development with multiple programming languages and frameworks." 
    },
    { 
      icon: <LineChart className="h-8 w-8 text-green-600" />, 
      title: "Forex Trading", 
      description: "Specialized in advanced trading strategies, technical analysis, and market insights." 
    },
    { 
      icon: <BarChart4 className="h-8 w-8 text-purple-600" />, 
      title: "Market Analysis", 
      description: "In-depth understanding of financial markets and data-driven trading decisions." 
    },
    { 
      icon: <Bot className="h-8 w-8 text-orange-600" />, 
      title: "Automation", 
      description: "Creating automated systems and trading bots for efficient market operations." 
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-20 bg-gradient-to-b from-gray-50 to-white"
      id="about-section"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-primary mb-8 relative inline-block" id="about-heading">
            About Me
            <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent transform -translate-y-2"></span>
          </h2>
          
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            A passionate professional with extensive expertise in programming, trading automation, and web development. 
            Proven track record in building robust solutions, automated systems, trading bots, and web applications.
          </p>
          
          <p className="text-lg text-gray-600 leading-relaxed">
            My approach integrates modern development practices with deep market understanding, 
            allowing me to deliver both technical excellence and trading insights.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <Card className="h-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
                <CardContent className="p-6">
                  <div className="bg-gray-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{feature.title}</h3>
                  <p className="text-gray-600 text-center">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
