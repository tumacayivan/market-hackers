import { motion } from "framer-motion";

interface LevelCardProps {
  level: number;
  title: string;
  subtitle: string;
  description: string;
  items: string[];
  tagline: string;
  delay?: number;
}

const LevelCard = ({ level, title, subtitle, description, items, tagline, delay = 0 }: LevelCardProps) => {
  const levelColors = {
    1: "text-primary border-primary/30",
    2: "text-accent border-accent/30",
    3: "text-primary border-primary/30",
  };
  const color = levelColors[level as keyof typeof levelColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay }}
      className={`relative border ${color} bg-card/80 p-8 md:p-10 hover:box-glow transition-all duration-500 group`}
    >
      <div className="flex items-center gap-3 mb-6">
        <span className={`font-mono text-xs tracking-[0.2em] ${color} opacity-70`}>
          LEVEL {level}
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <h3 className={`font-mono text-3xl md:text-4xl font-extrabold ${color} mb-2`}>
        {title}
      </h3>
      <p className="font-mono text-base font-semibold text-muted-foreground mb-6">{subtitle}</p>

      <p className="text-secondary-foreground text-base leading-relaxed mb-8">
        {description}
      </p>

      <ul className="space-y-3 mb-8">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-base text-muted-foreground">
            <span className={`${color} font-mono mt-0.5 font-bold`}>{'>'}</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <p className={`font-mono text-sm ${color} font-bold opacity-80`}>
        {tagline}
      </p>
    </motion.div>
  );
};

export default LevelCard;
