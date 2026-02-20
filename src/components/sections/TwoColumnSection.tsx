import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";
import { Sparkles, ArrowRight } from "lucide-react";

interface TwoColumnSectionContent {
    leftHeading?: string;
    leftContent?: string;
    rightHeading?: string;
    rightContent?: string;
    gap?: "sm" | "md" | "lg";
    template?: string;
}

export function TwoColumnSection({ content }: { content: TwoColumnSectionContent }) {
    const template = content.template || "style-1";
    const gapClass = content.gap === "lg" ? "gap-12 md:gap-20" : content.gap === "sm" ? "gap-6 md:gap-8" : "gap-8 md:gap-12";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Two Column
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="p-12 md:p-20 flex flex-col justify-between"
                    >
                        <div className="mb-12">
                            <div className="w-12 h-1 bg-foreground mb-8" />
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                                {content.leftHeading}
                            </h3>
                        </div>
                        <p className="text-lg md:text-xl text-muted-foreground font-mono leading-relaxed">
                            {content.leftContent}
                        </p>
                    </motion.div>

                    {/* Right Column */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="p-12 md:p-20 bg-muted/30 flex flex-col justify-between relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 p-4">
                            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground">02 / DETAILS</span>
                        </div>

                        <div className="mb-12 relative z-10">
                            <h3 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground leading-tight">
                                {content.rightHeading}
                            </h3>
                        </div>
                        <p className="text-lg md:text-xl text-muted-foreground font-mono leading-relaxed relative z-10">
                            {content.rightContent}
                        </p>

                        {/* Background Grid Pattern */}
                        <div className="absolute inset-0 opacity-10 pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    </motion.div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Two Column
        return (
            <SectionLayout width="container" padding="lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
                    {/* Left Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-10 md:p-14 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-800/50 hover:bg-white dark:hover:bg-zinc-800 transition-colors duration-500 shadow-sm hover:shadow-xl"
                    >
                        <Sparkles className="w-10 h-10 text-primary mb-8" />
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {content.leftHeading}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {content.leftContent}
                        </p>
                    </motion.div>

                    {/* Right Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-10 md:p-14 rounded-[2.5rem] bg-primary/5 hover:bg-primary/10 transition-colors duration-500 shadow-sm hover:shadow-xl border border-primary/10"
                    >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mb-8 text-primary">
                            <ArrowRight className="w-5 h-5 -rotate-45" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                            {content.rightHeading}
                        </h3>
                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {content.rightContent}
                        </p>
                    </motion.div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className={cn(
                "grid grid-cols-1 w-full",
                template === "style-2" ? "md:grid-cols-1 gap-24" : "md:grid-cols-2",
                gapClass
            )}>
                {/* Left Column */}
                <motion.div
                    initial={{ opacity: 0, x: template === "style-2" ? 0 : -50, y: template === "style-2" ? 30 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        "relative group transition-all duration-1000 overflow-hidden h-full flex flex-col",
                        template === "style-1" && "p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 hover:border-primary/20 shadow-2xl",
                        template === "style-2" && "p-0 items-center text-center",
                        template === "style-3" && "p-8 md:p-12 border-4 border-primary bg-card rounded-none shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] hover:translate-x-2 hover:-translate-y-2"
                    )}
                >
                    {/* Immersive Decor - Style 1 only */}
                    {template === "style-1" && (
                        <div className="absolute -left-20 -top-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000 animate-pulse" />
                    )}

                    <div className={cn(
                        "relative z-10 flex flex-col w-full h-full",
                        template === "style-2" && "items-center"
                    )}>
                        <div className={cn(
                            "flex items-center gap-4 mb-6 md:mb-8",
                            template === "style-2" && "justify-center",
                            template === "style-3" && "flex-row-reverse"
                        )}>
                            <div className={cn(
                                "p-2 sm:p-3 transition-all duration-700",
                                template === "style-1" && "rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:scale-110",
                                template === "style-2" && "bg-transparent text-primary/40 group-hover:text-primary group-hover:scale-125",
                                template === "style-3" && "bg-primary text-primary-foreground rounded-none rotate-3 group-hover:rotate-0"
                            )}>
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                            <div className={cn(
                                "h-px flex-1 transition-all duration-1000",
                                template === "style-1" && "bg-gradient-to-r from-primary/20 to-transparent",
                                template === "style-2" && "w-24 bg-primary/10 group-hover:w-48 bg-none flex-initial",
                                template === "style-3" && "bg-primary/40"
                            )} />
                        </div>

                        {content.leftHeading && (
                            <h3 className={cn(
                                "tracking-tighter transition-all duration-700 leading-tight",
                                template === "style-1" && "text-3xl md:text-5xl font-black mb-6 md:mb-10 group-hover:text-primary",
                                template === "style-2" && "text-4xl md:text-6xl font-serif font-light italic mb-8",
                                template === "style-3" && "text-3xl md:text-5xl font-black uppercase mb-6"
                            )}>
                                {content.leftHeading}
                            </h3>
                        )}
                        {content.leftContent && (
                            <p className={cn(
                                "leading-[1.8] transition-all duration-700",
                                template === "style-1" && "text-lg md:text-xl text-muted-foreground font-light group-hover:text-foreground/80 flex-1",
                                template === "style-2" && "text-xl md:text-2xl text-muted-foreground font-serif italic py-8 border-y border-primary/10 max-w-2xl",
                                template === "style-3" && "text-base md:text-lg font-mono opacity-60 group-hover:opacity-100 flex-1"
                            )}>
                                {content.leftContent}
                            </p>
                        )}
                    </div>

                    {/* Subtle Overlay Pattern - Style 1 & 3 */}
                    {(template === "style-1" || template === "style-3") && (
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-1000"
                            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "32px 32px" }}
                        />
                    )}
                </motion.div>

                {/* Right Column */}
                <motion.div
                    initial={{ opacity: 0, x: template === "style-2" ? 0 : 50, y: template === "style-2" ? 30 : 0 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className={cn(
                        "relative group transition-all duration-1000 overflow-hidden h-full flex flex-col",
                        template === "style-1" && "p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 hover:border-primary/20 shadow-2xl",
                        template === "style-2" && "p-0 items-center text-center",
                        template === "style-3" && "p-8 md:p-12 border-4 border-primary bg-card rounded-none shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] hover:translate-x-2 hover:-translate-y-2"
                    )}
                >
                    {/* Immersive Decor - Style 1 only */}
                    {template === "style-1" && (
                        <div className="absolute -right-20 -bottom-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000 animate-pulse delay-500" />
                    )}

                    <div className={cn(
                        "relative z-10 flex flex-col w-full h-full",
                        template === "style-2" && "items-center"
                    )}>
                        <div className={cn(
                            "flex items-center gap-4 mb-6 md:mb-8",
                            template === "style-2" && "justify-center",
                            template === "style-3" && "flex-row"
                        )}>
                            <div className={cn(
                                "h-px flex-1 transition-all duration-1000",
                                template === "style-1" && "bg-gradient-to-l from-primary/20 to-transparent",
                                template === "style-2" && "w-24 bg-primary/10 group-hover:w-48 bg-none flex-initial",
                                template === "style-3" && "bg-primary/40"
                            )} />
                            <div className={cn(
                                "p-2 sm:p-3 transition-all duration-700",
                                template === "style-1" && "rounded-xl sm:rounded-2xl bg-primary/10 text-primary group-hover:scale-110",
                                template === "style-2" && "bg-transparent text-primary/40 group-hover:text-primary group-hover:scale-125",
                                template === "style-3" && "bg-primary text-primary-foreground rounded-none -rotate-3 group-hover:rotate-0"
                            )}>
                                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5" />
                            </div>
                        </div>

                        {content.rightHeading && (
                            <h3 className={cn(
                                "tracking-tighter transition-all duration-700 leading-tight mb-6 md:mb-10",
                                template === "style-1" && "text-3xl md:text-5xl font-black group-hover:text-primary",
                                template === "style-2" && "text-4xl md:text-6xl font-serif font-light italic mb-8",
                                template === "style-3" && "text-3xl md:text-5xl font-black uppercase mb-6"
                            )}>
                                {content.rightHeading}
                            </h3>
                        )}
                        {content.rightContent && (
                            <p className={cn(
                                "leading-[1.8] transition-all duration-700",
                                template === "style-1" && "text-lg md:text-xl text-muted-foreground font-light group-hover:text-foreground/80 flex-1",
                                template === "style-2" && "text-xl md:text-2xl text-muted-foreground font-serif italic py-8 border-y border-primary/10 max-w-2xl",
                                template === "style-3" && "text-base md:text-lg font-mono opacity-60 group-hover:opacity-100 flex-1"
                            )}>
                                {content.rightContent}
                            </p>
                        )}
                    </div>

                    {/* Subtle Overlay Pattern - Style 1 & 3 */}
                    {(template === "style-1" || template === "style-3") && (
                        <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.04] transition-opacity duration-1000"
                            style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "32px 32px" }}
                        />
                    )}
                </motion.div>
            </div>
        </SectionLayout>
    );
}
