import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { ExternalLink, ArrowUpRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface PortfolioItem { title: string; category?: string; image?: string; link?: string; description?: string; }
interface PortfolioSectionContent {
    heading?: string;
    subheading?: string;
    items?: PortfolioItem[];
    template?: string;
}

export function PortfolioSection({ content }: { content: PortfolioSectionContent }) {
    const items = content.items || [];
    const template = content.template || "style-1";

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
                        <div className="absolute -left-32 -top-32 h-96 w-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -right-32 bottom-24 h-96 w-96 bg-primary/2 blur-[100px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-24 max-w-4xl mx-auto px-4",
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
                                    template === "style-2" && "text-4xl md:text-6xl font-serif font-light tracking-tight italic",
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
                                    template === "style-1" && "text-xl md:text-2xl text-muted-foreground font-light max-w-3xl mx-auto",
                                    template === "style-2" && "text-lg md:text-xl text-muted-foreground font-serif italic py-6 border-y border-primary/10 max-w-2xl mx-auto",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 gap-12",
                    template === "style-1" && "md:grid-cols-2 lg:grid-cols-3",
                    template === "style-2" && "md:grid-cols-1",
                    template === "style-3" && "md:grid-cols-2 lg:grid-cols-4 gap-8"
                )}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <a
                                href={item.link || "#"}
                                className={cn(
                                    "group relative flex flex-col transition-all duration-1000",
                                    template === "style-1" && "rounded-[3.5rem] overflow-hidden bg-card/40 backdrop-blur-3xl border border-primary/10 hover:border-primary/30 shadow-2xl hover:shadow-primary/10",
                                    template === "style-2" && "flex-col md:flex-row gap-12 items-center border-b border-primary/10 pb-20 last:border-0",
                                    template === "style-3" && "bg-card border-4 border-primary rounded-none shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] hover:translate-x-2 hover:-translate-y-2 transition-transform"
                                )}
                                target={item.link ? "_blank" : undefined}
                                rel="noopener noreferrer"
                            >
                                <div className={cn(
                                    "overflow-hidden relative shrink-0",
                                    template === "style-1" && "aspect-[4/5]",
                                    template === "style-2" && "w-full md:w-[400px] aspect-video",
                                    template === "style-3" && "aspect-square"
                                )}>
                                    {item.image ? (
                                        <motion.img
                                            whileHover={{ scale: 1.15 }}
                                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                                            src={item.image}
                                            alt={item.title}
                                            className={cn(
                                                "w-full h-full object-cover transition-all duration-1000",
                                                template === "style-2" && "grayscale group-hover:grayscale-0"
                                            )}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-primary/5 to-primary/20 flex items-center justify-center">
                                            <div className="h-16 w-16 rounded-full border-2 border-primary/20 animate-pulse" />
                                        </div>
                                    )}

                                    {/* Overlays */}
                                    {template === "style-1" && (
                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center p-12 text-center backdrop-blur-sm">
                                            <div className="space-y-6 translate-y-8 group-hover:translate-y-0 transition-all duration-700">
                                                <div className="h-20 w-20 mx-auto rounded-[2rem] bg-primary flex items-center justify-center text-primary-foreground shadow-2xl shadow-primary/40 rotate-12 group-hover:rotate-0 transition-transform duration-700">
                                                    <ArrowUpRight className="h-10 w-10" />
                                                </div>
                                                <p className="text-white/80 text-lg font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity delay-300">
                                                    {item.description || "View project details and full case study"}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    {/* Category Floating Badge */}
                                    {item.category && (
                                        <div className={cn(
                                            "absolute py-2 px-4 text-[10px] font-black uppercase tracking-[0.3em]",
                                            template === "style-1" && "top-8 left-8 rounded-full bg-background/50 backdrop-blur-xl border border-white/10 text-white",
                                            template === "style-2" && "top-4 left-4 bg-primary text-primary-foreground rounded-none",
                                            template === "style-3" && "bottom-4 left-4 bg-primary text-primary-foreground rounded-none border-2 border-black"
                                        )}>
                                            {item.category}
                                        </div>
                                    )}
                                </div>

                                <div className={cn(
                                    "relative flex-1",
                                    template === "style-1" && "p-12",
                                    template === "style-2" && "p-0",
                                    template === "style-3" && "p-6"
                                )}>
                                    {/* Corner Accent - Style 1 only */}
                                    {template === "style-1" && (
                                        <div className="absolute top-0 right-12 -translate-y-1/2 p-3 rounded-2xl bg-card border border-primary/20 text-primary opacity-0 group-hover:opacity-100 transition-all duration-700 transform group-hover:scale-110">
                                            <Sparkles className="h-5 w-5" />
                                        </div>
                                    )}

                                    <div className={cn(
                                        "flex items-start justify-between gap-6",
                                        template === "style-2" && "flex-col gap-4"
                                    )}>
                                        <div className="flex-1">
                                            <h3 className={cn(
                                                "tracking-tighter transition-all duration-500 leading-tight mb-2",
                                                template === "style-1" && "text-3xl font-black group-hover:text-primary",
                                                template === "style-2" && "text-4xl md:text-5xl font-serif font-light italic",
                                                template === "style-3" && "text-xl md:text-2xl font-black uppercase"
                                            )}>
                                                {item.title}
                                            </h3>
                                            {template !== "style-1" && item.description && (
                                                <p className={cn(
                                                    "leading-relaxed transition-all",
                                                    template === "style-2" && "text-xl text-muted-foreground font-serif italic font-light",
                                                    template === "style-3" && "text-sm font-mono opacity-60 group-hover:opacity-100"
                                                )}>
                                                    {item.description}
                                                </p>
                                            )}
                                        </div>
                                        <div className={cn(
                                            "transition-all duration-500",
                                            template === "style-1" && "text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1",
                                            template === "style-2" && "text-primary flex items-center gap-2 font-serif italic text-lg",
                                            template === "style-3" && "text-primary"
                                        )}>
                                            {template === "style-2" ? (
                                                <span className="flex items-center gap-3">
                                                    Explore Project <ArrowUpRight className="h-5 w-5" />
                                                </span>
                                            ) : (
                                                <ExternalLink className="h-5 w-5" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Decor */}
                                    {template === "style-1" && (
                                        <div className="mt-8 h-px w-12 bg-primary/20 group-hover:w-full transition-all duration-1000" />
                                    )}
                                </div>

                                {/* Subtle Overlay Pattern - Style 1 & 3 */}
                                {(template === "style-1" || template === "style-3") && (
                                    <div className={cn(
                                        "absolute inset-0 opacity-[0.02] pointer-events-none transition-opacity duration-1000",
                                        template === "style-3" && "group-hover:opacity-[0.05]"
                                    )}
                                        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "32px 32px" }}
                                    />
                                )}
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
