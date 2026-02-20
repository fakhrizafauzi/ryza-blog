import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Sparkles } from "lucide-react";

interface CountdownSectionContent {
    heading?: string;
    targetDate?: string;
    subtext?: string;
}

function getTimeLeft(target: string) {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
    };
}

export function CountdownSection({ content }: { content: CountdownSectionContent }) {
    const [time, setTime] = useState(getTimeLeft(content.targetDate || ""));

    useEffect(() => {
        if (!content.targetDate) return;
        const id = setInterval(() => setTime(getTimeLeft(content.targetDate!)), 1000);
        return () => clearInterval(id);
    }, [content.targetDate]);

    const units = [
        { label: "Days", value: time.days },
        { label: "Hours", value: time.hours },
        { label: "Minutes", value: time.minutes },
        { label: "Seconds", value: time.seconds },
    ];

    return (
        <SectionLayout width="narrow" padding="lg" align="center">
            <div className="relative w-full">
                {/* Background Decor */}
                <div className="absolute -left-32 -top-32 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -right-32 bottom-24 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />

                {(content.heading || content.subtext) && (
                    <div className="text-center mb-16 md:mb-20 max-w-4xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[1] md:leading-[0.9] break-words"
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subtext && (
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto"
                            >
                                {content.subtext}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-2 md:grid-cols-4 justify-items-center gap-6 md:gap-10">
                    {units.map((u, i) => (
                        <motion.div
                            key={u.label}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex flex-col items-center w-full max-w-[160px]"
                        >
                            <div className="relative w-full aspect-square rounded-[2rem] md:rounded-[2.5rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 flex items-center justify-center shadow-2xl transition-all duration-700 group-hover:border-primary/40 group-hover:scale-105 overflow-hidden">
                                {/* Inner Glow */}
                                <div className="absolute -right-10 -top-10 h-24 w-24 bg-primary/5 blur-[40px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000" />

                                <div className="relative z-10 flex flex-col items-center">
                                    <div className="text-4xl xs:text-5xl md:text-6xl font-black tabular-nums tracking-tighter text-foreground group-hover:text-primary transition-colors duration-500">
                                        {String(u.value).padStart(2, "0")}
                                    </div>
                                    <div className="h-1 w-6 md:w-8 bg-primary/20 rounded-full mt-2 group-hover:w-10 md:group-hover:w-12 transition-all duration-700" />
                                </div>

                                {/* Subtle Overlay Pattern */}
                                <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "16px 16px" }}
                                />
                            </div>
                            <div className="text-[9px] md:text-[10px] lg:text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40 mt-4 md:mt-6 group-hover:text-primary transition-colors duration-500 text-center">
                                {u.label}
                            </div>

                            <Sparkles className="absolute -top-2 -right-2 md:-top-4 md:-right-4 h-3 w-3 md:h-4 md:w-4 text-primary/0 group-hover:text-primary/40 transition-all duration-1000 transform group-hover:rotate-12" />
                        </motion.div>
                    ))}
                </div>

                {/* Final Accent */}
                <div className="mt-16 md:mt-24 flex justify-center">
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
                </div>
            </div>
        </SectionLayout>
    );
}
