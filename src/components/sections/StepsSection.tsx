import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepItem { title: string; description?: string; }
interface StepsSectionContent {
    heading?: string;
    subheading?: string;
    steps?: StepItem[];
    template?: string;
}

export function StepsSection({ content }: { content: StepsSectionContent }) {
    const steps = content.steps || [];
    const template = content.template || "style-1";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Steps (Horizontal Process Strip)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-y border-border">
                {/* Header Strip */}
                <div className="border-b border-border p-8 md:p-20">
                    {content.heading && (
                        <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.85] mb-4">
                            {content.heading}
                        </h2>
                    )}
                    {content.subheading && (
                        <p className="text-lg text-muted-foreground font-mono max-w-xl">
                            {content.subheading}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                    {steps.map((step, i) => (
                        <div key={i} className="group p-8 md:p-12 relative min-h-[300px] flex flex-col justify-between hover:bg-muted/5 transition-colors">
                            <div className="flex justify-between items-start">
                                <span className="text-5xl font-mono font-bold text-muted-foreground/20 group-hover:text-primary transition-colors duration-500">
                                    {(i + 1).toString().padStart(2, '0')}
                                </span>
                                <div className="h-8 w-8 border border-border rounded-full flex items-center justify-center">
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </div>

                            <div>
                                <h3 className="text-2xl font-bold uppercase tracking-wide mb-4 group-hover:text-primary transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-muted-foreground text-lg leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Steps
        return (
            <SectionLayout width="container" padding="lg">
                <div className="text-center mb-16 md:mb-24">
                    {content.heading && (
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                            {content.heading}
                        </h2>
                    )}
                    {content.subheading && (
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {content.subheading}
                        </p>
                    )}
                </div>

                <div className="relative">
                    {/* Curved Path Background (Simplified visual) */}
                    <div className="hidden lg:block absolute top-[100px] left-0 right-0 h-32 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-[40px] rounded-[100%] pointer-events-none" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative mt-8 lg:mt-0"
                                style={{ marginTop: i % 2 === 1 ? '40px' : '0px' }} // Staggered layout
                            >
                                <div className="absolute -top-6 left-8 bg-primary text-primary-foreground font-bold text-xl h-12 w-12 rounded-full flex items-center justify-center shadow-lg z-10">
                                    {i + 1}
                                </div>
                                <div className="bg-white dark:bg-zinc-800/80 p-8 pt-12 rounded-[2.5rem] shadow-xl border border-primary/5 hover:scale-105 transition-transform duration-500 h-full">
                                    <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
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
            width="wide"
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full">
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
                                    "mb-8 leading-[1] md:leading-[0.9]",
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

                <div className={cn(
                    "relative grid grid-cols-1 gap-10 md:gap-14 max-w-7xl mx-auto pt-10",
                    template === "style-1" && cn(
                        "md:grid-cols-2 lg:grid-cols-4",
                        steps.length === 3 ? "lg:grid-cols-3" : steps.length === 2 ? "lg:grid-cols-2" : ""
                    ),
                    template === "style-2" && cn(
                        "md:grid-cols-2 lg:grid-cols-4",
                        steps.length === 3 ? "lg:grid-cols-3" : steps.length === 2 ? "lg:grid-cols-2" : ""
                    ),
                    template === "style-3" && "md:grid-cols-1 gap-8"
                )}>
                    {/* Connecting Line (Desktop Only - Style 1 & 2) */}
                    {(template === "style-1" || template === "style-2") && (
                        <div className={cn(
                            "hidden lg:block absolute top-[4rem] left-[5%] right-[5%] h-[1px] z-0",
                            template === "style-1" && "bg-gradient-to-r from-transparent via-primary/20 to-transparent",
                            template === "style-2" && "bg-primary/10"
                        )} />
                    )}

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 80 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "relative flex group z-10",
                                template === "style-1" && "flex-col items-center text-center",
                                template === "style-2" && "flex-col items-start px-6 border-l border-primary/10 hover:border-primary/50 transition-colors",
                                template === "style-3" && "flex-row gap-8 items-start border-b-2 border-primary py-8 hover:bg-primary hover:text-primary-foreground px-6 transition-colors"
                            )}
                        >
                            {/* Number / Icon */}
                            <div className={cn(
                                "shrink-0 flex items-center justify-center transition-all duration-500",
                                template === "style-1" && "w-32 h-32 rounded-full bg-card/50 backdrop-blur-xl border border-primary/20 shadow-2xl mb-8 group-hover:scale-110 group-hover:border-primary",
                                template === "style-2" && "mb-6 text-4xl font-serif italic text-primary/40 group-hover:text-primary",
                                template === "style-3" && "text-4xl font-black font-mono opacity-40 group-hover:opacity-100"
                            )}>
                                {template === "style-1" && <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-foreground">{i + 1}</span>}
                                {template === "style-2" && <span>0{i + 1}</span>}
                                {template === "style-3" && <span>{(i + 1).toString().padStart(2, '0')}</span>}
                            </div>

                            <div className="relative">
                                <h3 className={cn(
                                    "mb-4 transition-colors",
                                    template === "style-1" && "text-2xl font-bold tracking-tight",
                                    template === "style-2" && "text-xl font-medium",
                                    template === "style-3" && "text-3xl font-bold uppercase tracking-wide group-hover:text-primary-foreground"
                                )}>
                                    {step.title}
                                </h3>
                                <p className={cn(
                                    "leading-relaxed max-w-sm mx-auto",
                                    template === "style-1" && "text-muted-foreground",
                                    template === "style-2" && "text-muted-foreground font-serif italic text-lg",
                                    template === "style-3" && "text-muted-foreground group-hover:text-primary-foreground/90 font-mono text-sm max-w-none"
                                )}>
                                    {step.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
