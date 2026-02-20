import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Hash, ExternalLink } from "lucide-react";

interface PostTagsResourcesContent {
    tags?: string[];
    links?: { label: string; url: string }[];
    template?: string;
}

export function PostTagsResources({ content }: { content: PostTagsResourcesContent }) {
    const template = content.template || "style-1";
    const tags = content.tags || [];
    const links = content.links || [];

    return (
        <SectionLayout width="readable" padding="sm" variant="post">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={cn(
                    "pt-8 border-t border-primary/10 grid grid-cols-1 md:grid-cols-2 gap-10",
                    template === "style-3" && "bg-zinc-900 text-white p-10 mt-20 border-none md:grid-cols-1"
                )}
            >
                <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">TOPICS EXPLORED</h4>
                    <div className="flex flex-wrap gap-2">
                        {tags.map((tag, i) => (
                            <span key={i} className={cn(
                                "inline-flex items-center gap-1 text-xs font-black uppercase tracking-widest px-3 py-1 bg-muted rounded-full hover:bg-primary/20 hover:text-primary transition-colors cursor-default",
                                template === "style-3" && "bg-white/10 text-white"
                            )}>
                                <Hash className="h-3 w-3 opacity-40" /> {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {links.length > 0 && (
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">REFERENCE LINKS</h4>
                        <div className="space-y-3">
                            {links.map((link, i) => (
                                <a
                                    key={i}
                                    href={link.url}
                                    className="flex items-center justify-between group p-3 bg-muted/30 rounded-lg hover:bg-primary/10 transition-colors"
                                >
                                    <span className="text-sm font-bold uppercase tracking-tight group-hover:text-primary transition-colors">{link.label}</span>
                                    <ExternalLink className="h-4 w-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </SectionLayout>
    );
}
