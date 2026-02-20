import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { ArrowRight, Calendar, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface BlogPostListContent {
    heading?: string;
    layout?: "grid" | "list";
    template?: string;
}

export function BlogPostList({ content }: { content: BlogPostListContent }) {
    const template = content.template || "style-1";
    const layout = content.layout || "grid";

    // Mock post data
    const posts = [
        {
            title: "Architecting for Performance",
            excerpt: "Learn how to build lighting-fast applications with modern web patterns and strategic resource management.",
            date: "Oct 20, 2023",
            author: "Alex Rivers",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
            category: "Engineering"
        },
        {
            title: "The Emotional Language of Design",
            excerpt: "Discover how colors, typography, and motion create visceral connections between users and digital interfaces.",
            date: "Oct 15, 2023",
            author: "Sarah Chen",
            image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=400&fit=crop",
            category: "Design"
        },
        {
            title: "The Rise of Agentic AI Systems",
            excerpt: "How autonomous agents are reshaping the boundaries of software development and creative problem solving.",
            date: "Oct 10, 2023",
            author: "M. Sterling",
            image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
            category: "AI"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any } }
    };

    if (layout === "list") {
        return (
            <SectionLayout width="wide" padding="lg">
                <div className="max-w-4xl mx-auto space-y-12">
                    {content.heading && (
                        <h2 className={cn(
                            "text-3xl md:text-5xl font-black mb-16",
                            template === "style-2" && "font-serif font-light italic",
                            template === "style-3" && "uppercase tracking-tighter"
                        )}>
                            {content.heading}
                        </h2>
                    )}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="space-y-24"
                    >
                        {posts.map((post, i) => (
                            <motion.article
                                key={i}
                                variants={itemVariants}
                                className="group grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12 items-center"
                            >
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-primary">
                                        <span>{post.category}</span>
                                        <span className="w-1 h-1 rounded-full bg-primary/30" />
                                        <span>{post.date}</span>
                                    </div>
                                    <h3 className={cn(
                                        "text-4xl font-bold leading-tight group-hover:text-primary transition-colors",
                                        template === "style-2" && "font-serif italic font-light",
                                        template === "style-3" && "uppercase"
                                    )}>
                                        <a href="#">{post.title}</a>
                                    </h3>
                                    <p className="text-lg text-muted-foreground leading-relaxed line-clamp-2">
                                        {post.excerpt}
                                    </p>
                                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent text-primary group-hover:translate-x-2 transition-all">
                                        Explore Story <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="relative aspect-square rounded-3xl overflow-hidden hidden md:block border border-primary/10">
                                    <img src={post.image} alt="" className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout width="wide" padding="lg">
            {content.heading && (
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <h2 className={cn(
                        "text-4xl md:text-6xl font-black",
                        template === "style-2" && "font-serif font-light italic",
                        template === "style-3" && "uppercase tracking-tighter"
                    )}>
                        {content.heading}
                    </h2>
                </div>
            )}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {posts.map((post, i) => (
                    <motion.article
                        key={i}
                        variants={itemVariants}
                        className={cn(
                            "group flex flex-col h-full bg-card/40 backdrop-blur-3xl border border-primary/10 transition-all duration-700 hover:shadow-2xl hover:shadow-primary/10",
                            template === "style-1" && "rounded-[3rem] p-4",
                            template === "style-2" && "rounded-none p-0 border-primary/5 hover:border-primary/20",
                            template === "style-3" && "rounded-none p-0 border-4 border-primary shadow-[10px_10px_0_0_black] hover:shadow-[15px_15px_0_0_black]"
                        )}
                    >
                        <div className={cn(
                            "relative aspect-[4/3] overflow-hidden mb-8",
                            template === "style-1" && "rounded-[2.2rem]",
                            template === "style-2" && "rounded-none",
                            template === "style-3" && "rounded-none border-b-4 border-primary"
                        )}>
                            <img src={post.image} alt="" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                            <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-background/80 backdrop-blur-md text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                                {post.category}
                            </div>
                        </div>
                        <div className="flex-1 px-4 pb-8 space-y-4">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                            </div>
                            <h3 className={cn(
                                "text-2xl font-bold leading-snug group-hover:text-primary transition-all duration-300",
                                template === "style-2" && "font-serif italic font-light",
                                template === "style-3" && "uppercase tracking-tighter"
                            )}>
                                <a href="#">{post.title}</a>
                            </h3>
                            <p className="text-muted-foreground leading-relaxed line-clamp-3 font-light">
                                {post.excerpt}
                            </p>
                        </div>
                    </motion.article>
                ))}
            </motion.div>
        </SectionLayout>
    );
}
