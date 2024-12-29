import { motion } from "framer-motion";
import { Youtube, Linkedin, Instagram } from "lucide-react";
import { Card } from "@/components/ui/card";

export const Contact = () => {
  const socialLinks = [
    {
      platform: "YouTube",
      url: "https://www.youtube.com/@lasinsrajj",
      icon: Youtube,
      username: "@lasinsrajj",
      color: "hover:text-red-600"
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/lasitharajapaksha/",
      icon: Linkedin,
      username: "lasitharajapaksha",
      color: "hover:text-blue-600"
    },
    {
      platform: "Instagram",
      url: "https://www.instagram.com/lasinsraj/",
      icon: Instagram,
      username: "@lasinsraj",
      color: "hover:text-pink-600"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">Get in Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
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
                    <Card className="p-6 hover:shadow-lg transition-all">
                      <div className="flex flex-col items-center space-y-3">
                        <Icon className={`w-8 h-8 ${link.color}`} />
                        <h3 className="font-semibold text-lg">{link.platform}</h3>
                        <p className="text-sm text-gray-600">{link.username}</p>
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