import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface PostHighlightBoxContent {
    title?: string;
    items?: string[];
    template?: string;
}

export function PostHighlightBox({ content }: { content: PostHighlightBoxContent }) {
    const template = content.template || "style-1";
    const items = content.items || [];

    return (
        <SectionLayout width="readable" padding="md" variant="post">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={cn(
                    "p-10 rounded-[2.5rem]",
                    template === "style-1" && "bg-muted/50 border-2 border-primary/10",
                    template === "style-2" && "bg-primary text-primary-foreground",
                    template === "style-3" && "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-none border-l-8 border-primary"
                )}
            >
                {content.title && (
                    <h3 className={cn(
                        "text-2xl font-black mb-8 uppercase tracking-tighter",
                        template === "style-2" && "text-white"
                    )}>
                        {content.title}
                    </h3>
                )}

                <ul className="space-y-4">
                    {items.map((item, i) => (
                        <li key={i} className="flex items-start gap-4">
                            <div className={cn(
                                "mt-1 h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0",
                                template === "style-1" && "bg-primary/20 text-primary",
                                template === "style-2" && "bg-white/20 text-white",
                                template === "style-3" && "bg-primary text-primary-foreground"
                            )}>
                                <Check className="h-3 w-3" />
                            </div>
                            <span className="text-lg font-medium opacity-90">{item}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>
        </SectionLayout>
    );
}
