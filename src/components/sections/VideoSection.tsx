import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoSectionContent {
    heading?: string;
    subheading?: string;
    url?: string;
    caption?: string;
    aspectRatio?: "16/9" | "4/3" | "1/1";
    template?: string;
}

function getEmbedUrl(url: string): string {
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    return url;
}

export function VideoSection({ content, isPostDetail }: { content: VideoSectionContent, isPostDetail?: boolean }) {
    const template = content.template || "style-1";
    const ratio = content.aspectRatio || "16/9";
    const paddingMap: Record<string, string> = { "16/9": "56.25%", "4/3": "75%", "1/1": "100%" };
    const padding = paddingMap[ratio] || "56.25%";

    if (!content.url) return (
        <SectionLayout
            width={isPostDetail ? "readable" : "narrow"}
            padding={isPostDetail ? "sm" : "md"}
            variant={isPostDetail ? "post" : "default"}
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className={cn(
                "flex flex-col items-center justify-center min-h-[300px] text-muted-foreground transition-all duration-700",
                template === "style-1" && "bg-card/40 backdrop-blur-3xl border border-primary/10 rounded-[2.5rem]",
                template === "style-2" && "bg-transparent border border-primary/5 rounded-none",
                template === "style-3" && "bg-card border-4 border-primary rounded-none shadow-[10px_10px_0_0_black] dark:shadow-[10px_10px_0_0_white]"
            )}>
                <Play className="h-12 w-12 opacity-20 mb-4" />
                <p className={cn(
                    "text-sm font-black uppercase tracking-widest",
                    template === "style-2" && "font-serif italic lowercase tracking-tight normal-case",
                    template === "style-3" && "font-mono"
                )}>No video source provided</p>
            </div>
        </SectionLayout>
    );

    if (template === "style-4") {
        // STYLE 4: Swiss Player (High Fidelity)
        const embedUrl = content.url ? getEmbedUrl(content.url) : null;

        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border text-foreground font-mono">
                <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
                    {/* Information Panel */}
                    <div className="lg:col-span-4 border-r border-border p-8 md:p-12 flex flex-col justify-center bg-muted/5 relative">
                        <div className="absolute top-0 left-0 p-4 border-b border-r border-border bg-background text-[10px] uppercase tracking-widest">
                            MEDIA_PLAYER_V4
                        </div>

                        <div className="mb-0">
                            {content.heading && (
                                <h2 className="text-3xl md:text-5xl font-bold tracking-tighter uppercase leading-none mb-6">
                                    {content.heading}
                                </h2>
                            )}
                            {content.subheading && (
                                <p className="text-sm text-muted-foreground leading-relaxed md:max-w-xs border-l-2 border-primary/20 pl-4">
                                    {content.subheading}
                                </p>
                            )}
                        </div>

                        <div className="mt-12 space-y-4">
                            <div className="flex items-center justify-between text-xs uppercase tracking-widest border-b border-dashed border-border pb-2">
                                <span className="text-muted-foreground">Format</span>
                                <span className="font-bold">HD 1080p</span>
                            </div>
                            <div className="flex items-center justify-between text-xs uppercase tracking-widest border-b border-dashed border-border pb-2">
                                <span className="text-muted-foreground">Duration</span>
                                <span className="font-bold">02:45:00</span>
                            </div>
                            <div className="flex items-center justify-between text-xs uppercase tracking-widest border-b border-dashed border-border pb-2">
                                <span className="text-muted-foreground">Audio</span>
                                <span className="font-bold">Stereo / DOLBY</span>
                            </div>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="lg:col-span-8 bg-black relative group overflow-hidden flex items-center justify-center">
                        {/* CRT Scanline Effect */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,6px_100%] z-20 pointer-events-none opacity-20" />

                        {embedUrl ? (
                            <iframe
                                src={embedUrl}
                                className="w-full h-full absolute inset-0 z-10"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-900 z-10 relative">
                                <div className="text-zinc-700 font-mono text-center">
                                    <Play className="w-24 h-24 mx-auto mb-4 opacity-50" />
                                    <p className="uppercase tracking-widest text-sm">Signal Lost / Insert Source</p>
                                </div>
                            </div>
                        )}

                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-zinc-800 z-30 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-4 text-xs text-white font-mono uppercase">
                                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                Playing
                            </div>
                            <div className="flex items-center gap-2">
                                {/* Fake Controls */}
                                <div className="h-1 w-32 bg-zinc-700 relative">
                                    <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-primary" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Organic Frame (High Fidelity)
        const embedUrl = content.url ? getEmbedUrl(content.url) : null;

        return (
            <SectionLayout width="container" padding="lg" className="min-h-[80vh] flex items-center justify-center">
                <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 leading-tight">
                            {content.heading || "Watch the Story"}
                        </h2>
                        {content.subheading && (
                            <p className="text-lg text-muted-foreground/80 leading-relaxed mb-8">
                                {content.subheading}
                            </p>
                        )}
                        <div className="flex items-center gap-2">
                            <span className="flex h-3 w-3 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                            </span>
                            <span className="text-sm font-bold text-primary uppercase tracking-wide">Now Streaming</span>
                        </div>
                    </motion.div>

                    <div className="relative">
                        {/* Blob Backing */}
                        <motion.div
                            animate={{ rotate: [0, 5, 0], scale: [1, 1.05, 1] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -inset-4 bg-gradient-to-tr from-pink-300 to-indigo-300 dark:from-pink-900/50 dark:to-indigo-900/50 rounded-[3rem] blur-xl opacity-70 -z-10"
                        />

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white dark:border-zinc-800 bg-black"
                        >
                            {embedUrl ? (
                                <iframe
                                    src={embedUrl}
                                    className="w-full h-full absolute inset-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center bg-zinc-900 group cursor-pointer">
                                    <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition-all">
                                        <Play className="w-8 h-8 text-white fill-current ml-1" />
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Floating Caption */}
                        {content.caption && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-800 p-4 rounded-xl shadow-lg max-w-xs text-sm font-medium z-20 hidden md:block"
                            >
                                "{content.caption}"
                            </motion.div>
                        )}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : "wide"}
            padding={isPostDetail ? "sm" : "lg"}
            align="center"
            background={template === "style-3" ? "muted" : "none"}
            variant={isPostDetail ? "post" : "default"}
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
                                "mb-6 leading-tight transition-all duration-700 break-words",
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
                initial={{ opacity: 0, scale: 0.95, rotateX: template === "style-1" ? 5 : 0 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative group",
                    template === "style-1" && "perspective-1000"
                )}
            >
                {/* Decorative Glow */}
                {template === "style-1" && (
                    <div className="absolute -inset-10 bg-primary/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                )}

                <div className={cn(
                    "relative overflow-hidden transition-all duration-1000 bg-black",
                    template === "style-1" && "rounded-[3rem] md:rounded-[4rem] border border-primary/20 shadow-2xl",
                    template === "style-2" && "rounded-none border-y border-primary/10",
                    template === "style-3" && "rounded-none border-4 border-primary shadow-[20px_20px_0_0_rgba(0,0,0,1)]"
                )}>
                    <div className="relative" style={{ paddingBottom: padding }}>
                        <iframe
                            src={getEmbedUrl(content.url)}
                            className="absolute inset-0 w-full h-full"
                            allowFullScreen
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            title="Section Video"
                        />
                    </div>
                </div>

                {/* Perspective Frame Overlay */}
                {template === "style-1" && (
                    <div className="hidden lg:block absolute -inset-8 rounded-[5rem] border border-primary/5 pointer-events-none group-hover:border-primary/20 transition-all duration-700" />
                )}

                {/* Technical Corner Accents */}
                {template === "style-3" && (
                    <>
                        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-primary z-20" />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-primary z-20" />
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
                        "text-center mt-12 transition-all",
                        template === "style-1" && "text-xs font-black uppercase tracking-[0.4em] text-muted-foreground",
                        template === "style-2" && "text-sm font-serif italic text-primary/40",
                        template === "style-3" && "text-xs font-mono uppercase tracking-widest text-primary/60"
                    )}
                >
                    {content.caption}
                </motion.p>
            )}
        </SectionLayout>
    );
}
