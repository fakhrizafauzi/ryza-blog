import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { Layers } from "lucide-react";

interface TabItem { label: string; content: string; }
interface TabsSectionContent {
    heading?: string;
    subheading?: string;
    tabs?: TabItem[];
    template?: string;
}

export function TabsSection({ content }: { content: TabsSectionContent }) {
    const [active, setActive] = useState(0);
    const tabs = content.tabs || [];
    const template = content.template || "style-1";

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Tabs
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-y border-border">
                <style>{`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}</style>
                <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px] divide-x divide-border">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-1 border-b lg:border-b-0 border-border bg-muted/5 flex flex-row lg:flex-col overflow-x-auto no-scrollbar lg:overflow-visible">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={cn(
                                    "flex-shrink-0 lg:flex-shrink p-6 md:p-8 text-left transition-all duration-300 border-r lg:border-r-0 lg:border-b border-border hover:bg-background/50 focus:outline-none flex items-center justify-between group whitespace-nowrap lg:whitespace-normal",
                                    active === i ? "bg-background text-primary" : "text-muted-foreground"
                                )}
                            >
                                <span className={cn(
                                    "font-mono font-bold uppercase tracking-widest text-sm md:text-base mr-4 lg:mr-0",
                                    active === i ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                                )}>
                                    {tab.label}
                                </span>
                                {active === i && (
                                    <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-primary rounded-full hidden lg:block" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3 p-8 md:p-20 flex flex-col justify-center min-h-[400px]">
                        <div className="max-w-4xl">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={active}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.4, ease: "circOut" }}
                                >
                                    <h3 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 md:mb-8 leading-[0.9]">
                                        {tabs[active]?.label}
                                    </h3>
                                    <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed font-light">
                                        {tabs[active]?.content}
                                    </p>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Tabs
        return (
            <SectionLayout width="container" padding="lg">
                <div className="text-center mb-16">
                    {content.heading && (
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                            {content.heading}
                        </h2>
                    )}
                    {content.subheading && (
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {content.subheading}
                        </p>
                    )}
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Floating Pill Navigation */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-zinc-100 dark:bg-zinc-800/50 rounded-full w-fit mx-auto shadow-inner">
                        {tabs.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => setActive(i)}
                                className={cn(
                                    "relative px-6 py-3 rounded-full text-sm font-bold transition-colors z-10",
                                    active === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {active === i && (
                                    <motion.div
                                        layoutId="soft-tab-pill"
                                        className="absolute inset-0 bg-primary rounded-full -z-10 shadow-lg"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Card Content */}
                    <div className="relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ duration: 0.5 }}
                                className="bg-white dark:bg-zinc-900 border border-primary/5 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 shadow-2xl relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

                                <h3 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">{tabs[active]?.label}</h3>
                                <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                                    {tabs[active]?.content}
                                </p>
                            </motion.div>
                        </AnimatePresence>
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
                                className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary mb-10"
                            >
                                <Layers className="h-4 w-4" />
                                <span className="text-[10px] font-black uppercase tracking-[0.4em]">Modules</span>
                            </motion.div>
                        )}

                        {template === "style-2" && (
                            <div className="flex items-center gap-4 justify-center mb-8">
                                <div className="h-px w-12 bg-primary/20" />
                                <span className="font-serif italic text-primary">Capabilities</span>
                                <div className="h-px w-12 bg-primary/20" />
                            </div>
                        )}

                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className={cn(
                                    "mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-5xl md:text-7xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl md:text-5xl font-serif font-light tracking-tight italic",
                                    template === "style-3" && "text-4xl md:text-6xl font-black uppercase tracking-tighter"
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
                                    "leading-relaxed transition-all duration-700",
                                    template === "style-1" && "text-xl text-muted-foreground font-light max-w-2xl mx-auto",
                                    template === "style-2" && "text-lg md:text-xl text-muted-foreground font-serif italic py-6 border-y border-primary/10 max-w-2xl mx-auto",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "flex flex-col",
                    template === "style-3" ? "items-start" : "items-center"
                )}>
                    {/* Tab Switcher */}
                    <div className={cn(
                        "relative group mb-12 sm:mb-16",
                        template === "style-1" && "p-2 rounded-[3rem] bg-card/40 backdrop-blur-3xl border border-primary/10 shadow-2xl inline-flex",
                        template === "style-2" && "border-b border-primary/10 w-full flex justify-center",
                        template === "style-3" && "flex flex-wrap gap-4 w-full"
                    )}>
                        <div className={cn(
                            "relative z-10 flex",
                            template === "style-1" && "gap-2 p-1",
                            template === "style-2" && "gap-8 md:gap-16",
                            template === "style-3" && "flex-wrap gap-4"
                        )}>
                            {tabs.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    className={cn(
                                        "relative transition-all duration-500",
                                        template === "style-1" && "px-6 py-3 rounded-[2.5rem] text-sm font-bold uppercase tracking-widest",
                                        template === "style-2" && "pb-4 text-xl font-serif italic hover:text-primary",
                                        template === "style-3" && "px-6 py-3 border-2 border-primary/20 bg-background text-sm font-mono uppercase tracking-widest hover:border-primary hover:text-primary font-bold"
                                    )}
                                >
                                    {template === "style-1" && active === i && (
                                        <motion.div
                                            layoutId="activeTab"
                                            className="absolute inset-0 bg-primary rounded-[2.5rem] shadow-lg"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    {template === "style-3" && active === i && (
                                        <div className="absolute inset-0 bg-primary opacity-10" />
                                    )}

                                    <span className={cn(
                                        "relative z-10",
                                        template === "style-1" && (active === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"),
                                        template === "style-2" && (active === i ? "text-primary border-b-2 border-primary" : "text-muted-foreground"),
                                        template === "style-3" && (active === i ? "text-primary border-primary" : "text-muted-foreground")
                                    )}>
                                        {tab.label}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className={cn(
                        "w-full relative",
                        template === "style-3" && "border-l-4 border-primary pl-8 md:pl-12 py-4"
                    )}>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={active}
                                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "w-full",
                                    template === "style-1" && "bg-card/30 backdrop-blur-xl border border-primary/5 rounded-[3rem] p-8 md:p-16 text-center shadow-2xl",
                                    template === "style-2" && "text-center max-w-3xl mx-auto",
                                    template === "style-3" && "text-left"
                                )}
                            >
                                <h3 className={cn(
                                    "mb-6",
                                    template === "style-1" && "text-3xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60",
                                    template === "style-2" && "text-2xl md:text-4xl font-serif font-light italic",
                                    template === "style-3" && "text-2xl md:text-4xl font-black uppercase tracking-tight"
                                )}>
                                    {tabs[active]?.label}
                                </h3>
                                <div className={cn(
                                    "leading-relaxed",
                                    template === "style-1" && "text-lg md:text-xl text-muted-foreground",
                                    template === "style-2" && "text-lg md:text-xl text-muted-foreground font-serif",
                                    template === "style-3" && "text-base md:text-lg font-mono opacity-80"
                                )}>
                                    {tabs[active]?.content}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
