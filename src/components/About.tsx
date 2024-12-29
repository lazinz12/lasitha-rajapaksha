import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl font-bold text-primary mb-8">About Me</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            A passionate professional with extensive expertise in programming, trading automation, and web development. 
            Proven track record in building robust solutions, automated systems, trading bots, and web applications.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            My approach integrates modern development practices with deep market understanding, 
            allowing me to deliver both technical excellence and trading insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};