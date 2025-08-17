import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Festive elements components
const Snowflake = () => (
  <motion.div
    className="fixed pointer-events-none text-white text-2xl"
    initial={{ y: -20, x: Math.random() * window.innerWidth }}
    animate={{ 
      y: window.innerHeight,
      x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 100
    }}
    transition={{ 
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    ❄
  </motion.div>
);

const LanternEffect = () => (
  <motion.div
    className="fixed pointer-events-none text-yellow-500 text-3xl"
    initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 0 }}
    animate={{ 
      y: [0, 20, 0],
      opacity: [0.4, 1, 0.4],
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      top: `${Math.random() * 70}vh`,
      left: `${Math.random() * 90}vw`,
    }}
  >
    🏮
  </motion.div>
);

const FlowerPetal = () => (
  <motion.div
    className="fixed pointer-events-none text-2xl"
    initial={{ 
      y: -20, 
      x: Math.random() * window.innerWidth,
      rotate: 0
    }}
    animate={{ 
      y: window.innerHeight,
      x: Math.random() * window.innerWidth + (Math.random() - 0.5) * 200,
      rotate: 360
    }}
    transition={{ 
      duration: Math.random() * 5 + 3,
      repeat: Infinity,
      ease: "linear"
    }}
  >
    🌸
  </motion.div>
);

const LotusEffect = () => (
  <motion.div
    className="fixed pointer-events-none text-3xl"
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ 
      scale: [0.5, 1, 0.5],
      opacity: [0.2, 1, 0.2],
    }}
    transition={{ 
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    style={{
      top: `${Math.random() * 80}vh`,
      left: `${Math.random() * 90}vw`,
    }}
  >
    🪷
  </motion.div>
);

export const SeasonalEffects = () => {
  const [currentFestival, setCurrentFestival] = useState<string>("");
  
  useEffect(() => {
    // Seasonal effects disabled by default for cleaner experience
    // To enable, uncomment the checkFestival logic below
    setCurrentFestival("");
    
    /*
    const checkFestival = () => {
      const now = new Date();
      const month = now.getMonth();
      const date = now.getDate();
      
      // Christmas season (December)
      if (month === 11) {
        setCurrentFestival("christmas");
        return;
      }

      // Sinhala and Tamil New Year (April 13-14)
      if (month === 3 && (date === 13 || date === 14)) {
        setCurrentFestival("new-year");
        return;
      }

      // Check for Poya days (this is a simplified check - in reality, Poya dates vary)
      if (date === 15 || date === 14) { // Simplified Poya check
        setCurrentFestival("poya");
        return;
      }

      // Vesak (usually in May)
      if (month === 4 && (date >= 5 && date <= 7)) {
        setCurrentFestival("vesak");
        return;
      }

      setCurrentFestival("");
    };
    
    checkFestival();
    const interval = setInterval(checkFestival, 1000 * 60 * 60);
    
    return () => clearInterval(interval);
    */
  }, []);
  
  const renderFestiveEffects = () => {
    switch (currentFestival) {
      case "christmas":
        return (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 20 }).map((_, i) => (
              <Snowflake key={i} />
            ))}
          </div>
        );
      
      case "new-year":
        return (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 15 }).map((_, i) => (
              <FlowerPetal key={i} />
            ))}
          </div>
        );
      
      case "poya":
        return (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 10 }).map((_, i) => (
              <LotusEffect key={i} />
            ))}
          </div>
        );
      
      case "vesak":
        return (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 12 }).map((_, i) => (
              <LanternEffect key={i} />
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };
  
  return renderFestiveEffects();
};