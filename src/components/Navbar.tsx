import { motion } from "framer-motion";

const Navbar = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/30 bg-background/90 backdrop-blur-md"
    >
      <div className="w-full px-6 md:px-12 lg:px-20 h-14 flex items-center justify-between">
        <a href="#" className="font-mono text-sm font-bold tracking-wider text-primary text-glow flicker">
          MARKET<span className="text-foreground">HACKERS</span>
        </a>
        <div className="flex items-center gap-8 font-mono text-xs text-muted-foreground">
          <a href="#path" className="hover:text-primary transition-colors hidden sm:block">PATH</a>
          <a href="#community" className="hover:text-primary transition-colors hidden sm:block">COMMUNITY</a>
          <a href="#join" className="hover:text-primary transition-colors hidden sm:block">JOIN</a>
          <span className="hidden md:inline text-primary/30 text-[10px]">v2.0.1</span>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
