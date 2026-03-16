import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HudCorners, ScanLine, GlitchBars, CtosStatusBar } from "./CtosOverlay";

interface GridCell {
  x: number;
  y: number;
  w: number;
  h: number;
  active: boolean;
  scanProgress: number;
  dataType: string;
  value: string;
  blinkPhase: number;
}

const SurveillanceSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const animRef = useRef<number>(0);

  const drawGrid = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height);

    const cols = 12;
    const rows = 8;
    const cellW = width / cols;
    const cellH = height / rows;
    const padding = 2;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = col * cellW + padding;
        const y = row * cellH + padding;
        const w = cellW - padding * 2;
        const h = cellH - padding * 2;

        const isActive = ((row * cols + col + Math.floor(time * 0.5)) % 7) < 5;
        const pulse = Math.sin(time * 2 + row * 0.5 + col * 0.3) * 0.5 + 0.5;

        // Cell background
        ctx.fillStyle = isActive
          ? `rgba(204, 32, 32, ${0.02 + pulse * 0.03})`
          : "rgba(255, 255, 255, 0.005)";
        ctx.fillRect(x, y, w, h);

        // Cell border
        ctx.strokeStyle = isActive
          ? `rgba(204, 32, 32, ${0.08 + pulse * 0.08})`
          : "rgba(255, 255, 255, 0.02)";
        ctx.lineWidth = 0.5;
        ctx.strokeRect(x, y, w, h);

        if (isActive) {
          // Corner brackets
          const bracketLen = 6;
          ctx.strokeStyle = `rgba(204, 32, 32, ${0.3 + pulse * 0.2})`;
          ctx.lineWidth = 1;

          // Top-left
          ctx.beginPath();
          ctx.moveTo(x, y + bracketLen);
          ctx.lineTo(x, y);
          ctx.lineTo(x + bracketLen, y);
          ctx.stroke();

          // Top-right
          ctx.beginPath();
          ctx.moveTo(x + w - bracketLen, y);
          ctx.lineTo(x + w, y);
          ctx.lineTo(x + w, y + bracketLen);
          ctx.stroke();

          // Bottom-right
          ctx.beginPath();
          ctx.moveTo(x + w, y + h - bracketLen);
          ctx.lineTo(x + w, y + h);
          ctx.lineTo(x + w - bracketLen, y + h);
          ctx.stroke();

          // Bottom-left
          ctx.beginPath();
          ctx.moveTo(x + bracketLen, y + h);
          ctx.lineTo(x, y + h);
          ctx.lineTo(x, y + h - bracketLen);
          ctx.stroke();

          // Data text
          ctx.font = "9px 'JetBrains Mono', monospace";
          ctx.fillStyle = `rgba(204, 32, 32, ${0.3 + pulse * 0.3})`;

          const dataTypes = ["PRICE", "VOL", "FLOW", "DEPTH", "SIGNAL", "NODE"];
          const label = dataTypes[(row * cols + col) % dataTypes.length];
          ctx.fillText(label, x + 4, y + 14);

          // Value
          const val = (Math.sin(time + row + col) * 500 + 500).toFixed(2);
          ctx.fillStyle = `rgba(200, 200, 200, ${0.25 + pulse * 0.15})`;
          ctx.fillText(val, x + 4, y + 28);

          // Mini bar chart
          const barCount = 8;
          const barW = (w - 8) / barCount;
          for (let b = 0; b < barCount; b++) {
            const barH = Math.abs(Math.sin(time * 1.5 + b * 0.5 + col + row)) * (h * 0.3);
            ctx.fillStyle = `rgba(204, 32, 32, ${0.15 + pulse * 0.1})`;
            ctx.fillRect(x + 4 + b * barW, y + h - 4 - barH, barW - 1, barH);
          }
        }
      }
    }

    // Scanning line
    const scanY = (time * 40) % height;
    const scanGrad = ctx.createLinearGradient(0, scanY - 30, 0, scanY + 30);
    scanGrad.addColorStop(0, "rgba(204, 32, 32, 0)");
    scanGrad.addColorStop(0.5, "rgba(204, 32, 32, 0.08)");
    scanGrad.addColorStop(1, "rgba(204, 32, 32, 0)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(0, scanY - 30, width, 60);

    // Cross-hair in center
    const cx = width / 2;
    const cy = height / 2;
    const crossSize = 40 + Math.sin(time * 3) * 5;
    ctx.strokeStyle = `rgba(204, 32, 32, ${0.15 + Math.sin(time * 2) * 0.05})`;
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(cx - crossSize, cy);
    ctx.lineTo(cx + crossSize, cy);
    ctx.moveTo(cx, cy - crossSize);
    ctx.lineTo(cx, cy + crossSize);
    ctx.stroke();

    // Circle reticle
    ctx.beginPath();
    ctx.arc(cx, cy, crossSize * 0.8, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(204, 32, 32, 0.08)`;
    ctx.stroke();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      drawGrid(ctx, rect.width, rect.height, Date.now() * 0.001);
      animRef.current = requestAnimationFrame(animate);
    };

    if (isInView) animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isInView, drawGrid]);

  return (
    <section ref={containerRef} className="relative py-32 bg-dark-a cinematic-red overflow-hidden min-h-[650px] interference">
      <ScanLine interval={5000} />
      <GlitchBars interval={9000} />
      <HudCorners />
      <CtosStatusBar label="ctOS // SURVEILLANCE_ACTIVE" />

      {/* Canvas background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80 pointer-events-none"
      />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {"// SURVEILLANCE GRID"}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[0.9]">
            We see<br />
            <span className="text-primary text-glow">everything.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-12">
            Every price tick. Every volume spike. Every order flow anomaly.
            Our surveillance grid monitors the entire financial infrastructure in real-time.
          </p>

          <div className="flex flex-wrap justify-center gap-6 font-mono text-xs">
            {[
              { status: "LIVE", label: "Market feeds" },
              { status: "ACTIVE", label: "Pattern scan" },
              { status: "ONLINE", label: "Alert system" },
              { status: "RUNNING", label: "Data pipeline" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-center gap-2 border border-primary/20 bg-card/40 backdrop-blur-sm px-4 py-2"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
                <span className="text-primary/70">[{item.status}]</span>
                <span className="text-muted-foreground">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SurveillanceSection;
