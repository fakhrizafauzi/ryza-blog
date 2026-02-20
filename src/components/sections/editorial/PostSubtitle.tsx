import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";

interface PostSubtitleContent {
    text?: string;
    template?: string;
}

export function PostSubtitle({ content }: { content: PostSubtitleContent }) {
    if (!content.text) return null;
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="sm" variant="post">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                    "relative pl-8 border-l-4 border-primary/30",
                    template === "style-2" && "pl-0 border-none text-center italic font-serif",
                    template === "style-3" && "pl-0 border-none text-right uppercase tracking-[0.2em] font-black"
                )}
            >
                <p className={cn(
                    "text-2xl md:text-3xl font-medium leading-relaxed text-foreground/80",
                    template === "style-2" && "text-3xl md:text-4xl text-foreground",
                    template === "style-3" && "text-xl text-primary"
                )}>
                    {content.text}
                </p>
            </motion.div>
        </SectionLayout>
    );
}
