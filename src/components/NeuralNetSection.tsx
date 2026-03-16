import { useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { HudCorners, DataFragments, CtosStatusBar } from "./CtosOverlay";

interface Node {
  x: number;
  y: number;
  layer: number;
  value: number;
  targetValue: number;
  pulsePhase: number;
}

interface Connection {
  from: number;
  to: number;
  weight: number;
  signal: number;
  signalSpeed: number;
  active: boolean;
}

const NeuralNetSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-100px" });
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);

  const initNetwork = useCallback((width: number, height: number) => {
    const layers = [6, 10, 12, 10, 8, 4];
    const nodes: Node[] = [];
    const connections: Connection[] = [];
    const layerSpacing = width / (layers.length + 1);

    layers.forEach((count, layerIdx) => {
      const nodeSpacing = height / (count + 1);
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: layerSpacing * (layerIdx + 1),
          y: nodeSpacing * (i + 1),
          layer: layerIdx,
          value: Math.random(),
          targetValue: Math.random(),
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    });

    // Create connections between adjacent layers
    let fromStart = 0;
    for (let l = 0; l < layers.length - 1; l++) {
      const toStart = fromStart + layers[l];
      for (let i = fromStart; i < fromStart + layers[l]; i++) {
        const connectionCount = 2 + Math.floor(Math.random() * 3);
        for (let c = 0; c < connectionCount; c++) {
          const target = toStart + Math.floor(Math.random() * layers[l + 1]);
          connections.push({
            from: i,
            to: target,
            weight: 0.1 + Math.random() * 0.9,
            signal: -1,
            signalSpeed: 0.005 + Math.random() * 0.015,
            active: Math.random() > 0.3,
          });
        }
      }
      fromStart += layers[l];
    }

    nodesRef.current = nodes;
    connectionsRef.current = connections;
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
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      initNetwork(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);
      const nodes = nodesRef.current;
      const connections = connectionsRef.current;
      const time = Date.now() * 0.001;

      // Update node values
      nodes.forEach((node) => {
        if (Math.random() < 0.01) node.targetValue = Math.random();
        node.value += (node.targetValue - node.value) * 0.02;
      });

      // Trigger random signals
      connections.forEach((conn) => {
        if (conn.signal < 0 && Math.random() < 0.003 && conn.active) {
          conn.signal = 0;
        }
      });

      // Draw connections
      connections.forEach((conn) => {
        if (!conn.active) return;
        const from = nodes[conn.from];
        const to = nodes[conn.to];

        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.strokeStyle = `rgba(204, 32, 32, ${0.04 + conn.weight * 0.06})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();

        // Draw signal traveling along connection
        if (conn.signal >= 0 && conn.signal <= 1) {
          const sx = from.x + (to.x - from.x) * conn.signal;
          const sy = from.y + (to.y - from.y) * conn.signal;

          const gradient = ctx.createRadialGradient(sx, sy, 0, sx, sy, 8);
          gradient.addColorStop(0, "rgba(204, 32, 32, 0.8)");
          gradient.addColorStop(1, "rgba(204, 32, 32, 0)");
          ctx.beginPath();
          ctx.arc(sx, sy, 8, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          conn.signal += conn.signalSpeed;
          if (conn.signal > 1) conn.signal = -1;
        }
      });

      // Draw nodes
      nodes.forEach((node) => {
        const pulse = Math.sin(time * 2 + node.pulsePhase) * 0.3 + 0.7;
        const size = 2 + node.value * 3;

        // Outer glow
        const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, size * 4);
        glow.addColorStop(0, `rgba(204, 32, 32, ${0.15 * pulse})`);
        glow.addColorStop(1, "rgba(204, 32, 32, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 4, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(204, 32, 32, ${0.4 + node.value * 0.5 * pulse})`;
        ctx.fill();

        // Center dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 100, 100, ${0.8 * pulse})`;
        ctx.fill();
      });

      animRef.current = requestAnimationFrame(animate);
    };

    if (isInView) {
      animate();
    }

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isInView, initNetwork]);

  return (
    <section ref={containerRef} className="relative py-32 bg-dark-b cinematic-center overflow-hidden min-h-[600px]">
      <HudCorners />
      <DataFragments />
      <CtosStatusBar label="NEURAL_ENGINE // PROCESSING" />

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60 pointer-events-none"
      />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {"// NEURAL ENGINE"}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[0.9]">
            Machine<br />
            <span className="text-primary text-glow">intelligence.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium leading-relaxed mb-8">
            Our strategies are powered by neural networks that learn, adapt, and evolve.
            Every data point feeds the system. Every trade refines the model.
          </p>

          <div className="grid grid-cols-2 gap-4 max-w-md">
            {[
              { label: "NODES ACTIVE", value: "2,847" },
              { label: "DATA PROCESSED", value: "14.2TB" },
              { label: "MODEL ACCURACY", value: "94.7%" },
              { label: "LATENCY", value: "0.3ms" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="border border-border/40 bg-card/30 p-4 backdrop-blur-sm"
              >
                <p className="font-mono text-[10px] tracking-[0.2em] text-primary/50 mb-1">{stat.label}</p>
                <p className="font-mono text-xl font-bold text-foreground">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NeuralNetSection;
