import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface DividerSectionContent {
    style?: "line" | "dots" | "thick" | "gradient";
    label?: string;
    template?: string;
}

export function DividerSection({ content }: { content: DividerSectionContent }) {
    const template = content.template || "style-1";
    const style = content.style || "line";

    return (
        <SectionLayout
            width="narrow"
            padding="sm"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <motion.div
                initial={{ opacity: 0, scaleX: template === "style-2" ? 0.8 : 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full relative"
            >
                {style === "dots" && (
                    <div className={cn(
                        "flex items-center justify-center gap-6 py-8",
                        template === "style-2" && "gap-12",
                        template === "style-3" && "gap-4"
                    )}>
                        {[0, 1, 2].map(i => (
                            <div key={i} className={cn(
                                "relative transition-all duration-700",
                                template === "style-1" && "h-2 w-2 rounded-full bg-primary/20",
                                template === "style-2" && "h-1 w-1 rounded-full bg-primary/40",
                                template === "style-3" && "h-4 w-4 rounded-none bg-primary border-2 border-black dark:border-white"
                            )}>
                                {template === "style-1" && (
                                    <div className="absolute inset-0 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--primary),0.5)]" />
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {style === "thick" && (
                    <div className={cn(
                        "flex flex-col gap-1 items-center justify-center py-8",
                        template === "style-1" && "items-center",
                        template === "style-2" && "items-start",
                        template === "style-3" && "items-end"
                    )}>
                        <div className={cn(
                            "h-1 w-24 bg-primary/40 rounded-full",
                            template === "style-2" && "h-px w-32 bg-primary/20 rounded-none",
                            template === "style-3" && "h-3 w-48 bg-primary rounded-none"
                        )} />
                        <div className={cn(
                            "h-0.5 w-12 bg-primary/20 rounded-full",
                            template === "style-2" && "h-px w-16 bg-primary/10 rounded-none transform translate-x-4",
                            template === "style-3" && "h-1 w-24 bg-primary/40 rounded-none"
                        )} />
                    </div>
                )}

                {(style === "line" || style === "gradient") && (
                    <div className={cn(
                        "relative py-8 flex items-center",
                        template === "style-3" && "py-12"
                    )}>
                        <div className={cn(
                            "flex-1",
                            template === "style-1" && (style === "gradient" ? "h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" : "h-px bg-primary/10"),
                            template === "style-2" && "h-px bg-primary/5",
                            template === "style-3" && "h-1 bg-primary",
                            template === "style-4" && "h-px bg-border border-t border-dashed border-border", // Double line effect or dashed
                            template === "style-5" && "h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent rounded-full"
                        )} />

                        {content.label && (
                            <div className={cn(
                                "px-8 relative",
                                template === "style-2" && "px-12",
                                template === "style-3" && "px-6"
                            )}>
                                <span className={cn(
                                    "whitespace-nowrap transition-all duration-700",
                                    template === "style-1" && "text-[10px] font-black uppercase tracking-[0.5em] text-muted-foreground bg-background px-4",
                                    template === "style-2" && "text-xl font-serif italic text-primary/40 bg-background px-8",
                                    template === "style-3" && "text-sm font-mono font-bold uppercase tracking-widest bg-primary text-primary-foreground px-4 py-1",
                                    template === "style-4" && "text-[10px] font-bold uppercase tracking-widest border border-border bg-background px-3 py-1 text-foreground",
                                    template === "style-5" && "text-sm font-medium text-primary bg-primary/5 px-6 py-2 rounded-full shadow-sm"
                                )}>
                                    {content.label}
                                </span>
                            </div>
                        )}

                        {(!content.label && style === "gradient") || content.label ? (
                            <div className={cn(
                                "flex-1",
                                template === "style-1" && (style === "gradient" ? "h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" : "h-px bg-primary/10"),
                                template === "style-2" && "h-px bg-primary/5",
                                template === "style-3" && "h-1 bg-primary"
                            )} />
                        ) : null}

                        {/* Style Accessories */}
                        {!content.label && style === "line" && (
                            <>
                                {template === "style-1" && (
                                    <div className="absolute left-1/2 -translate-x-1/2 h-2 w-2 rounded-full border border-primary/40 bg-background shadow-[0_0_15px_rgba(var(--primary),0.3)]" />
                                )}
                                {template === "style-2" && (
                                    <div className="absolute left-1/2 -translate-x-1/2 h-8 w-px bg-primary/20 rotate-45" />
                                )}
                                {template === "style-3" && (
                                    <div className="absolute left-1/2 -translate-x-1/2 h-6 w-6 border-4 border-primary rotate-45 bg-background" />
                                )}
                                {template === "style-4" && (
                                    // Style 4: Swiss PLUS
                                    <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 flex items-center justify-center bg-background border border-border">
                                        <div className="w-full h-px bg-foreground" />
                                        <div className="h-full w-px bg-foreground absolute" />
                                    </div>
                                )}
                                {template === "style-5" && (
                                    // Style 5: Organic Dot
                                    <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full ring-4 ring-primary/20 shadow-lg" />
                                )}
                            </>
                        )}
                    </div>
                )}
            </motion.div>
        </SectionLayout>
    );
}
