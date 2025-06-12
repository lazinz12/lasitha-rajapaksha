
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeAnimation } from 'react-type-animation';
import { Button } from "@/components/ui/button";
import { TextTransmission } from "@/components/animations/TextTransmission";
import { FloatingTransmission } from "@/components/animations/FloatingTransmission";

interface HeroProps {
  onScrollDown?: () => void;
}

export const Hero = ({ onScrollDown }: HeroProps) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-blue-100/30 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-purple-100/20 blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 space-y-8"
      >
        <motion.div
          variants={itemVariants}
          className="mx-auto"
        >
          <FloatingTransmission intensity="subtle" duration={4}>
            <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-white/50 ring-offset-2 ring-offset-background shadow-lg">
              <AvatarImage src="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png" alt="Lasitha Rajapaksha" />
              <AvatarFallback>LR</AvatarFallback>
            </Avatar>
          </FloatingTransmission>
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextTransmission 
            text="Lasitha Rajapaksha" 
            className="text-4xl md:text-6xl font-bold text-primary"
            delay={0.5}
          />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-600 h-12"
        >
          <TypeAnimation
            sequence={[
              'Developer', 
              2000,
              'Forex Trader', 
              2000,
              'Automation Specialist', 
              2000,
              'Developer and Forex Trader',
              5000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="inline-block"
          />
        </motion.div>

        <motion.div variants={itemVariants}>
          <TextTransmission 
            text="Market Minds" 
            className="text-lg text-gray-500"
            delay={1.2}
          />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center pt-4"
        >
          <Button 
            asChild
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <a href="/blog" aria-label="Read Blog">Read Blog</a>
          </Button>

          <Button 
            asChild
            variant="outline"
            className="bg-white text-primary border-primary hover:bg-primary/10 font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <a href="/tools/background-remover" aria-label="Try Tools">Try Tools</a>
          </Button>
        </motion.div>
      </motion.div>

      <FloatingTransmission intensity="medium" duration={2}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-12 cursor-pointer"
          onClick={onScrollDown}
          aria-label="Scroll down"
          role="button"
        >
          <ArrowDown className="w-8 h-8 text-gray-500" />
        </motion.div>
      </FloatingTransmission>
    </section>
  );
};
