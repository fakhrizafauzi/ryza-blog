import { useRef, useEffect } from "react";
import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Sparkles, TrendingUp, ArrowUpRight, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsItem { value: string; label: string; description?: string; suffix?: string; prefix?: string; }
interface StatsSectionContent {
    heading?: string;
    subheading?: string;
    items?: StatsItem[];
    template?: string;
}

function Counter({ value, prefix = "", suffix = "", template = "style-1" }: { value: string, prefix?: string, suffix?: string, template?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, { damping: 30, stiffness: 60 });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;

    useEffect(() => {
        if (isInView) {
            motionValue.set(numericValue);
        }
    }, [isInView, numericValue, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Intl.NumberFormat('en-US').format(Math.floor(latest));
            }
        });
        return () => unsubscribe();
    }, [springValue]);

    return (
        <span className={cn("tabular-nums", template === "style-3" && "font-mono")}>
            {prefix}<span ref={ref}>0</span>{suffix || value.replace(/[0-9]/g, "")}
        </span>
    );
}

export function StatsSection({ content }: { content: StatsSectionContent }) {
    const items = content.items || [];
    const template = content.template || "style-1";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Stats (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border font-mono">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                    {items.map((item, i) => (
                        <div key={i} className="p-12 md:p-16 flex flex-col justify-between group hover:bg-muted/5 transition-colors relative min-h-[300px]">
                            <div className="flex justify-between items-start mb-8 z-10 relative">
                                <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground/50">
                                    DATA_POINT_{(i + 1).toString().padStart(2, '0')}
                                </span>
                                <TrendingUp className="w-5 h-5 text-muted-foreground/50 group-hover:text-foreground transition-colors" />
                            </div>

                            <div className="relative z-10">
                                <div className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground mb-4 tabular-nums block">
                                    <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} template={template} />
                                </div>
                                <div className="h-px w-12 bg-primary mb-4 transform origin-left scale-x-50 group-hover:scale-x-100 transition-transform duration-500" />
                                <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                                    {item.label}
                                </div>
                            </div>

                            {/* Subtle hover background pattern */}
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.02] transition-opacity duration-500 pointer-events-none"
                                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '10px 10px' }}
                            />
                        </div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Stats (High Fidelity)
        return (
            <SectionLayout width="container" padding="lg">
                <div className="rounded-[4rem] bg-zinc-100 dark:bg-zinc-800/30 p-12 md:p-20 relative overflow-hidden">
                    {/* Background gradients */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-50 pointer-events-none">
                        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-sky-200/50 dark:bg-sky-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse" />
                        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-200/50 dark:bg-pink-900/20 blur-[100px] rounded-full mix-blend-multiply dark:mix-blend-screen animate-pulse delay-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                        {items.map((item, i) => (
                            <div key={i} className="text-center group relative">
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    whileInView={{ scale: 1, opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, type: "spring" }}
                                    whileHover={{ y: -10, rotate: i % 2 === 0 ? 5 : -5 }}
                                    className="w-20 h-20 mx-auto mb-8 rounded-[2rem] bg-white dark:bg-zinc-800 shadow-xl shadow-indigo-500/10 flex items-center justify-center text-primary group-hover:bg-gradient-to-br group-hover:from-indigo-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300"
                                >
                                    <Sparkles className="w-8 h-8" />
                                </motion.div>
                                <div className="text-5xl md:text-6xl font-black text-foreground mb-4 tracking-tight drop-shadow-sm">
                                    <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} template={template} />
                                </div>
                                <div className="text-lg text-muted-foreground font-medium bg-white/50 dark:bg-zinc-800/50 inline-block px-4 py-1 rounded-full backdrop-blur-sm">
                                    {item.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout width="wide" padding="lg" align="center">
            <div className="relative w-full">
                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-32 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-8 leading-[1] md:leading-[0.9] break-words",
                                    template === "style-1" && "text-5xl md:text-8xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl md:text-6xl font-serif font-light tracking-tight",
                                    template === "style-3" && "text-5xl md:text-7xl font-black uppercase tracking-[0.1em]"
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
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "leading-relaxed max-w-2xl px-4",
                                    template === "style-3" ? "mr-auto" : "mx-auto",
                                    template === "style-1" && "text-lg md:text-2xl text-muted-foreground font-light",
                                    template === "style-2" && "text-base md:text-xl text-muted-foreground font-serif italic border-l-2 border-primary/20 pl-6",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-[0.2em] opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 w-full",
                    template === "style-2" && "divide-x divide-primary/10"
                )}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "group relative flex flex-col transition-all duration-700 overflow-hidden",
                                template === "style-1" && "p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 shadow-2xl hover:shadow-primary/5 hover:border-primary/20",
                                template === "style-2" && "p-8 text-center items-center h-full border-none bg-transparent",
                                template === "style-3" && "p-8 border-2 border-primary/10 bg-card rounded-none hover:bg-primary/5 hover:border-primary/40"
                            )}
                        >
                            {template === "style-1" && (
                                <>
                                    <div className="absolute -right-20 -top-20 h-40 w-40 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />
                                    <div className="relative z-10 mb-8 md:mb-10 flex">
                                        <div className="p-3 md:p-4 rounded-xl md:rounded-2xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-inner">
                                            <TrendingUp className="h-5 w-5 md:h-6 md:w-6" />
                                        </div>
                                    </div>
                                </>
                            )}

                            {template === "style-3" && (
                                <div className="absolute top-4 right-4 text-primary/20 group-hover:text-primary transition-colors">
                                    <BarChart3 className="h-4 w-4" />
                                </div>
                            )}

                            <div className={cn(
                                "relative z-10 transition-colors duration-700 whitespace-nowrap",
                                template === "style-1" && "text-5xl md:text-7xl font-black tracking-tighter mb-4 md:mb-6 text-foreground group-hover:text-primary",
                                template === "style-2" && "text-6xl md:text-8xl font-serif text-primary/20 group-hover:text-primary",
                                template === "style-3" && "text-4xl md:text-6xl font-mono font-bold mb-4 tracking-tight"
                            )}>
                                <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} template={template} />
                            </div>

                            <div className={cn(
                                "relative z-10 flex items-center gap-3 md:gap-4 mb-4",
                                template === "style-2" && "flex-col gap-2",
                                template === "style-3" && "flex-row-reverse"
                            )}>
                                <div className={cn(
                                    "transition-colors",
                                    template === "style-1" && "h-px flex-1 bg-primary/10 group-hover:bg-primary/30",
                                    template === "style-2" && "h-1 w-12 bg-primary group-hover:w-20",
                                    template === "style-3" && "h-px flex-1 bg-primary/40"
                                )} />
                                <div className={cn(
                                    "uppercase tracking-[0.4em] text-primary whitespace-nowrap",
                                    template === "style-1" && "font-black text-[9px] md:text-[10px]",
                                    template === "style-2" && "font-serif text-xs md:text-sm",
                                    template === "style-3" && "font-mono font-bold text-[10px] md:text-xs"
                                )}>
                                    {item.label}
                                </div>
                                {template === "style-1" && <div className="h-px flex-1 bg-primary/10 group-hover:bg-primary/30 transition-colors" />}
                            </div>

                            {item.description && (
                                <p className={cn(
                                    "relative z-10 font-light leading-relaxed transition-all duration-700",
                                    template === "style-1" && "text-base md:text-lg text-muted-foreground text-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0",
                                    template === "style-2" && "text-sm md:text-base text-muted-foreground font-serif italic",
                                    template === "style-3" && "text-xs font-mono opacity-60"
                                )}>
                                    {item.description}
                                </p>
                            )}

                            {template === "style-1" && (
                                <div className="mt-8 flex justify-center opacity-40 group-hover:opacity-100 transition-opacity">
                                    <Sparkles className="h-4 w-4 text-primary/20 group-hover:text-primary group-hover:animate-pulse transition-all duration-700" />
                                </div>
                            )}

                            {template === "style-2" && (
                                <div className="mt-8">
                                    <ArrowUpRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x--2 translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Background Decor */}
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-20 -top-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -right-20 bottom-0 h-96 w-96 bg-primary/2 blur-[150px] rounded-full pointer-events-none" />
                    </>
                )}
            </div>
        </SectionLayout>
    );
}
