import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { List, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface BlogTOCContent {
    title?: string;
    collapsible?: boolean;
    template?: string;
}

export function BlogTOC({ content }: { content: BlogTOCContent }) {
    const template = content.template || "style-1";
    const [isOpen, setIsOpen] = useState(true);

    // Mock items - in a real app, these would be parsed from other sections
    const items = [
        { id: "intro", label: "Introduction", level: 1 },
        { id: "core-concepts", label: "Core Architecture Concepts", level: 1 },
        { id: "performance", label: "Performance Optimizations", level: 2 },
        { id: "styling", label: "Modern Styling Patterns", level: 2 },
        { id: "summary", label: "Summary & Key Takeaways", level: 1 },
    ];

    const title = content.title || "In this article";

    return (
        <SectionLayout width="readable" padding="md">
            <div className={cn(
                "overflow-hidden transition-all duration-700",
                template === "style-1" && "bg-card/30 backdrop-blur-2xl border border-primary/10 rounded-[2rem] p-8",
                template === "style-2" && "border-l-2 border-primary/20 pl-8 p-4 font-serif",
                template === "style-3" && "bg-muted border-4 border-primary rounded-none p-6 font-mono shadow-[10px_10px_0_0_black] dark:shadow-[10px_10px_0_0_white]"
            )}>
                <button
                    onClick={() => content.collapsible && setIsOpen(!isOpen)}
                    className={cn(
                        "flex items-center justify-between w-full mb-6",
                        !content.collapsible && "cursor-default"
                    )}
                >
                    <div className="flex items-center gap-3">
                        <List className="h-5 w-5 text-primary" />
                        <h3 className={cn(
                            "text-lg font-bold tracking-tight",
                            template === "style-3" && "uppercase tracking-widest"
                        )}>
                            {title}
                        </h3>
                    </div>
                    {content.collapsible && (
                        <ChevronDown className={cn(
                            "h-5 w-5 text-muted-foreground transition-transform duration-500",
                            isOpen ? "rotate-180" : ""
                        )} />
                    )}
                </button>

                {isOpen && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        className="space-y-4"
                    >
                        {items.map((item) => (
                            <li
                                key={item.id}
                                style={{ paddingLeft: `${(item.level - 1) * 1.5}rem` }}
                            >
                                <a
                                    href={`#${item.id}`}
                                    className={cn(
                                        "flex items-center gap-3 group transition-all duration-300",
                                        item.level === 1 ? "font-bold text-sm" : "text-xs text-muted-foreground"
                                    )}
                                >
                                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
                                    <span className="group-hover:text-primary group-hover:translate-x-1 transition-all">
                                        {item.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </div>
        </SectionLayout>
    );
}
