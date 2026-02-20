import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";
import { Sparkles } from "lucide-react";

interface TimelineItem { date: string; title: string; description?: string; }
interface TimelineSectionContent {
    heading?: string;
    subheading?: string;
    items?: TimelineItem[];
    template?: string;
}

export function TimelineSection({ content }: { content: TimelineSectionContent }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const items = content.items || [];
    const template = content.template || "style-1";

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springScroll = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Timeline
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-3 min-h-screen">
                    {/* Static Header / Sidebar */}
                    <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-border p-8 md:p-20 md:sticky md:top-0 md:max-h-screen flex flex-col justify-center bg-muted/5">
                        {content.heading && (
                            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase leading-[0.85] mb-8">
                                {content.heading}
                            </h2>
                        )}
                        {content.subheading && (
                            <p className="text-lg text-muted-foreground font-mono max-w-xs">
                                {content.subheading}
                            </p>
                        )}
                    </div>

                    {/* Scrolling Timeline Items */}
                    <div className="md:col-span-2">
                        {items.map((item, i) => (
                            <div key={i} className="border-b border-border p-8 md:p-20 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 hover:bg-muted/5 transition-colors">
                                <div className="font-mono text-lg md:text-2xl text-primary font-bold">
                                    {item.date}
                                </div>
                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold uppercase tracking-tight mb-4">{item.title}</h3>
                                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Timeline
        return (
            <SectionLayout width="container" padding="lg">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    {content.heading && (
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                            {content.heading}
                        </h2>
                    )}
                    {content.subheading && (
                        <p className="text-xl text-muted-foreground">
                            {content.subheading}
                        </p>
                    )}
                </div>

                <div className="relative max-w-4xl mx-auto">
                    {/* Center Line */}
                    <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-1 bg-gradient-to-b from-primary/5 via-primary/20 to-primary/5 rounded-full md:-translate-x-1/2" />

                    <div className="space-y-12 md:space-y-16">
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "relative flex flex-col md:flex-row gap-6 md:gap-16 items-start md:items-center pl-12 md:pl-0",
                                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse md:text-right"
                                )}
                            >
                                {/* Dot */}
                                <div className="absolute left-[8px] md:left-1/2 top-0 md:top-1/2 w-8 h-8 md:w-10 md:h-10 bg-background border-4 border-primary rounded-full md:-translate-x-1/2 md:-translate-y-1/2 shadow-[0_0_20px_rgba(var(--primary),0.3)] z-10 hidden md:block" />
                                <div className="absolute left-[0px] top-6 w-3 h-3 bg-primary rounded-full z-10 md:hidden" /> {/* Mobile Dot */}

                                {/* Date Side */}
                                <div className={cn(
                                    "md:w-1/2 md:px-8 pt-4 md:pt-0",
                                    i % 2 === 0 ? "md:text-right" : "md:text-left"
                                )}>
                                    <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm">
                                        {item.date}
                                    </span>
                                </div>

                                {/* Content Side */}
                                <div className={cn(
                                    "w-full md:w-1/2 md:px-8",
                                    i % 2 === 0 ? "md:text-left" : "md:text-right"
                                )}>
                                    <div className="bg-white dark:bg-zinc-800 p-6 md:p-8 rounded-[2rem] shadow-lg border border-primary/5 hover:scale-[1.02] transition-transform duration-300">
                                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                        <p className="text-muted-foreground">{item.description}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "narrow"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div ref={containerRef} className="relative w-full">
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-32 -top-32 h-96 w-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -right-32 bottom-24 h-96 w-96 bg-primary/2 blur-[100px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-24 md:mb-40 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-6 md:mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight",
                                    template === "style-3" && "text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[0.05em]"
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
                                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto",
                                    template === "style-3" && "mx-0 text-left font-mono text-sm uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className="relative">
                    {/* Connecting Line */}
                    <div className={cn(
                        "absolute top-0 bottom-0 w-[1px] bg-primary/10",
                        template === "style-1" && "left-[24px] md:left-1/2 -translate-x-1/2 md:translate-x-0",
                        template === "style-2" && "left-0",
                        template === "style-3" && "left-0 md:left-[100px]"
                    )}>
                        <motion.div
                            className={cn(
                                "absolute top-0 left-0 w-full bg-gradient-to-b from-primary via-primary to-transparent shadow-[0_0_15px_rgba(var(--primary),0.5)]",
                                template === "style-3" && "shadow-none"
                            )}
                            style={{ height: useTransform(springScroll, [0, 0.8], ["0%", "100%"]) }}
                        />
                    </div>

                    <div className={cn(
                        "space-y-32 md:space-y-48",
                        template === "style-2" && "space-y-16 md:space-y-24",
                        template === "style-3" && "space-y-24 md:space-y-32"
                    )}>
                        {items.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "relative flex gap-8 md:gap-16",
                                    template === "style-1" && cn(
                                        "flex-col md:flex-row items-start md:items-center",
                                        i % 2 === 0 ? "md:flex-row-reverse text-left md:text-right" : "text-left"
                                    ),
                                    template === "style-2" && "flex-col pl-12",
                                    template === "style-3" && "flex-col md:flex-row gap-8 pl-12 md:pl-0"
                                )}
                            >
                                {/* Node/Dot */}
                                <div className={cn(
                                    "absolute flex items-center justify-center shrink-0 z-10",
                                    template === "style-1" && "left-[24px] md:left-1/2 w-12 h-12 -translate-x-1/2 rounded-full border border-primary/20 bg-background shadow-2xl",
                                    template === "style-2" && "left-[-8px] top-2 w-4 h-4 rounded-full bg-primary ring-4 ring-background",
                                    template === "style-3" && "left-[-8px] md:left-[92px] top-2 w-4 h-4 bg-primary rotate-45"
                                )}>
                                    {template === "style-1" && <Sparkles className="w-5 h-5 text-primary" />}
                                </div>

                                {/* Date */}
                                <div className={cn(
                                    template === "style-1" && "w-full md:w-1/2 pl-16 md:pl-0 md:px-16",
                                    template === "style-3" && "md:w-[200px] shrink-0 font-mono text-primary font-bold md:text-right md:pr-16"
                                )}>
                                    <span className={cn(
                                        template === "style-1" && "text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-foreground",
                                        template === "style-2" && "font-serif italic text-muted-foreground text-lg block mb-2",
                                        template === "style-3" && "text-xl md:text-2xl tracking-widest uppercase"
                                    )}>
                                        {item.date}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className={cn(
                                    template === "style-1" && "w-full md:w-1/2 pl-16 md:pl-0 md:px-16",
                                    template === "style-3" && "flex-1 pt-2"
                                )}>
                                    <h3 className={cn(
                                        "mb-4",
                                        template === "style-1" && "text-3xl lg:text-5xl font-bold tracking-tight",
                                        template === "style-2" && "text-2xl md:text-3xl font-serif text-foreground",
                                        template === "style-3" && "text-3xl md:text-5xl font-black uppercase tracking-tighter"
                                    )}>
                                        {item.title}
                                    </h3>
                                    <p className={cn(
                                        "leading-relaxed",
                                        template === "style-1" && "text-lg text-muted-foreground",
                                        template === "style-2" && "text-lg text-muted-foreground font-serif italic max-w-xl",
                                        template === "style-3" && "text-base font-mono uppercase tracking-wide opacity-60 max-w-2xl"
                                    )}>
                                        {item.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
