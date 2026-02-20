import { useState } from "react";
import { Plus, HelpCircle, ArrowRight, CornerDownRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLayout } from "./SectionLayout";

interface FAQItem { question: string; answer: string; }
interface FAQSectionContent {
    heading?: string;
    subheading?: string;
    items?: FAQItem[];
    allowMultiple?: boolean;
    template?: string;
}

export function FAQSection({ content }: { content: FAQSectionContent }) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set([0]));
    const items = content.items || [];
    const template = content.template || "style-1";

    const toggle = (i: number) => {
        setOpenItems(prev => {
            const next = new Set(content.allowMultiple ? prev : new Set<number>());
            if (prev.has(i)) next.delete(i); else next.add(i);
            return next;
        });
    };

    if (template === "style-4") {
        // STYLE 4: Swiss Grid FAQ (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border font-mono relative">
                <div className="absolute top-0 right-0 p-2 text-[10px] uppercase tracking-widest border-b border-l border-border opacity-50 z-10 hidden md:block">
                    KNOWLEDGE_BASE_V1.0
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
                    {/* Header Side */}
                    <div className="lg:col-span-4 p-12 md:p-20 bg-muted/5 flex flex-col justify-between">
                        <div>
                            <div className="text-[10px] bg-foreground text-background inline-block px-2 py-1 uppercase tracking-widest font-bold mb-8">
                                FAQ Index
                            </div>
                            {content.heading && (
                                <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8">
                                    {content.heading || "FAQ"}
                                </h2>
                            )}
                            {content.subheading && (
                                <p className="text-lg text-muted-foreground font-sans border-l-2 border-primary/20 pl-4 py-2 max-w-sm">
                                    {content.subheading}
                                </p>
                            )}
                        </div>
                        <div className="hidden lg:block">
                            <ArrowRight className="w-12 h-12 opacity-10" />
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="lg:col-span-8">
                        <div className="divide-y divide-border">
                            {items.map((item, i) => {
                                const isOpen = openItems.has(i);
                                return (
                                    <div key={i} className="group bg-background transition-colors hover:bg-muted/5">
                                        <button
                                            onClick={() => toggle(i)}
                                            className="w-full text-left p-8 md:p-12 flex items-start gap-8 relative overflow-hidden"
                                        >
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary scale-y-0 group-hover:scale-y-100 transition-transform origin-top duration-300" />

                                            <span className="hidden md:block text-xs font-bold uppercase tracking-widest text-muted-foreground/50 mt-2 font-mono group-hover:text-foreground transition-colors">
                                                {(i + 1).toString().padStart(2, '0')} //
                                            </span>

                                            <div className="flex-1 pr-12">
                                                <h3 className={cn(
                                                    "text-xl md:text-2xl font-bold uppercase tracking-tight transition-all duration-300",
                                                    isOpen ? "text-primary translate-x-2" : "text-foreground group-hover:translate-x-2"
                                                )}>
                                                    {item.question}
                                                </h3>

                                                <div
                                                    className={cn(
                                                        "grid transition-[grid-template-rows] duration-500 ease-out",
                                                        isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                                                    )}
                                                >
                                                    <div className="overflow-hidden">
                                                        <p className="text-lg text-muted-foreground font-sans leading-relaxed max-w-3xl">
                                                            {item.answer}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className={cn(
                                                "absolute right-8 top-12 w-8 h-8 flex items-center justify-center transition-all duration-300 border border-current",
                                                isOpen ? "rotate-45 bg-foreground text-background border-foreground" : "text-muted-foreground group-hover:text-foreground"
                                            )}>
                                                <Plus className="w-4 h-4" />
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic FAQ (High Fidelity)
        return (
            <SectionLayout width="container" padding="lg">
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-3xl mx-auto relative z-10">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            className="inline-block p-4 rounded-full bg-indigo-50 dark:bg-zinc-800 text-indigo-500 mb-8"
                        >
                            <HelpCircle className="w-8 h-8" />
                        </motion.div>

                        {content.heading && (
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 drop-shadow-sm">
                                {content.heading || "FAQ"}
                            </h2>
                        )}
                        {content.subheading && (
                            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                                {content.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className="max-w-4xl mx-auto flex flex-col gap-6 relative z-10">
                    {/* Organic Background Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none opacity-40 dark:opacity-10">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-200 dark:bg-sky-900 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
                        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-200 dark:bg-purple-900 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-500" />
                    </div>

                    {items.map((item, i) => {
                        const isOpen = openItems.has(i);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "group rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 border border-white/50 dark:border-white/5 backdrop-blur-sm",
                                    isOpen
                                        ? "bg-white/90 dark:bg-zinc-800/90 shadow-2xl shadow-indigo-500/10 scale-[1.02]"
                                        : "bg-white/40 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-800/60 shadow-sm hover:shadow-lg cursor-pointer"
                                )}
                                onClick={() => !isOpen && toggle(i)}
                            >
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggle(i); }}
                                    className="w-full flex items-center justify-between gap-6 text-left"
                                >
                                    <h3 className={cn(
                                        "text-xl md:text-2xl font-bold tracking-tight transition-colors",
                                        isOpen ? "text-primary" : "text-foreground"
                                    )}>
                                        {item.question}
                                    </h3>
                                    <div className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 shadow-sm",
                                        isOpen
                                            ? "bg-primary text-primary-foreground rotate-180"
                                            : "bg-white dark:bg-zinc-700 text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                                    )}>
                                        <CornerDownRight className={cn("w-5 h-5 transition-transform", isOpen ? "rotate-[-135deg]" : "rotate-0")} />
                                    </div>
                                </button>

                                <div
                                    className={cn(
                                        "grid transition-[grid-template-rows] duration-500 ease-out",
                                        isOpen ? "grid-rows-[1fr] opacity-100 mt-6" : "grid-rows-[0fr] opacity-0 mt-0"
                                    )}
                                >
                                    <div className="overflow-hidden">
                                        <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-6 opacity-50" />
                                        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "narrow"}
            align="center"
            padding="lg"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full">
                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-24 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {template === "style-1" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="inline-flex items-center gap-3 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-primary/5 border border-primary/10 text-primary mb-6 md:mb-10"
                            >
                                <HelpCircle className="h-3 w-3 md:h-4 md:w-4" />
                                <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Inquiry</span>
                            </motion.div>
                        )}

                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "mb-6 md:mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter",
                                    template === "style-2" && "text-3xl sm:text-4xl md:text-5xl font-serif font-light tracking-tight",
                                    template === "style-3" && "text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.1em]",
                                    "break-words"
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
                                transition={{ delay: 0.1 }}
                                className={cn(
                                    "leading-relaxed max-w-2xl",
                                    template === "style-3" ? "mr-auto" : "mx-auto",
                                    template === "style-1" && "text-lg md:text-xl text-muted-foreground font-light",
                                    template === "style-2" && "text-base md:text-lg text-muted-foreground font-serif italic py-4 border-y border-primary/10",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "w-full relative z-10",
                    template === "style-1" && "space-y-6 md:space-y-8",
                    template === "style-2" && "space-y-0 border-t border-primary/10",
                    template === "style-3" && "grid grid-cols-1 md:grid-cols-2 gap-4"
                )}>
                    {items.map((item, i) => {
                        const isOpen = openItems.has(i);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={cn(
                                    "group",
                                    template === "style-1" && "rounded-3xl border border-primary/10 bg-card/40 dark:bg-card/20 backdrop-blur-sm overflow-hidden hover:border-primary/30 transition-colors",
                                    template === "style-2" && "border-b border-primary/10",
                                    template === "style-3" && cn("border-2 border-primary/10 bg-card transition-all hover:border-primary hover:shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]", isOpen && "border-primary shadow-[4px_4px_0px_0px_rgba(var(--primary),1)]")
                                )}
                            >
                                <button
                                    onClick={() => toggle(i)}
                                    className={cn(
                                        "w-full flex items-start text-left focus:outline-none transition-all duration-300",
                                        template === "style-1" && "p-6 md:p-8 gap-6",
                                        template === "style-2" && "py-6 gap-4",
                                        template === "style-3" && "p-6 gap-4"
                                    )}
                                >
                                    {template === "style-1" && (
                                        <div className={cn(
                                            "mt-1 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300",
                                            isOpen ? "bg-primary text-primary-foreground rotate-90" : "bg-primary/5 text-primary group-hover:bg-primary/10"
                                        )}>
                                            <Plus className="w-4 h-4 md:w-5 md:h-5" />
                                        </div>
                                    )}

                                    {template === "style-3" && (
                                        <div className="mt-1">
                                            <CornerDownRight className={cn(
                                                "w-5 h-5 transition-colors",
                                                isOpen ? "text-primary" : "text-muted-foreground/40"
                                            )} />
                                        </div>
                                    )}

                                    <div className="flex-1">
                                        <span className={cn(
                                            "block pr-4 transition-colors duration-300",
                                            template === "style-1" && "text-lg md:text-2xl font-bold tracking-tight",
                                            template === "style-2" && "text-xl md:text-2xl font-serif font-medium",
                                            template === "style-3" && "text-base md:text-lg font-bold uppercase tracking-wide"
                                        )}>
                                            {item.question}
                                        </span>

                                        <AnimatePresence>
                                            {isOpen && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.3, ease: "circOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className={cn(
                                                        "pt-4 md:pt-6 text-muted-foreground leading-relaxed",
                                                        template === "style-1" && "text-base md:text-lg",
                                                        template === "style-2" && "font-serif italic text-lg",
                                                        template === "style-3" && "font-mono text-sm opacity-80"
                                                    )}>
                                                        {item.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {template === "style-2" && (
                                        <div className={cn(
                                            "mt-1 transition-transform duration-300",
                                            isOpen ? "rotate-45 text-primary" : "text-muted-foreground"
                                        )}>
                                            <Plus className="w-6 h-6" />
                                        </div>
                                    )}
                                </button>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionLayout>
    );
}
