import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { HudCorners, CtosStatusBar, ScanLine } from "./CtosOverlay";

// Generate points on a sphere
const generateSpherePoints = (count: number, radius: number) => {
  const points: [number, number, number][] = [];
  for (let i = 0; i < count; i++) {
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = 2 * Math.PI * Math.random();
    points.push([
      radius * Math.sin(phi) * Math.cos(theta),
      radius * Math.sin(phi) * Math.sin(theta),
      radius * Math.cos(phi),
    ]);
  }
  return points;
};

export const Globe = () => {
  const globeRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<THREE.Points>(null);

  const nodePositions = useMemo(() => generateSpherePoints(200, 2), []);
  const connectionPositions = useMemo(() => generateSpherePoints(80, 2), []);

  // Create node geometry
  const nodeGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(nodePositions.length * 3);
    nodePositions.forEach((p, i) => {
      positions[i * 3] = p[0];
      positions[i * 3 + 1] = p[1];
      positions[i * 3 + 2] = p[2];
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [nodePositions]);

  // Create connection lines
  const lineGeometry = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < connectionPositions.length; i++) {
      for (let j = i + 1; j < connectionPositions.length; j++) {
        const a = connectionPositions[i];
        const b = connectionPositions[j];
        const dist = Math.sqrt(
          (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
        );
        if (dist < 1.2) {
          positions.push(...a, ...b);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    return geo;
  }, [connectionPositions]);

  // Wireframe sphere
  const wireframeGeo = useMemo(() => new THREE.SphereGeometry(2, 24, 24), []);

  useFrame(({ clock }) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = clock.getElapsedTime() * 0.08;
      globeRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <group ref={globeRef}>
      {/* Wireframe sphere */}
      <lineSegments geometry={new THREE.EdgesGeometry(wireframeGeo)}>
        <lineBasicMaterial color="#cc2020" transparent opacity={0.06} />
      </lineSegments>

      {/* Nodes */}
      <points ref={nodesRef} geometry={nodeGeometry}>
        <pointsMaterial color="#cc2020" size={0.04} transparent opacity={0.7} sizeAttenuation />
      </points>

      {/* Connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="#cc2020" transparent opacity={0.15} />
      </lineSegments>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[1.95, 16, 16]} />
        <meshBasicMaterial color="#1a0505" transparent opacity={0.3} />
      </mesh>
    </group>
  );
};

// Orbiting data ring
export const DataRing = ({ radius, speed, color }: { radius: number; speed: number; color: string }) => {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.005, 8, 100]} />
      <meshBasicMaterial color={color} transparent opacity={0.2} />
    </mesh>
  );
};

const GlobalNetworkSection = () => {
  return (
    <section className="relative py-32 bg-dark-a cinematic-red overflow-hidden min-h-[700px]">
      <ScanLine interval={7000} />
      <HudCorners />
      <CtosStatusBar label="GLOBAL_NETWORK // SCANNING" />

      <div className="relative z-10 w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {"// GLOBAL NETWORK"}
          </p>
          <h2 className="font-mono text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-foreground mb-6 leading-[0.9]">
            Connected to<br />
            <span className="text-primary text-glow">every market.</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl font-medium">
            Our network spans across every financial market node globally. Real-time data feeds,
            cross-market analysis, and systematic coverage of every tradeable asset.
          </p>
        </motion.div>
      </div>

      {/* 3D Globe */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] md:w-[650px] md:h-[650px] lg:w-[800px] lg:h-[800px] pointer-events-none"
        style={{ right: "-5%" }}
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
          <ambientLight intensity={0.5} />
          <Globe />
          <DataRing radius={2.8} speed={0.15} color="#cc2020" />
          <DataRing radius={3.1} speed={-0.1} color="#d4a020" />
        </Canvas>
      </motion.div>

      {/* Stats overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="relative z-10 w-full px-6 md:px-12 lg:px-20 mt-8"
      >
        <div className="flex flex-wrap gap-8 font-mono text-xs text-muted-foreground/50">
          {[
            "NYSE // CONNECTED",
            "NASDAQ // CONNECTED",
            "LSE // CONNECTED",
            "TSE // CONNECTED",
            "FOREX // 24/7",
            "CRYPTO // LIVE",
          ].map((node, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.15 }}
              className="flex items-center gap-2"
            >
              <span className="w-1 h-1 bg-primary/50 rounded-full animate-pulse-glow" />
              {node}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default GlobalNetworkSection;
