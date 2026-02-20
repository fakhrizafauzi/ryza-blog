import { Link } from "react-router-dom";
import { format } from "date-fns";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PostCardProps {
    post: BlogPost;
    loading?: boolean;
    featured?: boolean;
    className?: string;
}

export function PostCard({ post, loading, featured, className }: PostCardProps) {
    if (loading) {
        return (
            <div className={cn("relative aspect-[16/10] rounded-[2rem] bg-muted/20 animate-pulse overflow-hidden", className)}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
                "group relative h-full flex flex-col",
                featured ? "md:col-span-2 lg:col-span-3" : "",
                className
            )}
        >
            <Link to={`/blog/${post.slug}`} className="relative h-full flex flex-col rounded-[2.5rem] bg-card/40 backdrop-blur-3xl border border-primary/10 overflow-hidden shadow-2xl transition-all duration-700 group-hover:border-primary/30 group-hover:shadow-primary/5">
                {/* Background Decor */}
                <div className="absolute -right-16 -top-16 h-32 w-32 bg-primary/5 blur-[60px] rounded-full group-hover:bg-primary/10 transition-colors duration-700" />

                {/* Image Container */}
                <div className={cn(
                    "relative overflow-hidden",
                    featured ? "md:h-[500px]" : "aspect-[16/10]"
                )}>
                    {post.coverImage ? (
                        <motion.img
                            src={post.coverImage}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0"
                            loading="lazy"
                        />
                    ) : (
                        <div className="h-full w-full bg-primary/5 flex items-center justify-center text-primary/20">
                            <Sparkles className="h-12 w-12" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Category Badge */}
                    {post.category && (
                        <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-white">
                            {post.category.name}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 flex flex-col flex-1">
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground mb-6">
                        <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{format(post.publishedAt || post.createdAt, "MMM d, yyyy")}</span>
                        </div>
                        {post.readingTime && (
                            <div className="flex items-center gap-2 group-hover:text-primary transition-colors">
                                <Clock className="h-3.5 w-3.5" />
                                <span>{post.readingTime} min read</span>
                            </div>
                        )}
                    </div>

                    <h3 className={cn(
                        "font-black tracking-tight leading-[1.1] mb-6 transition-colors group-hover:text-primary",
                        featured ? "text-3xl md:text-5xl" : "text-2xl"
                    )}>
                        {post.title}
                    </h3>

                    <p className="text-muted-foreground font-light leading-relaxed line-clamp-3 mb-8 text-lg">
                        {post.excerpt}
                    </p>

                    <div className="mt-auto pt-6 border-t border-primary/5 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/10 flex items-center justify-center font-black text-xs text-primary">
                                {post.title.charAt(0)}
                            </div>
                            <span className="text-xs font-black uppercase tracking-widest">Story</span>
                        </div>

                        <div className="h-12 w-12 rounded-full border border-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-500">
                            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </div>
                    </div>
                </div>

                {/* Magnetic Dot */}
                <div className="absolute top-0 right-0 h-4 w-4 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all duration-700" />
            </Link>
        </motion.div>
    );
}

export function PostCardSkeleton() {
    return (
        <div className="relative aspect-[16/10] rounded-[2rem] bg-muted/20 animate-pulse overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
        </div>
    );
}
