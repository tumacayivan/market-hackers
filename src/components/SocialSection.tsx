import { motion } from "framer-motion";
import { MessageCircle, Send, Twitter, Instagram, Youtube, Github } from "lucide-react";
import { NetworkNodes, HudCorners } from "./CtosOverlay";

const highlights = [
  {
    icon: MessageCircle,
    name: "Discord",
    tag: "COMMUNITY HUB",
    desc: "Join our active community of traders, engineers, and hackers. Strategy discussions, live research, and collaborative learning happen here daily.",
    cta: "Join Discord",
    href: "#",
    highlight: true,
  },
  {
    icon: Send,
    name: "Telegram",
    tag: "UPDATES & ALERTS",
    desc: "Get real-time updates, new content alerts, market insights, and community announcements delivered straight to your phone.",
    cta: "Join Telegram",
    href: "#",
    highlight: true,
  },
];

const socials = [
  { icon: Twitter, name: "Twitter / X", href: "#", desc: "Market insights & threads" },
  { icon: Instagram, name: "Instagram", href: "#", desc: "Behind the scenes" },
  { icon: Youtube, name: "YouTube", href: "#", desc: "Deep dives & tutorials" },
  { icon: Github, name: "GitHub", href: "#", desc: "Open-source tools" },
];

const SocialSection = () => {
  return (
    <section className="relative py-32 bg-dark-b grain grid-bg bleed-top interference">
      <NetworkNodes />
      <HudCorners />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// CONNECT'}
          </p>
          <h2 className="font-mono text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.9] mb-4">
            Join the <span className="text-primary text-glow">network.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            The best hackers don't work alone. Connect with Market Hackers across platforms.
          </p>
        </motion.div>

        {/* Discord & Telegram — highlighted */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {highlights.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
              className="relative border border-primary/40 bg-card/80 p-8 md:p-10 group hover:box-glow transition-all duration-500 overflow-hidden block"
            >
              {/* Glow bg */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-primary/40 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-mono text-xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                        {item.name}
                      </h3>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-primary/60">{item.tag}</span>
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                </div>

                <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                  {item.desc}
                </p>

                <span className="inline-flex items-center gap-2 font-mono text-sm font-bold text-primary group-hover:text-glow transition-all">
                  {'>'} {item.cta}
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Other socials */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {socials.map((item, i) => (
            <motion.a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="border border-border bg-card/30 p-5 hover:border-primary/30 hover:bg-card/60 transition-all duration-300 group block"
            >
              <item.icon size={18} className="text-muted-foreground group-hover:text-primary transition-colors mb-3" />
              <h4 className="font-mono text-sm font-bold text-foreground group-hover:text-primary transition-colors mb-1">
                {item.name}
              </h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialSection;
