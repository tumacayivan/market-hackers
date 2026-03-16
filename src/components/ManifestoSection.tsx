import { motion } from "framer-motion";
import { useState } from "react";
import { GlitchBars, HexGrid } from "./CtosOverlay";

const HoverGlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsGlitching(true)}
      onMouseLeave={() => setIsGlitching(false)}
    >
      <span>{children}</span>
      {isGlitching && (
        <>
          <span
            className="absolute inset-0 text-primary/80"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
              transform: "translate(-4px, -2px)",
              opacity: 0.8,
            }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0 text-accent/60"
            style={{
              clipPath: "polygon(0 66%, 100% 66%, 100% 100%, 0 100%)",
              transform: "translate(4px, 2px)",
              opacity: 0.8,
            }}
            aria-hidden
          >
            {children}
          </span>
          <span
            className="absolute inset-0"
            style={{
              clipPath: "polygon(0 33%, 100% 33%, 100% 66%, 0 66%)",
              transform: "translate(2px, 0)",
              opacity: 0.6,
            }}
            aria-hidden
          >
            {children}
          </span>
        </>
      )}
    </span>
  );
};

const lines = [
  "We are not traders.",
  "We are system engineers.",
  "We don't follow signals.",
  "We reverse-engineer the source code of financial markets.",
  "We don't predict.",
  "We exploit.",
  "The market is the largest machine ever built.",
  "And every machine can be hacked.",
];

const ManifestoSection = () => {
  return (
    <section className="relative py-32 overflow-hidden bg-dark-b cinematic-center grain vignette interference">
      <HexGrid />
      <GlitchBars interval={6000} />
      
      <div className="absolute top-0 left-0 right-0 red-line" />
      <div className="absolute bottom-0 left-0 right-0 red-line" />
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary uppercase mb-6 flicker">
            {'// MANIFESTO'}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-9xl font-extrabold tracking-tighter leading-[0.85]">
            <HoverGlitchText className="text-primary text-glow cursor-pointer">fsociety</HoverGlitchText>
            <br />
            <span className="text-foreground">for markets.</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl space-y-0">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border-b border-border/30 py-4 md:py-6 group"
            >
              <div className="flex items-start gap-4 md:gap-6">
                <span className="font-mono text-xs text-primary/30 mt-1 shrink-0 w-8">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="font-mono text-lg md:text-2xl lg:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                  {line}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoSection;
