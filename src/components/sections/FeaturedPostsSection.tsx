import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { PostCard, PostCardSkeleton } from "@/components/blog/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface FeaturedPostsSectionContent {
    title?: string;
    subtitle?: string;
    showLink?: boolean;
    count?: number;
    template?: string;
}

export function FeaturedPostsSection({ content }: { content: FeaturedPostsSectionContent }) {
    const { title = "Latest Posts", subtitle = "From the blog", showLink = true, count = 3, template = "style-1" } = content || {};
    const { posts, loading } = usePosts({ pageSize: count });
    const featured = posts.slice(0, count);

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className={cn(
                "relative mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8",
                template === "style-3" && "md:flex-row-reverse"
            )}>
                <motion.div
                    initial={{ opacity: 0, x: template === "style-3" ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "space-y-4",
                        template === "style-3" && "text-right"
                    )}
                >
                    <div className={cn(
                        "flex items-center gap-3",
                        template === "style-1" && "text-primary",
                        template === "style-2" && "text-muted-foreground/60 font-serif italic",
                        template === "style-3" && "text-primary font-mono justify-end"
                    )}>
                        {template !== "style-2" && <Sparkles className="h-4 w-4" />}
                        <span className={cn(
                            "text-[10px] uppercase",
                            template === "style-1" && "font-black tracking-[0.4em]",
                            template === "style-2" && "tracking-widest",
                            template === "style-3" && "font-bold tracking-[0.2em]"
                        )}>{subtitle}</span>
                    </div>
                    <h2 className={cn(
                        "leading-none tracking-tighter break-words",
                        template === "style-1" && "text-4xl md:text-6xl font-black",
                        template === "style-2" && "text-4xl md:text-5xl font-serif font-light italic tracking-tight",
                        template === "style-3" && "text-4xl md:text-7xl font-black uppercase"
                    )}>
                        {title}
                    </h2>
                </motion.div>

                {showLink && (
                    <motion.div
                        initial={{ opacity: 0, x: template === "style-3" ? -20 : 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link
                            to="/blog"
                            className={cn(
                                "group flex items-center gap-4 transition-all active:scale-95",
                                template === "style-1" && "px-8 py-4 rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/10",
                                template === "style-2" && "px-0 py-2 border-b border-primary/20 hover:border-primary text-primary font-serif italic",
                                template === "style-3" && "px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase tracking-widest hover:translate-x-2 hover:-translate-y-2"
                            )}
                        >
                            <span className="text-sm">Explore All</span>
                            <ArrowRight className={cn(
                                "h-5 w-5 transition-transform",
                                template !== "style-2" && "group-hover:translate-x-2"
                            )} />
                        </Link>
                    </motion.div>
                )}

                {/* Background Decor - Style 1 only */}
                {template === "style-1" && (
                    <div className="absolute -left-20 -top-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                )}
            </div>

            <div className={cn(
                "grid grid-cols-1 gap-8 md:gap-12",
                template === "style-2" ? "md:grid-cols-1 max-w-2xl mx-auto" : "md:grid-cols-2 lg:grid-cols-3"
            )}>
                {loading ? (
                    Array.from({ length: count }).map((_, i) => <PostCardSkeleton key={i} />)
                ) : featured.length > 0 ? (
                    featured.map((post, i) => (
                        <PostCard
                            key={post.id}
                            post={post}
                            featured={template !== "style-2" && i === 0}
                            className={cn(
                                template === "style-2" && "border-0 border-b border-primary/10 rounded-none bg-transparent p-0 pb-12",
                                template === "style-3" && "rounded-none border-4 border-primary shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white]"
                            )}
                        />
                    ))
                ) : (
                    <div className={cn(
                        "col-span-full py-32 text-center",
                        template === "style-1" && "rounded-[3rem] border border-primary/5 bg-primary/2",
                        template === "style-2" && "font-serif italic text-muted-foreground",
                        template === "style-3" && "border-4 border-dashed border-primary/20 font-mono uppercase"
                    )}>
                        <p className="text-xl font-light">The archives are currently empty...</p>
                    </div>
                )}
            </div>

            {showLink && (
                <div className="mt-20 text-center md:hidden">
                    <Link
                        to="/blog"
                        className={cn(
                            "inline-flex items-center gap-4 transition-all",
                            template === "style-1" && "px-8 py-4 rounded-2xl bg-primary/5 border border-primary/10",
                            template === "style-2" && "px-0 py-2 border-b border-primary/20 text-primary font-serif italic",
                            template === "style-3" && "px-8 py-4 bg-primary text-primary-foreground font-mono font-bold uppercase"
                        )}
                    >
                        <span className="text-sm">Explore All</span>
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            )}
        </SectionLayout>
    );
}
