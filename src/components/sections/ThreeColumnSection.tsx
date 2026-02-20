import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Sparkles, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThreeColumnSectionContent {
    heading?: string;
    subheading?: string;
    columns?: { heading?: string; content?: string }[];
    template?: string;
}

export function ThreeColumnSection({ content }: { content: ThreeColumnSectionContent }) {
    const cols = content.columns || [];
    const template = content.template || "style-1";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Three Column
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                {/* Header Strip */}
                {(content.heading || content.subheading) && (
                    <div className="border-b border-border p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-4">
                            <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground uppercase">
                                {content.heading}
                            </h2>
                        </div>
                        <div className="lg:col-span-8 flex items-end">
                            <p className="text-xl md:text-2xl text-muted-foreground font-mono max-w-3xl">
                                {content.subheading}
                            </p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                    {cols.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 md:p-14 group hover:bg-muted/30 transition-colors"
                        >
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-8 block">
                                0{i + 1}
                            </span>
                            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-foreground group-hover:text-primary transition-colors">
                                {col.heading}
                            </h3>
                            <p className="text-lg text-muted-foreground font-mono leading-relaxed">
                                {col.content}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Three Column
        return (
            <SectionLayout width="container" padding="lg">
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 max-w-4xl mx-auto">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
                        >
                            {content.heading}
                        </motion.h2>
                        <p className="text-xl text-muted-foreground">
                            {content.subheading}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {cols.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="p-8 pb-12 rounded-[2.5rem] bg-white dark:bg-zinc-800/80 shadow-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-primary/10"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8">
                                <span className="text-xl font-bold text-primary">{i + 1}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-4 text-foreground">
                                {col.heading}
                            </h3>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                {col.content}
                            </p>
                        </motion.div>
                    ))}
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
            <div className="relative w-full">
                {/* Background Decor - Style 1 only */}
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-24 -top-24 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -right-24 bottom-24 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />
                    </>
                )}

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
                                    "mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight italic",
                                    template === "style-3" && "text-5xl md:text-7xl font-black uppercase tracking-tighter"
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
                                    "leading-relaxed transition-all duration-700",
                                    template === "style-1" && "text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto",
                                    template === "style-2" && "text-base md:text-xl text-muted-foreground font-serif italic py-6 border-y border-primary/10 max-w-2xl mx-auto",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 w-full",
                    template === "style-2" && "divide-y md:divide-y-0 md:divide-x divide-primary/10"
                )}>
                    {cols.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "group relative overflow-hidden transition-all duration-1000 flex flex-col h-full",
                                template === "style-1" && "p-8 sm:p-12 md:p-14 rounded-[2.5rem] md:rounded-[4rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 hover:border-primary/20 shadow-2xl",
                                template === "style-2" && "p-8 md:p-12 text-center items-center h-full border-none",
                                template === "style-3" && "p-8 md:p-10 border-4 border-primary bg-card rounded-none shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] hover:translate-x-2 hover:-translate-y-2"
                            )}
                        >
                            {/* Card Decor - Style 1 & 3 */}
                            {template === "style-1" && (
                                <div className="absolute -right-20 -top-20 h-48 w-48 bg-primary/5 blur-[80px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000" />
                            )}

                            <div className={cn(
                                "mb-8 md:mb-10 flex",
                                template === "style-2" && "justify-center"
                            )}>
                                <div className={cn(
                                    "p-3 sm:p-4 transition-all duration-700 shadow-lg",
                                    template === "style-1" && "rounded-xl sm:rounded-[1.5rem] bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110",
                                    template === "style-2" && "bg-transparent text-primary/40 group-hover:text-primary group-hover:scale-125",
                                    template === "style-3" && "bg-primary text-primary-foreground rounded-none rotate-3 group-hover:rotate-0"
                                )}>
                                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
                                </div>
                            </div>

                            {col.heading && (
                                <h3 className={cn(
                                    "relative z-10 tracking-tight transition-colors duration-700 leading-tight",
                                    template === "style-1" && "text-2xl md:text-3xl font-black mb-6 md:mb-8 group-hover:text-primary",
                                    template === "style-2" && "text-xl md:text-2xl font-serif font-light italic mb-4",
                                    template === "style-3" && "text-xl md:text-2xl font-black uppercase mb-6"
                                )}>
                                    {col.heading}
                                </h3>
                            )}
                            {col.content && (
                                <p className={cn(
                                    "relative z-10 leading-relaxed flex-1 transition-colors duration-700",
                                    template === "style-1" && "text-lg md:text-xl text-muted-foreground font-light group-hover:text-foreground/80",
                                    template === "style-2" && "text-base md:text-lg text-muted-foreground font-serif italic",
                                    template === "style-3" && "text-base md:text-lg font-mono opacity-60 group-hover:opacity-100"
                                )}>
                                    {col.content}
                                </p>
                            )}

                            {/* Decorative Accent */}
                            <div className={cn(
                                "mt-10 md:mt-12 flex items-center group/accent",
                                template === "style-2" ? "justify-center" : "justify-between"
                            )}>
                                {template !== "style-2" && <div className="h-[2px] w-12 bg-gradient-to-r from-primary/40 to-transparent group-hover:w-24 transition-all duration-1000" />}
                                <ArrowRight className={cn(
                                    "h-4 w-4 md:h-5 md:w-5 text-primary transition-all duration-700",
                                    template === "style-1" && "opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0",
                                    template === "style-2" && "opacity-40 group-hover:opacity-100 rotate-45 group-hover:rotate-0",
                                    template === "style-3" && "group-hover:translate-x-4"
                                )} />
                            </div>

                            {/* Subtle Grid Pattern Overlay - Style 1 & 3 */}
                            {(template === "style-1" || template === "style-3") && (
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-1000"
                                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "28px 28px" }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
