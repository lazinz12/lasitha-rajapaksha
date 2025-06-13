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

  // Celestial animation variants
  const moonVariants = {
    animate: {
      rotate: 360,
      transition: {
        duration: 50,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const starVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.7, 1, 0.7],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Generate random star positions
  const generateStars = () => {
    const stars = [];
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 8 + 4;
      const delay = Math.random() * 2;
      stars.push({
        id: i,
        size,
        delay,
        x: Math.random() * 400 - 200,
        y: Math.random() * 400 - 200,
      });
    }
    return stars;
  };

  const stars = generateStars();

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
          className="mx-auto relative"
        >
          {/* Celestial Effects Container */}
          <div className="absolute inset-0 w-80 h-80 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 pointer-events-none">
            {/* Moon */}
            <motion.div
              variants={moonVariants}
              animate="animate"
              className="absolute top-4 right-8 text-4xl opacity-80"
              style={{ filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))' }}
            >
              🌙
            </motion.div>

            {/* Stars */}
            {stars.map((star) => (
              <motion.div
                key={star.id}
                variants={starVariants}
                animate="animate"
                className="absolute text-yellow-300"
                style={{
                  left: `${star.x + 200}px`,
                  top: `${star.y + 200}px`,
                  fontSize: `${star.size}px`,
                  filter: 'drop-shadow(0 0 4px rgba(255, 255, 0, 0.6))',
                }}
                transition={{
                  ...starVariants.animate.transition,
                  delay: star.delay,
                }}
              >
                ⭐
              </motion.div>
            ))}

            {/* Additional twinkling stars */}
            <motion.div
              className="absolute top-12 left-12 text-white text-lg opacity-60"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              ✨
            </motion.div>

            <motion.div
              className="absolute bottom-16 right-16 text-white text-sm opacity-70"
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: 1,
              }}
            >
              ✨
            </motion.div>

            <motion.div
              className="absolute top-20 left-32 text-blue-200 text-base opacity-50"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: 1.5,
              }}
            >
              ✨
            </motion.div>
          </div>

          <FloatingTransmission intensity="subtle" duration={4}>
            <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-white/50 ring-offset-2 ring-offset-background shadow-lg relative z-10">
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
              'Founder & CEO',
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
