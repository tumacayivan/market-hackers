import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HudCorners, CtosStatusBar, HexGrid } from "./CtosOverlay";

const CityGridSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-50px" });
  const animRef = useRef<number>(0);

  const drawCity = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
    ctx.clearRect(0, 0, width, height);

    // Isometric grid parameters
    const gridSize = 30;
    const cols = Math.ceil(width / gridSize) + 5;
    const rows = Math.ceil(height / gridSize) + 5;
    const offsetX = (time * 8) % gridSize;

    // Road grid
    ctx.strokeStyle = "rgba(204, 32, 32, 0.06)";
    ctx.lineWidth = 0.5;

    for (let i = 0; i < cols; i++) {
      const x = i * gridSize - offsetX;
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let i = 0; i < rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * gridSize);
      ctx.lineTo(width, i * gridSize);
      ctx.stroke();
    }

    // Buildings (blocks)
    const buildings: { x: number; y: number; w: number; h: number; height3d: number }[] = [];
    const seed = 42;
    for (let bx = 0; bx < 15; bx++) {
      for (let by = 0; by < 10; by++) {
        const hash = (bx * 73 + by * 137 + seed) % 100;
        if (hash < 40) continue;
        const bw = gridSize * (1 + (hash % 3));
        const bh = gridSize * (1 + ((hash * 7) % 3));
        const h3d = 20 + (hash % 60);
        buildings.push({
          x: bx * gridSize * 3 + 50 - offsetX * 2,
          y: by * gridSize * 3 + 30,
          w: bw,
          h: bh,
          height3d: h3d,
        });
      }
    }

    buildings.forEach((b) => {
      const pulse = Math.sin(time * 1.5 + b.x * 0.01 + b.y * 0.01) * 0.5 + 0.5;
      const isScanned = (time * 20 + b.x) % 800 < 100;

      // Building footprint
      ctx.fillStyle = isScanned
        ? `rgba(204, 32, 32, ${0.08 + pulse * 0.06})`
        : `rgba(204, 32, 32, ${0.02 + pulse * 0.02})`;
      ctx.fillRect(b.x, b.y, b.w, b.h);

      // Border
      ctx.strokeStyle = isScanned
        ? `rgba(204, 32, 32, ${0.3 + pulse * 0.2})`
        : `rgba(204, 32, 32, ${0.06 + pulse * 0.04})`;
      ctx.lineWidth = isScanned ? 1.5 : 0.5;
      ctx.strokeRect(b.x, b.y, b.w, b.h);

      // Height indicator lines
      if (isScanned) {
        ctx.setLineDash([2, 3]);
        ctx.strokeStyle = `rgba(204, 32, 32, 0.15)`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.lineTo(b.x - b.height3d * 0.3, b.y - b.height3d * 0.5);
        ctx.moveTo(b.x + b.w, b.y);
        ctx.lineTo(b.x + b.w - b.height3d * 0.3, b.y - b.height3d * 0.5);
        ctx.stroke();
        ctx.setLineDash([]);

        // Label
        ctx.font = "8px 'JetBrains Mono', monospace";
        ctx.fillStyle = `rgba(204, 32, 32, 0.5)`;
        ctx.fillText(`NODE_${Math.floor(b.x + b.y) % 999}`, b.x + 3, b.y + 12);
      }
    });

    // Data flow lines (animated dashes)
    const flowPaths = [
      { y: height * 0.3, speed: 2 },
      { y: height * 0.5, speed: -1.5 },
      { y: height * 0.7, speed: 2.5 },
    ];
    flowPaths.forEach((path) => {
      const dashOffset = time * path.speed * 50;
      ctx.setLineDash([15, 30]);
      ctx.lineDashOffset = -dashOffset;
      ctx.strokeStyle = "rgba(204, 32, 32, 0.12)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, path.y);
      ctx.lineTo(width, path.y);
      ctx.stroke();
      ctx.setLineDash([]);
    });

    // Scanning pulse (expanding circle)
    const pulseRadius = ((time * 80) % 500);
    const pulseAlpha = Math.max(0, 0.15 - pulseRadius * 0.0003);
    ctx.beginPath();
    ctx.arc(width * 0.6, height * 0.4, pulseRadius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(204, 32, 32, ${pulseAlpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Second pulse offset
    const pulseRadius2 = ((time * 80 + 250) % 500);
    const pulseAlpha2 = Math.max(0, 0.15 - pulseRadius2 * 0.0003);
    ctx.beginPath();
    ctx.arc(width * 0.6, height * 0.4, pulseRadius2, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(204, 32, 32, ${pulseAlpha2})`;
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
      drawCity(ctx, rect.width, rect.height, Date.now() * 0.001);
      animRef.current = requestAnimationFrame(animate);
    };

    if (isInView) animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isInView, drawCity]);

  return (
    <section ref={containerRef} className="relative py-32 bg-dark-b cinematic-amber overflow-hidden min-h-[650px] ctos-sweep">
      <HexGrid />
      <HudCorners />
      <CtosStatusBar label="ctOS_CITY_GRID // MAPPING" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {"// INFRASTRUCTURE MAP"}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[0.9]">
            Map the<br />
            <span className="text-accent text-glow-accent">infrastructure.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium leading-relaxed mb-10">
            Every exchange is a node. Every data feed is a pipeline. Every market participant leaves a digital
            footprint. We map the entire financial infrastructure to find our edge.
          </p>

          <div className="flex flex-wrap gap-3">
            {["Exchange nodes", "Liquidity pools", "Order flow", "Dark pools", "Market makers"].map((item, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="font-mono text-xs border border-border/40 bg-card/30 backdrop-blur-sm px-3 py-1.5 text-muted-foreground"
              >
                <span className="text-primary/50 mr-1">#</span>{item}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CityGridSection;
