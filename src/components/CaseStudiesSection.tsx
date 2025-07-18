import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, TrendingUp, Users, Clock } from "lucide-react";

const caseStudies = [
  {
    title: "E-commerce Platform Redesign",
    description: "Complete redesign and development of a modern e-commerce platform with improved user experience and conversion rates.",
    image: "/lovable-uploads/case-study-1.jpg",
    tags: ["React", "TypeScript", "Supabase", "Stripe"],
    metrics: [
      { label: "Conversion Rate", value: "+45%", icon: TrendingUp },
      { label: "User Engagement", value: "+60%", icon: Users },
      { label: "Page Load Time", value: "-40%", icon: Clock }
    ],
    client: "RetailTech Solutions",
    timeline: "3 months",
    link: "#"
  },
  {
    title: "SaaS Dashboard & Analytics",
    description: "Built a comprehensive dashboard with real-time analytics and reporting features for a growing SaaS company.",
    image: "/lovable-uploads/case-study-2.jpg",
    tags: ["React", "Chart.js", "PostgreSQL", "Docker"],
    metrics: [
      { label: "Data Processing", value: "+200%", icon: TrendingUp },
      { label: "User Satisfaction", value: "9.2/10", icon: Users },
      { label: "Report Generation", value: "-75%", icon: Clock }
    ],
    client: "DataFlow Inc.",
    timeline: "4 months",
    link: "#"
  },
  {
    title: "Educational Platform",
    description: "Developed an interactive learning platform with video streaming, progress tracking, and assessment tools.",
    image: "/lovable-uploads/case-study-3.jpg",
    tags: ["Next.js", "MongoDB", "WebRTC", "AWS"],
    metrics: [
      { label: "Student Retention", value: "+80%", icon: TrendingUp },
      { label: "Course Completion", value: "+65%", icon: Users },
      { label: "Video Load Time", value: "-50%", icon: Clock }
    ],
    client: "EduTech Academy",
    timeline: "5 months",
    link: "#"
  }
];

export const CaseStudiesSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Case Studies</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real projects, real results. See how I've helped businesses achieve their goals through thoughtful development.
          </p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  {/* Image */}
                  <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <img
                      src={study.image}
                      alt={study.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>

                  {/* Content */}
                  <CardContent className={`p-8 flex flex-col justify-center ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold mb-2">{study.title}</h3>
                      <p className="text-muted-foreground mb-4">{study.description}</p>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {study.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>

                      {/* Metrics */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                        {study.metrics.map((metric) => (
                          <div key={metric.label} className="text-center">
                            <metric.icon className="h-5 w-5 text-primary mx-auto mb-1" />
                            <div className="font-bold text-lg">{metric.value}</div>
                            <div className="text-sm text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Client and Timeline */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Client</p>
                          <p className="font-medium">{study.client}</p>
                        </div>
                        <div className="mt-2 sm:mt-0">
                          <p className="text-sm text-muted-foreground">Timeline</p>
                          <p className="font-medium">{study.timeline}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <Button variant="outline" className="w-fit">
                        View Case Study
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Project?</h3>
          <p className="text-muted-foreground mb-6">
            Let's discuss how I can help you achieve similar results for your business.
          </p>
          <Button size="lg">
            Get Started Today
          </Button>
        </motion.div>
      </div>
    </section>
  );
};