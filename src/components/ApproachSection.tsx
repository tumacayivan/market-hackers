import { motion } from "framer-motion";
import { NetworkNodes, DataFragments } from "./CtosOverlay";

const principles = [
  { cmd: "study", desc: "market behavior" },
  { cmd: "test", desc: "hypotheses with data" },
  { cmd: "build", desc: "structured strategies" },
  { cmd: "refine", desc: "systems through research" },
];

const ApproachSection = () => {
  return (
    <section className="relative py-32 bg-dark-a cinematic-amber ctos-sweep">
      <NetworkNodes />
      <DataFragments />
      <div className="absolute inset-0 grain pointer-events-none opacity-50" />
      
      <div className="relative w-full px-6 md:px-12 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
              {'// OUR APPROACH'}
            </p>
            <h2 className="font-mono text-5xl md:text-7xl font-extrabold tracking-tight text-foreground mb-8 leading-[0.9]">
              Think like a<br /><span className="text-primary text-glow">system designer.</span>
            </h2>
            <p className="text-secondary-foreground text-lg leading-relaxed mb-10 font-medium">
              Most trading education focuses on indicators, predictions, and shortcuts. Market Hackers focuses on process, not prediction.
            </p>

            <div className="space-y-3">
              {principles.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 font-mono text-base md:text-lg py-2 border-l-2 border-border pl-4 hover:border-primary/60 transition-colors"
                >
                  <span className="text-primary font-bold">{p.cmd}</span>
                  <span className="text-muted-foreground/50">|</span>
                  <span className="text-foreground">{p.desc}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="border border-border bg-card/80 font-mono text-sm overflow-hidden"
          >
            {/* Terminal header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <span className="w-2.5 h-2.5 rounded-full bg-primary/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-muted-foreground/40" />
              <span className="ml-3 text-xs text-muted-foreground">strategy.py</span>
            </div>
            <div className="p-6 scanline">
              <pre className="text-muted-foreground leading-relaxed">
                <code>
{`class MarketHacker:
    def __init__(self):
        self.edge = `}<span className="text-accent">None</span>{`
        self.system = `}<span className="text-accent">None</span>{`

    def analyze(self, market_data):
        `}<span className="text-primary/60"># scan for vulnerabilities</span>{`
        patterns = self.find_patterns(
            market_data
        )
        return self.validate(patterns)

    def execute(self, strategy):
        if strategy.has_edge():
            return strategy.`}<span className="text-primary">deploy</span>{`()
        return self.refine(strategy)

    `}<span className="text-primary font-bold"># No predictions.</span>{`
    `}<span className="text-primary font-bold"># Only systems.</span>
                </code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
