import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ScanLine, DataFragments, HudCorners, GlitchBars, CtosStatusBar, HexGrid } from "./CtosOverlay";
import { Globe, DataRing } from "./GlobalNetworkSection";

const TypingText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 40);
    return () => clearInterval(interval);
  }, [started, text]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && <span className="animate-blink text-primary">█</span>}
    </span>
  );
};

const GlitchText = ({ children, className = "" }: { children: string; className?: string }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 100 + Math.random() * 150);
    };

    const scheduleNext = () => {
      const delay = 1500 + Math.random() * 2500;
      return setTimeout(() => {
        triggerGlitch();
        timerId = scheduleNext();
      }, delay);
    };

    let timerId = setTimeout(() => {
      triggerGlitch();
      timerId = scheduleNext();
    }, 1000);

    return () => clearTimeout(timerId);
  }, []);

  return (
    <span className={`relative inline-block ${className}`}>
      <span className={isGlitching ? "glitch-active" : ""}>{children}</span>
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

const DataRain = () => {
  const columns = Array.from({ length: 30 }, (_, i) => i);
  return (
    <div className="absolute inset-0 overflow-hidden opacity-[0.04] pointer-events-none">
      {columns.map((col) => (
        <div
          key={col}
          className="absolute top-0 font-mono text-xs text-primary leading-tight animate-data-scroll"
          style={{
            left: `${(col / 30) * 100}%`,
            animationDuration: `${15 + Math.random() * 20}s`,
            animationDelay: `${-Math.random() * 20}s`,
          }}
        >
          {Array.from({ length: 60 }, () =>
            Math.random() > 0.5 ? (Math.random() * 9999).toFixed(2) : ["BUY", "SELL", "HOLD", "NULL", "0xFF", "SYS"][Math.floor(Math.random() * 6)]
          ).join('\n')}
        </div>
      ))}
    </div>
  );
};

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark-b grain vignette cinematic-center ctos-sweep">
      <DataRain />
      <HexGrid />
      <ScanLine interval={5000} />
      <GlitchBars interval={7000} />
      <DataFragments />
      <HudCorners />
      <CtosStatusBar label="ctOS v2.0 // MARKET_HACKERS" />
      <div className="absolute inset-0 scanline pointer-events-none z-[3]" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/8 via-transparent to-background" />

      {/* 3D Globe as background — centered right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="absolute inset-0 pointer-events-none z-[4]"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px]">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.5} />
            <Globe />
            <DataRing radius={2.8} speed={0.15} color="#cc2020" />
            <DataRing radius={3.1} speed={-0.1} color="#d4a020" />
            <DataRing radius={3.4} speed={0.08} color="#cc2020" />
          </Canvas>
        </div>
      </motion.div>
      
      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="font-mono text-sm tracking-[0.3em] text-primary/70 uppercase flicker">
            root@market-hackers:~$ ./init_system
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-mono text-7xl md:text-9xl lg:text-[12rem] font-extrabold tracking-tighter leading-[0.85] mb-8 w-full"
        >
          <GlitchText className="text-primary text-glow block">MARKET</GlitchText>
          <GlitchText className="text-foreground block">HACKERS</GlitchText>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="max-w-3xl mb-12"
        >
          <p className="font-mono text-2xl md:text-3xl font-bold text-primary/80 mb-10">
            <TypingText text="Hack the Financial System" delay={1400} />
          </p>

          <div className="space-y-2 text-muted-foreground font-mono text-base md:text-lg">
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.5 }}>
              <span className="text-primary/40 mr-3">01</span>Trillions of dollars.
            </motion.p>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.8 }}>
              <span className="text-primary/40 mr-3">02</span>Millions of participants.
            </motion.p>
            <motion.p initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 4.1 }}>
              <span className="text-primary/40 mr-3">03</span>Endless streams of data.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.8 }}
            className="mt-10 space-y-2 font-mono text-lg md:text-xl"
          >
            <p className="text-muted-foreground">Most people try to trade it.</p>
            <p className="text-primary font-bold text-glow text-2xl md:text-3xl">We choose to hack it.</p>
            <p className="mt-8 text-xl md:text-2xl text-muted-foreground/80">
              — <span className="font-body font-bold text-2xl md:text-4xl text-white uppercase">IVAN TUMACAY</span>
            </p>
            <p className="mt-2 font-mono text-base md:text-lg text-muted-foreground/70">
              Founder · Developer · Researcher · Trader
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 5.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#join"
            className="inline-flex items-center justify-center px-10 py-4 font-mono text-base font-bold bg-primary text-primary-foreground border border-primary hover:bg-primary/90 transition-all box-glow glitch-hover"
          >
            {'>'} JOIN_MARKET_HACKERS
          </a>
          <a
            href="#path"
            className="inline-flex items-center justify-center px-10 py-4 font-mono text-base font-bold border border-border text-foreground hover:border-primary/50 hover:text-primary transition-all"
          >
            {'>'} EXPLORE_PATH
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 6.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-px h-20 bg-gradient-to-b from-primary/60 to-transparent animate-pulse-glow" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
