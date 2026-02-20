import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles, Rocket, Zap } from "lucide-react";
import { SectionLayout } from "./SectionLayout";

interface CTASectionContent {
    heading?: string;
    subheading?: string;
    buttonLabel?: string;
    buttonUrl?: string;
    secondaryLabel?: string;
    secondaryUrl?: string;
    template?: string;
}

export function CTASection({ content }: { content: CTASectionContent }) {
    const template = content.template || "style-1";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid CTA (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border font-mono relative">
                <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-widest border-b border-l border-border opacity-50 z-10 hidden md:block">
                    ACT_REQ_V1.0
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    <div className="p-12 md:p-24 flex flex-col justify-between min-h-[400px]">
                        <div>
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-3 h-3 bg-primary animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">System Alert</span>
                            </div>
                            {content.heading && (
                                <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-foreground uppercase leading-[0.85] mb-8 break-words text-balance">
                                    {content.heading}
                                </h2>
                            )}
                        </div>
                        {content.subheading && (
                            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-xl border-l-2 border-primary/20 pl-6 py-2">
                                {content.subheading}
                            </p>
                        )}
                    </div>

                    <div className="p-12 md:p-24 bg-muted/5 flex flex-col justify-center items-center text-center relative overflow-hidden group">
                        {/* Technical Grid Background */}
                        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

                        <div className="relative z-10 flex flex-col gap-6 w-full max-w-sm">
                            {content.buttonLabel && content.buttonUrl && (
                                <a
                                    href={content.buttonUrl}
                                    className="group/btn inline-flex items-center justify-between h-20 px-8 text-xl font-bold uppercase tracking-widest bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                                >
                                    <span>{content.buttonLabel}</span>
                                    <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
                                </a>
                            )}
                            {content.secondaryLabel && content.secondaryUrl && (
                                <a
                                    href={content.secondaryUrl}
                                    className="inline-flex items-center justify-center h-16 px-8 text-sm font-bold uppercase tracking-widest border-2 border-foreground hover:bg-foreground hover:text-background transition-colors"
                                >
                                    [{content.secondaryLabel}]
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic CTA (Refined)
        return (
            <SectionLayout width="container" padding="lg">
                <div className="relative rounded-[4rem] overflow-hidden bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-zinc-900 dark:to-zinc-800/50 p-12 md:p-32 text-center border border-white/40 dark:border-white/5 shadow-2xl">
                    {/* Organic Background Blobs */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-blue-200/30 dark:bg-blue-900/20 blur-[120px] animate-pulse" />
                        <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-rose-200/30 dark:bg-rose-900/20 blur-[120px] animate-pulse delay-1000" />
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
                            whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                            className="inline-block mb-10 p-6 rounded-[2rem] bg-white/80 dark:bg-zinc-800 shadow-xl border border-white/20 backdrop-blur-sm"
                        >
                            <Sparkles className="w-10 h-10 text-yellow-500 fill-yellow-500" />
                        </motion.div>

                        {content.heading && (
                            <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-foreground mb-8 drop-shadow-sm leading-[0.9]">
                                {content.heading}
                            </h2>
                        )}

                        {content.subheading && (
                            <p className="text-xl md:text-3xl text-muted-foreground/80 mb-16 max-w-3xl mx-auto leading-relaxed font-light">
                                {content.subheading}
                            </p>
                        )}

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            {content.buttonLabel && content.buttonUrl && (
                                <motion.a
                                    href={content.buttonUrl}
                                    whileHover={{ scale: 1.05, y: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center h-20 px-16 rounded-[2.5rem] bg-indigo-600 text-white text-2xl font-bold shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 transition-all border-4 border-white/20"
                                >
                                    {content.buttonLabel}
                                </motion.a>
                            )}
                            {content.secondaryLabel && content.secondaryUrl && (
                                <motion.a
                                    href={content.secondaryUrl}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center h-20 px-12 rounded-[2.5rem] bg-white dark:bg-zinc-800 text-foreground text-xl font-bold shadow-lg hover:shadow-xl transition-all border border-transparent hover:border-indigo-200"
                                >
                                    {content.secondaryLabel}
                                </motion.a>
                            )}
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative w-full overflow-hidden isolation transition-all duration-1000",
                    template === "style-1" && "rounded-[2.5rem] md:rounded-[4rem] p-10 sm:p-16 md:p-32 bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 shadow-2xl",
                    template === "style-2" && "rounded-none p-10 sm:p-16 md:p-24 border-y border-primary/10 bg-transparent py-32 md:py-48",
                    template === "style-3" && "rounded-none p-10 sm:p-16 md:p-32 border-4 border-primary bg-card shadow-[20px_20px_0_0_black]"
                )}
            >
                {/* Visual Depth Layers for Style 1 */}
                {template === "style-1" && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                        <div className="absolute -top-1/2 -left-1/4 w-full h-[150%] bg-gradient-to-br from-primary/20 via-primary/5 to-transparent rounded-full blur-[120px] animate-pulse opacity-50" />
                        <div className="absolute -bottom-1/2 -right-1/4 w-full h-[150%] bg-gradient-to-tl from-purple-500/20 via-purple-500/5 to-transparent rounded-full blur-[120px] animate-pulse delay-700 opacity-50" />
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] mix-blend-overlay" />
                    </div>
                )}

                <div className={cn(
                    "relative z-10 flex flex-col items-center w-full",
                    template === "style-3" ? "items-start text-left" : "items-center text-center"
                )}>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className={cn(
                            "inline-flex items-center gap-2.5 px-5 py-2 rounded-full mb-8 md:mb-12 shadow-2xl transition-all duration-700",
                            template === "style-1" && "bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20",
                            template === "style-2" && "bg-transparent text-primary/60 border border-primary/10",
                            template === "style-3" && "bg-primary text-primary-foreground font-black uppercase tracking-[0.3em] rounded-none shadow-[4px_4px_0_0_black]"
                        )}
                    >
                        {template === "style-3" ? <Zap className="h-3.5 w-3.5 md:h-4 md:w-4" /> : <Rocket className="h-3.5 w-3.5 md:h-4 md:w-4 animate-bounce" />}
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Next Step</span>
                    </motion.div>


                    {content.heading && (
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "mb-8 md:mb-10 max-w-5xl leading-[1] md:leading-[0.9] transition-all duration-700 break-words",
                                template === "style-1" && "text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter",
                                template === "style-2" && "text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight italic",
                                template === "style-3" && "text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter"
                            )}
                        >
                            {content.heading}
                        </motion.h2>
                    )}

                    {content.subheading && (
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "leading-relaxed mb-12 md:mb-16 transition-all duration-700",
                                template === "style-3" ? "max-w-none" : "max-w-3xl",
                                template === "style-1" && "text-base md:text-2xl text-muted-foreground font-light",
                                template === "style-2" && "text-lg md:text-xl text-muted-foreground font-serif italic py-6 border-y border-primary/10",
                                template === "style-3" && "text-sm md:text-lg font-mono uppercase tracking-widest opacity-60"
                            )}
                        >
                            {content.subheading}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "flex flex-col sm:flex-row gap-6 sm:gap-10 w-full items-center",
                            template === "style-3" ? "justify-start" : "justify-center"
                        )}
                    >
                        {content.buttonLabel && content.buttonUrl && (
                            <motion.a
                                href={content.buttonUrl}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "group relative inline-flex items-center justify-center transition-all shadow-2xl w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                    template === "style-1" && "rounded-[1.5rem] md:rounded-[2rem] h-16 md:h-20 px-10 md:px-14 text-base md:text-xl font-black bg-primary text-primary-foreground",
                                    template === "style-2" && "rounded-full h-14 md:h-16 px-8 md:px-12 text-sm md:text-base font-medium border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
                                    template === "style-3" && "rounded-none h-16 md:h-20 px-10 md:px-14 text-base md:text-xl font-black bg-primary text-primary-foreground shadow-[8px_8px_0_0_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                )}
                            >
                                <Sparkles className="mr-3 h-4 w-4 md:h-5 md:w-5 animate-pulse" />
                                {content.buttonLabel}
                                <ArrowRight className="ml-3 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-2" />
                            </motion.a>
                        )}

                        {content.secondaryLabel && content.secondaryUrl && (
                            <motion.a
                                href={content.secondaryUrl}
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "inline-flex items-center justify-center transition-all border-2 w-full sm:w-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                                    template === "style-1" && "rounded-[1.5rem] md:rounded-[2rem] h-16 md:h-20 px-10 md:px-14 text-base md:text-xl font-black border-primary/10 bg-primary/2 dark:bg-primary/5 backdrop-blur-md text-foreground hover:bg-primary/10",
                                    template === "style-2" && "rounded-full h-14 md:h-16 px-8 md:px-12 text-sm md:text-base font-medium border-primary/20 text-muted-foreground hover:border-primary/60",
                                    template === "style-3" && "rounded-none h-16 md:h-20 px-10 md:px-14 text-base md:text-xl font-black border-primary text-primary shadow-[8px_8px_0_0_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                )}
                            >
                                {content.secondaryLabel}
                            </motion.a>
                        )}
                    </motion.div>
                </div>

                {/* Perspective Accent for Style 1 */}
                {template === "style-1" && (
                    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-primary/20 blur-[100px] opacity-20 pointer-events-none" />
                )}
            </motion.div>
        </SectionLayout>
    );
}
