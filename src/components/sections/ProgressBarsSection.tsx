import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";

interface ProgressItem { label: string; value: number; color?: string; }
interface ProgressBarsSectionContent {
    heading?: string;
    subheading?: string;
    items?: ProgressItem[];
}

export function ProgressBarsSection({ content }: { content: ProgressBarsSectionContent }) {
    const items = content.items || [];

    return (
        <SectionLayout width="narrow" padding="lg" align="center">
            <div className="relative w-full">
                {/* Background Decor */}
                <div className="absolute -left-20 -top-20 h-48 w-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -right-20 bottom-20 h-48 w-48 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />

                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-20 max-w-3xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 md:mb-8 leading-[1] md:leading-[0.9]"
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-base md:text-xl text-muted-foreground font-light leading-relaxed"
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className="space-y-8 md:space-y-10">
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group"
                        >
                            <div className="flex justify-between items-end mb-3 md:mb-4 px-1 md:px-2">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                                    <span className="font-black text-[10px] md:text-xs uppercase tracking-[0.4em] text-muted-foreground/60 transition-colors group-hover:text-primary">
                                        {item.label}
                                    </span>
                                </div>
                                <span className="font-black text-xl md:text-2xl tracking-tighter text-foreground group-hover:text-primary transition-colors">
                                    {item.value}%
                                </span>
                            </div>

                            <div className="relative h-3 md:h-4 w-full bg-card/40 dark:bg-card/20 backdrop-blur-md rounded-full border border-primary/10 p-0.5 md:p-1 overflow-hidden shadow-2xl">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.min(100, Math.max(0, item.value))}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 2, delay: 0.5 + (i * 0.1), ease: [0.16, 1, 0.3, 1] }}
                                    className="relative h-full rounded-full bg-primary shadow-[0_0_20px_rgba(var(--primary),0.6)]"
                                    style={{ backgroundColor: item.color || undefined }}
                                >
                                    {/* Glass Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
                                    {/* Animated Glow */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-20 animate-shine" />
                                </motion.div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shine {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(500%); }
                }
                .animate-shine {
                    animation: shine 3s infinite linear;
                }
            `}} />
        </SectionLayout>
    );
}
