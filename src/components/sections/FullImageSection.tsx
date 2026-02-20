import { motion } from "framer-motion";
import { useRef } from "react";
import { SectionLayout } from "./SectionLayout";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

interface FullImageSectionContent {
    image?: string;
    caption?: string;
    height?: string; // "short", "medium", "tall"
}

export function FullImageSection({ content }: { content: FullImageSectionContent }) {
    const containerRef = useRef<HTMLDivElement>(null);
    if (!content.image) return null;





    const heightClasses = {
        short: "aspect-[21/9] min-h-[400px]",
        medium: "aspect-[16/9] min-h-[600px]",
        tall: "aspect-[4/3] min-h-[800px]",
    }[content.height || "medium"] || "aspect-[16/9] min-h-[600px]";

    return (
        <SectionLayout width="full" padding="none">
            <div ref={containerRef} className="relative overflow-hidden group">
                <div className={`${heightClasses} overflow-hidden`}>
                    <ZoomableImage
                        src={content.image}
                        alt={content.caption || "Full width cinematic image"}
                        className="w-full h-full object-cover transition-opacity duration-1000"
                    />
                </div>

                {/* Cinematic Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />

                {content.caption && (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="absolute bottom-12 left-12 max-w-lg p-8 rounded-[2rem] bg-background/20 backdrop-blur-3xl border border-white/10 shadow-2xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-8 bg-primary" />
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-white/60">Insight</span>
                        </div>
                        <p className="text-lg md:text-xl font-bold text-white tracking-tight leading-tight">
                            {content.caption}
                        </p>
                    </motion.div>
                )}

                {/* Decorative Edge Glow */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
            </div>
        </SectionLayout>
    );
}
