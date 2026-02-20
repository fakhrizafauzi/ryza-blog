import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface MinimalTextSectionContent {
    text?: string;
    subtext?: string;
    size?: "sm" | "md" | "lg" | "xl";
    align?: "left" | "center" | "right";
    italic?: boolean;
    template?: string;
}

const SIZE_MAP = {
    sm: "text-2xl md:text-3xl",
    md: "text-3xl md:text-5xl",
    lg: "text-4xl md:text-7xl",
    xl: "text-5xl md:text-9xl"
};

export function MinimalTextSection({ content }: { content: MinimalTextSectionContent }) {
    const template = content.template || "style-1";
    const size = SIZE_MAP[content.size || "lg"];
    const align = content.align || "center";

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "narrow"}
            padding="lg"
            align={align}
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative">
                {template === "style-1" && (
                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-50" />
                )}

                <div className={cn(
                    "space-y-10",
                    template === "style-3" && "space-y-6"
                )}>
                    {content.text && (
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "text-foreground",
                                template === "style-1" && ["font-black tracking-tighter leading-[0.9]", size],
                                template === "style-2" && ["font-serif font-light tracking-tight leading-relaxed text-4xl md:text-6xl"],
                                template === "style-3" && ["font-mono font-bold uppercase tracking-[0.2em] text-2xl md:text-4xl px-8 py-4 border-2 border-primary inline-block"],
                                content.italic ? "italic" : "",
                                "break-words"
                            )}
                        >
                            {content.text}
                        </motion.h2>
                    )}

                    {content.subtext && (
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "text-muted-foreground leading-relaxed",
                                template === "style-1" && "text-xl md:text-2xl font-light max-w-2xl",
                                template === "style-2" && "text-lg md:text-xl font-serif italic opacity-70",
                                template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest bg-primary text-primary-foreground px-4 py-1",
                                align === "center" ? "mx-auto" : align === "right" ? "ml-auto" : ""
                            )}
                        >
                            {content.subtext}
                        </motion.p>
                    )}
                </div>

                {/* Decorative Elements */}
                <div className={cn(
                    "flex gap-4 mt-16",
                    align === "center" ? "justify-center" : align === "right" ? "justify-end" : "justify-start",
                    template === "style-2" && "hidden"
                )}>
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/20" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/10" />
                </div>
            </div>
        </SectionLayout>
    );
}
