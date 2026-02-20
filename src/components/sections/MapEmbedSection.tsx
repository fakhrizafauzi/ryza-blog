import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapEmbedSectionContent {
    heading?: string;
    subheading?: string;
    embedUrl?: string;
    height?: number;
    caption?: string;
    template?: string;
}

export function MapEmbedSection({ content }: { content: MapEmbedSectionContent }) {
    const height = content.height || 500;
    const template = content.template || "style-1";

    if (!content.embedUrl) return (
        <SectionLayout
            width="wide"
            padding="md"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className={cn(
                "flex flex-col items-center justify-center min-h-[300px] text-muted-foreground transition-all duration-700",
                template === "style-1" && "bg-card/40 backdrop-blur-3xl border border-primary/10 rounded-[3rem]",
                template === "style-2" && "bg-transparent border border-primary/5 rounded-none",
                template === "style-3" && "bg-card border-4 border-primary rounded-none shadow-[10px_10px_0_0_black] dark:shadow-[10px_10px_0_0_white]"
            )}>
                <MapPin className="h-12 w-12 opacity-20 mb-4" />
                <p className={cn(
                    "text-sm font-black uppercase tracking-widest",
                    template === "style-2" && "font-serif italic lowercase tracking-tight normal-case",
                    template === "style-3" && "font-mono"
                )}>No map source provided</p>
            </div>
        </SectionLayout>
    );

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            {(content.heading || content.subheading) && (
                <div className={cn(
                    "mb-16 md:mb-24 max-w-4xl mx-auto px-4",
                    template === "style-3" ? "text-left border-l-4 border-primary pl-8" : "text-center"
                )}>
                    {content.heading && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "mb-6 leading-tight transition-all duration-700",
                                template === "style-1" && "text-4xl md:text-6xl font-black tracking-tight",
                                template === "style-2" && "text-3xl md:text-5xl font-serif font-light tracking-tight",
                                template === "style-3" && "text-4xl md:text-7xl font-black uppercase tracking-tighter"
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
                            transition={{ delay: 0.1 }}
                            className={cn(
                                "text-xl text-muted-foreground font-light leading-relaxed",
                                template === "style-2" && "font-serif italic",
                                template === "style-3" && "font-mono uppercase text-sm tracking-widest opacity-60"
                            )}
                        >
                            {content.subheading}
                        </motion.p>
                    )}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, scale: template === "style-1" ? 0.98 : 1 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="relative group transition-all duration-700"
            >
                {/* Decorative Glow */}
                {template === "style-1" && (
                    <div className="absolute -inset-10 bg-primary/5 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                )}

                <div className={cn(
                    "relative overflow-hidden transition-all duration-1000",
                    template === "style-1" && "rounded-[3rem] md:rounded-[4rem] border border-primary/20 shadow-2xl bg-card/20 backdrop-blur-3xl p-3 md:p-6",
                    template === "style-2" && "rounded-none border-y border-primary/10",
                    template === "style-3" && "rounded-none border-4 border-primary bg-card p-4 shadow-[20px_20px_0_0_rgba(0,0,0,1)]"
                )}>
                    <div className={cn(
                        "overflow-hidden transition-all duration-1000",
                        template === "style-1" && "rounded-[2rem] md:rounded-[3rem] border border-primary/10 shadow-inner",
                        template === "style-2" && "rounded-none",
                        template === "style-3" && "rounded-none border-4 border-primary"
                    )} style={{ height }}>
                        <iframe
                            src={content.embedUrl}
                            width="100%"
                            height="100%"
                            style={{ border: 0, filter: template === "style-2" ? "grayscale(1) contrast(1.1) opacity(0.8)" : "grayscale(0.2) contrast(1.1)" }}
                            allowFullScreen
                            loading="lazy"
                            title="Interactive Map"
                        />
                    </div>
                </div>

                {/* Corner Accents */}
                {template === "style-1" && (
                    <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all duration-700" />
                )}
                {template === "style-3" && (
                    <>
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary" />
                    </>
                )}
            </motion.div>

            {content.caption && (
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className={cn(
                        "text-center mt-12 transition-all duration-700",
                        template === "style-1" && "text-xs font-black uppercase tracking-[0.4em] text-muted-foreground",
                        template === "style-2" && "text-sm font-serif italic text-foreground/60",
                        template === "style-3" && "text-sm font-mono font-bold uppercase tracking-widest text-primary"
                    )}
                >
                    {content.caption}
                </motion.p>
            )}
        </SectionLayout>
    );
}
