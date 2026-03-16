import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// Horizontal scan line that sweeps down periodically
export const ScanLine = ({ interval = 6000, color = "primary" }: { interval?: number; color?: string }) => {
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setScanning(true);
      setTimeout(() => setScanning(false), 1500);
    };
    trigger();
    const id = setInterval(trigger, interval);
    return () => clearInterval(id);
  }, [interval]);

  if (!scanning) return null;

  return (
    <motion.div
      className="absolute left-0 right-0 h-px pointer-events-none z-20"
      style={{
        background: `linear-gradient(90deg, transparent, hsl(var(--${color}) / 0.6), hsl(var(--${color}) / 0.15), transparent)`,
        boxShadow: `0 0 20px hsl(var(--${color}) / 0.3), 0 0 60px hsl(var(--${color}) / 0.1)`,
      }}
      initial={{ top: "0%" }}
      animate={{ top: "100%" }}
      transition={{ duration: 1.5, ease: "linear" }}
    />
  );
};

// Corner bracket HUD elements
export const HudCorners = ({ className = "" }: { className?: string }) => {
  const cornerStyle = "absolute w-6 h-6 pointer-events-none z-10";
  return (
    <div className={`absolute inset-4 ${className}`}>
      <div className={`${cornerStyle} top-0 left-0 border-t border-l border-primary/25`} />
      <div className={`${cornerStyle} top-0 right-0 border-t border-r border-primary/25`} />
      <div className={`${cornerStyle} bottom-0 left-0 border-b border-l border-primary/25`} />
      <div className={`${cornerStyle} bottom-0 right-0 border-b border-r border-primary/25`} />
    </div>
  );
};

// Floating data fragments
export const DataFragments = () => {
  const fragments = [
    { text: "SYS://0x4F2A", x: "5%", y: "15%", delay: 0 },
    { text: "NODE_ACTIVE", x: "85%", y: "25%", delay: 1.2 },
    { text: "SCAN:OK", x: "92%", y: "70%", delay: 2.5 },
    { text: "PID:7741", x: "8%", y: "80%", delay: 3.1 },
    { text: "UPLINK", x: "75%", y: "10%", delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      {fragments.map((f, i) => (
        <motion.span
          key={i}
          className="absolute font-mono text-[10px] text-primary/15 tracking-wider"
          style={{ left: f.x, top: f.y }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.4, 0] }}
          transition={{
            duration: 4,
            delay: f.delay,
            repeat: Infinity,
            repeatDelay: 6 + i * 2,
          }}
        >
          {f.text}
        </motion.span>
      ))}
    </div>
  );
};

// Network connection nodes
export const NetworkNodes = () => {
  const nodes = Array.from({ length: 8 }, (_, i) => ({
    x: 10 + Math.random() * 80,
    y: 10 + Math.random() * 80,
  }));

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-[5] opacity-[0.06]">
      {/* Connection lines */}
      {nodes.map((node, i) =>
        nodes.slice(i + 1).map((target, j) => {
          const dist = Math.hypot(target.x - node.x, target.y - node.y);
          if (dist > 40) return null;
          return (
            <motion.line
              key={`${i}-${j}`}
              x1={`${node.x}%`}
              y1={`${node.y}%`}
              x2={`${target.x}%`}
              y2={`${target.y}%`}
              stroke="hsl(var(--primary))"
              strokeWidth="0.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 2, delay: i * 0.3 }}
            />
          );
        })
      )}
      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.circle
          key={i}
          cx={`${node.x}%`}
          cy={`${node.y}%`}
          r="2"
          fill="hsl(var(--primary))"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.5, 1], opacity: [0, 0.8, 0.5] }}
          transition={{ duration: 1, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
};

// Profiler-style scanning overlay that triggers on scroll
export const ProfilerScan = ({ children }: { children?: React.ReactNode }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (isInView && !scanned) {
      setTimeout(() => setScanned(true), 800);
    }
  }, [isInView, scanned]);

  return (
    <div ref={ref} className="relative">
      {children}
      {isInView && !scanned && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-30"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <motion.div
            className="absolute left-0 right-0 h-[2px]"
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--primary) / 0.8), transparent)",
              boxShadow: "0 0 30px hsl(var(--primary) / 0.4)",
            }}
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </div>
  );
};

// Hexagonal grid pattern overlay
export const HexGrid = () => (
  <div className="absolute inset-0 pointer-events-none z-[3] opacity-[0.03] overflow-hidden">
    <svg width="100%" height="100%">
      <defs>
        <pattern id="hexagons" width="56" height="100" patternUnits="userSpaceOnUse" patternTransform="scale(1.5)">
          <path
            d="M28 0 L56 16.67 L56 50 L28 66.67 L0 50 L0 16.67Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
          <path
            d="M28 33.33 L56 50 L56 83.33 L28 100 L0 83.33 L0 50Z"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hexagons)" />
    </svg>
  </div>
);

// Glitch bar — horizontal interference bars
export const GlitchBars = ({ interval = 8000 }: { interval?: number }) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setActive(true);
      setTimeout(() => setActive(false), 150);
    };
    const id = setInterval(trigger, interval);
    return () => clearInterval(id);
  }, [interval]);

  if (!active) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
      {[15, 35, 72].map((top, i) => (
        <div
          key={i}
          className="absolute left-0 right-0 bg-primary/10"
          style={{
            top: `${top}%`,
            height: `${2 + Math.random() * 6}px`,
            transform: `translateX(${(Math.random() - 0.5) * 10}px)`,
          }}
        />
      ))}
    </div>
  );
};

// ctOS status bar
export const CtosStatusBar = ({ label = "ctOS v2.0" }: { label?: string }) => (
  <motion.div
    className="absolute top-4 right-6 font-mono text-[10px] tracking-[0.3em] text-primary/20 z-10 flex items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1 }}
  >
    <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-pulse-glow" />
    {label}
  </motion.div>
);
