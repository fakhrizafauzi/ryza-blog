import { motion } from "framer-motion";
import { Check, X, Trophy } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface ComparisonRow { feature: string; a?: string | boolean; b?: string | boolean; }
interface ComparisonSectionContent {
    heading?: string;
    subheading?: string;
    labelA?: string;
    labelB?: string;
    rows?: ComparisonRow[];
    template?: string;
}

function Cell({ value, highlighted, template }: { value?: string | boolean, highlighted?: boolean, template: string }) {
    if (value === true) return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className={cn(
                "flex justify-center items-center mx-auto transition-all duration-500",
                template === "style-1" && cn(
                    "h-12 w-12 rounded-2xl shadow-2xl",
                    highlighted ? "bg-primary text-primary-foreground shadow-primary/30" : "bg-primary/10 text-primary border border-primary/20"
                ),
                template === "style-2" && "h-8 w-8 text-primary",
                template === "style-3" && cn(
                    "h-10 w-10 text-primary-foreground",
                    highlighted ? "bg-primary" : "bg-primary/40"
                ),
                template === "style-4" && "text-primary",
                template === "style-5" && cn("w-8 h-8 rounded-full flex items-center justify-center", highlighted ? "bg-green-500 text-white" : "bg-gray-100 dark:bg-zinc-700 text-gray-400")
            )}
        >
            <Check className={cn(
                "stroke-[4]",
                template === "style-1" && "h-6 w-6",
                template === "style-2" && "h-8 w-8",
                template === "style-3" && "h-5 w-5",
                template === "style-4" && "w-8 h-8",
                template === "style-5" && "w-4 h-4 stroke-[3]"
            )} />
        </motion.div>
    );
    if (value === false) return (
        <div className={cn(
            "flex justify-center items-center mx-auto transition-all duration-500",
            template === "style-1" && "h-12 w-12 rounded-2xl bg-muted/20 border border-muted/10 text-muted-foreground/30",
            template === "style-2" && "h-8 w-8 text-muted-foreground/20",
            template === "style-3" && "h-10 w-10 bg-muted/40 text-muted-foreground/40",
            template === "style-4" && "text-muted-foreground/20",
            template === "style-5" && "text-muted-foreground/30"
        )}>
            <X className={cn(
                "stroke-[3]",
                template === "style-1" && "h-6 w-6",
                template === "style-2" && "h-8 w-8",
                template === "style-3" && "h-5 w-5",
                template === "style-4" && "w-8 h-8",
                template === "style-5" && "w-6 h-6"
            )} />
        </div>
    );
    return (
        <span className={cn(
            "transition-colors duration-500",
            template === "style-1" && cn(
                "text-xl font-black tracking-tight",
                highlighted ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
            ),
            template === "style-2" && cn(
                "text-lg font-serif italic text-muted-foreground",
                highlighted && "text-primary"
            ),
            template === "style-3" && cn(
                "text-lg font-mono font-bold uppercase tracking-tighter opacity-60",
                highlighted && "opacity-100 text-primary"
            ),
            template === "style-4" && "font-mono font-bold uppercase",
            template === "style-5" && "font-medium"
        )}>
            {value || "—"}
        </span>
    );
}

