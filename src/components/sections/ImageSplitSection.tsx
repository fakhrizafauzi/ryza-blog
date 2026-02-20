import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";
import { Sparkles } from "lucide-react";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

interface ImageSplitSectionContent {
    heading?: string;
    subheading?: string;
    text?: string;
    image?: string;
    imagePosition?: "left" | "right";
    showGlow?: boolean;
}

export function ImageSplitSection({ content, isPostDetail }: { content: ImageSplitSectionContent, isPostDetail?: boolean }) {
    const isRight = content.imagePosition !== "left";

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : "wide"}
            padding={isPostDetail ? "sm" : "lg"}
            variant={isPostDetail ? "post" : "default"}
        >
            <div className={cn(
                "flex flex-col gap-20 lg:gap-32 items-center",
                isRight ? "lg:flex-row" : "lg:flex-row-reverse"
            )}>
                {/* Content Side */}
                <motion.div
                    initial={{ opacity: 0, x: isRight ? -40 : 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="flex-1 space-y-10"
                >
                    <div className="space-y-6">
                        {content.subheading && (
                            <div className="flex items-center gap-3 text-primary font-black uppercase tracking-[0.4em] text-xs">
                                <Sparkles className="h-4 w-4" />
                                <span>{content.subheading}</span>
                            </div>
                        )}
                        {content.heading && (
                            <h2 className="text-4xl md:text-7xl font-black tracking-tight leading-[1.1] text-foreground break-words">
                                {content.heading}
                            </h2>
                        )}
                    </div>

                    {content.text && (
                        <div className="text-xl text-muted-foreground font-light leading-relaxed max-w-2xl">
                            {content.text}
                        </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-4">
                        <div className="h-1 w-20 bg-primary rounded-full" />
                        <div className="h-1 w-2 bg-primary/20 rounded-full" />
                        <div className="h-1 w-2 bg-primary/20 rounded-full" />
                    </div>
                </motion.div>

                {/* Image Side */}
                {content.image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotateY: isRight ? 10 : -10 }}
                        whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="flex-1 w-full perspective-1000"
                    >
                        <div className="relative group">
                            {/* Decorative Glow */}
                            <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                            <div className="relative rounded-[3rem] overflow-hidden border border-primary/20 shadow-2xl aspect-[4/5] md:aspect-square bg-card/40 backdrop-blur-3xl">
                                <ZoomableImage
                                    src={content.image}
                                    alt={content.heading || "Section image"}
                                    className="w-full h-full object-cover"
                                />

                                {/* Overlay Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 pointer-events-none" />

                                {/* Glass Frame Decoration */}
                                <div className="absolute inset-8 rounded-[2rem] border border-white/10 pointer-events-none" />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </SectionLayout>
    );
}
