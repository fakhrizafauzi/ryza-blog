import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Hash, List } from "lucide-react";

interface PostTOCMinimalContent {
    title?: string;
    template?: string;
}

export function PostTOCMinimal({ content }: { content: PostTOCMinimalContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="xs" variant="post">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className={cn(
                    "py-8 border-y border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6",
                    template === "style-2" && "bg-muted/30 px-8 rounded-2xl border-none",
                    template === "style-3" && "bg-zinc-900 text-white py-4 px-6 border-none"
                )}
            >
                <div className="flex items-center gap-4">
                    <List className="h-5 w-5 text-primary" />
                    <span className="text-sm font-black uppercase tracking-[0.3em]">{content.title || "CONTENTS"}</span>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-2 opacity-60">
                    {/* These would ideally be populated via some context but for now they are placeholders */}
                    <button className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1">
                        <Hash className="h-3 w-3" /> INTRODUCTION
                    </button>
                    <button className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1">
                        <Hash className="h-3 w-3" /> ARCHITECTURE
                    </button>
                    <button className="text-sm font-bold hover:text-primary transition-colors flex items-center gap-1">
                        <Hash className="h-3 w-3" /> CONCLUSION
                    </button>
                </div>
            </motion.div>
        </SectionLayout>
    );
}
