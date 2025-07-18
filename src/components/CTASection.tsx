
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary/10 to-purple-500/10">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Build Something Great?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss your project and turn your ideas into reality. 
            Whether you need a full-stack application, automation tools, or technical consultation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="group">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              View My Work
            </Button>
          </div>
          
          <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Available for new projects
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              Response within 24 hours
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Free consultation
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
