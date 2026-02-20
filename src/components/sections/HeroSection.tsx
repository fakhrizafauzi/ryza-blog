import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { ArrowRight } from "lucide-react";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

interface HeroSectionContent {
    heading?: string;
    subheading?: string;
    backgroundImage?: string;
    template?: string;
    primaryButtonText?: string;
    primaryButtonLink?: string;
}

export function HeroSection({ content }: { content: HeroSectionContent }) {
    const template = content.template || "style-1";
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

    if (template === "style-2") {
        // STYLE 2: Minimalist Split / Side Image
        return (
            <SectionLayout width="wide" padding="lg" align="left" className="min-h-[60vh] md:min-h-[80vh] flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="flex flex-col"
                    >
                        <h1 className="text-5xl md:text-8xl font-black italic tracking-tighter mb-8 leading-[0.9]">
                            {content.heading}
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-xl">
                            {content.subheading}
                        </p>
                        {content.primaryButtonText && (
                            <a href={content.primaryButtonLink} className="w-fit px-8 py-4 bg-primary text-primary-foreground font-bold rounded-full hover:scale-105 transition-transform">
                                {content.primaryButtonText}
                            </a>
                        )}
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="relative aspect-square md:aspect-[4/5] rounded-[3rem] overflow-hidden border border-border"
                    >
                        {content.backgroundImage ? (
                            <ZoomableImage src={content.backgroundImage} alt="Hero" className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground/20 italic font-black text-6xl rotate-12">
                                NO IMAGE
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
                    </motion.div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-4") {
        // STYLE 4: Swiss Impact Hero (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="min-h-screen flex flex-col relative bg-background font-mono overflow-hidden border-b border-border">
                {/* Technical Grid Background */}
                <div className="absolute inset-0 z-0 pointer-events-none"
                    style={{ backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                />

                {/* Top Status Bar */}
                <div className="w-full border-b border-border p-4 flex justify-between items-center z-10 bg-background/50 backdrop-blur-sm">
                    <div className="text-[10px] uppercase tracking-widest flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 animate-pulse rounded-full" />
                        SYSTEM_OPERATIONAL
                    </div>
                    <div className="text-[10px] uppercase tracking-widest hidden md:block">
                        COORD: {new Date().getFullYear()}.{new Date().getMonth() + 1}
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border z-10">
                    {/* Left Content */}
                    <div className="lg:col-span-7 flex flex-col justify-center p-8 md:p-16 lg:p-24 bg-background relative">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="relative z-10"
                        >
                            <div className="inline-block px-3 py-1 mb-8 border border-primary text-primary text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors cursor-crosshair">
                                V_{new Date().getFullYear()}.0
                            </div>
                            <h1 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8 text-balance">
                                {content.heading || "Design Impact"}
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-lg mb-12 border-l-4 border-primary pl-6 py-2">
                                {content.subheading || "A minimal, grid-based approach to digital design."}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-0 sm:border border-border w-fit">
                                {content.primaryButtonText && (
                                    <a
                                        href={content.primaryButtonLink}
                                        className="px-8 py-5 bg-foreground text-background text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all flex items-center gap-4 group"
                                    >
                                        {content.primaryButtonText}
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </a>
                                )}
                                <button className="px-8 py-5 bg-transparent text-foreground text-sm font-bold uppercase tracking-widest hover:bg-muted transition-all border-t sm:border-t-0 border-border">
                                    Documentation
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image/Graphic */}
                    <div className="lg:col-span-5 relative min-h-[400px] lg:min-h-auto overflow-hidden bg-muted/10 group">
                        {content.backgroundImage ? (
                            <div className="absolute inset-0">
                                <motion.img
                                    src={content.backgroundImage}
                                    alt="Hero"
                                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                                    style={{ scale }}
                                />
                                <div className="absolute inset-0 bg-primary/10 mix-blend-multiply opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            </div>
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-64 h-64 border-4 border-foreground rounded-full flex items-center justify-center animate-[spin_10s_linear_infinite]">
                                    <div className="w-48 h-48 border-2 border-primary rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
                                        <div className="w-2 h-2 bg-foreground rounded-full" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Overlay Grid */}
                        <div className="absolute inset-0 pointer-events-none opacity-20"
                            style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '100px 100px' }}
                        />

                        <div className="absolute bottom-0 left-0 p-4 bg-background border-t border-r border-border text-[10px] uppercase tracking-widest font-bold">
                            FIG. 01 — HERO_DISPLAY
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Organic Fluid Hero (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="min-h-[90vh] flex items-center relative overflow-hidden bg-zinc-50 dark:bg-zinc-950">
                {/* Fluid Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <motion.div
                        animate={{
                            translateY: [-20, 20, -20],
                            translateX: [-10, 10, -10],
                            rotate: [0, 5, 0]
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] bg-purple-200/40 dark:bg-purple-900/20 rounded-full blur-[100px]"
                    />
                    <motion.div
                        animate={{
                            translateY: [20, -20, 20],
                            translateX: [10, -10, 10],
                            rotate: [0, -5, 0]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                        className="absolute top-[20%] -right-[10%] w-[40vw] h-[40vw] bg-sky-200/40 dark:bg-sky-900/20 rounded-full blur-[100px]"
                    />
                    <div className="absolute bottom-0 left-1/3 w-[60vw] h-[40vw] bg-pink-100/40 dark:bg-pink-900/10 rounded-full blur-[120px]" />
                </div>

                <div className="container relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-white/20 shadow-sm mb-8 backdrop-blur-md"
                        >
                            <span className="flex h-2 w-2 rounded-full bg-indigo-500"></span>
                            <span className="text-sm font-medium text-foreground">Next Gen Design</span>
                        </motion.div>

                        <h1 className="text-6xl md:text-8xl font-black tracking-tight text-foreground mb-8 leading-[0.95] drop-shadow-sm">
                            {content.heading || "Create Without Limits"}
                        </h1>

                        <p className="text-xl md:text-2xl text-muted-foreground/90 font-light leading-relaxed mb-10 max-w-xl">
                            {content.subheading || "Experience a fluid, organic approach to building your next big idea."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            {content.primaryButtonText && (
                                <motion.a
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    href={content.primaryButtonLink}
                                    className="px-10 py-5 rounded-[2rem] bg-foreground text-background font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                                >
                                    {content.primaryButtonText}
                                </motion.a>
                            )}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 rounded-[2rem] bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-white/20 font-bold text-lg text-foreground shadow-sm hover:bg-white/80 transition-all flex items-center gap-2"
                            >
                                Learn More <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>

                    <div className="relative h-[600px] hidden lg:block perspective-[1000px]">
                        <motion.div
                            style={{
                                y,
                                rotateX: useTransform(scrollYProgress, [0, 1], [0, 10]),
                                rotateY: useTransform(scrollYProgress, [0, 1], [0, -10])
                            }}
                            className="relative w-full h-full"
                        >
                            {/* Main Floating Image */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8, rotate: -6 }}
                                whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
                                transition={{ duration: 1.2, type: "spring" }}
                                className="absolute top-10 right-10 w-4/5 h-4/5 rounded-[4rem] overflow-hidden shadow-2xl border-[8px] border-white dark:border-zinc-800 z-20"
                            >
                                {content.backgroundImage ? (
                                    <img src={content.backgroundImage} alt="Hero" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600" />
                                )}
                            </motion.div>

                            {/* Decorative Floating Cards */}
                            <motion.div
                                animate={{ y: [0, -20, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute bottom-20 left-0 w-64 p-6 rounded-[2rem] bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl shadow-xl border border-white/20 z-30"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">✓</div>
                                    <div className="text-sm font-bold">Success</div>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <div className="h-full w-[80%] bg-green-500 rounded-full" />
                                </div>
                            </motion.div>

                            <motion.div
                                animate={{ y: [0, 15, 0] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                className="absolute top-0 right-0 w-48 h-48 rounded-[3rem] bg-gradient-to-bl from-pink-300 to-rose-300 dark:from-pink-900 dark:to-rose-900 opacity-80 blur-2xl z-10"
                            />
                        </motion.div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Hero
        return (
            <SectionLayout width="full" padding="none" className="min-h-screen pt-20 flex flex-col bg-background font-mono">
                <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 border-b border-border">
                    <div className="lg:col-span-1 border-r border-border hidden lg:flex flex-col items-center py-10 justify-between">
                        <div className="writing-vertical-rl text-[10px] uppercase tracking-widest opacity-50">System Status: Nominal</div>
                        <div className="h-24 w-px bg-border my-4" />
                        <div className="writing-vertical-rl text-[10px] uppercase tracking-widest opacity-50">V.1.0.4</div>
                    </div>

                    <div className="lg:col-span-11 flex flex-col justify-center p-8 md:p-20 relative">
                        <div className="absolute top-0 right-0 w-32 h-32 border-l border-b border-border hidden lg:block" />

                        <div className="mb-8">
                            <span className="bg-foreground text-background px-2 py-1 text-xs font-bold uppercase">Introduction</span>
                        </div>

                        <h1 className="text-6xl md:text-9xl font-bold tracking-tight leading-[0.9] mb-12 text-foreground break-words uppercase max-w-5xl">
                            {content.heading}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-border pt-12 mt-auto">
                            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-sans">
                                {content.subheading}
                            </p>
                            <div className="flex items-start justify-start md:justify-end">
                                {content.primaryButtonText && (
                                    <a href={content.primaryButtonLink} className="inline-flex items-center gap-4 text-xl font-bold uppercase tracking-widest hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1">
                                        [{content.primaryButtonText}] <ArrowRight className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {/* Marquee or Footer Strip */}
                <div className="h-12 border-b border-border flex items-center bg-foreground text-background overflow-hidden relative">
                    <div className="flex gap-12 whitespace-nowrap animate-marquee">
                        {Array(10).fill(content.heading).map((t, i) => (
                            <span key={i} className="text-xs font-bold uppercase tracking-[0.2em]">{t} /// </span>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Hero
        return (
            <SectionLayout width="container" padding="lg" className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-teal-200/30 dark:bg-teal-900/10 rounded-full blur-[100px] animate-blob" />
                    <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-amber-200/30 dark:bg-amber-900/10 rounded-full blur-[100px] animate-blob animation-delay-2000" />
                </div>

                <div className="w-full text-center relative z-10 max-w-5xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative inline-block mb-12"
                    >
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-black/20 backdrop-blur-md border border-white/20 text-sm font-medium text-foreground/80 mb-6">
                            👋 {content.subheading?.split(' ')[0] || "Hello"}
                        </span>

                        <div className="relative z-10 text-6xl md:text-[6rem] lg:text-[7rem] font-bold tracking-tight text-foreground leading-[1] break-words">
                            {content.heading}
                        </div>

                        {/* Friendly doodles */}
                        <svg className="absolute -top-12 -right-16 w-32 h-32 text-amber-400 rotate-12 hidden md:block" viewBox="0 0 100 100" fill="currentColor">
                            <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                        </svg>
                    </motion.div>

                    <p className="text-2xl md:text-3xl text-foreground/70 font-light max-w-3xl mx-auto leading-relaxed mb-16 text-balance">
                        {content.subheading}
                    </p>

                    {content.primaryButtonText && (
                        <motion.a
                            whileHover={{ scale: 1.05, rotate: -2 }}
                            whileTap={{ scale: 0.95 }}
                            href={content.primaryButtonLink}
                            className="inline-flex h-20 px-12 items-center justify-center rounded-[3rem] bg-foreground text-background text-xl font-bold border-4 border-transparent hover:border-background/20 shadow-2xl transition-all"
                        >
                            {content.primaryButtonText}
                        </motion.a>
                    )}
                </div>
            </SectionLayout>
        );
    }

    // DEFAULT STYLE 1: Cinematic Parallax
    return (
        <SectionLayout id="hero" width="full" padding="none" align="center" className="relative min-h-[80vh] md:min-h-screen flex items-center justify-center overflow-hidden">
            <div ref={ref} className="absolute inset-0 w-full h-full overflow-hidden">
                <motion.div style={{ y, opacity, scale }} className="absolute inset-0 z-0">
                    {content.backgroundImage ? (
                        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${content.backgroundImage})` }}>
                            <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
                        </div>
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-950 to-primary/20" />
                    )}
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            </div>

            <div className="relative z-10 flex flex-col max-w-5xl w-full items-center text-center px-6 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h1 className="text-5xl md:text-[8rem] font-black tracking-tighter mb-8 leading-[0.85] text-white">
                        {content.heading}
                    </h1>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="text-lg md:text-2xl text-zinc-300 max-w-2xl font-light leading-relaxed mb-12"
                >
                    {content.subheading}
                </motion.p>

                {content.primaryButtonText && (
                    <motion.a
                        href={content.primaryButtonLink}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-full hover:scale-110 transition-transform"
                    >
                        {content.primaryButtonText}
                    </motion.a>
                )}
            </div>
        </SectionLayout>
    );
}
