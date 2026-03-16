import { motion } from "framer-motion";
import { ScanLine, HudCorners, DataFragments, GlitchBars } from "./CtosOverlay";

const JoinSection = () => {
  return (
    <section id="join" className="relative py-32 bg-dark-b grain cinematic-center vignette interference">
      <ScanLine interval={4000} />
      <GlitchBars interval={5000} />
      <HudCorners />
      <DataFragments />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/8 via-primary/3 to-transparent" />
      <div className="absolute top-0 left-0 right-0 red-line" />
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary uppercase mb-6 flicker">
            {'// INITIATE SEQUENCE'}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter text-foreground mb-8 leading-[0.85] glitch-hover">
            Your journey<br /><span className="text-primary text-glow">starts here.</span>
          </h2>

          <div className="flex items-center gap-4 md:gap-6 font-mono text-xl md:text-2xl font-bold mb-10">
            <span className="text-muted-foreground">Rookie</span>
            <span className="text-primary text-glow">→</span>
            <span className="text-muted-foreground">Engineer</span>
            <span className="text-primary text-glow">→</span>
            <span className="text-primary font-extrabold text-glow">Hacker</span>
          </div>

          <p className="text-secondary-foreground text-lg md:text-xl leading-relaxed mb-12 max-w-3xl font-medium">
            Learn how markets truly behave. Develop systematic strategies. And become part of a community dedicated to hacking the financial markets through intelligence and discipline.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-14 py-5 font-mono text-lg font-bold bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-all box-glow tracking-wider glitch-hover"
            >
              {'>'} JOIN_MARKET_HACKERS
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-14 py-5 font-mono text-lg font-bold border border-border text-foreground hover:border-primary/50 hover:text-primary transition-all tracking-wider"
            >
              {'>'} JOIN_DISCORD
            </motion.a>
          </div>

          <div className="mt-20 border-t border-border/30 pt-8 max-w-2xl">
            <p className="font-mono text-sm text-muted-foreground mb-2">
              <span className="text-primary">root@market-hackers:~$</span> echo $WELCOME_MSG
            </p>
            <p className="font-mono text-sm text-primary/60">
              "The people who are crazy enough to think they can change the world are the ones who do."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinSection;