export function ComparisonSection({ content }: { content: ComparisonSectionContent }) {
    const rows = content.rows || [];
    const template = content.template || "style-1";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Comparison
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-y border-border">
                {/* Header */}
                <div className="border-b border-border p-12 md:p-20 bg-muted/5">
                    {content.heading && (
                        <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.85] mb-4">
                            {content.heading}
                        </h2>
                    )}
                </div>

                {/* Table Header - Scrollable Wrapper */}
                <div className="overflow-x-auto">
                    <div className="min-w-[600px] grid grid-cols-3 divide-x divide-border border-b border-border bg-muted/5 font-mono uppercase tracking-widest text-xs font-bold">
                        <div className="p-6 md:p-8 text-muted-foreground">Feature</div>
                        <div className="p-6 md:p-8 text-center text-muted-foreground">{content.labelA || "Standard"}</div>
                        <div className="p-6 md:p-8 text-center bg-primary text-primary-foreground">{content.labelB || "Pro"}</div>
                    </div>

                    {/* Table Body */}
                    <div className="divide-y divide-border min-w-[600px]">
                        {rows.map((row, i) => (
                            <div key={i} className="grid grid-cols-3 divide-x divide-border hover:bg-muted/5 transition-colors group">
                                <div className="p-6 md:p-8 font-bold text-lg md:text-xl flex items-center">
                                    {row.feature}
                                </div>
                                <div className="p-6 md:p-8 flex items-center justify-center">
                                    <Cell value={row.a} highlighted={false} template={template} />
                                </div>
                                <div className="p-6 md:p-8 flex items-center justify-center bg-primary/5 group-hover:bg-primary/10 transition-colors">
                                    <Cell value={row.b} highlighted={true} template={template} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Comparison
        return (
            <SectionLayout width="container" padding="lg">
                <div className="text-center mb-16">
                    {content.heading && (
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                            {content.heading}
                        </h2>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto">
                    {/* Column A */}
                    <div className="bg-zinc-50 dark:bg-zinc-800/50 p-8 rounded-[2.5rem] border border-transparent hover:border-border transition-colors">
                        <h3 className="text-2xl font-bold text-center mb-8 text-muted-foreground">{content.labelA || "Basic"}</h3>
                        <div className="space-y-6">
                            {rows.map((row, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0 opacity-70">
                                    <span className="font-medium">{row.feature}</span>
                                    <Cell value={row.a} highlighted={false} template={template} />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column B (Winner) */}
                    <div className="relative bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-primary/10 overflow-hidden transform md:-translate-y-8">
                        <div className="absolute top-0 right-0 p-6">
                            <Trophy className="w-8 h-8 text-yellow-500" />
                        </div>
                        <h3 className="text-3xl font-black text-center mb-10 text-primary">{content.labelB || "Premium"}</h3>
                        <div className="space-y-6">
                            {rows.map((row, i) => (
                                <div key={i} className="flex justify-between items-center py-2 border-b border-primary/5 last:border-0">
                                    <span className="font-bold text-lg">{row.feature}</span>
                                    <Cell value={row.b} highlighted={true} template={template} />
                                </div>
                            ))}
                        </div>
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
            <div className="relative w-full">
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-24 -top-24 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -right-24 bottom-0 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-24 max-w-3xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-4xl md:text-7xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl md:text-5xl font-serif font-light tracking-tight italic",
                                    template === "style-3" && "text-4xl md:text-6xl font-black uppercase tracking-tighter"
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
                                transition={{ delay: 0.1 }}
                                className={cn(
                                    "leading-relaxed transition-all duration-700",
                                    template === "style-1" && "text-xl text-muted-foreground font-light",
                                    template === "style-2" && "text-lg md:text-xl text-muted-foreground font-serif italic py-6 border-y border-primary/10",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "w-full overflow-hidden overflow-x-auto",
                    template === "style-1" && "rounded-[3rem] bg-card/40 backdrop-blur-xl border border-primary/10 shadow-2xl",
                    template === "style-2" && "bg-transparent",
                    template === "style-3" && "bg-card border-4 border-primary shadow-[8px_8px_0_0_rgba(var(--primary),1)]"
                )}>
                    <div className="min-w-[700px]">
                        {/* Headers */}
                        <div className="grid grid-cols-3 items-center border-b border-border/50">
                            <div className="p-6 md:p-8" />
                            <div className={cn(
                                "p-6 md:p-8 text-center",
                                template === "style-1" && "font-bold text-muted-foreground uppercase tracking-widest text-xs md:text-sm",
                                template === "style-2" && "font-serif italic text-muted-foreground text-xl",
                                template === "style-3" && "font-mono font-bold uppercase border-l-2 border-primary bg-muted/20"
                            )}>
                                {content.labelA || "Option A"}
                            </div>
                            <div className={cn(
                                "p-6 md:p-8 text-center relative overflow-hidden",
                                template === "style-1" && "bg-primary/5 font-black text-primary uppercase tracking-widest text-sm md:text-base",
                                template === "style-2" && "font-serif italic text-primary text-2xl border-l border-primary/10",
                                template === "style-3" && "font-mono font-black uppercase bg-primary text-primary-foreground border-l-2 border-primary"
                            )}>
                                {content.labelB || "Option B"}
                                {template === "style-1" && (
                                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-widest">
                                        Recommended
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Rows */}
                        <div className="divide-y divide-border/50">
                            {rows.map((row, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className={cn(
                                        "grid grid-cols-3 items-center group transition-colors duration-300",
                                        template === "style-1" && "hover:bg-primary/[0.02]",
                                        template === "style-3" && "divide-x-2 divide-primary"
                                    )}
                                >
                                    <div className={cn(
                                        "p-6 md:p-8 font-medium",
                                        template === "style-2" && "font-serif text-lg",
                                        template === "style-3" && "font-mono uppercase font-bold text-sm tracking-tight"
                                    )}>
                                        {row.feature}
                                    </div>
                                    <div className="p-6 md:p-8 text-center">
                                        <Cell value={row.a} highlighted={false} template={template} />
                                    </div>
                                    <div className={cn(
                                        "p-6 md:p-8 text-center transition-colors duration-500",
                                        template === "style-1" && "bg-primary/[0.02] group-hover:bg-primary/[0.05]",
                                        template === "style-2" && "border-l border-primary/10 bg-primary/[0.02]",
                                        template === "style-3" && "bg-primary/[0.02] font-black"
                                    )}>
                                        <Cell value={row.b} highlighted={true} template={template} />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
