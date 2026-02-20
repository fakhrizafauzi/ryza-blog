import { useState } from "react";
import { Plus, Minus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLayout } from "./SectionLayout";

interface AccordionItem { title: string; content: string; }
interface AccordionSectionContent {
    heading?: string;
    subheading?: string;
    items?: AccordionItem[];
    allowMultiple?: boolean;
    template?: string;
}

export function AccordionSection({ content }: { content: AccordionSectionContent }) {
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());
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
        // STYLE 4: Swiss Grid Accordion
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-y border-border">
                <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-border">
                    {/* Header Side */}
                    <div className="lg:col-span-1 p-8 md:p-20 bg-muted/5 flex flex-col justify-between">
                        <div>
                            {content.heading && (
                                <h2 className="text-3xl md:text-7xl font-bold tracking-tighter text-foreground uppercase leading-[0.85] mb-6 break-words">
                                    {content.heading}
                                </h2>
                            )}
                            {content.subheading && (
                                <p className="text-lg text-muted-foreground font-mono max-w-sm">
                                    {content.subheading}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Content Side */}
                    <div className="lg:col-span-2 divide-y divide-border">
                        {items.map((item, i) => {
                            const isOpen = openItems.has(i);
                            return (
                                <div key={i} className="group">
                                    <button
                                        onClick={() => toggle(i)}
                                        className="w-full text-left p-6 md:p-12 flex items-start justify-between gap-4 md:gap-8 hover:bg-muted/5 transition-colors"
                                    >
                                        <div className="flex items-start gap-4 md:gap-6">
                                            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground mt-2">
                                                {(i + 1).toString().padStart(2, '0')}
                                            </span>
                                            <h3 className={cn(
                                                "text-lg md:text-3xl font-bold uppercase tracking-tight transition-colors duration-300",
                                                isOpen ? "text-primary" : "text-foreground group-hover:text-primary/70"
                                            )}>
                                                {item.title}
                                            </h3>
                                        </div>
                                        <div className="shrink-0 transition-transform duration-300">
                                            {isOpen ? <Minus className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                        </div>
                                    </button>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="px-6 md:px-12 pb-8 md:pb-12 ml-8 md:ml-20 max-w-2xl">
                                                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Accordion
        return (
            <SectionLayout width="container" padding="lg">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    {content.heading && (
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 break-words">
                            {content.heading}
                        </h2>
                    )}
                    {content.subheading && (
                        <p className="text-xl text-muted-foreground">
                            {content.subheading}
                        </p>
                    )}
                </div>

                <div className="max-w-3xl mx-auto space-y-4">
                    {items.map((item, i) => {
                        const isOpen = openItems.has(i);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <button
                                    onClick={() => toggle(i)}
                                    className={cn(
                                        "w-full text-left bg-white dark:bg-zinc-800 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 transition-all duration-300 border border-transparent",
                                        isOpen ? "shadow-xl scale-[1.02] border-primary/10" : "hover:shadow-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/80"
                                    )}
                                >
                                    <div className="flex justify-between items-center gap-4 md:gap-6">
                                        <h3 className={cn(
                                            "text-lg md:text-xl font-bold transition-colors pr-8",
                                            isOpen ? "text-primary" : "text-foreground"
                                        )}>
                                            {item.title}
                                        </h3>
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                                            isOpen ? "bg-primary text-primary-foreground rotate-180" : "bg-primary/10 text-primary"
                                        )}>
                                            <ChevronDown className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pt-6 mt-4 border-t border-border">
                                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                                        {item.content}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </button>
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
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative">
                {/* Background Decor - Style 1 only */}
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-24 -top-24 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -right-24 bottom-24 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-24 max-w-3xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-4xl md:text-7xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl md:text-5xl font-serif font-light tracking-tight italic",
                                    template === "style-3" && "text-4xl md:text-6xl font-black uppercase tracking-tighter",
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
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "leading-relaxed transition-all duration-700",
                                    template === "style-1" && "text-xl text-muted-foreground font-light",
                                    template === "style-2" && "text-lg md:text-xl text-muted-foreground font-serif italic py-6 border-y border-primary/10",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "space-y-4 md:space-y-6",
                    template === "style-2" && "space-y-0"
                )}>
                    {items.map((item, i) => {
                        const isOpen = openItems.has(i);
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "group relative transition-all duration-700",
                                    template === "style-1" && (isOpen ? "scale-[1.02]" : "hover:scale-[1.01]")
                                )}
                            >
                                <button
                                    onClick={() => toggle(i)}
                                    className={cn(
                                        "w-full flex items-center justify-between text-left focus:outline-none transition-all duration-500",
                                        template === "style-1" && "p-6 md:p-8 rounded-3xl bg-card/40 dark:bg-card/20 backdrop-blur-sm border border-primary/10 hover:border-primary/30",
                                        template === "style-2" && "py-6 border-b border-primary/10 hover:pl-4",
                                        template === "style-3" && "p-6 border-2 border-primary/10 bg-card hover:border-primary hover:shadow-[4px_4px_0_0_rgba(var(--primary),1)]",
                                        template === "style-3" && isOpen && "border-primary shadow-[4px_4px_0_0_rgba(var(--primary),1)]"
                                    )}
                                >
                                    <span className={cn(
                                        "block pr-4 transition-colors duration-300",
                                        template === "style-1" && "text-xl md:text-2xl font-bold tracking-tight",
                                        template === "style-2" && "text-xl md:text-2xl font-serif font-medium",
                                        template === "style-3" && "text-base md:text-lg font-bold uppercase tracking-wide"
                                    )}>
                                        {item.title}
                                    </span>

                                    <div className={cn(
                                        "shrink-0 transition-transform duration-500",
                                        template === "style-1" && (isOpen ? "rotate-45 text-primary" : "text-muted-foreground"),
                                        template === "style-2" && (isOpen ? "rotate-180 text-primary" : "text-muted-foreground"),
                                        template === "style-3" && (isOpen ? "rotate-180" : "")
                                    )}>
                                        {template === "style-2" ? <ChevronDown className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                    </div>
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className={cn(
                                                "rounded-b-3xl text-muted-foreground leading-relaxed",
                                                template === "style-1" && "px-6 pb-6 md:px-8 md:pb-8 pt-0 bg-card/40 dark:bg-card/20 backdrop-blur-sm border-x border-b border-primary/10 text-lg mx-[1px]",
                                                template === "style-2" && "py-4 font-serif italic text-lg pl-4",
                                                template === "style-3" && "p-6 pt-0 border-x-2 border-b-2 border-primary bg-card shadow-[4px_4px_0_0_rgba(var(--primary),1)] text-sm font-mono mt-[-2px] mx-[2px]"
                                            )}>
                                                {item.content}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </SectionLayout>
    );
}
