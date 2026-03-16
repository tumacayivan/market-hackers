import { motion } from "framer-motion";
import { ProfilerScan, NetworkNodes } from "./CtosOverlay";

const MissionSection = () => {
  return (
    <section id="mission" className="relative py-32 overflow-hidden bg-dark-b cinematic-red bleed-bottom interference">
      <NetworkNodes />
      <div className="absolute inset-0 grain pointer-events-none" />
      <div className="absolute inset-0 scanline pointer-events-none opacity-30" />
      <div className="relative w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// OUR MISSION'}
          </p>
          
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-16 leading-[0.9]">
            Markets are<br /><span className="text-primary text-glow">complex systems.</span>
          </h2>

          <div className="space-y-4 mb-16">
            {[
              "Every system has patterns.",
              "Every pattern has behavior.",
              "Every behavior has weaknesses.",
            ].map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="font-mono text-xl md:text-2xl font-semibold text-secondary-foreground"
              >
                <span className="text-primary/30 mr-4 text-sm">{'//'}</span>{line}
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="border-l-2 border-primary/40 pl-8 py-6 bg-secondary/50 max-w-3xl relative"
          >
            <div className="absolute -left-[5px] top-6 w-2 h-2 bg-primary rotate-45" />
            <p className="font-mono text-lg text-muted-foreground mb-3">
              In cybersecurity, these weaknesses are called <span className="text-accent font-bold text-glow-accent">exploits</span>.
            </p>
            <p className="font-mono text-lg text-muted-foreground">
              In trading, they are called <span className="text-primary font-bold text-glow">alpha</span>.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
            className="mt-16 text-secondary-foreground text-lg md:text-xl leading-relaxed max-w-4xl font-medium"
          >
            Market Hackers trains traders to think like engineers and hackers—people who study systems deeply enough to understand how they behave and how to interact with them strategically.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionSection;
