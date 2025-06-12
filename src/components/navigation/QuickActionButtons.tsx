
import { motion } from "framer-motion";
import { Code, Activity, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const QuickActionButtons = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-40 flex flex-col gap-3"
    >
      <Link to="/tools/metadata-remover">
        <Button
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
        >
          <Activity className="h-5 w-5 mr-2" />
          Metadata Remover
        </Button>
      </Link>
      
      <Link to="/blog">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Code className="h-5 w-5 mr-2" />
          Blog
        </Button>
      </Link>
      
      <Link to="/trading-ideas">
        <Button
          variant="outline"
          size="lg"
          className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <Briefcase className="h-5 w-5 mr-2" />
          Trading Ideas
        </Button>
      </Link>
    </motion.div>
  );
};
