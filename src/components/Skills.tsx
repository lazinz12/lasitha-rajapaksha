import { motion } from "framer-motion";
import { Code, Database, Server, GitBranch, Bot, Globe, ChartBar, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const skillsData = [
  {
    category: "Programming Languages",
    skills: ["Python", "C#", "Java", "JavaScript"],
    icon: Code
  },
  {
    category: "Frameworks & Libraries",
    skills: [".NET", "Angular", "React", "Bootstrap", "Django", "Flask"],
    icon: Server
  },
  {
    category: "Databases & Cloud",
    skills: ["MySQL", "PostgreSQL", "Supabase", "Azure SQL", "NoSQL Databases"],
    icon: Database
  },
  {
    category: "Version Control & Tools",
    skills: ["Git", "GitHub", "Docker", "Vagrant"],
    icon: GitBranch
  },
  {
    category: "Automation & Scripting",
    skills: ["Backlink Indexing", "Auto-Clickers", "Script Automation", "Bot Development"],
    icon: Bot
  },
  {
    category: "Web Development",
    skills: ["Full-stack development", "Responsive Design", "SEO Optimization"],
    icon: Globe
  },
  {
    category: "Data Analysis & Tools",
    skills: ["Pandas", "Matplotlib", "Jupyter Notebooks"],
    icon: ChartBar
  },
  {
    category: "Trading Platforms & Systems",
    skills: ["MetaTrader (MT4/MT5)", "ICT Trading Concepts", "Algorithmic Trading", "Technical Analysis"],
    icon: LineChart
  }
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Skills & Expertise</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillsData.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon className="h-5 w-5" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc list-inside space-y-2">
                      {category.skills.map((skill) => (
                        <li key={skill} className="text-muted-foreground">{skill}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};