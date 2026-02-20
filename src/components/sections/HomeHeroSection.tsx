import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionLayout } from "./SectionLayout";
import { useRef } from "react";

export function HomeHeroSection({ content }: { content: any }) {
    const {
        badge = "Personal Blog",
        heading = "Ideas worth writing about.",
        highlightedWord = "writing",
        description = "A space for thoughts on technology, design, and the things that make life interesting.",
        primaryButtonText = "Read the Blog",
        primaryButtonLink = "/blog",
        secondaryButtonText = "About Me",
        secondaryButtonLink = "#about",
        template = "style-1",
        backgroundImage
    } = content || {};

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const headingParts = heading.split(highlightedWord);

    if (template === "style-2") {
        // STYLE 2: Minimalist / Bold Typography Centered
        return (
            <SectionLayout width="readable" padding="xl" align="center" className="min-h-[80vh] flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="text-center"
                >
                    <span className="text-[10px] uppercase font-black tracking-[0.4em] text-primary mb-8 block">{badge}</span>
                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none italic uppercase break-words">
                        {heading}
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light mb-12 max-w-2xl mx-auto">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <Button size="lg" className="rounded-full h-16 px-10 text-lg font-bold" asChild>
                            <Link to={primaryButtonLink}>{primaryButtonText}</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full h-16 px-10 text-lg font-bold bg-transparent" asChild>
                            <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                        </Button>
                    </div>
                </motion.div>
            </SectionLayout>
        );
    }

    if (template === "style-3") {
        // STYLE 3: Modern Split with Image Background (Neo-Brutalist)
        return (
            <SectionLayout width="full" padding="none" className="h-[90vh] flex items-center relative overflow-hidden bg-zinc-950">
                <div className="absolute inset-y-0 right-0 w-1/2 hidden lg:block overflow-hidden">
                    {backgroundImage ? (
                        <img src={backgroundImage} alt="Hero" className="w-full h-full object-cover grayscale brightness-50" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-zinc-900" />
                    )}
                </div>
                <div className="container relative z-10 px-6 md:px-20 lg:w-1/2">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col text-white"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-primary/20 border border-primary/30 text-xs font-bold uppercase tracking-widest text-primary mb-8 w-fit">{badge}</span>
                        <h1 className="text-6xl md:text-[7rem] font-black tracking-tighter leading-[0.85] mb-8 break-words">
                            {headingParts[0]}<span className="text-primary">{highlightedWord}</span>{headingParts[1]}
                        </h1>
                        <p className="text-xl md:text-2xl text-zinc-400 font-light mb-12 max-w-lg leading-relaxed">
                            {description}
                        </p>
                        <div className="flex gap-6">
                            <Link to={primaryButtonLink} className="flex items-center gap-4 text-sm font-black tracking-widest uppercase hover:gap-6 transition-all duration-300">
                                {primaryButtonText} <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-4") {
        // STYLE 4: Swiss Grid (Technical & Structured)
        return (
            <SectionLayout width="full" padding="none" className="min-h-screen pt-20 flex flex-col bg-background relative font-mono text-foreground">
                {/* Grid Lines Overlay */}
                <div className="absolute inset-0 pointer-events-none z-0 opacity-10"
                    style={{ backgroundImage: 'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-b border-border relative z-10">
                    {/* Left Content Area */}
                    <div className="lg:col-span-8 border-r border-border p-6 md:p-12 lg:p-24 flex flex-col justify-between relative bg-background/50 backdrop-blur-sm">

                        {/* Header Details */}
                        <div className="flex justify-between items-start mb-12 border-b border-border pb-4">
                            <span className="text-xs font-bold uppercase tracking-widest">[ 01 / HERO ]</span>
                            <span className="text-xs font-bold uppercase tracking-widest hidden md:block">COORDS: {`{ 0, 0 }`}</span>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="max-w-4xl"
                        >
                            <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-none mb-10 text-foreground break-words uppercase">
                                {heading}
                            </h1>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="h-4 w-4 bg-primary animate-pulse" />
                                <div className="h-px bg-primary w-24" />
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">System Online</span>
                            </div>

                            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-12 font-sans">
                                {description}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-0 border border-foreground w-fit">
                                <Button size="lg" className="h-16 px-10 rounded-none text-base bg-foreground text-background hover:bg-primary hover:text-foreground transition-colors border-r border-background" asChild>
                                    <Link to={primaryButtonLink}>{primaryButtonText}</Link>
                                </Button>
                                <Button size="lg" variant="ghost" className="h-16 px-10 rounded-none text-base hover:bg-muted font-bold uppercase tracking-wider" asChild>
                                    <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                                </Button>
                            </div>
                        </motion.div>

                        {/* Footer Details */}
                        <div className="mt-12 pt-4 border-t border-border flex justify-between items-end opacity-50">
                            <span className="text-[10px] uppercase">Scroll to explore</span>
                            <ArrowRight className="w-4 h-4 rotate-90" />
                        </div>
                    </div>

                    {/* Right Visual Area */}
                    <div className="lg:col-span-4 bg-muted/10 relative overflow-hidden flex flex-col items-center justify-center p-8 border-t lg:border-t-0 border-border min-h-[300px]">
                        <div className="absolute inset-0 bg-[radial-gradient(#444_1px,transparent_1px)] dark:bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                        <div className="relative z-10 w-full max-w-xs aspect-square border-2 border-foreground rounded-full flex items-center justify-center">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-3/4 h-3/4 border border-dashed border-primary rounded-full"
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="font-mono text-4xl font-black tracking-tighter">{badge || "SWISS"}</span>
                            </div>
                        </div>

                        <div className="absolute bottom-4 right-4 font-mono text-[10px] opacity-40">
                            FIG. 01
                        </div>
                    </div>
                </div>
            </SectionLayout>

        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic (Friendly & Modern)
        return (
            <SectionLayout width="container" padding="none" className="min-h-[90vh] flex items-center justify-center bg-zinc-50/50 dark:bg-zinc-900/50 my-12 rounded-[3rem] overflow-hidden mx-4 md:mx-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-white/50 dark:border-white/5">
                <div className="w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center p-8 md:p-20">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1 relative"
                    >
                        <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/10 aspect-square lg:aspect-[4/3] border-8 border-white dark:border-zinc-800 rotate-[-2deg] transition-transform hover:rotate-0 duration-700">
                            {backgroundImage ? (
                                <img src={backgroundImage} alt="Hero" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 flex items-center justify-center">
                                    <Sparkles className="w-32 h-32 text-indigo-300 dark:text-indigo-700/50" />
                                </div>
                            )}
                        </div>
                        {/* Organic Blobs */}
                        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-300/30 rounded-full blur-3xl -z-10 animate-pulse" />
                        <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-blue-300/30 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block px-5 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-sm text-sm font-bold text-indigo-500 mb-8 border border-indigo-100 dark:border-indigo-900/50"
                        >
                            {badge} 🌿
                        </motion.span>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 mb-8 leading-[0.95] break-words"
                        >
                            {heading}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-xl md:text-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-12 max-w-xl mx-auto lg:mx-0 font-medium"
                        >
                            {description}
                        </motion.p>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <Button size="lg" className="h-16 px-10 rounded-full text-lg shadow-xl shadow-indigo-500/20 hover:shadow-2xl hover:scale-105 transition-all bg-indigo-600 hover:bg-indigo-700 text-white border-none" asChild>
                                <Link to={primaryButtonLink}>{primaryButtonText}</Link>
                            </Button>
                            <Button size="lg" variant="secondary" className="h-16 px-10 rounded-full text-lg bg-white dark:bg-zinc-800 shadow-sm hover:bg-zinc-50 border border-zinc-100 dark:border-zinc-800" asChild>
                                <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    // DEFAULT STYLE 1: Floating Cards Layout
    return (
        <SectionLayout width="wide" padding="none" className="min-h-[85vh] md:min-h-[95vh] flex items-center pt-24 md:pt-32 overflow-hidden">
            <div ref={containerRef} className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full relative z-10 px-6 sm:px-10">
                {/* Background Atmosphere */}
                <div className="absolute -left-20 -top-20 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <motion.div
                    style={{ opacity }}
                    className="relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left"
                >
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-8"
                    >
                        <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-primary/20 bg-primary/5 text-[10px] font-black tracking-[0.3em] uppercase text-primary shadow-2xl">
                            <Sparkles className="h-3 w-3 animate-pulse" />
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.9] mb-10 break-words"
                    >
                        {headingParts[0]}
                        <span className="relative inline-block">
                            <span className="relative z-10 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                {highlightedWord}
                            </span>
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1.2, delay: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="absolute bottom-2 left-0 h-4 bg-primary/10 -z-10"
                            />
                        </span>
                        {headingParts[1]}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed mb-12 md:mb-16 max-w-2xl font-light"
                    >
                        {description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                    >
                        <Button size="lg" className="rounded-full h-16 md:h-20 px-10 md:px-14 text-base md:text-lg font-black group shadow-2xl shadow-primary/20 overflow-hidden relative" asChild>
                            <Link to={primaryButtonLink}>
                                {primaryButtonText}
                                <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full h-16 md:h-20 px-10 md:px-14 text-base md:text-lg font-black border-primary/10 hover:bg-primary/5" asChild>
                            <a href={secondaryButtonLink}>{secondaryButtonText}</a>
                        </Button>
                    </motion.div>
                </motion.div>

                <div className="relative h-[400px] lg:h-[700px] w-full hidden lg:block">
                    {/* Floating Cards / Abstract Visuals */}
                    <motion.div
                        style={{ y: y1 }}
                        className="absolute top-0 right-10 w-64 lg:w-80 h-[400px] lg:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10 bg-card/40 dark:bg-card/20 backdrop-blur-3xl rotate-3 z-10 p-1"
                    >
                        <div className="h-full w-full rounded-[2.8rem] bg-gradient-to-br from-primary/10 via-card/40 to-purple-500/10 p-10 flex flex-col justify-end">
                            <div className="space-y-4">
                                <div className="h-4 w-2/3 bg-primary/20 rounded-full animate-pulse" />
                                <div className="h-4 w-full bg-primary/10 rounded-full" />
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: y2 }}
                        className="absolute bottom-10 left-0 lg:left-10 w-64 lg:w-72 h-[350px] lg:h-[450px] rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10 bg-card/60 dark:bg-card/40 backdrop-blur-3xl -rotate-6 z-20"
                    >
                        <div className="p-10 space-y-10">
                            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center shadow-xl">
                                <BookOpen className="text-primary w-7 h-7" />
                            </div>
                            <div className="pt-10 flex -space-x-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 border-2 border-background shadow-lg" />
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Ambient glow */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] lg:w-[600px] h-[400px] lg:h-[600px] bg-primary/10 rounded-full blur-[100px] lg:blur-[150px] -z-10 animate-pulse" />
                </div>
            </div>
        </SectionLayout>
    );
}
