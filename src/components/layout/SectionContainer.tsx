
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionContainerProps {
  id: string;
  children: ReactNode;
}

export const SectionContainer = ({ id, children }: SectionContainerProps) => {
  return (
    <section id={id}>
      {children}
    </section>
  );
};
