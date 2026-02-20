import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";

interface PostAuthorsDashContent {
    authors?: { name: string; role?: string; avatar?: string }[];
    template?: string;
}

export function PostAuthorsDash({ content }: { content: PostAuthorsDashContent }) {
    if (!content.authors || content.authors.length === 0) return null;
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="sm" variant="post">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                    "flex flex-wrap items-center gap-6",
                    template === "style-2" && "justify-between border-y border-primary/10 py-8",
                    template === "style-3" && "flex-col items-start gap-12 bg-zinc-50 dark:bg-zinc-900 p-8 border-l-4 border-primary text-zinc-900 dark:text-zinc-50"
                )}
            >
                {content.authors.map((author, i) => (
                    <div key={i} className="flex items-center gap-4">
                        {author.avatar && (
                            <img
                                src={author.avatar}
                                alt={author.name}
                                className={cn(
                                    "h-14 w-14 object-cover",
                                    template === "style-1" && "rounded-full",
                                    template === "style-2" && "rounded-none p-1 border border-primary/30",
                                    template === "style-3" && "h-24 w-24 rounded-full"
                                )}
                            />
                        )}
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-1">WRITTEN BY</p>
                            <p className={cn(
                                "text-lg font-black uppercase tracking-tighter",
                                template === "style-3" && "text-3xl"
                            )}>{author.name}</p>
                            {author.role && (
                                <p className="text-sm font-medium opacity-60 italic">{author.role}</p>
                            )}
                        </div>
                    </div>
                ))}
            </motion.div>
        </SectionLayout>
    );
}
