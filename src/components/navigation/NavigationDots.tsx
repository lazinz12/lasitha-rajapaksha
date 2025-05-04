
import { motion } from "framer-motion";

interface NavigationDotsProps {
  sections: string[];
  activeSection: string;
}

export const NavigationDots = ({ sections, activeSection }: NavigationDotsProps) => {
  return (
    <motion.div 
      className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:flex flex-col items-center space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1 }}
    >
      {sections.map((section) => (
        <motion.div
          key={section}
          className={`w-3 h-3 rounded-full cursor-pointer ${
            activeSection === section ? "bg-primary w-4 h-4" : "bg-gray-300"
          }`}
          whileHover={{ scale: 1.5 }}
          onClick={() => {
            const element = document.getElementById(section);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          title={section.charAt(0).toUpperCase() + section.slice(1)}
        />
      ))}
    </motion.div>
  );
};
