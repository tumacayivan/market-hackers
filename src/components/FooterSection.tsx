import { motion } from "framer-motion";
import { MessageCircle, Send, Twitter, Instagram, Youtube, Github } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="relative border-t border-border/40 bg-dark-a">
      <div className="w-full px-6 md:px-12 lg:px-20 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="font-mono text-2xl font-extrabold text-primary text-glow block mb-4">MH_</span>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              A learning community for traders who think like hackers. Systematic. Data-driven. No shortcuts.
            </p>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] text-foreground mb-4">NAVIGATION</h4>
            <nav className="space-y-2">
              {[
                { label: "Path", href: "#path" },
                { label: "Mission", href: "#mission" },
                { label: "Community", href: "#community" },
                { label: "Join", href: "#join" },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {'>'} {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] text-foreground mb-4">COMMUNITY</h4>
            <nav className="space-y-2">
              <a href="#" className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
                <MessageCircle size={14} /> Discord
              </a>
              <a href="#" className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors">
                <Send size={14} /> Telegram
              </a>
            </nav>
          </div>

          <div>
            <h4 className="font-mono text-xs tracking-[0.2em] text-foreground mb-4">SOCIAL</h4>
            <nav className="space-y-2">
              {[
                { icon: Twitter, label: "Twitter / X" },
                { icon: Instagram, label: "Instagram" },
                { icon: Youtube, label: "YouTube" },
                { icon: Github, label: "GitHub" },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <item.icon size={14} /> {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border-t border-border/30 pt-10 pb-10 flex flex-col items-center text-center"
        >
          <p className="font-mono text-sm tracking-[0.25em] text-muted-foreground/70 uppercase mb-4">Founded by</p>
          <p className="font-mono text-4xl md:text-6xl lg:text-7xl font-bold text-primary text-glow mb-6 tracking-tight">
            Ivan Tumacay
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 font-mono text-sm md:text-base">
            <span className="px-4 py-2 rounded border border-primary/40 bg-primary/10 text-primary">Founder</span>
            <span className="px-4 py-2 rounded border border-primary/40 bg-primary/10 text-primary">Developer</span>
            <span className="px-4 py-2 rounded border border-primary/40 bg-primary/10 text-primary">Researcher</span>
            <span className="px-4 py-2 rounded border border-primary/40 bg-primary/10 text-primary">Trader</span>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-border/30 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="font-mono text-xs text-muted-foreground/60">
            <span className="text-primary/40">©</span> {new Date().getFullYear()} Market Hackers. All rights reserved.
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-mono text-xs text-muted-foreground/40"
          >
            "Control is an illusion." — Mr. Robot
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
