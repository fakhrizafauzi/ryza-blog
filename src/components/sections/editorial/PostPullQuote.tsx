import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Quote } from "lucide-react";

interface PostPullQuoteContent {
    text?: string;
    author?: string;
    template?: string;
}

export function PostPullQuote({ content }: { content: PostPullQuoteContent }) {
    if (!content.text) return null;
    const template = content.template || "style-1";

    return (
        <SectionLayout width="wide" padding="md" variant="post">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={cn(
                    "relative py-16 px-10 md:px-20 text-center",
                    template === "style-1" && "bg-primary/5 rounded-[3rem] border border-primary/10",
                    template === "style-2" && "font-serif border-y-2 border-primary/20",
                    template === "style-3" && "bg-zinc-900 text-white rounded-none"
                )}
            >
                <Quote className={cn(
                    "absolute top-8 left-1/2 -translate-x-1/2 h-12 w-12 opacity-20 text-primary",
                    template === "style-3" && "text-white"
                )} />

                <blockquote className={cn(
                    "text-4xl md:text-6xl font-black leading-tight tracking-tighter mb-8",
                    template === "style-2" && "italic font-normal leading-normal",
                    template === "style-3" && "uppercase tracking-[0.1em]"
                )}>
                    "{content.text}"
                </blockquote>

                {content.author && (
                    <cite className="not-italic text-sm font-black uppercase tracking-[0.4em] opacity-40">
                        — {content.author}
                    </cite>
                )}
            </motion.div>
        </SectionLayout>
    );
}
