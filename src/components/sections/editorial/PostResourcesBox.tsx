import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Download, FileText, ChevronRight } from "lucide-react";

interface PostResourcesBoxContent {
    title?: string;
    items?: { label: string; url: string }[];
    template?: string;
}

export function PostResourcesBox({ content }: { content: PostResourcesBoxContent }) {
    const template = content.template || "style-1";
    const items = content.items || [];

    return (
        <SectionLayout width="readable" padding="md" variant="post">
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={cn(
                    "p-10 rounded-3xl",
                    template === "style-1" && "bg-muted/30 border border-primary/10",
                    template === "style-2" && "bg-zinc-100 dark:bg-zinc-800",
                    template === "style-3" && "bg-primary text-primary-foreground italic serif"
                )}
            >
                <div className="flex items-center gap-3 mb-8">
                    <Download className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-black uppercase tracking-tighter">{content.title || "RESOURCES"}</h3>
                </div>

                <div className="space-y-4">
                    {items.map((item, i) => (
                        <a
                            key={i}
                            href={item.url}
                            className={cn(
                                "flex items-center p-4 bg-background rounded-xl border border-primary/5 hover:border-primary/30 transition-all group",
                                template === "style-3" && "bg-white/10 text-white border-none"
                            )}
                        >
                            <FileText className="h-5 w-5 opacity-40 mr-4" />
                            <span className="flex-1 text-sm font-bold uppercase tracking-tight">{item.label}</span>
                            <ChevronRight className="h-4 w-4 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                        </a>
                    ))}
                </div>
            </motion.div>
        </SectionLayout>
    );
}
