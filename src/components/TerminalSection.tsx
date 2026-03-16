import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScanLine, HudCorners } from "./CtosOverlay";

const terminalLines = [
  { type: "input", text: "$ nmap -sV markets.global --open" },
  { type: "output", text: "Starting scan... 6594 services detected" },
  { type: "output", text: "PORT      STATE    SERVICE" },
  { type: "output", text: "443/tcp   open     NYSE" },
  { type: "output", text: "8080/tcp  open     NASDAQ" },
  { type: "output", text: "9090/tcp  open     FOREX" },
  { type: "output", text: "3000/tcp  open     CRYPTO" },
  { type: "blank", text: "" },
  { type: "input", text: "$ ./exploit --target=inefficiency --mode=systematic" },
  { type: "output", text: "[*] Loading strategy framework..." },
  { type: "output", text: "[*] Analyzing 2.4M data points..." },
  { type: "output", text: "[*] Pattern detected: mean-reversion anomaly" },
  { type: "success", text: "[+] Edge identified. Deploying strategy..." },
  { type: "success", text: "[+] Strategy validated. Sharpe ratio: 2.14" },
  { type: "blank", text: "" },
  { type: "input", text: "$ cat /etc/market-hackers/manifesto.txt" },
  { type: "accent", text: '"We don\'t predict markets. We reverse-engineer them."' },
];

const TerminalSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= terminalLines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isInView]);

  const getColor = (type: string) => {
    switch (type) {
      case "input": return "text-primary";
      case "success": return "text-accent";
      case "accent": return "text-primary font-bold text-glow";
      default: return "text-muted-foreground";
    }
  };

  return (
    <section ref={ref} className="relative py-24 overflow-hidden bg-dark-a grid-bg bleed-top bleed-bottom ctos-sweep">
      <ScanLine interval={8000} />
      <HudCorners />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// SYSTEM ACCESS'}
          </p>
          <h2 className="font-mono text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.9]">
            Every system has a<br /><span className="text-primary text-glow">vulnerability.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="border border-border bg-card/80 max-w-4xl overflow-hidden"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
            <span className="w-3 h-3 rounded-full bg-primary/80" />
            <span className="w-3 h-3 rounded-full bg-accent/80" />
            <span className="w-3 h-3 rounded-full bg-muted-foreground/40" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              root@mh-terminal — bash — 80×24
            </span>
          </div>

          {/* Terminal body */}
          <div className="p-6 font-mono text-sm leading-relaxed min-h-[400px] scanline relative">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`${getColor(line.type)} ${line.type === "blank" ? "h-4" : ""}`}>
                {line.text}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className="text-primary animate-blink">█</span>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TerminalSection;
