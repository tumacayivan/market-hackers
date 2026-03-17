import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const VideoTraining = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-20 pb-24">
        {/* HERO / HOOK */}
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row md:px-12 lg:px-20">
            <div className="md:w-3/5 py-10 md:py-16">
              <p className="font-mono text-sm md:text-base tracking-[0.35em] text-primary/70 uppercase mb-4">
                MARKET HACKERS — SYSTEM TRAINING
              </p>
              <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                <span className="text-primary text-glow">FREE SYSTEM TRAINING REVEALS…</span>
              </h1>
              <p className="font-mono text-xl md:text-2xl text-primary/90 mb-6">
                <span className="bg-primary/10 px-2 py-1 rounded-sm">
                  [SYSTEM] Real systems. Real data. Real edge.
                </span>
                <br />
                See how traders stop guessing and start engineering trades.
              </p>
              <p className="font-mono text-base md:text-lg text-muted-foreground/90 mb-6">
                How we build trading systems that identify market inefficiencies—without signals, indicator overload, or prediction.
              </p>

              <div className="space-y-1 font-mono text-base md:text-lg">
                <p className="text-destructive font-semibold">NO signals.</p>
                <p className="text-destructive font-semibold">NO guessing.</p>
                <p className="text-destructive font-semibold">NO noise.</p>
                <p className="mt-2 text-primary font-semibold">Just you understanding the system.</p>
              </div>
            </div>

            {/* FORM / CTA */}
            <div className="md:w-2/5 py-10 md:py-16">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="border border-primary/40 bg-black/40 backdrop-blur-lg p-6 md:p-8 rounded-lg shadow-xl shadow-primary/10 relative overflow-hidden"
              >
                <div className="pointer-events-none absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_top,_#f97316_0,_transparent_50%),radial-gradient(circle_at_bottom,_#22c55e_0,_transparent_55%)]" />
                <div className="relative space-y-6">
                  <div>
                    <p className="font-mono text-xs text-primary/70 mb-1 tracking-[0.2em] uppercase">
                      ACCESS SYSTEM TRAINING
                    </p>
                    <p className="font-mono text-sm text-muted-foreground">
                      Enter your details to unlock the video training.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-1">
                      <label className="font-mono text-xs text-muted-foreground" htmlFor="firstName">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        placeholder="e.g. Ivan"
                        className="font-mono text-sm bg-background/60 border-primary/30 focus-visible:ring-primary/60"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-mono text-xs text-muted-foreground" htmlFor="email">
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        className="font-mono text-sm bg-background/60 border-primary/30 focus-visible:ring-primary/60"
                      />
                    </div>
                  </div>

                  <Button className="w-full font-mono text-xs md:text-sm tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 box-glow glitch-hover">
                    {'>'} ACCESS SYSTEM TRAINING
                  </Button>

                  <p className="font-mono text-[10px] text-muted-foreground/70 leading-relaxed">
                    No spam. No random signals. You&apos;ll get system-level training and occasional research insights only.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PROBLEM / PAIN */}
        <section className="border-b border-border/40 bg-background">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18 lg:px-20">
            <p className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
              REAL TALK
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Let&apos;s be real. Hindi ka kulang sa effort.
            </h2>
            <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
              Ang dami mo nang inaral…
              <br />
              Indicators. Strategies. Signals. YouTube setups.
            </p>
            <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
              Pero bakit hanggang ngayon… <span className="text-primary font-semibold">inconsistent</span> ka pa rin?
            </p>
            <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
              Hindi dahil kulang ka sa effort. In fact—yan yung problema.
              <br />
              Too much information = no real understanding.
            </p>
            <p className="font-mono text-base md:text-lg text-muted-foreground/90">
              Charts become noise. Decisions become emotional. Trading becomes gambling.
            </p>
          </div>
        </section>

        {/* SHIFT / IDENTITY */}
        <section className="border-b border-border/40 bg-gradient-to-br from-background via-background to-primary/5">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18 lg:px-20">
            <p className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
              SYSTEM SHIFT
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4 text-foreground">
              Most traders try to <span className="text-destructive">predict</span> the market.
            </h2>
            <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
              That&apos;s why they fail.
            </p>
            <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
              Markets are not something you predict.
              <br />
              They are systems you understand.
            </p>
            <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
              And every system has <span className="text-primary font-semibold">patterns</span>,{" "}
              <span className="text-primary font-semibold">behavior</span>, and{" "}
              <span className="text-primary font-semibold">weaknesses</span>.
            </p>
            <p className="font-mono text-base md:text-lg text-muted-foreground/90">
              In trading? That weakness is called <span className="text-primary font-semibold">alpha</span>.
            </p>
          </div>
        </section>

        {/* WHAT YOU'LL LEARN */}
        <section className="border-b border-border/40 bg-background">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18 lg:px-20">
            <p className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
              INSIDE THE TRAINING
            </p>
            <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6 text-foreground">
              From strategy overload to{" "}
              <span className="text-primary bg-primary/10 px-2 py-1 rounded-sm">system thinking</span>.
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-mono text-base md:text-lg text-primary/80">The Reality</h3>
                <p className="font-mono text-sm md:text-base text-muted-foreground">
                  Why more strategies destroy your performance — and why most traders stay stuck for years.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-base md:text-lg text-primary/80">The System</h3>
                <p className="font-mono text-sm md:text-base text-muted-foreground">
                  How markets actually behave as structured systems — not random movement.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-base md:text-lg text-primary/80">The Edge</h3>
                <p className="font-mono text-sm md:text-base text-muted-foreground">
                  How inefficiencies appear repeatedly in price — and how to recognize them.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-base md:text-lg text-primary/80">The Execution</h3>
                <p className="font-mono text-sm md:text-base text-muted-foreground">
                  Why prediction is the weakest approach — and how to act based on behavior instead.
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="font-mono text-base md:text-lg text-primary/80">The Framework</h3>
                <p className="font-mono text-sm md:text-base text-muted-foreground">
                  How to think in rules, not emotions — so your trades become consistent.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEEPER PAIN / STORY */}
        <section className="border-b border-border/40 bg-background">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18 lg:px-20 space-y-8">
            <div>
              <p className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                WHY YOU&apos;RE STUCK
              </p>
              <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
                At this point… hindi mo na problema ang &quot;knowledge.&quot; Alam mo na halos lahat.
              </p>
              <p className="font-mono text-base md:text-lg text-muted-foreground">
                Pero bakit mas lalo kang nalilito? Because knowledge alone doesn&apos;t create results.
                <br />
                <span className="text-primary font-semibold">Understanding systems does.</span>
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                YOUR PATTERN
              </h3>
              <div className="space-y-3 font-mono text-base md:text-lg text-muted-foreground">
                <p>
                  <span className="text-primary font-semibold mr-2">[PATTERN]</span>
                  <span className="font-semibold text-foreground underline">Strategy hopping</span> → hoping may &quot;holy grail.&quot;
                </p>
                <p>
                  <span className="text-primary font-semibold mr-2">[PATTERN]</span>
                  <span className="font-semibold text-foreground underline">Overloading charts</span> → indicators everywhere.
                </p>
                <p>
                  <span className="text-primary font-semibold mr-2">[PATTERN]</span>
                  <span className="font-semibold text-foreground underline">Following signals</span> → without understanding why.
                </p>
              </div>
              <p className="mt-4 font-mono text-base md:text-lg text-muted-foreground/90">
                Result? <span className="italic">Hesitation. Overthinking. Inconsistent trades.</span>
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                BREAKTHROUGH
              </h3>
              <p className="font-mono text-base md:text-lg text-muted-foreground">
                The moment you stop treating trading as guessing… and start seeing it as a{" "}
                <span className="text-primary font-semibold">system</span>… everything changes.
              </p>
              <p className="mt-3 font-mono text-base md:text-lg text-muted-foreground/90">
                You stop forcing trades. You stop chasing setups.
                <br />
                You start recognizing behavior.
              </p>
            </div>
          </div>
        </section>

        {/* WHAT IS MARKET HACKERS / CORE SYSTEM */}
        <section className="border-b border-border/40 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18 lg:px-20 space-y-10">
            <div>
              <p className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                WHAT IS MARKET HACKERS?
              </p>
              <h2 className="font-mono text-3xl md:text-4xl font-bold mb-4 text-foreground">
                Market Hackers is not a course.
              </h2>
              <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
                It&apos;s a training system that teaches you how to:
              </p>
              <ul className="space-y-2 font-mono text-base md:text-lg text-muted-foreground">
                <li>• Understand market behavior</li>
                <li>• Build structured strategies</li>
                <li>• Think like a system engineer</li>
                <li>• Develop real trading frameworks</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                REMOVE NOISE
              </h3>
              <p className="font-mono text-base md:text-lg text-muted-foreground mb-3">
                We remove 90% of what&apos;s slowing you down:
              </p>
              <div className="grid gap-2 md:grid-cols-2 font-mono text-base md:text-lg text-muted-foreground">
                <p>
                  <span className="text-destructive font-semibold mr-2">[REMOVE]</span>
                  Signal dependency
                </p>
                <p>
                  <span className="text-destructive font-semibold mr-2">[REMOVE]</span>
                  Indicator overload
                </p>
                <p>
                  <span className="text-destructive font-semibold mr-2">[REMOVE]</span>
                  Prediction mindset
                </p>
                <p>
                  <span className="text-destructive font-semibold mr-2">[REMOVE]</span>
                  Random entries
                </p>
                <p>
                  <span className="text-destructive font-semibold mr-2">[REMOVE]</span>
                  Emotional execution
                </p>
              </div>
              <p className="mt-4 font-mono text-base md:text-lg text-muted-foreground/90">
                And replace it with:
              </p>
              <div className="grid gap-2 md:grid-cols-2 font-mono text-base md:text-lg text-muted-foreground">
                <p>
                  <span className="text-primary font-semibold mr-2">[INSTALL]</span>
                  Structured thinking
                </p>
                <p>
                  <span className="text-primary font-semibold mr-2">[INSTALL]</span>
                  Data-driven decisions
                </p>
                <p>
                  <span className="text-primary font-semibold mr-2">[INSTALL]</span>
                  System-based execution
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                CORE SYSTEM
              </h3>
              <p className="font-mono text-base md:text-lg text-muted-foreground mb-4">
                MARKET HACKERS CORE: <span className="text-primary font-semibold">SCAN → VALIDATE → EXECUTE</span>
              </p>
              <div className="grid gap-4 md:grid-cols-3 font-mono text-sm md:text-base text-muted-foreground">
                <div>
                  <p className="font-semibold text-foreground">SCAN</p>
                  <p>Scan for patterns.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">VALIDATE</p>
                  <p>Validate behavior.</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">EXECUTE</p>
                  <p>Execute only with edge.</p>
                </div>
              </div>
              <p className="mt-4 font-mono text-base md:text-lg text-muted-foreground/90">
                No guessing. No prediction.
              </p>
            </div>

            <div>
              <h3 className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                COMMUNITY
              </h3>
              <p className="font-mono text-base md:text-lg text-muted-foreground mb-3">
                You won&apos;t do this alone.
              </p>
              <p className="font-mono text-base md:text-lg text-muted-foreground">
                Inside Market Hackers:
              </p>
              <ul className="mt-2 space-y-1 font-mono text-base md:text-lg text-muted-foreground">
                <li>• Strategy discussions</li>
                <li>• System building</li>
                <li>• Research collaboration</li>
                <li>• Real market analysis</li>
              </ul>
              <p className="mt-4 font-mono text-base md:text-lg text-muted-foreground/90">
                You don&apos;t follow traders. You build with them.
              </p>
            </div>
          </div>
        </section>

        {/* TRANSFORMATION + CTA */}
        <section className="bg-background">
          <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-18 lg:px-20">
            <div className="grid gap-10 md:grid-cols-[1.5fr,1fr] items-start">
              <div>
                <p className="font-mono text-sm md:text-base tracking-[0.3em] text-primary/70 uppercase mb-4">
                  TRANSFORMATION
                </p>
                <h2 className="font-mono text-3xl md:text-4xl font-bold mb-6 text-foreground">
                  From guessing trades to <span className="text-primary">system-level execution</span>.
                </h2>
                <div className="grid gap-4 md:grid-cols-2 font-mono text-sm md:text-base text-muted-foreground">
                  <div>
                    <p className="font-semibold text-foreground mb-1">From:</p>
                    <ul className="space-y-1">
                      <li>• Guessing trades</li>
                      <li>• Emotional decisions</li>
                      <li>• Inconsistent results</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">To:</p>
                    <ul className="space-y-1">
                      <li>• Structured execution</li>
                      <li>• System-based thinking</li>
                      <li>• Controlled risk</li>
                    </ul>
                  </div>
                </div>

                <p className="mt-6 font-mono text-base md:text-lg text-muted-foreground/90">
                  Market Hackers = system / hacker / quant angle.
                  <br />
                  You don&apos;t need clarity. <span className="text-primary font-semibold">You need to understand the system.</span>
                </p>
              </div>

              <div className="border border-primary/40 bg-black/40 backdrop-blur-md p-6 rounded-lg space-y-4">
                <p className="font-mono text-sm md:text-base tracking-[0.2em] text-primary/70 uppercase">
                  READY?
                </p>
                <p className="font-mono text-base md:text-lg text-muted-foreground">
                  Access the training and join Market Hackers.
                </p>
                <Button className="w-full font-mono text-xs md:text-sm tracking-[0.2em] bg-primary text-primary-foreground hover:bg-primary/90 box-glow glitch-hover">
                  {'>'} ACCESS THE TRAINING · JOIN MARKET HACKERS
                </Button>
                <p className="font-mono text-xs md:text-sm text-muted-foreground/70">
                  Future funnel blocks like testimonials, pricing, modules, guarantee, and scarcity can all plug in below this section as you scale the offer.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VideoTraining;

