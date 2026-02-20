import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Sparkles } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { motion } from "framer-motion";

interface BlogHeroSectionContent {
    heading?: string;
    subheading?: string;
    showSearch?: boolean;
    backgroundImage?: string;
    template?: string;
}

export function BlogHeroSection({ content }: { content: BlogHeroSectionContent }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const template = content.template || "style-1";

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val) {
            setSearchParams({ q: val });
        } else {
            const next = new URLSearchParams(searchParams);
            next.delete("q");
            setSearchParams(next);
        }
    };

    return (
        <SectionLayout
            width="full"
            padding="none"
            className={cn(
                "relative flex items-center justify-center overflow-hidden transition-all duration-1000",
                template === "style-1" && "min-h-[70vh]",
                template === "style-2" && "min-h-[50vh] bg-background border-b border-primary/5",
                template === "style-3" && "min-h-[80vh] bg-card border-b-8 border-primary"
            )}
        >
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {content.backgroundImage && template !== "style-2" ? (
                    <>
                        <motion.img
                            initial={{ scale: 1.1 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 2, ease: "easeOut" }}
                            src={content.backgroundImage}
                            alt="Background"
                            className={cn(
                                "w-full h-full object-cover",
                                template === "style-1" ? "grayscale-[0.1] dark:grayscale-[0.3]" : "grayscale brightness-100 dark:brightness-50"
                            )}
                        />
                        <div className={cn(
                            "absolute inset-0",
                            template === "style-1"
                                ? "bg-gradient-to-b from-white/80 via-white/50 to-background dark:from-zinc-950/80 dark:via-zinc-950/40 dark:to-background"
                                : "bg-white/90 dark:bg-black/60"
                        )} />
                    </>
                ) : (
                    template === "style-1" && <div className="w-full h-full bg-muted/30" />
                )}

                {/* Style 1 Generative Patterns */}
                {template === "style-1" && (
                    <div className="absolute inset-0 opacity-20 pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(var(--primary), 0.1) 1px, transparent 0)', backgroundSize: '40px 40px' }}
                    />
                )}

                {/* Style 3 Decor */}
                {template === "style-3" && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: 'linear-gradient(rgba(var(--primary), 1) 2px, transparent 2px), linear-gradient(90deg, rgba(var(--primary), 1) 2px, transparent 2px)', backgroundSize: '60px 60px' }}
                    />
                )}
            </div>

            <div className={cn(
                "relative z-10 w-full max-w-7xl mx-auto px-6 transition-all duration-1000",
                template === "style-2" ? "py-20" : "py-24 md:py-40"
            )}>
                <div className={cn(
                    "max-w-4xl",
                    template === "style-2" && "mx-auto text-center"
                )}>
                    <motion.div
                        initial={{ opacity: 0, x: template === "style-2" ? 0 : -30, y: template === "style-2" ? 20 : 0 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="space-y-8"
                    >
                        <div className={cn(
                            "flex items-center gap-4 text-primary",
                            template === "style-2" && "justify-center",
                            template === "style-3" && "font-mono"
                        )}>
                            <Sparkles className={cn("h-5 w-5", template === "style-1" && "animate-pulse")} />
                            <span className={cn(
                                "text-xs font-black uppercase tracking-[0.6em]",
                                template === "style-2" && "tracking-[0.8em] font-serif italic text-muted-foreground/60"
                            )}>Insights & Stories</span>
                        </div>

                        <h1 className={cn(
                            "font-black tracking-tighter leading-[0.8] transition-colors break-words",
                            template === "style-1" && "text-6xl md:text-9xl",
                            template === "style-2" && "text-5xl md:text-8xl font-serif font-light italic tracking-normal py-6 border-y border-primary/10",
                            template === "style-3" && "text-7xl md:text-[10rem] uppercase",
                            content.backgroundImage && template !== "style-2"
                                ? "text-zinc-900 dark:text-white"
                                : "text-foreground"
                        )}>
                            {content.heading || "Journal"}
                        </h1>

                        {content.subheading && (
                            <p className={cn(
                                "text-xl md:text-2xl font-light leading-relaxed max-w-2xl opacity-80",
                                template === "style-2" && "mx-auto text-lg italic",
                                content.backgroundImage && template !== "style-2"
                                    ? "text-zinc-700 dark:text-zinc-300"
                                    : "text-muted-foreground"
                            )}>
                                {content.subheading}
                            </p>
                        )}

                        {content.showSearch && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.3 }}
                                className={cn(
                                    "relative max-w-2xl mt-12 group",
                                    template === "style-2" && "mx-auto"
                                )}
                            >
                                {template === "style-1" && (
                                    <div className="absolute inset-x-0 -bottom-4 h-8 bg-primary/20 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700" />
                                )}

                                <div className="relative flex items-center">
                                    <div className={cn(
                                        "absolute left-6 transition-colors",
                                        template === "style-3" ? "group-focus-within:text-foreground" : "group-focus-within:text-primary",
                                        content.backgroundImage ? "text-zinc-500 dark:text-zinc-400" : "text-muted-foreground"
                                    )}>
                                        <Search className="h-6 w-6" />
                                    </div>
                                    <input
                                        type="search"
                                        placeholder="Search topics, wisdom, and lore..."
                                        value={query}
                                        onChange={handleSearch}
                                        className={cn(
                                            "w-full transition-all ring-offset-background placeholder:text-muted-foreground/50 focus:outline-none",
                                            template === "style-1" && "h-20 pl-16 pr-8 rounded-[2rem] border border-zinc-200 dark:border-white/10 bg-white/40 dark:bg-white/5 backdrop-blur-md text-zinc-900 dark:text-white focus:ring-2 focus:ring-primary/20 text-xl font-light shadow-2xl shadow-primary/5",
                                            template === "style-2" && "h-16 pl-16 pr-8 border-b border-primary/20 bg-transparent text-foreground focus:border-primary text-lg font-serif italic",
                                            template === "style-3" && "h-20 pl-16 pr-8 border-4 border-primary bg-background text-foreground shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] text-xl font-mono uppercase"
                                        )}
                                    />

                                    {/* Style 1 & 3 Decor */}
                                    {template === "style-1" && (
                                        <div className="absolute right-4 p-4 rounded-2xl bg-white/20 dark:bg-white/5 border border-white/20 dark:border-white/10 group-focus-within:border-primary/20 transition-all">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                        </div>
                                    )}
                                    {template === "style-3" && (
                                        <div className="absolute right-4 px-4 py-2 bg-primary text-primary-foreground font-mono text-xs font-black">
                                            GO
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Bottom Glow - Style 1 only */}
            {
                template === "style-1" && (
                    <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-background via-background/40 to-transparent z-20 pointer-events-none" />
                )
            }
        </SectionLayout >
    );

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Blog Hero
        return (
            <SectionLayout width="full" padding="none" className="min-h-[50vh] bg-background border-b border-border flex flex-col justify-center font-mono relative">
                <div className="absolute inset-x-0 top-10 h-px bg-border z-0" />
                <div className="absolute inset-y-0 left-10 w-px bg-border z-0 hidden lg:block" />

                <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-0 min-h-[50vh] relative z-10">
                    {/* Text Column */}
                    <div className="lg:col-span-8 p-12 lg:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-border relative bg-background/80 backdrop-blur-sm">
                        <div className="mb-8 flex items-center gap-4">
                            <div className="w-3 h-3 bg-primary" />
                            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">ARCHIVE_INDEX</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-8 break-words uppercase">
                            {content.heading}
                        </h1>
                        <div className="h-px w-32 bg-foreground mb-8" />
                        <p className="text-xl text-muted-foreground max-w-xl font-sans leading-relaxed">
                            {content.subheading}
                        </p>
                    </div>

                    {/* Search Column */}
                    <div className="lg:col-span-4 p-8 lg:p-12 bg-muted/5 flex flex-col justify-center items-center relative">
                        {content.showSearch && (
                            <div className="w-full max-w-xs space-y-4">
                                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex justify-between">
                                    <span>Query Database</span>
                                    <Search className="w-3 h-3" />
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={query}
                                        onChange={handleSearch}
                                        placeholder="KEYWORD..."
                                        className="w-full bg-background border-2 border-muted-foreground/30 focus:border-primary h-14 px-4 font-mono text-sm focus:outline-none transition-colors uppercase placeholder:normal-case"
                                    />
                                    <div className="absolute right-0 top-full mt-2 text-[10px] text-muted-foreground text-right opacity-0 group-focus-within:opacity-100 transition-opacity">
                                        PRESS ENTER TO SEARCH
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Blog Hero
        return (
            <SectionLayout width="container" padding="md" className="min-h-[60vh] flex flex-col items-center justify-center text-center my-8 md:my-16">
                <div className="w-full max-w-4xl mx-auto relative z-10 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-xl p-8 md:p-16 rounded-[4rem] border border-white/20 shadow-xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300 font-bold text-sm mb-10"
                    >
                        <Sparkles className="w-4 h-4" />
                        <span>Curated Stories</span>
                    </motion.div>

                    <h1 className="text-5xl md:text-8xl font-black tracking-tight text-foreground mb-8 break-words drop-shadow-sm">
                        {content.heading}
                    </h1>

                    <p className="text-xl md:text-2xl text-foreground/70 font-medium mb-12 max-w-2xl mx-auto text-balance leading-relaxed">
                        {content.subheading}
                    </p>

                    {content.showSearch && (
                        <div className="relative max-w-lg mx-auto">
                            <input
                                type="text"
                                value={query}
                                onChange={handleSearch}
                                placeholder="Find your inspiration..."
                                className="w-full h-16 pl-8 pr-16 rounded-[2rem] bg-white dark:bg-zinc-800 border-2 border-transparent focus:border-rose-300 dark:focus:border-rose-700 shadow-[0_8px_30px_rgb(0,0,0,0.06)] focus:shadow-[0_8px_30px_rgb(225,29,72,0.1)] text-lg transition-all outline-none"
                            />
                            <button className="absolute right-2 top-2 h-12 w-12 rounded-full bg-rose-500 text-white shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    )}
                </div>

                {/* Organic Background Blobs */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-200/40 dark:bg-rose-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-200/40 dark:bg-indigo-900/20 rounded-full blur-[120px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000" />
                    <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-4000" />
                </div>
            </SectionLayout>
        )
    }

    return null; // Fallback handled by top return if not style 4 or 5, but we need to restructure to avoid early return issue.
}
