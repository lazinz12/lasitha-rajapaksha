
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TypeAnimation } from 'react-type-animation';
import { Button } from "@/components/ui/button";
import { TextTransmission } from "@/components/animations/TextTransmission";
import { FloatingTransmission } from "@/components/animations/FloatingTransmission";
import { GlitchTransmission } from "@/components/animations/GlitchTransmission";
import { NeonTransmission } from "@/components/animations/NeonTransmission";
import { MatrixTransmission } from "@/components/animations/MatrixTransmission";
import { CyberTransmission } from "@/components/animations/CyberTransmission";

interface HeroProps {
  onScrollDown?: () => void;
}

export const Hero = ({ onScrollDown }: HeroProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      } 
    },
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-4 relative overflow-hidden" aria-labelledby="hero-heading">
      {/* Futuristic background effects */}
      <div className="absolute inset-0 z-[-1]">
        {/* Animated gradient orbs */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [-20, 20, -20],
            y: [-10, 10, -10],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div 
          className="absolute top-3/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-500/20 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.6, 0.3, 0.6],
            x: [20, -20, 20],
            y: [10, -10, 10],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        
        {/* Matrix-style grid */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 space-y-8"
      >
        <motion.div variants={itemVariants}>
          <CyberTransmission>
            <FloatingTransmission intensity="subtle" duration={6}>
              <GlitchTransmission intensity="low">
                <Avatar className="w-40 h-40 mx-auto mb-8 ring-4 ring-cyan-400/50 ring-offset-4 ring-offset-background shadow-2xl shadow-cyan-500/30">
                  <AvatarImage src="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png" alt="Lasitha Rajapaksha" />
                  <AvatarFallback className="bg-gradient-to-br from-cyan-400 to-purple-500 text-white text-3xl font-bold">LR</AvatarFallback>
                </Avatar>
              </GlitchTransmission>
            </FloatingTransmission>
          </CyberTransmission>
        </motion.div>

        <motion.div variants={itemVariants}>
          <MatrixTransmission lines={3}>
            <TextTransmission 
              text="Lasitha Rajapaksha" 
              className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              delay={0.8}
            />
          </MatrixTransmission>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="text-2xl md:text-3xl h-16 flex items-center justify-center"
        >
          <NeonTransmission color="green">
            <div className="relative">
              <TypeAnimation
                sequence={[
                  'Developer', 
                  3000,
                  'Forex Trader', 
                  3000,
                  'Automation Specialist', 
                  3000,
                  'Founder & CEO',
                  6000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="inline-block font-mono text-green-400"
              />
              <motion.span
                className="absolute -right-1 top-0 w-0.5 h-full bg-green-400"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>
          </NeonTransmission>
        </motion.div>

        <motion.div variants={itemVariants}>
          <GlitchTransmission intensity="low">
            <TextTransmission 
              text="Market Minds" 
              className="text-xl text-purple-400 font-semibold tracking-wider"
              delay={1.5}
            />
          </GlitchTransmission>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-6 justify-center pt-8"
        >
          <NeonTransmission color="cyan">
            <Button 
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-cyan-500/30"
            >
              <a href="/blog" aria-label="Read Blog">Read Blog</a>
            </Button>
          </NeonTransmission>

          <NeonTransmission color="purple">
            <Button 
              asChild
              variant="outline"
              className="bg-transparent border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-110 shadow-lg shadow-purple-500/30"
            >
              <a href="/tools" aria-label="Try Tools">Try Tools</a>
            </Button>
          </NeonTransmission>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-12"
      >
        <FloatingTransmission intensity="medium" duration={3}>
          <NeonTransmission color="cyan">
            <div
              className="cursor-pointer p-4 rounded-full hover:bg-cyan-500/20 transition-colors"
              onClick={onScrollDown}
              aria-label="Scroll down"
              role="button"
            >
              <ArrowDown className="w-8 h-8 text-cyan-400" />
            </div>
          </NeonTransmission>
        </FloatingTransmission>
      </motion.div>
    </section>
  );
};
