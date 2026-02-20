import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { Calendar, Clock, User, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PostHeaderEditorialContent {
    heading?: string;
    author?: string;
    date?: string;
    category?: string;
    image?: string;
    template?: string;
}

export function PostHeaderEditorial({ content }: { content: PostHeaderEditorialContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="full" padding="none" variant="post">
            <div className={cn(
                "relative min-h-[70vh] flex flex-col justify-end overflow-hidden",
                template === "style-2" && "min-h-[60vh] justify-center text-center",
                template === "style-3" && "min-h-screen bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-white"
            )}>
                {/* Background Image / Overlay */}
                {content.image && (
                    <div className="absolute inset-0 z-0">
                        <img
                            src={content.image}
                            alt={content.heading}
                            className={cn(
                                "w-full h-full object-cover",
                                template === "style-3" ? "opacity-30 dark:opacity-40 saturate-0" : "opacity-100"
                            )}
                        />
                        <div className={cn(
                            "absolute inset-0",
                            template === "style-1" && "bg-gradient-to-t from-background via-background/60 to-transparent",
                            template === "style-2" && "bg-background/80",
                            template === "style-3" && "bg-zinc-50/80 dark:bg-zinc-900/80"
                        )} />
                    </div>
                )}

                <div className="container max-w-5xl relative z-10 py-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium mb-12 hover:text-primary transition-colors opacity-60">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Publication
                        </Link>

                        {content.category && (
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-black uppercase tracking-widest mb-6">
                                {content.category}
                            </span>
                        )}

                        <h1 className={cn(
                            "font-black tracking-tighter leading-[0.9] mb-8 uppercase",
                            template === "style-1" && "text-6xl md:text-8xl lg:text-9xl",
                            template === "style-2" && "text-5xl md:text-7xl serif italic normal-case",
                            template === "style-3" && "text-6xl md:text-8xl tracking-widest"
                        )}>
                            {content.heading}
                        </h1>

                        <div className={cn(
                            "flex flex-wrap items-center gap-8 text-sm font-medium opacity-60",
                            template === "style-2" && "justify-center"
                        )}>
                            {content.author && (
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4" />
                                    <span>BY {content.author.toUpperCase()}</span>
                                </div>
                            )}
                            {content.date && (
                                <div className="flex items-center gap-2 uppercase">
                                    <Calendar className="h-4 w-4" />
                                    <span>{content.date}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 uppercase">
                                <Clock className="h-4 w-4" />
                                <span>6 MIN READ</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionLayout>
    );
}
