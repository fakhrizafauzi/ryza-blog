import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LogoCloudSectionContent {
    heading?: string;
    logos?: { name: string; url?: string; image?: string }[];
    grayscale?: boolean;
    speed?: "slow" | "medium" | "fast";
    template?: string;
}

const LogoItem = ({ logo, grayscale, template }: { logo: { name: string; url?: string; image?: string }; grayscale: boolean; template: string }) => (
    <div className={cn(
        "flex items-center justify-center p-4 transition-all duration-300",
        template === "style-4" && "border-r border-b border-border/50 h-32 md:h-40 w-full hover:bg-muted/5",
        template !== "style-4" && "w-32 md:w-40"
    )}>
        {logo.image ? (
            <img
                src={logo.image}
                alt={logo.name}
                className={cn(
                    "max-w-full max-h-12 md:max-h-16 object-contain transition-all duration-300",
                    grayscale && template !== "style-5" && "grayscale opacity-60 hover:grayscale-0 hover:opacity-100",
                    grayscale && template === "style-5" && "grayscale opacity-50 hover:opacity-80",
                    template === "style-4" && "opacity-100 grayscale-0"
                )}
            />
        ) : (
            <span className={cn(
                "text-xl font-bold",
                template === "style-4" && "font-mono uppercase tracking-tighter",
                template === "style-5" && "font-serif italic text-muted-foreground"
            )}>{logo.name}</span>
        )}
    </div>
);

