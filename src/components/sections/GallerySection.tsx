import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { ZoomableImage } from "@/components/ui/ZoomableImage";

interface GallerySectionContent {
    heading?: string;
    subheading?: string;
    images?: string[];
    columns?: number;
    template?: string;
}

export function GallerySection({ content, isPostDetail }: { content: GallerySectionContent, isPostDetail?: boolean }) {
    const [selected, setSelected] = useState<string | null>(null);
    const template = content.template || "style-1";
    const cols = content.columns || 3;
    const items = content.images || [];

    const gridClass = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
        4: "grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
    }[cols as 2 | 3 | 4] || "grid-cols-1 md:grid-cols-3";

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : (template === "style-4" ? "full" : "wide")}
            padding={isPostDetail ? "sm" : "lg"}
            variant={isPostDetail ? "post" : "default"}
            align="center"
            background={template === "style-3" ? "muted" : "none"}
            className={template === "style-4" ? "p-0" : ""}
        >
            {/* Header Area */}
            {(content.heading || content.subheading) && (
                <div className={cn(
                    "mb-16 md:mb-24 max-w-4xl mx-auto px-4",
                    template === "style-3" ? "text-left border-l-4 border-primary pl-8" : "text-center",
                    template === "style-4" && "text-left px-8 md:px-12 mb-12 border-b border-border pb-8 w-full max-w-none mx-0",
                    template === "style-5" && "text-left mb-12"
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
                                template === "style-3" && "text-4xl md:text-7xl font-black uppercase tracking-tighter",
                                template === "style-4" && "text-5xl md:text-8xl font-bold tracking-tighter uppercase leading-[0.8]",
                                template === "style-5" && "text-4xl md:text-6xl font-black tracking-tighter mb-4"
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
                                template === "style-3" && "font-mono uppercase text-sm tracking-widest opacity-60",
                                template === "style-4" && "font-mono uppercase text-sm tracking-widest text-muted-foreground max-w-xl",
                                template === "style-5" && "text-lg text-muted-foreground max-w-2xl"
                            )}
                        >
                            {content.subheading}
                        </motion.p>
                    )}
                </div>
            )}

            {/* Gallery Grid */}
            <div className={cn(
                "grid",
                template === "style-5" ? "columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 block" : Object.keys(gridClass).includes(String(cols)) ? gridClass : "grid-cols-1 md:grid-cols-3",
                template === "style-4" && "gap-0.5 bg-border p-0.5 grid-cols-1 sm:grid-cols-2 md:grid-cols-4",
                (template === "style-1" || template === "style-3") && "gap-10",
                template === "style-2" && "gap-4 md:gap-8",
                // Style 5 uses masonry via columns, so we override grid display
                template === "style-5" && "grid-cols-1 block columns-1 md:columns-2 lg:columns-3 space-y-8 gap-8"
            )}>
                {items.map((src, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "group relative",
                            template !== "style-5" && "aspect-square",
                            template === "style-2" && i % 2 === 0 ? "md:aspect-[3/4]" : "",
                            template === "style-4" && "aspect-[4/3] bg-background",
                            template === "style-5" && "break-inside-avoid mb-8"
                        )}
                    >
                        <button
                            onClick={() => setSelected(src)}
                            className={cn(
                                "relative w-full overflow-hidden transition-all duration-700 focus:outline-none h-full",
                                template === "style-1" && "rounded-[3rem] border border-primary/10 bg-card/40 backdrop-blur-3xl shadow-2xl hover:border-primary/30",
                                template === "style-2" && "rounded-none border-0",
                                template === "style-3" && "rounded-none border-4 border-primary grayscale hover:grayscale-0 shadow-[8px_8px_0_0_rgba(0,0,0,1)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0_0_rgba(0,0,0,1)] active:translate-x-0 active:-translate-y-0 active:shadow-none",
                                template === "style-4" && "rounded-none",
                                template === "style-5" && "rounded-[2rem] overflow-hidden hover:shadow-2xl hover:scale-[1.02] duration-500"
                            )}
                        >
                            <ZoomableImage
                                src={src}
                                alt={`Gallery image ${i + 1}`}
                                className={cn(
                                    "w-full h-full object-cover transition-transform duration-700",
                                    template === "style-1" && "group-hover:scale-110",
                                    template === "style-2" && "group-hover:scale-105",
                                    template === "style-4" && "grayscale group-hover:grayscale-0 transition-all",
                                    template === "style-5" && "group-hover:scale-110"
                                )}
                            />

                            {/* Overlays */}
                            {template === "style-1" && (
                                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                    <div className="w-16 h-16 rounded-full bg-background/20 backdrop-blur-md flex items-center justify-center text-white">
                                        <Search className="w-6 h-6" />
                                    </div>
                                </div>
                            )}

                            {template === "style-4" && (
                                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-center justify-center">
                                    <div className="text-primary-foreground font-mono uppercase tracking-widest text-xs border border-primary-foreground/50 px-4 py-2">
                                        View Image
                                    </div>
                                </div>
                            )}

                            {template === "style-5" && (
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                                    <p className="text-white font-medium">View Project</p>
                                </div>
                            )}
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selected && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-xl p-4 md:p-10"
                        onClick={() => setSelected(null)}
                    >
                        <button
                            onClick={() => setSelected(null)}
                            className="absolute top-4 right-4 md:top-8 md:right-8 p-3 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <motion.img
                            layoutId={selected}
                            src={selected}
                            alt="Selected"
                            className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </SectionLayout>
    );
}
