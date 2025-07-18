
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Code, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: "10K+",
    label: "Users Served",
    description: "Across CompressGo platform"
  },
  {
    icon: Code,
    value: "50+",
    label: "Projects Completed",
    description: "Full-stack applications"
  },
  {
    icon: Award,
    value: "5+",
    label: "Years Experience",
    description: "In web development"
  },
  {
    icon: Globe,
    value: "15+",
    label: "Tools Created",
    description: "Free online utilities"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Impact & Achievements</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building solutions that make a difference in the digital world
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 rounded-full bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="font-semibold mb-1">{stat.label}</p>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
