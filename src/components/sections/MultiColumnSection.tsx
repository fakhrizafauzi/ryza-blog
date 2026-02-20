import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface MultiColumnSectionContent {
    heading?: string;
    subheading?: string;
    columns?: { heading?: string; content?: string }[];
    count?: 2 | 3 | 4 | 5;
}

export function MultiColumnSection({ content }: { content: MultiColumnSectionContent }) {
    const cols = content.columns || [];
    const count = content.count || cols.length || 3;

    const gridMap: Record<number, string> = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-2 lg:grid-cols-5",
    };

    const template = (content as any).template || "style-1"; // Cast to any to access template if not in interface yet

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Multi Column (Refined)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border font-mono">
                {/* Visual Header */}
                <div className="border-b border-border p-4 bg-muted/10 flex justify-between items-center text-[10px] uppercase tracking-widest">
                    <span>Multi_Col_Layout</span>
                    <span>Status: Active</span>
                </div>

                {/* Header Strip */}
                {(content.heading || content.subheading) && (
                    <div className="border-b border-border p-12 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
                        <div className="absolute top-0 right-0 p-4 border-b border-l border-border bg-background">
                            FIG 01.
                        </div>
                        <div className="lg:col-span-8">
                            {content.heading && (
                                <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-foreground uppercase leading-[0.85] break-words">
                                    {content.heading}
                                </h2>
                            )}
                        </div>
                        <div className="lg:col-span-4 pt-4">
                            {content.subheading && (
                                <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed border-l-2 border-foreground pl-6">
                                    {content.subheading}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className={cn("grid divide-y md:divide-y-0 md:divide-x divide-border bg-background", gridMap[count] || "grid-cols-1 lg:grid-cols-3")}>
                    {cols.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="p-10 md:p-14 min-h-[400px] flex flex-col justify-between group hover:bg-foreground hover:text-background transition-colors duration-500 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-20 transition-opacity">
                                <Sparkles className="w-32 h-32" strokeWidth={0.5} />
                            </div>

                            <div className="relative z-10">
                                <span className="text-sm font-bold uppercase tracking-widest text-muted-foreground group-hover:text-background/60 mb-8 block transition-colors">
                                    [ {(i + 1).toString().padStart(2, '0')} ]
                                </span>
                                {col.heading && (
                                    <h3 className="text-3xl font-bold mb-6 text-foreground group-hover:text-background transition-colors leading-tight uppercase">
                                        {col.heading}
                                    </h3>
                                )}
                            </div>
                            {col.content && (
                                <p className="relative z-10 text-lg text-muted-foreground font-sans leading-relaxed mt-auto group-hover:text-background/80 transition-colors">
                                    {col.content}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Multi Column (Refined)
        return (
            <SectionLayout width="container" padding="none" className="my-16 md:my-24">
                {/* Organic Background */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120%] z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-rose-100/40 dark:bg-rose-900/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-100/40 dark:bg-teal-900/10 rounded-full blur-[100px]" />
                </div>

                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto relative z-10">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="text-4xl md:text-7xl font-black tracking-tighter text-foreground mb-8 break-words drop-shadow-sm"
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                {content.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className={cn("grid gap-8 md:gap-12 relative z-10 px-4 md:px-8", gridMap[count] || "grid-cols-1 lg:grid-cols-3")}>
                    {cols.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -12, scale: 1.02 }}
                            className="p-10 md:p-14 rounded-[3rem] bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 border border-white/50 dark:border-white/5 flex flex-col justify-between min-h-[350px]"
                        >
                            <div>
                                <div className="w-16 h-16 rounded-[1.5rem] bg-gradient-to-tr from-rose-100 to-teal-100 dark:from-rose-900/30 dark:to-teal-900/30 flex items-center justify-center mb-8 text-foreground/80 shadow-inner">
                                    <span className="font-black text-xl">{i + 1}</span>
                                </div>
                                {col.heading && (
                                    <h3 className="text-2xl md:text-3xl font-black mb-6 text-foreground tracking-tight">
                                        {col.heading}
                                    </h3>
                                )}
                            </div>
                            {col.content && (
                                <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                                    {col.content}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    const gridClass = gridMap[count] || "grid-cols-1 lg:grid-cols-3";

    return (
        <SectionLayout width="wide" padding="lg">
            <div className="relative w-full">
                {/* Background Decor */}
                <div className="absolute -left-24 -top-24 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -right-24 bottom-24 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />

                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[1] md:leading-[0.9] break-words"
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
                                className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto"
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn("grid gap-6 sm:gap-8 md:gap-10", gridClass)}>
                    {cols.map((col, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative p-8 sm:p-10 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 hover:border-primary/20 transition-all duration-1000 shadow-2xl h-full flex flex-col overflow-hidden"
                        >
                            {/* Inner Card Decor */}
                            <div className="absolute -right-16 -top-16 h-32 w-32 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000" />

                            <div className="mb-6 md:mb-8 flex text-primary/40 group-hover:text-primary transition-colors duration-700">
                                <Sparkles className="h-4 w-4 md:h-5 md:w-5" />
                            </div>

                            {col.heading && (
                                <h3 className="relative z-10 text-xl md:text-2xl font-black tracking-tight mb-4 md:mb-6 group-hover:text-primary transition-colors duration-700 leading-tight">
                                    {col.heading}
                                </h3>
                            )}
                            {col.content && (
                                <p className="relative z-10 text-base md:text-lg text-muted-foreground font-light leading-relaxed flex-1 group-hover:text-foreground/80 transition-colors duration-700">
                                    {col.content}
                                </p>
                            )}

                            {/* Small Accent */}
                            <div className="mt-8 md:mt-10">
                                <div className="h-1 w-10 rounded-full bg-gradient-to-r from-primary/30 to-transparent group-hover:w-20 transition-all duration-1000" />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
