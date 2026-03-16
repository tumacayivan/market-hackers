import { motion } from "framer-motion";
import { ScanLine, DataFragments } from "./CtosOverlay";

const features = [
  "collaborative learning",
  "strategy discussions",
  "trading research",
  "system development",
  "market analysis",
];

const forWho = [
  "beginners who want a structured way to learn trading",
  "traders who want to develop real strategies",
  "professionals interested in systematic trading",
  "people curious about quantitative and algorithmic trading",
];

const CommunitySection = () => {
  return (
    <section id="community" className="relative py-32 bg-dark-a cinematic-red vignette ctos-sweep">
      <ScanLine interval={9000} />
      <DataFragments />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// COMMUNITY'}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-8 leading-[0.9]">
            More than a<br /><span className="text-primary text-glow">course.</span>
          </h2>
          <p className="text-secondary-foreground text-lg md:text-xl leading-relaxed max-w-3xl font-medium">
            A community of traders, builders, and analysts who share the same goal: understanding and mastering the system.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-24 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="border border-border bg-card/50 p-8 hover:border-primary/30 transition-colors"
          >
            <h3 className="font-mono text-base font-bold text-primary mb-6">{'>'} INSIDE THE COMMUNITY</h3>
            <ul className="space-y-3">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-base text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="border border-border bg-card/50 p-8 hover:border-accent/30 transition-colors"
          >
            <h3 className="font-mono text-base font-bold text-accent mb-6">{'>'} WHO IT'S FOR</h3>
            <ul className="space-y-3">
              {forWho.map((f, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Philosophy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-10">
            {'// THE PHILOSOPHY'}
          </p>
          <div className="space-y-2 font-mono text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[0.95]">
            <p className="text-foreground">Understand the system.</p>
            <p className="text-primary text-glow">Engineer the strategy.</p>
            <p className="text-accent text-glow-accent">Exploit the edge.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;
