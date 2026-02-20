import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";
import { IconRenderer } from "@/components/ui/IconRenderer";
import { ArrowRight } from "lucide-react";

export function FeatureGridSection({ content }: { content: any }) {
    const items = content.items || [];
    const cols = content.columns || 3;
    const template = content.template || "style-1";

    const gridClass = {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    }[cols as 1 | 2 | 3 | 4] || "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Feature (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border font-mono text-foreground relative">
                <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-widest border-b border-l border-border opacity-50 hidden md:block">
                    Grid_Layout_V2.0
                </div>

                {/* Header Strip */}
                {(content.heading || content.subheading) && (
                    <div className="border-b border-border p-8 md:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end bg-muted/5">
                        <div className="lg:col-span-8">
                            <div className="flex items-center gap-2 mb-6">
                                <div className="w-2 h-2 bg-primary animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-widest text-primary">Capabilities</span>
                            </div>
                            {content.heading && (
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground uppercase leading-[0.85] break-words">
                                    {content.heading}
                                </h2>
                            )}
                        </div>
                        <div className="lg:col-span-4 flex flex-col justify-end">
                            {content.subheading && (
                                <p className="text-base md:text-lg text-muted-foreground font-sans leading-relaxed border-l-2 border-primary/20 pl-4 py-2">
                                    {content.subheading}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className={cn("grid divide-y md:divide-y-0 md:divide-x divide-border bg-background",
                    cols === 4 ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" :
                        cols === 2 ? "grid-cols-1 md:grid-cols-2" :
                            "grid-cols-1 md:grid-cols-3"
                )}>
                    {items.map((item: any, i: number) => (
                        <FeatureCard key={i} item={item} index={i} template={template} />
                    ))}
                </div>

                {/* Footer Technical Metadata */}
                <div className="border-t border-border p-4 flex justify-between items-center text-[10px] uppercase tracking-widest opacity-40">
                    <span>Fig {items.length} Elements</span>
                    <span>X: 00 / Y: 00</span>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Feature (High Fidelity)
        return (
            <SectionLayout width="container" padding="none" className="my-12 md:my-20">
                <div className="relative rounded-[3rem] bg-indigo-50/50 dark:bg-zinc-900/30 p-8 md:p-16 lg:p-24 overflow-hidden">
                    {/* Background Blobs */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-900/20 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-[80px] -ml-32 -mb-32 pointer-events-none" />

                    {(content.heading || content.subheading) && (
                        <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto relative z-10">
                            {content.heading && (
                                <motion.h2
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    className="text-4xl md:text-6xl font-black tracking-tight text-foreground mb-8 break-words"
                                >
                                    <span className="relative inline-block">
                                        {content.heading}
                                        <svg className="absolute -right-8 -top-8 w-16 h-16 text-yellow-400 opacity-50 rotate-12" viewBox="0 0 100 100" fill="currentColor">
                                            <path d="M50 0 L61 35 L98 35 L68 57 L79 91 L50 70 L21 91 L32 57 L2 35 L39 35 Z" />
                                        </svg>
                                    </span>
                                </motion.h2>
                            )}
                            {content.subheading && (
                                <p className="text-xl md:text-2xl text-muted-foreground/80 font-light max-w-2xl mx-auto leading-relaxed text-balance">
                                    {content.subheading}
                                </p>
                            )}
                        </div>
                    )}

                    <div className={cn("grid gap-6 md:gap-8 relative z-10", gridClass)}>
                        {items.map((item: any, i: number) => (
                            <FeatureCard key={i} item={item} index={i} template={template} />
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout width="wide" padding="lg" align="center" background="none">
            <div className="relative w-full">
                {/* Header Section */}
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "font-black tracking-tighter mb-6 break-words",
                                    template === "style-3" ? "text-5xl md:text-8xl italic" : "text-4xl md:text-7xl"
                                )}
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto"
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                {/* Grid Section */}
                <div className={cn("grid gap-6 md:gap-8 lg:gap-10", gridClass)}>
                    {items.map((item: any, i: number) => (
                        <FeatureCard key={i} item={item} index={i} template={template} />
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}

function FeatureCard({ item, index, template }: { item: any; index: number; template: string }) {
    const baseVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    if (template === "style-2") {
        // STYLE 2: Minimalist / Bordered
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                variants={baseVariants}
                className="group flex flex-col p-8 rounded-3xl border border-border/50 hover:border-primary/50 transition-all duration-500 bg-background/50"
            >
                <div className="mb-6 text-primary">
                    <IconRenderer name={item.icon} size={32} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm mb-6 flex-grow">
                    {item.description}
                </p>
                <button className="flex items-center text-xs font-bold uppercase tracking-widest text-primary gap-2 group-hover:gap-4 transition-all duration-300">
                    Explore <ArrowRight size={14} />
                </button>
            </motion.div>
        );
    }

    if (template === "style-3") {
        // STYLE 3: Bold / Contrast / Bottom-aligned icon (ADAPTIVE)
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                variants={baseVariants}
                className="group relative flex flex-col p-10 rounded-[3rem] bg-zinc-50 dark:bg-zinc-900 border-2 border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-50 overflow-hidden min-h-[320px]"
            >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconRenderer name={item.icon} size={120} strokeWidth={1} />
                </div>
                <h3 className="text-3xl font-black mb-4 tracking-tight leading-none italic">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-light mb-8 flex-grow">
                    {item.description}
                </p>
                <div className="text-primary mt-auto">
                    <IconRenderer name={item.icon} size={40} strokeWidth={2} />
                </div>
            </motion.div>
        );
    }

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Card (Refined)
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                variants={baseVariants}
                className="group flex flex-col p-8 md:p-12 hover:bg-foreground hover:text-background transition-colors duration-500 h-full relative overflow-hidden"
            >
                <div className="absolute top-4 right-4 text-[10px] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                    {(index + 1).toString().padStart(2, '0')}
                </div>

                <div className="mb-8 text-foreground group-hover:text-background transition-colors">
                    <IconRenderer name={item.icon} size={48} strokeWidth={1} />
                </div>
                <h3 className="text-2xl font-bold mb-4 uppercase tracking-tighter leading-none">{item.title}</h3>
                <p className="text-muted-foreground font-mono leading-relaxed text-sm mb-8 flex-grow group-hover:text-background/80 transition-colors">
                    {item.description}
                </p>
                <div className="mt-auto pt-8 border-t border-dashed border-border group-hover:border-background/30 transition-colors">
                    <span className="text-xs font-bold uppercase tracking-widest flex items-center justify-between w-full gap-2">
                        <span>Read_Entry</span>
                        <ArrowRight size={16} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                </div>
            </motion.div>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Card (Refined)
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, rotate: index % 2 === 0 ? 1 : -1 }}
                className="group flex flex-col p-8 md:p-10 rounded-[2.5rem] bg-white dark:bg-zinc-800/80 shadow-lg shadow-indigo-500/5 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500 h-full"
            >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/50 dark:to-purple-900/50 flex items-center justify-center mb-6 text-indigo-500 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                    <IconRenderer name={item.icon} size={32} strokeWidth={2} />
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-3 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-base flex-grow">
                    {item.description}
                </p>
            </motion.div>
        );
    }

    // DEFAULT STYLE 1: Glassmorphism Premium
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
            variants={baseVariants}
            className="group relative flex flex-col p-10 md:p-12 rounded-[3.5rem] bg-card/30 dark:bg-card/20 backdrop-blur-2xl border border-primary/10 transition-all duration-700 hover:border-primary/30"
        >
            <div className="mb-10 relative">
                <div className="relative inline-flex p-6 rounded-3xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-xl">
                    <IconRenderer name={item.icon} size={32} />
                    <div className="absolute -inset-2 border border-primary/10 rounded-[2rem] group-hover:scale-110 group-hover:opacity-0 transition-all duration-700" />
                </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter group-hover:text-primary transition-colors">
                {item.title}
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base md:text-lg font-light mb-10 flex-grow">
                {item.description}
            </p>
            <div className="flex items-center text-[10px] uppercase font-black tracking-widest text-primary/40 group-hover:text-primary transition-all duration-500 gap-4">
                <div className="h-px w-10 bg-primary/20 group-hover:w-16 transition-all duration-700" />
                <span>Read Detail</span>
                <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </div>
        </motion.div>
    );
}
