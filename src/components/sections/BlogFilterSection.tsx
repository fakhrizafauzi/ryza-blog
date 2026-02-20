import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { ChevronDown, Filter } from "lucide-react";

interface BlogFilterSectionContent {
    heading?: string;
    showCategories?: boolean;
    showTags?: boolean;
    showSort?: boolean;
    featuredLabel?: string;
    template?: string;
}

const CATEGORIES = ["All", "Technology", "Design", "Business", "Lifestyle"];

export function BlogFilterSection({ content }: { content: BlogFilterSectionContent }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentCategory = searchParams.get("category") || "All";
    const currentSort = searchParams.get("sort") || "latest";
    const template = content.template || "style-1";

    const setCategory = (cat: string) => {
        const next = new URLSearchParams(searchParams);
        if (cat === "All") {
            next.delete("category");
        } else {
            next.set("category", cat);
        }
        setSearchParams(next);
    };

    const setSort = (sort: string) => {
        const next = new URLSearchParams(searchParams);
        next.set("sort", sort);
        setSearchParams(next);
    };

    return (
        <div className={cn(
            "sticky z-50 py-4 mb-12 transition-all duration-700",
            template === "style-1" && "top-[72px]",
            template === "style-2" && "top-0 bg-background/80 backdrop-blur-md border-b border-primary/5",
            template === "style-3" && "top-[80px] bg-card border-y-4 border-primary"
        )}>
            <SectionLayout
                width={template === "style-2" ? "readable" : "wide"}
                padding="none"
            >
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "relative flex flex-wrap items-center gap-4 transition-all duration-700",
                        template === "style-1" && "p-2 rounded-[2rem] bg-card/60 backdrop-blur-3xl border border-primary/10 shadow-2xl px-6 md:px-10",
                        template === "style-2" && "p-0 rounded-none bg-transparent border-0 px-4",
                        template === "style-3" && "p-4 rounded-none bg-background border-2 border-primary shadow-[6px_6px_0_0_black] dark:shadow-[6px_6px_0_0_white] mx-4"
                    )}
                >
                    <div className={cn(
                        "flex items-center gap-3 py-4 shrink-0",
                        template === "style-1" && "pr-6 border-r border-primary/10",
                        template === "style-2" && "pr-4 border-r border-primary/5",
                        template === "style-3" && "pr-4 border-r-2 border-primary font-mono"
                    )}>
                        <Filter className={cn(
                            "h-4 w-4 text-primary",
                            template === "style-3" && "stroke-[3]"
                        )} />
                        <span className={cn(
                            "text-xs font-black uppercase tracking-widest",
                            template === "style-2" ? "font-serif italic tracking-normal text-muted-foreground/60" : "text-muted-foreground"
                        )}>Filter</span>
                    </div>

                    {content.showCategories && (
                        <div className="flex gap-1 overflow-x-auto scrollbar-hide py-2 flex-1">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setCategory(cat)}
                                    className={cn(
                                        "relative px-6 py-2.5 transition-all duration-500 whitespace-nowrap text-xs",
                                        template === "style-1" && cn(
                                            "rounded-xl font-bold tracking-tight",
                                            currentCategory === cat ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                        ),
                                        template === "style-2" && cn(
                                            "rounded-none font-serif italic",
                                            currentCategory === cat ? "text-primary border-b border-primary" : "text-muted-foreground/60 hover:text-primary"
                                        ),
                                        template === "style-3" && cn(
                                            "rounded-none font-mono font-black uppercase tracking-widest",
                                            currentCategory === cat ? "bg-primary text-primary-foreground" : "text-primary hover:bg-primary/10"
                                        )
                                    )}
                                >
                                    {template === "style-1" && currentCategory === cat && (
                                        <motion.div
                                            layoutId="activeFilter"
                                            className="absolute inset-0 bg-primary rounded-xl shadow-lg shadow-primary/20"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <span className="relative z-10">{cat}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    {content.showSort && (
                        <div className={cn(
                            "relative group/sort py-4 shrink-0",
                            template === "style-1" && "pl-6 border-l border-primary/10",
                            template === "style-2" && "pl-4 border-l border-primary/5",
                            template === "style-3" && "pl-4 border-l-2 border-primary"
                        )}>
                            <div className="flex items-center gap-3">
                                <span className={cn(
                                    "text-xs font-black uppercase tracking-widest text-muted-foreground",
                                    template === "style-2" && "font-serif italic tracking-normal text-muted-foreground/60"
                                )}>Sort</span>
                                <div className="relative">
                                    <select
                                        value={currentSort}
                                        onChange={(e) => setSort(e.target.value)}
                                        className={cn(
                                            "appearance-none bg-transparent pl-4 pr-10 py-1 text-sm font-bold focus:outline-none cursor-pointer",
                                            template === "style-2" && "font-serif italic",
                                            template === "style-3" && "font-mono font-black uppercase"
                                        )}
                                    >
                                        <option value="latest">Latest</option>
                                        <option value="popular">Popular</option>
                                        <option value="oldest">Oldest</option>
                                    </select>
                                    <ChevronDown className={cn(
                                        "absolute right-0 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none opacity-50",
                                        template === "style-3" && "stroke-[3] opacity-100"
                                    )} />
                                </div>
                            </div>
                        </div>
                    )}
                </motion.div>
            </SectionLayout>
        </div>
    );
}
