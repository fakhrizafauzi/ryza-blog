import { useState, useRef } from "react";
import { Play, Pause, Music, Volume2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface AudioSectionContent {
    url?: string;
    title?: string;
    description?: string;
    template?: string;
}

export function AudioSection({ content }: { content: AudioSectionContent }) {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const template = content.template || "style-1";

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (!audioRef.current) return;
        const current = audioRef.current.currentTime;
        const duration = audioRef.current.duration;
        if (duration) {
            setProgress((current / duration) * 100);
        }
    };

    if (!content.url) return (
        <SectionLayout
            width="narrow"
            padding="md"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className={cn(
                "flex flex-col items-center justify-center h-48 text-muted-foreground transition-all duration-700",
                template === "style-1" && "bg-card/40 backdrop-blur-3xl border border-primary/10 rounded-[2.5rem]",
                template === "style-2" && "bg-transparent border border-primary/5 rounded-none",
                template === "style-3" && "bg-card border-4 border-primary rounded-none shadow-[10px_10px_0_0_black] dark:shadow-[10px_10px_0_0_white]"
            )}>
                <Music className="h-12 w-12 opacity-20 mb-4" />
                <p className={cn(
                    "text-sm font-black uppercase tracking-widest text-center px-4",
                    template === "style-2" && "font-serif italic lowercase tracking-tight normal-case",
                    template === "style-3" && "font-mono"
                )}>No audio source provided</p>
            </div>
        </SectionLayout>
    );

    return (
        <SectionLayout
            width="narrow"
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative group transition-all duration-700 overflow-hidden",
                    template === "style-1" && "p-8 md:p-12 rounded-[3rem] bg-card/40 backdrop-blur-3xl border border-primary/10 shadow-2xl",
                    template === "style-2" && "p-8 border-y border-primary/10 bg-transparent rounded-none",
                    template === "style-3" && "p-10 border-4 border-primary bg-card rounded-none shadow-[20px_20px_0_0_rgba(0,0,0,1)]"
                )}
            >
                {/* Background Decor */}
                {template === "style-1" && (
                    <>
                        <div className="absolute -right-20 -top-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full" />
                        <div className="absolute -left-20 -bottom-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full" />
                    </>
                )}

                <div className={cn(
                    "relative z-10 flex flex-col items-center text-center space-y-8",
                    template === "style-3" && "items-start text-left"
                )}>
                    <div className="space-y-3 w-full">
                        {content.title && (
                            <h3 className={cn(
                                "leading-tight transition-all duration-700",
                                template === "style-1" && "text-3xl md:text-4xl font-black tracking-tight",
                                template === "style-2" && "text-2xl md:text-3xl font-serif font-light tracking-tight",
                                template === "style-3" && "text-4xl md:text-6xl font-black uppercase tracking-tighter"
                            )}>
                                {content.title}
                            </h3>
                        )}
                        {content.description && (
                            <p className={cn(
                                "text-muted-foreground leading-relaxed transition-all duration-700",
                                template === "style-1" && "text-lg font-light max-w-xl mx-auto",
                                template === "style-2" && "text-base font-serif italic max-w-xl mx-auto",
                                template === "style-3" && "text-sm font-mono uppercase tracking-widest opacity-60"
                            )}>
                                {content.description}
                            </p>
                        )}
                    </div>

                    <div className="w-full space-y-6">
                        {/* Audio Controls */}
                        <div className={cn(
                            "flex items-center gap-8",
                            template === "style-1" && "justify-center",
                            template === "style-2" && "justify-center",
                            template === "style-3" && "justify-between w-full"
                        )}>
                            <button
                                onClick={togglePlay}
                                className={cn(
                                    "flex items-center justify-center transition-all outline-none",
                                    template === "style-1" && "h-20 w-20 rounded-full bg-primary text-primary-foreground shadow-2xl shadow-primary/20 hover:scale-105 active:scale-95",
                                    template === "style-2" && "h-16 w-16 rounded-full border border-primary/20 text-primary hover:bg-primary hover:text-white",
                                    template === "style-3" && "h-24 w-24 bg-primary text-white hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[8px_8px_0_0_black]"
                                )}
                            >
                                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
                            </button>

                            <div className={cn(
                                "flex items-center gap-2 text-muted-foreground",
                                template === "style-3" && "flex-col items-end gap-1"
                            )}>
                                <Volume2 className="h-5 w-5 opacity-50" />
                                <div className={cn(
                                    "h-1 w-20 bg-primary/10 overflow-hidden",
                                    template === "style-1" && "rounded-full",
                                    template === "style-2" && "rounded-none",
                                    template === "style-3" && "h-4 w-32 border-2 border-primary bg-transparent rounded-none"
                                )}>
                                    <div className={cn(
                                        "h-full bg-primary/40",
                                        template === "style-3" && "bg-primary"
                                    )} style={{ width: "60%" }} />
                                </div>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className={cn(
                            "relative w-full h-3 bg-primary/5 overflow-hidden border border-primary/5",
                            template === "style-1" && "rounded-full",
                            template === "style-2" && "rounded-none h-px",
                            template === "style-3" && "h-6 border-4 border-primary bg-background rounded-none"
                        )}>
                            <motion.div
                                className={cn(
                                    "absolute top-0 left-0 bottom-0 bg-primary",
                                    template === "style-1" && "shadow-[0_0_20px_rgba(var(--primary),0.5)]"
                                )}
                                style={{ width: `${progress}%` }}
                                transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                            />
                        </div>
                    </div>
                </div>

                <audio
                    ref={audioRef}
                    src={content.url}
                    onTimeUpdate={handleTimeUpdate}
                    onEnded={() => setIsPlaying(false)}
                    className="hidden"
                />

                {/* Decorative Elements */}
                {template === "style-1" && (
                    <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all duration-700" />
                )}
                {template === "style-3" && (
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 h-32 w-1 bg-primary/20" />
                )}
            </motion.div>
        </SectionLayout>
    );
}
