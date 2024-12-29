import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const certifications = [
  {
    title: "Attract and Engage Customers with Digital Marketing",
    issuer: "Google",
    date: "Feb 2024",
    skills: ["Web Analytics"]
  },
  {
    title: "Build a Free Website with WordPress",
    issuer: "Coursera Project Network",
    date: "Feb 2024",
    skills: ["WordPress"]
  },
  {
    title: "Foundations of Digital Marketing and E-commerce",
    issuer: "Google",
    date: "Feb 2024"
  },
  {
    title: "From Likes to Leads: Interact with Customers Online",
    issuer: "Google",
    date: "Feb 2024"
  },
  {
    title: "Google Ads for Beginners",
    issuer: "Coursera Project Network",
    date: "Feb 2024"
  },
  {
    title: "Increase SEO Traffic with WordPress",
    issuer: "Coursera Project Network",
    date: "Feb 2024",
    skills: ["Web Analytics", "Search Engine Optimization (SEO)"]
  },
  {
    title: "Think Outside the Inbox: Email Marketing",
    issuer: "Google",
    date: "Feb 2024"
  }
];

export const Certifications = () => {
  return (
    <section id="certifications" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-primary mb-4">Licenses & Certifications</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    {cert.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-gray-500 text-sm">{cert.date}</p>
                  {cert.skills && (
                    <div className="mt-2">
                      <p className="text-sm font-semibold">Skills:</p>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {cert.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};