export function LogoCloudSection({ content }: { content: LogoCloudSectionContent }) {
    const logos = content.logos || [];
    const grayscale = content.grayscale !== false;
    const template = content.template || "style-1";



    // Multiple sets for perfectly smooth infinite scroll for Style 5
    const marqueeLogos = [...logos, ...logos, ...logos, ...logos];

    if (template === "style-4") {
        // STYLE 4: Swiss Grid logos (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-y border-border">
                <div className="flex flex-col md:flex-row border-b md:border-b-0">
                    {/* Header Block */}
                    <div className="w-full md:w-64 lg:w-80 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex flex-col justify-center bg-muted/5 relative min-h-[200px] md:min-h-0">
                        <div className="absolute top-0 left-0 p-2 text-[10px] uppercase tracking-widest border-b border-r border-border opacity-50 z-10">
                            PARTNERS_V2
                        </div>
                        {content.heading && (
                            <h3 className="text-xl md:text-sm font-mono font-bold uppercase tracking-widest text-foreground md:text-muted-foreground md:transform md:-rotate-90 md:origin-center md:whitespace-nowrap text-center md:text-left relative z-10">
                                {content.heading}
                            </h3>
                        )}
                        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,0,0,0.02)_50%,transparent_75%,transparent_100%)] bg-[length:4px_4px]" />
                    </div>

                    {/* Grid Block */}
                    <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 bg-background divide-x divide-y divide-border border-b border-border md:border-none">
                        {logos.map((logo, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "flex items-center justify-center p-8 md:p-12 h-32 md:h-48 grayscale hover:grayscale-0 transition-all duration-500 hover:bg-primary/5 hover:scale-[1.02] active:scale-95 cursor-pointer relative group overflow-hidden"
                                )}
                            >
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-primary">
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                                {logo.image ? (
                                    <img src={logo.image} alt={logo.name} className="max-h-10 md:max-h-14 w-auto object-contain opacity-60 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
                                ) : (
                                    <span className="font-mono font-bold text-lg md:text-xl uppercase tracking-tighter group-hover:tracking-widest transition-all duration-300">{logo.name}</span>
                                )}
                            </motion.div>
                        ))}
                        {/* Fillers for grid completeness if needed */}
                        {Array.from({ length: Math.max(0, 4 - (logos.length % 4)) % 4 }).map((_, i) => (
                            <div key={`empty-${i}`} className="hidden lg:flex items-center justify-center p-8 md:p-12 h-32 md:h-48 bg-muted/2">
                                <div className="w-2 h-2 rounded-full bg-border" />
                            </div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Marquee (High Fidelity)
        return (
            <SectionLayout width="full" padding="lg" className="overflow-hidden">
                <div className="relative py-16 md:py-24">
                    {/* Soft Background Globs */}
                    <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-200 dark:bg-indigo-900/30 blur-[100px] rounded-full pointer-events-none opacity-50" />
                    <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-200 dark:bg-pink-900/30 blur-[100px] rounded-full pointer-events-none opacity-50" />

                    {content.heading && (
                        <div className="text-center mb-16 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                className="inline-block px-6 py-2 rounded-full bg-white dark:bg-zinc-800 shadow-lg shadow-indigo-500/10 text-primary text-sm font-bold mb-6 border border-primary/10"
                            >
                                TRUSTED BY
                            </motion.div>
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="text-4xl md:text-5xl font-black tracking-tight drop-shadow-sm"
                            >
                                {content.heading}
                            </motion.h2>
                        </div>
                    )}

                    <div className="relative w-full overflow-hidden mask-linear-fade">
                        <div className="flex w-max animate-marquee gap-12 md:gap-32 items-center py-4">
                            {marqueeLogos.map((logo, i) => (
                                <div key={i} className="flex-shrink-0 group relative cursor-pointer">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative p-6 rounded-2xl bg-white/50 dark:bg-zinc-800/50 backdrop-blur-sm border border-transparent group-hover:border-primary/20 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl">
                                        {logo.image ? (
                                            <img src={logo.image} alt={logo.name} className="h-8 md:h-14 w-auto object-contain grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" />
                                        ) : (
                                            <span className="text-xl md:text-2xl font-black text-muted-foreground group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-purple-500 transition-all duration-300">{logo.name}</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Fade Edges */}
                        <div className="absolute inset-y-0 left-0 w-32 md:w-64 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
                        <div className="absolute inset-y-0 right-0 w-32 md:w-64 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            padding="md"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            {content.heading && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "flex flex-col items-center mb-10 md:mb-16",
                        template === "style-3" && "items-start border-l-2 border-primary pl-6"
                    )}
                >
                    {template === "style-1" && <div className="h-px w-12 bg-primary/20 mb-6" />}
                    {template === "style-2" && (
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-8 bg-primary/10" />
                            <span className="font-serif italic text-primary/40">Trusted By</span>
                            <div className="h-px w-8 bg-primary/10" />
                        </div>
                    )}
                    <p className={cn(
                        "text-center uppercase tracking-[0.5em] px-4",
                        template === "style-1" && "text-[9px] md:text-[10px] font-black text-muted-foreground/60",
                        template === "style-2" && "text-xl md:text-2xl font-serif text-foreground/80 lowercase italic tracking-tight",
                        template === "style-3" && "text-xs md:text-sm font-mono font-bold text-primary tracking-widest text-left px-0"
                    )}>
                        {content.heading}
                    </p>
                </motion.div>
            )}

            {template === "style-2" ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-16 w-full items-center justify-items-center">
                    {logos.map((logo, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <LogoItem logo={logo} grayscale={grayscale} template={template} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                    className="relative group w-full"
                >
                    {/* Container Styling */}
                    <div className={cn(
                        "relative overflow-hidden transition-all duration-1000",
                        template === "style-1" && "rounded-[2.5rem] md:rounded-[4rem] bg-card/20 dark:bg-card/10 backdrop-blur-3xl border border-primary/10 py-12 md:py-24 shadow-2xl hover:border-primary/20",
                        template === "style-3" && "py-8 md:py-12 border-y-2 border-primary/10 bg-card"
                    )}>
                        {template === "style-1" && (
                            <>
                                {/* Background Depth Glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.02] via-transparent to-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="absolute -left-20 top-1/2 -translate-y-1/2 h-64 w-64 bg-primary/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="absolute -right-20 top-1/2 -translate-y-1/2 h-64 w-64 bg-primary/5 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                            </>
                        )}

                        {/* Edge Masks */}
                        <div className={cn(
                            "absolute inset-y-0 left-0 w-24 md:w-40 z-10",
                            template === "style-1" && "bg-gradient-to-r from-background/20 to-transparent backdrop-blur-[2px]",
                            template === "style-3" && "bg-gradient-to-r from-card to-transparent"
                        )} />
                        <div className={cn(
                            "absolute inset-y-0 right-0 w-24 md:w-40 z-10",
                            template === "style-1" && "bg-gradient-to-l from-background/20 to-transparent backdrop-blur-[2px]",
                            template === "style-3" && "bg-gradient-to-l from-card to-transparent"
                        )} />

                        {/* Marquee Content */}
                        <div className="flex w-max animate-marquee space-x-12 md:space-x-24 items-center">
                            {marqueeLogos.map((logo, i) => (
                                <div key={i} className="flex-shrink-0">
                                    <LogoItem logo={logo} grayscale={grayscale} template={template} />
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </SectionLayout>
    );
}
