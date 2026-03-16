import { motion } from "framer-motion";
import LevelCard from "./LevelCard";
import { ProfilerScan, CtosStatusBar } from "./CtosOverlay";

const levels = [
  {
    level: 1,
    title: "ROOKIE",
    subtitle: "Learning the System",
    description: "You are introduced to the architecture of the financial markets. You learn how price behaves, how liquidity moves, and how traders interact with the system. This is where curiosity turns into understanding.",
    items: [
      "How financial markets operate",
      "Market structure and price behavior",
      "Risk management principles",
      "Trading psychology and discipline",
      "Understanding volatility and liquidity",
      "Basic systematic trading concepts",
    ],
    tagline: "The goal is to understand the system first.",
  },
  {
    level: 2,
    title: "ENGINEER",
    subtitle: "Building the Strategy",
    description: "Once you understand the system, the next step is building tools and frameworks to interact with it. Engineers build systems, models, and strategies that can be tested, refined, and improved.",
    items: [
      "Strategy development frameworks",
      "Backtesting trading strategies",
      "Identifying market inefficiencies",
      "Data-driven trading analysis",
      "Multi-timeframe market structure",
      "Building rule-based trading systems",
    ],
    tagline: "Engineers design the systems behind signals.",
  },
  {
    level: 3,
    title: "HACKER",
    subtitle: "Exploiting Market Inefficiencies",
    description: "Trading evolves into system engineering. Hackers learn how to combine strategy, data, and technology to create quantitative trading systems capable of interacting with the market intelligently.",
    items: [
      "Quantitative trading strategies",
      "Algorithmic trading systems",
      "Data science for financial markets",
      "Machine learning trading models",
      "Strategy validation and optimization",
      "Portfolio and risk management systems",
    ],
    tagline: "Hackers build systems designed to exploit the market.",
  },
];

const PathSection = () => {
  return (
    <section id="path" className="relative py-32 bg-dark-a grid-bg cinematic-amber bleed-top ctos-sweep">
      <CtosStatusBar label="TRAINING_PROTOCOL // ACTIVE" />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// THE MARKET HACKERS PATH'}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[0.9]">
            Every hacker starts<br /><span className="text-primary text-glow">somewhere.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium">
            Members progress through three stages as they learn to decode and engineer strategies for the financial markets.
          </p>
        </motion.div>

        {/* Progress line */}
        <div className="hidden lg:flex mb-12">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex items-center gap-0 w-full max-w-4xl origin-left"
          >
            {["ROOKIE", "ENGINEER", "HACKER"].map((label, i) => (
              <div key={label} className="flex items-center flex-1">
                <div className="w-3 h-3 bg-primary border border-primary rotate-45" />
                {i < 2 && <div className="h-px flex-1 bg-gradient-to-r from-primary/60 to-primary/20" />}
              </div>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {levels.map((level, i) => (
            <LevelCard key={level.level} {...level} delay={i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PathSection;
