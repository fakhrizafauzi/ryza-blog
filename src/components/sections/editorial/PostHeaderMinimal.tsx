import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface PostHeaderMinimalContent {
    heading?: string;
    text?: string; // Excerpt
    category?: string;
    author?: string;
    date?: string;
    image?: string;
    backLink?: string;
    backLabel?: string;
    template?: string;
}

export function PostHeaderMinimal({ content }: { content: PostHeaderMinimalContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="lg" variant="post" background="none">
            <div className="flex flex-col gap-8">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Link
                        to={content.backLink || "/blog"}
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        {content.backLabel || "Back to Publication"}
                    </Link>
                </motion.div>

                {/* Meta & Title */}
                <div className="space-y-6">
                    {content.category && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                                {content.category}
                            </span>
                        </motion.div>
                    )}

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={cn(
                            "text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-foreground",
                            template === "style-2" && "font-serif font-light",
                        )}
                    >
                        {content.heading || "Post Title"}
                    </motion.h1>

                    {content.text && (
                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl"
                        >
                            {content.text}
                        </motion.p>
                    )}

                    {/* Author/Date Meta */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border/40 pt-6"
                    >
                        {content.author && (
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                <span className="font-medium text-foreground">{content.author}</span>
                            </div>
                        )}
                        {content.date && (
                            <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4" />
                                <span>{content.date}</span>
                            </div>
                        )}
                    </motion.div>
                </div>

                {/* Featured Image */}
                {content.image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
                        className="relative w-full aspect-[16/9] md:aspect-[21/9] mt-8 overflow-hidden rounded-2xl bg-muted"
                    >
                        <img
                            src={content.image}
                            alt={content.heading}
                            className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                        />
                    </motion.div>
                )}
            </div>
        </SectionLayout>
    );
}
