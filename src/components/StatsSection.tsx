import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ScanLine, HudCorners } from "./CtosOverlay";

const stats = [
  { value: "3", suffix: "", label: "PROGRESSION LEVELS", desc: "Rookie → Engineer → Hacker" },
  { value: "100", suffix: "+", label: "STRATEGIES DOCUMENTED", desc: "Tested & validated frameworks" },
  { value: "24", suffix: "/7", label: "MARKET ACCESS", desc: "Global markets, always running" },
  { value: "0", suffix: "", label: "PREDICTIONS MADE", desc: "Systems only. No guessing." },
];

const Counter = ({ target, suffix, duration = 2 }: { target: number; suffix: string; duration?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 30);
    const interval = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 30);
    return () => clearInterval(interval);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatsSection = () => {
  return (
    <section className="relative py-24 bg-dark-b bleed-bottom interference">
      <ScanLine interval={10000} color="accent" />
      <HudCorners />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="border border-border bg-card/50 p-6 md:p-8 group hover:border-primary/40 hover:box-glow transition-all duration-500"
            >
              <div className="font-mono text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary text-glow mb-2">
                <Counter target={parseInt(stat.value)} suffix={stat.suffix} />
              </div>
              <p className="font-mono text-xs tracking-[0.2em] text-foreground mb-2">{stat.label}</p>
              <p className="text-sm text-muted-foreground">{stat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
