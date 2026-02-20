import { motion } from "framer-motion";
import { Quote, Star, Sparkles } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface TestimonialItem {
    quote: string;
    author: string;
    role?: string;
    avatar?: string;
    rating?: number;
}

interface TestimonialsSectionContent {
    heading?: string;
    subheading?: string;
    items?: TestimonialItem[];
    template?: string;
}

export function TestimonialsSection({ content }: { content: TestimonialsSectionContent }) {
    const items = content.items || [];
    const template = content.template || "style-1";

    const displayItems = items.length > 0 ? items : [
        {
            quote: "The attention to detail and premium design language is truly world-class. It has elevated our brand to new heights.",
            author: "Sarah Jenkins",
            role: "Chief Design Officer",
            rating: 5
        },
        {
            quote: "An absolute game-changer for our marketing site. The animations are buttery smooth and the performance is top-notch.",
            author: "Michael Chen",
            role: "Tech Lead @ FutureFlow",
            rating: 5
        },
        {
            quote: "I've never seen a platform that combines power and beauty so seamlessly. Truly a masterpiece of modern web design.",
            author: "Elena Rodriguez",
            role: "Marketing Director",
            rating: 5
        }
    ];

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Testimonials
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                {/* Header Strip */}
                {(content.heading || content.subheading) && (
                    <div className="border-b border-border p-12 md:p-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                        <div className="lg:col-span-8">
                            {content.heading && (
                                <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-foreground uppercase leading-[0.9]">
                                    {content.heading}
                                </h2>
                            )}
                        </div>
                        <div className="lg:col-span-4">
                            {content.subheading && (
                                <p className="text-lg md:text-xl text-muted-foreground font-mono">
                                    {content.subheading}
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border"
                )}>
                    {displayItems.map((item, i) => (
                        <div key={i} className="p-12 md:p-16 flex flex-col justify-between h-full bg-background hover:bg-muted/30 transition-colors duration-500 group">
                            <div className="mb-12">
                                <div className="flex gap-1 mb-6 text-foreground">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} className={cn("w-4 h-4 fill-current", s < (item.rating || 5) ? "opacity-100" : "opacity-20")} />
                                    ))}
                                </div>
                                <blockquote className="text-2xl font-bold uppercase leading-tight tracking-tight">
                                    "{item.quote}"
                                </blockquote>
                            </div>

                            <div className="flex items-center gap-4 mt-auto pt-8 border-t border-border/50 group-hover:border-foreground/20 transition-colors">
                                {item.avatar && (
                                    <img src={item.avatar} alt={item.author} className="w-12 h-12 grayscale group-hover:grayscale-0 transition-all" />
                                )}
                                <div>
                                    <div className="font-bold uppercase tracking-wider text-sm">{item.author}</div>
                                    <div className="text-xs font-mono text-muted-foreground mt-1">{item.role}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Testimonials (High Fidelity)
        return (
            <SectionLayout width="container" padding="lg">
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto relative z-10">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 drop-shadow-sm"
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                {content.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className="relative">
                    {/* Organic Background Blobs */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30 dark:opacity-10 overflow-hidden">
                        <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-sky-200 dark:bg-sky-900 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
                        <div className="absolute bottom-[10%] right-[10%] w-[500px] h-[500px] bg-pink-200 dark:bg-pink-900 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-1000" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                        {displayItems.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -12, rotate: i % 2 === 0 ? 1 : -1 }}
                                className="p-10 rounded-[3rem] bg-white/60 dark:bg-zinc-800/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500 border border-white/40 dark:border-white/5 flex flex-col relative"
                            >
                                <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/10 fill-primary/10 rotate-12" />

                                <div className="flex gap-1 mb-8">
                                    {[...Array(5)].map((_, s) => (
                                        <Star key={s} className="w-5 h-5 text-amber-400 fill-amber-400 drop-shadow-sm" />
                                    ))}
                                </div>

                                <p className="text-xl leading-relaxed text-foreground/80 mb-10 flex-1 font-medium italic">
                                    "{item.quote}"
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="p-1 bg-white dark:bg-zinc-700 rounded-full shadow-md">
                                        {item.avatar ? (
                                            <img src={item.avatar} alt={item.author} className="w-14 h-14 rounded-full object-cover" />
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900 flex items-center justify-center text-primary font-bold text-xl">
                                                {item.author.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg text-foreground">{item.author}</h4>
                                        <p className="text-sm text-primary font-medium">{item.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full">
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-24 -top-24 h-96 w-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none animate-pulse" />
                        <div className="absolute -right-24 bottom-0 h-96 w-96 bg-primary/2 blur-[150px] rounded-full pointer-events-none animate-pulse delay-700" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-32 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-6 md:mb-8 leading-[1] md:leading-[0.9] break-words",
                                    template === "style-1" && "text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight",
                                    template === "style-3" && "text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-[0.05em]"
                                )}
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
                                className={cn(
                                    "text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto",
                                    template === "style-3" && "mx-0 text-left font-mono text-sm uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 gap-8 md:gap-10 lg:gap-12 w-full",
                    template === "style-1" && "sm:grid-cols-2 lg:grid-cols-3",
                    template === "style-2" && "sm:grid-cols-1 max-w-3xl mx-auto",
                    template === "style-3" && "sm:grid-cols-2 lg:grid-cols-3"
                )}>
                    {displayItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "group relative flex flex-col transition-all duration-1000",
                                template === "style-1" && "p-8 sm:p-12 md:p-16 rounded-[2.5rem] md:rounded-[4rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 hover:border-primary/20 shadow-2xl hover:shadow-primary/5",
                                template === "style-2" && "p-0 border-b border-primary/10 pb-16 last:border-0",
                                template === "style-3" && "p-8 md:p-10 bg-zinc-50 dark:bg-zinc-900 border-l-4 border-primary shadow-xl hover:-translate-y-2"
                            )}
                        >
                            {template === "style-1" && (
                                <div className="absolute top-8 right-8 md:top-12 md:right-12 text-primary/5 group-hover:text-primary/10 transition-all duration-1000 transform group-hover:scale-110 group-hover:rotate-6">
                                    <Quote className="h-16 w-16 md:h-24 md:w-24 stroke-[1]" />
                                </div>
                            )}

                            <div className="relative z-10 flex-1 flex flex-col justify-between">
                                <div>
                                    <div className={cn(
                                        "flex gap-2 mb-6 md:mb-10",
                                        template === "style-2" && "mb-4"
                                    )}>
                                        {[...Array(item.rating || 5)].map((_, star) => (
                                            <motion.div
                                                key={star}
                                                initial={{ scale: 0 }}
                                                whileInView={{ scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.3 + (star * 0.1), type: "spring", stiffness: 200 }}
                                            >
                                                <Star className={cn(
                                                    "w-3.5 h-3.5 md:w-5 md:h-5 text-primary fill-primary",
                                                    template === "style-1" && "shadow-[0_0_20px_rgba(var(--primary),0.6)]"
                                                )} />
                                            </motion.div>
                                        ))}
                                    </div>
                                    <p className={cn(
                                        "tracking-tight transition-colors duration-700",
                                        template === "style-1" && "text-lg md:text-3xl font-light italic leading-[1.6] text-foreground/90 group-hover:text-foreground",
                                        template === "style-2" && "text-xl md:text-4xl font-serif italic font-light leading-relaxed text-foreground",
                                        template === "style-3" && "text-base md:text-xl font-bold leading-snug text-foreground/80 group-hover:text-foreground"
                                    )}>
                                        "{item.quote}"
                                    </p>
                                </div>

                                <div className={cn(
                                    "flex items-center gap-4 md:gap-6 relative",
                                    template === "style-1" && "mt-12 md:mt-20 pt-8 md:pt-12 border-t border-primary/5",
                                    template === "style-2" && "mt-8",
                                    template === "style-3" && "mt-10 pt-6 border-t border-primary/10"
                                )}>
                                    {template === "style-1" && (
                                        <div className="absolute top-0 left-0 h-px w-0 bg-gradient-to-r from-primary/40 to-transparent group-hover:w-full transition-all duration-1000" />
                                    )}

                                    <div className="relative shrink-0">
                                        {template === "style-1" && (
                                            <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                        )}
                                        {item.avatar ? (
                                            <img
                                                src={item.avatar}
                                                alt={item.author}
                                                className={cn(
                                                    "relative object-cover border border-primary/10 transition-all duration-700",
                                                    template === "style-1" && "h-12 w-12 md:h-20 md:w-20 rounded-[1rem] md:rounded-[2rem] shadow-2xl group-hover:scale-110 group-hover:border-primary/30",
                                                    template === "style-2" && "h-10 w-10 md:h-14 md:w-14 rounded-full",
                                                    template === "style-3" && "h-12 w-12 md:h-16 md:w-16 rounded-none border-2 border-primary"
                                                )}
                                            />
                                        ) : (
                                            <div className={cn(
                                                "relative flex items-center justify-center text-primary font-black shadow-2xl transition-all duration-700",
                                                template === "style-1" && "h-12 w-12 md:h-20 md:w-20 rounded-[1rem] md:rounded-[2rem] bg-card dark:bg-zinc-900 border border-primary/10 text-xl md:text-3xl group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110",
                                                template === "style-2" && "h-10 w-10 md:h-14 md:w-14 rounded-full bg-primary/10 text-lg md:text-xl",
                                                template === "style-3" && "h-12 w-12 md:h-16 md:w-16 rounded-none bg-primary text-primary-foreground text-xl md:text-2xl"
                                            )}>
                                                {item.author.charAt(0)}
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <p className={cn(
                                            "transition-colors duration-500",
                                            template === "style-1" && "font-black text-base md:text-xl tracking-tighter group-hover:text-primary",
                                            template === "style-2" && "font-serif text-lg md:text-xl font-medium",
                                            template === "style-3" && "font-black text-sm md:text-lg uppercase tracking-widest"
                                        )}>{item.author}</p>
                                        {item.role && (
                                            <div className="flex items-center gap-2 md:gap-3 mt-1 md:mt-2">
                                                {template !== "style-2" && <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />}
                                                <p className={cn(
                                                    "transition-colors",
                                                    template === "style-1" && "text-[8px] md:text-[10px] font-black uppercase tracking-[0.4em] text-muted-foreground/40 group-hover:text-muted-foreground",
                                                    template === "style-2" && "text-sm md:text-base italic text-muted-foreground",
                                                    template === "style-3" && "text-[10px] md:text-xs font-mono opacity-60"
                                                )}>
                                                    {item.role}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {template === "style-1" && (
                                <div className="absolute inset-0 opacity-[0.03] pointer-events-none rounded-[2.5rem] md:rounded-[4rem] group-hover:opacity-[0.05] transition-opacity duration-1000"
                                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "24px 24px" }}
                                />
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Footer Accent */}
                {template !== "style-2" && (
                    <div className="mt-16 md:mt-24 flex justify-center">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className={cn(
                                "flex items-center gap-3 py-3 px-8 transition-all",
                                template === "style-1" && "rounded-full bg-primary/5 border border-primary/10",
                                template === "style-3" && "border-2 border-primary bg-primary text-primary-foreground"
                            )}
                        >
                            <Sparkles className={cn(
                                "h-3 w-3 animate-pulse",
                                template === "style-1" ? "text-primary" : "text-primary-foreground"
                            )} />
                            <span className={cn(
                                "text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]",
                                template === "style-1" ? "text-muted-foreground/60" : "text-primary-foreground"
                            )}>Trusted by World Classes</span>
                        </motion.div>
                    </div>
                )}
            </div>
        </SectionLayout>
    );
}
