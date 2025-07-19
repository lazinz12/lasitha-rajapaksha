import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const experiences = [
  {
    title: "Trading Automation Specialist",
    company: "Market Minds Trading Team",
    role: "Lead Developer",
    duration: "2023 - Present",
    responsibilities: [
      "Designed and developed automated trading bots using ICT 2024 strategies, integrating Telegram signals for real-time trade execution.",
      "Built and maintained MT5 trading scripts for risk management, automated entry, and exit strategies.",
      "Developed custom trading algorithms utilizing Azure OpenAI API for predictive analysis and trade recommendations.",
      "Automated wallet checking and private key generation applications for cryptocurrency-based systems."
    ]
  },
  {
    title: "Web Developer & Full-Stack Developer",
    company: "",
    role: "Full-Stack Developer",
    duration: "2021 - 2023",
    responsibilities: [
      "Developed and maintained scalable web applications using Django, React, and Flask, with a focus on backend optimization and frontend interactivity.",
      "Created dynamic user interfaces, real-time notification systems, and personalized user engagement features for the Backlink Bazarl platform.",
      "Built custom donation pages using Java and Stripe API, ensuring secure and seamless payment processing.",
      "Designed responsive websites optimized for SEO, integrated Supabase for backend data management and analytics."
    ]
  },
  {
    title: "Python Developer & Automation Specialist",
    company: "",
    role: "Python Developer",
    duration: "2019 - 2021",
    responsibilities: [
      "Developed Python-based applications for backlink index checking, SEO optimization, and content generation.",
      "Designed and implemented auto-clicker tools for game automation and interaction using color detection.",
      "Created a subtitle converter using the Google Translate API, enabling multilingual subtitle translations and managing large content efficiently.",
      "Developed economic calendar-based forex news analyzers, helping traders make informed buy/sell decisions."
    ]
  }
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Professional Experience</h2>
        </motion.div>
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <Briefcase className="h-6 w-6" />
                    <div>
                      <h3 className="text-xl font-bold">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.role} | {exp.duration}</p>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {exp.responsibilities.map((resp, i) => (
                      <li key={i} className="text-muted-foreground">{resp}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};