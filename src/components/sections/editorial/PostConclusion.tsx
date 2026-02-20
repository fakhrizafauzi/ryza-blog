import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";

interface PostConclusionContent {
    heading?: string;
    text?: string;
    template?: string;
}

export function PostConclusion({ content }: { content: PostConclusionContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="lg" variant="post">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className={cn(
                    "relative py-12 md:py-20",
                    template === "style-1" && "border-t-2 border-primary/20",
                    template === "style-2" && "text-center",
                    template === "style-3" && "bg-zinc-900 text-white p-12 md:p-20 rounded-t-[5rem]"
                )}
            >
                <div className={cn(
                    "inline-block h-1 w-20 bg-primary mb-12",
                    template === "style-2" && "mx-auto"
                )} />

                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 leading-none lg:text-7xl">
                    {content.heading || "CONCLUDING THOUGHTS"}
                </h2>

                <p className={cn(
                    "text-xl md:text-2xl leading-relaxed opacity-80 font-medium",
                    template === "style-2" && "max-w-readable mx-auto serif italic"
                )}>
                    {content.text}
                </p>

                <div className="mt-20 flex items-center gap-4 opacity-20 group">
                    <span className="h-[2px] w-full bg-foreground" />
                    <span className="text-4xl font-black">■</span>
                    <span className="h-[2px] w-full bg-foreground" />
                </div>
            </motion.div>
        </SectionLayout>
    );
}
