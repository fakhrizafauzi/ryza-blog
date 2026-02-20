import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Calendar, Clock, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostHeaderContent {
    showDate?: boolean;
    showAuthor?: boolean;
    showCategory?: boolean;
    showReadingTime?: boolean;
    template?: string;
    // These can be passed from the section content if editors want to override,
    // though usually they would come from post context.
    titleOverride?: string;
    excerptOverride?: string;
}

export function BlogPostHeader({ content }: { content: BlogPostHeaderContent }) {
    const template = content.template || "style-1";

    // In a real app, we might get these from a PostContext. 
    // For now, these are illustrative or can be fed from content.
    const title = content.titleOverride || "The Future of Digital Architecture";
    const excerpt = content.excerptOverride || "Exploring the intersection of performance, aesthetics, and user experience in modern web development.";
    const date = "Oct 24, 2023";
    const author = "Alex Rivers";
    const category = "Architecture";
    const readingTime = "8 min read";

    return (
        <SectionLayout width="wide" padding="lg" align="center" background={template === "style-3" ? "muted" : "none"}>
            <div className={cn(
                "max-w-4xl mx-auto px-4",
                template === "style-3" ? "text-left border-l-4 border-primary pl-8" : "text-center"
            )}>
                {content.showCategory && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={cn(
                            "mb-6 flex items-center gap-2",
                            template !== "style-3" && "justify-center"
                        )}
                    >
                        <span className={cn(
                            "px-3 py-1 text-xs font-bold uppercase tracking-widest rounded-full bg-primary/10 text-primary",
                            template === "style-2" && "font-serif italic capitalize tracking-normal",
                            template === "style-3" && "rounded-none bg-primary text-primary-foreground"
                        )}>
                            {category}
                        </span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                        "mb-8 leading-tight",
                        template === "style-1" && "text-5xl md:text-7xl font-black tracking-tight",
                        template === "style-2" && "text-4xl md:text-6xl font-serif font-light tracking-tight",
                        template === "style-3" && "text-5xl md:text-8xl font-black uppercase tracking-tighter"
                    )}
                >
                    {title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className={cn(
                        "text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12",
                        template === "style-2" && "font-serif italic",
                        template === "style-3" && "font-mono uppercase text-sm tracking-widest opacity-70"
                    )}
                >
                    {excerpt}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className={cn(
                        "flex flex-wrap gap-6 text-sm text-muted-foreground",
                        template !== "style-3" && "justify-center"
                    )}
                >
                    {content.showAuthor && (
                        <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-primary" />
                            <span className="font-medium">{author}</span>
                        </div>
                    )}
                    {content.showDate && (
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{date}</span>
                        </div>
                    )}
                    {content.showReadingTime && (
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-primary" />
                            <span>{readingTime}</span>
                        </div>
                    )}
                </motion.div>
            </div>

            {/* Decorative element for Style 1 */}
            {template === "style-1" && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10" />
            )}
        </SectionLayout>
    );
}
