import { motion } from "framer-motion";
import { HexGrid, CtosStatusBar } from "./CtosOverlay";

const tools = [
  { name: "Python", category: "LANGUAGE", desc: "Primary language for strategy development" },
  { name: "Pandas", category: "DATA", desc: "Data manipulation and analysis" },
  { name: "NumPy", category: "COMPUTE", desc: "Numerical computing for models" },
  { name: "Backtrader", category: "FRAMEWORK", desc: "Strategy backtesting engine" },
  { name: "TradingView", category: "CHARTING", desc: "Market visualization and analysis" },
  { name: "Jupyter", category: "RESEARCH", desc: "Interactive research notebooks" },
  { name: "PostgreSQL", category: "DATABASE", desc: "Market data storage" },
  { name: "Scikit-learn", category: "ML", desc: "Machine learning models" },
];

const ToolsSection = () => {
  return (
    <section className="relative py-24 bg-dark-b grid-bg bleed-top bleed-bottom interference">
      <HexGrid />
      <CtosStatusBar label="ARSENAL // LOADED" />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// ARSENAL'}
          </p>
          <h2 className="font-mono text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.9] mb-4">
            Tools of the <span className="text-primary text-glow">trade.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            The technologies and frameworks used inside Market Hackers to build, test, and deploy trading systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="border border-border bg-card/30 p-5 hover:border-primary/40 hover:bg-card/60 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-xs text-primary/50 tracking-wider">{tool.category}</span>
                <span className="w-2 h-2 bg-primary/30 group-hover:bg-primary transition-colors duration-300 rotate-45" />
              </div>
              <h3 className="font-mono text-lg font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                {tool.name}
              </h3>
              <p className="text-sm text-muted-foreground">{tool.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsSection;
