import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HexGrid, GlitchBars } from "./CtosOverlay";

const faqs = [
  {
    q: "Do I need coding experience?",
    a: "No. Rookie level starts from zero. As you progress, you'll naturally learn the tools. By the time you reach Hacker level, coding will feel like second nature.",
  },
  {
    q: "Is this a signal group?",
    a: "No. We don't sell signals or predictions. Market Hackers teaches you to build your own systems so you never depend on anyone else's calls.",
  },
  {
    q: "What markets do you cover?",
    a: "We focus on the principles behind all markets — stocks, forex, crypto, futures. The system-thinking approach works across any liquid market.",
  },
  {
    q: "How is this different from other trading courses?",
    a: "Most courses teach you what to trade. We teach you how to think. Market Hackers is built on engineering principles, data analysis, and systematic strategy development.",
  },
  {
    q: "What if I'm already an experienced trader?",
    a: "Engineer and Hacker levels are designed for traders who want to evolve beyond discretionary trading into systematic, data-driven approaches.",
  },
  {
    q: "How long does it take to progress through all levels?",
    a: "It depends on your pace. Most members spend 2-3 months per level. But this isn't a race — it's about depth of understanding.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 bg-dark-a scanline bleed-bottom ctos-sweep">
      <HexGrid />
      <GlitchBars interval={12000} />
      <div className="w-full px-6 md:px-12 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="font-mono text-sm tracking-[0.3em] text-primary/60 uppercase mb-6">
            {'// FAQ'}
          </p>
          <h2 className="font-mono text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[0.9]">
            Frequently <span className="text-primary text-glow">asked.</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl space-y-0">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="border-b border-border/40"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-6 flex items-start justify-between gap-4 text-left group"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs text-primary/30 mt-1 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {faq.q}
                  </span>
                </div>
                <span className={`font-mono text-primary text-xl shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="pl-12 pb-6 text-muted-foreground leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
