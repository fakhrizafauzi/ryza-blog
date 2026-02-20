import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxSectionContent {
    image?: string;
    heading?: string;
    subheading?: string;
    height?: number;
    overlay?: number;
}

export function ParallaxSection({ content }: { content: ParallaxSectionContent }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const height = content.height || 700;
    const overlay = content.overlay ?? 0.4;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1]);

    return (
        <section
            ref={containerRef}
            className="relative overflow-hidden flex items-center justify-center p-4 md:p-12 mb-20"
            style={{ height }}
        >
            {/* Parallax Background Layer */}
            <motion.div
                style={{ y, scale }}
                className="absolute inset-0 z-0"
            >
                {content.image ? (
                    <>
                        <img
                            src={content.image}
                            alt="Parallax background"
                            className="w-full h-[140%] object-cover grayscale-[0.2]"
                        />
                        <div
                            className="absolute inset-0 bg-black"
                            style={{ opacity: overlay }}
                        />
                        {/* Dramatic Gradients */}
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-transparent to-background/20" />
                    </>
                ) : (
                    <div className="w-full h-full bg-muted" />
                )}
            </motion.div>

            {/* Content Layer */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 max-w-5xl mx-auto w-full"
            >
                <div className="p-10 md:p-24 rounded-[4rem] bg-background/10 backdrop-blur-2xl border border-white/10 shadow-2xl flex flex-col items-center text-center">
                    {/* Decorative Top Accent */}
                    <div className="mb-8 h-px w-24 bg-gradient-to-r from-transparent via-primary to-transparent" />

                    {content.heading && (
                        <h2 className={cn(
                            "text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 break-words",
                            content.image ? "text-white drop-shadow-2xl" : "text-foreground"
                        )}>
                            {content.heading}
                        </h2>
                    )}

                    {content.subheading && (
                        <p className={cn(
                            "text-xl md:text-2xl font-light leading-relaxed max-w-2xl",
                            content.image ? "text-white/70" : "text-muted-foreground"
                        )}>
                            {content.subheading}
                        </p>
                    )}

                    {/* Decorative Bottom Dot */}
                    <div className="mt-12 h-3 w-3 rounded-full bg-primary animate-pulse" />
                </div>
            </motion.div>
        </section>
    );
}
