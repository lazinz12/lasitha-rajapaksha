
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScrollToTopProps {
  showScrollButton: boolean;
}

export const ScrollToTop = ({ showScrollButton }: ScrollToTopProps) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {showScrollButton && (
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          <Button
            onClick={scrollToTop}
            variant="outline"
            size="icon"
            className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
          >
            <ChevronDown className="h-5 w-5 rotate-180" />
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
