
import { motion } from "framer-motion";
import { Youtube, Linkedin, Instagram, Github, Facebook } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Contact = () => {
  const socialLinks = [
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@lasinsrajj",
      icon: Youtube,
      username: "@lasinsrajj",
      color: "hover:text-red-600 hover:bg-red-50"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/lasitharajapaksha/",
      icon: Linkedin,
      username: "Lasitha Rajapaksha",
      color: "hover:text-blue-600 hover:bg-blue-50"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/lasins_raj/",
      icon: Instagram,
      username: "@lasins_raj",
      color: "hover:text-pink-600 hover:bg-pink-50"
    },
    {
      platform: "GitHub",
      url: "https://github.com/lasinsraj",
      icon: Github,
      username: "@lasinsraj",
      color: "hover:text-gray-900 hover:bg-gray-50"
    },
    {
      platform: "Facebook",
      url: "https://web.facebook.com/lasinsrajj",
      icon: Facebook,
      username: "Lasins Raj",
      color: "hover:text-blue-800 hover:bg-blue-50"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.platform}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className={`p-8 transition-all duration-300 hover:shadow-lg hover:scale-105`}>
                      <div className="flex flex-col items-center space-y-4">
                        <Icon className="w-12 h-12" />
                        <h3 className="font-semibold text-xl">{link.platform}</h3>
                        <p className="text-base text-muted-foreground">{link.username}</p>
                      </div>
                    </Card>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
