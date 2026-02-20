import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";

interface PostImageGridContent {
    images?: { url: string; caption?: string }[];
    template?: string;
}

export function PostImageGrid({ content }: { content: PostImageGridContent }) {
    if (!content.images || content.images.length === 0) return null;
    const template = content.template || "style-1";

    return (
        <SectionLayout width="wide" padding="md" variant="post">
            <div className={cn(
                "grid gap-4",
                content.images.length === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2",
                template === "style-3" && "gap-0"
            )}>
                {content.images.map((img, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group overflow-hidden"
                    >
                        <img
                            src={img.url}
                            alt={img.caption}
                            className={cn(
                                "w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110",
                                template === "style-1" && "rounded-2xl",
                                template === "style-2" && "rounded-full"
                            )}
                        />
                        {img.caption && (
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-6 text-center">
                                <p className="text-white text-sm font-bold uppercase tracking-widest">{img.caption}</p>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </SectionLayout>
    );
}
