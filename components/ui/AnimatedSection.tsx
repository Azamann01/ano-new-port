"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";

type AnimatedSectionProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      // `amount: "some"` (any part intersecting), NOT a fraction. A fraction
      // is unsatisfiable once an element is taller than 1/fraction viewports,
      // which silently leaves it at opacity 0 forever. That happened: the
      // October research article's body is ~4016px against an 812px mobile
      // viewport, so at most 20.2% could ever be visible against the old
      // `amount: 0.2` — the whole article rendered blank on a phone.
      // AnimatedSection wraps arbitrarily long content, so it must never
      // depend on how tall that content is.
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
