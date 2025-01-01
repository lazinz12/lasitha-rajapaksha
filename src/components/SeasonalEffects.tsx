import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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

export const SeasonalEffects = () => {
  const [season, setSeason] = useState<string>("");
  
  useEffect(() => {
    const checkSeason = () => {
      const now = new Date();
      const month = now.getMonth();
      const day = now.getDate();
      
      // Christmas season (December)
      if (month === 11) {
        setSeason("christmas");
      }
      // Add more seasonal checks here as needed
      else {
        setSeason("");
      }
    };
    
    checkSeason();
    const interval = setInterval(checkSeason, 1000 * 60 * 60); // Check every hour
    
    return () => clearInterval(interval);
  }, []);
  
  if (season === "christmas") {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {Array.from({ length: 20 }).map((_, i) => (
          <Snowflake key={i} />
        ))}
      </div>
    );
  }
  
  return null;
};