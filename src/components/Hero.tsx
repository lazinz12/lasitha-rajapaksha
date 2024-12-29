import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Hero = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="space-y-6"
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mx-auto"
        >
          <Avatar className="w-32 h-32 mx-auto mb-6">
            <AvatarImage src="/lovable-uploads/a2b6e303-1967-404d-96fd-88120fe20bc3.png" alt="Lasitha Rajapaksha" />
            <AvatarFallback>LR</AvatarFallback>
          </Avatar>
        </motion.div>
        <h1 className="text-4xl md:text-6xl font-bold text-primary">
          Lasitha Rajapaksha
        </h1>
        <p className="text-xl md:text-2xl text-gray-600">
          Developer and Forex Trader
        </p>
        <p className="text-lg text-gray-500">Market Minds</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8"
      >
        <ArrowDown className="animate-bounce" />
      </motion.div>
    </section>
  );
};