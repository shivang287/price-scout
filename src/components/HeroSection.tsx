import { Search } from "lucide-react";
import { motion } from "framer-motion";

type HeroSectionProps = {
  searchQuery: string;
  onSearchChange: (value: string) => void;
};

export const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <section className="gradient-hero px-4 pb-12 pt-16 md:pt-24 md:pb-16">
      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl"
        >
          Compare Prices.
          <br />
          <span className="text-accent">Save More.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-primary-foreground/70 text-lg"
        >
          Instantly compare prices across Blinkit, Amazon & Flipkart
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="relative mx-auto mt-8 max-w-xl"
        >
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search for a product..."
            className="w-full rounded-2xl border-0 bg-card py-4 pl-12 pr-4 text-card-foreground shadow-card-hover placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </motion.div>
      </div>
    </section>
  );
};
