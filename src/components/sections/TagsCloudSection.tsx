import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Tag as TagIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagsCloudSectionContent {
    heading?: string;
    subheading?: string;
    tags?: { name: string; slug: string; count?: number }[];
}

export function TagsCloudSection({ content }: { content: TagsCloudSectionContent }) {
    const tags = content.tags || [];

    return (
        <SectionLayout width="narrow" padding="lg" align="center">
            <div className="relative">
                {/* Background Glow */}
                <div className="absolute inset-x-0 -top-20 h-64 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 max-w-3xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="text-4xl md:text-5xl font-black tracking-tight mb-4"
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                className="text-lg text-muted-foreground font-light"
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className="flex flex-wrap gap-4 justify-center relative z-10">
                    {tags.map((tag, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.6,
                                delay: i * 0.05,
                                type: "spring",
                                bounce: 0.3
                            }}
                        >
                            <Link
                                to={`/blog?tag=${tag.slug}`}
                                className={cn(
                                    "group relative flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/40 backdrop-blur-3xl border border-primary/10 shadow-xl transition-all duration-500 hover:border-primary/40 hover:scale-110 hover:shadow-primary/5 active:scale-95"
                                )}
                            >
                                <TagIcon className="h-4 w-4 text-primary opacity-50 group-hover:opacity-100 transition-opacity" />
                                <span className="font-bold tracking-tight text-foreground">{tag.name}</span>
                                {tag.count !== undefined && (
                                    <span className="text-[10px] font-black uppercase text-muted-foreground group-hover:text-primary transition-colors">
                                        {tag.count}
                                    </span>
                                )}

                                {/* Inner Glow */}
                                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500 rounded-2xl pointer-events-none" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Dot */}
                <div className="mt-16 flex justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary/20 animate-pulse" />
                </div>
            </div>
        </SectionLayout>
    );
}
