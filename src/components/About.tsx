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
            I am a passionate Developer and Forex Trader with expertise in building
            innovative solutions and analyzing financial markets. At Market Minds,
            I combine my technical skills with market knowledge to create impactful
            results.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed">
            My approach integrates modern development practices with deep market
            understanding, allowing me to deliver both technical excellence and
            trading insights.
          </p>
        </motion.div>
      </div>
    </section>
  );
};