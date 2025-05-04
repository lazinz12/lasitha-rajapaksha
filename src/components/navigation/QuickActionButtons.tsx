
import { motion } from "framer-motion";
import { Code, Activity, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export const QuickActionButtons = () => {
  return (
    <motion.div
      className="fixed left-8 bottom-8 z-40 hidden lg:flex flex-col space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
    >
      <a href="/tools/background-remover">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
          title="Background Remover Tool"
        >
          <Code className="h-5 w-5" />
        </Button>
      </a>
      <a href="/trading-ideas">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
          title="Trading Ideas"
        >
          <Activity className="h-5 w-5" />
        </Button>
      </a>
      <a href="/blog">
        <Button
          variant="outline"
          size="icon"
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm hover:bg-primary hover:text-white transition-all duration-300"
          title="Blog"
        >
          <Briefcase className="h-5 w-5" />
        </Button>
      </a>
    </motion.div>
  );
};
