import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface QuoteSectionContent {
    text?: string;
    author?: string;
    role?: string;
    template?: string;
}

export function QuoteSection({ content, isPostDetail }: { content: QuoteSectionContent, isPostDetail?: boolean }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : "narrow"}
            padding={isPostDetail ? "sm" : "lg"}
            align="center"
            background={template === "style-3" ? "dark" : "none"}
            variant={isPostDetail ? "post" : "default"}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative group transition-all duration-700",
                    template === "style-1" && "p-10 md:p-20 rounded-[4rem] bg-card/40 backdrop-blur-3xl border border-primary/10 shadow-2xl",
                    template === "style-2" && "p-0",
                    template === "style-3" && "p-12 md:p-24 bg-primary text-primary-foreground rounded-none"
                )}
            >
                {/* LARGE Icons for Style 3 */}
                {template === "style-3" && (
                    <div className="absolute -top-12 -left-12 text-primary-foreground opacity-20">
                        <Quote className="h-48 w-48 rotate-180" />
                    </div>
                )}

                {/* Standard Icon for Style 1 */}
                {template === "style-1" && (
                    <div className="absolute top-10 left-10 text-primary/10 group-hover:text-primary/20 transition-colors duration-700">
                        <Quote className="h-24 w-24 md:h-32 md:w-32 rotate-180" />
                    </div>
                )}

                <div className="relative space-y-12">
                    <p className={cn(
                        "text-center",
                        template === "style-1" && "text-3xl md:text-5xl font-black tracking-tight leading-tight text-foreground",
                        template === "style-2" && "text-4xl md:text-6xl font-serif font-light italic text-foreground leading-[1.1]",
                        template === "style-3" && "text-3xl md:text-5xl font-black uppercase tracking-tighter",
                        "break-words"
                    )}>
                        &ldquo;{content.text}&rdquo;
                    </p>

                    {content.author && (
                        <footer className="flex flex-col items-center gap-4">
                            {template === "style-1" && <div className="h-px w-16 bg-primary" />}
                            {template === "style-2" && <div className="h-12 w-px bg-primary/30" />}
                            <div className="text-center">
                                <span className={cn(
                                    "block",
                                    template === "style-1" && "text-xl font-black text-foreground",
                                    template === "style-2" && "text-2xl font-serif text-foreground",
                                    template === "style-3" && "text-xl font-bold uppercase tracking-widest opacity-90",
                                    "break-words"
                                )}>
                                    {content.author}
                                </span>
                                {content.role && (
                                    <span className={cn(
                                        "mt-2 block uppercase tracking-[0.4em]",
                                        template === "style-1" && "text-xs font-black text-primary/60",
                                        template === "style-2" && "text-[10px] font-medium text-muted-foreground tracking-[0.6em]",
                                        template === "style-3" && "text-xs font-medium opacity-70"
                                    )}>
                                        {content.role}
                                    </span>
                                )}
                            </div>
                        </footer>
                    )}
                </div>

                {/* Style-specific accents */}
                {template === "style-1" && (
                    <>
                        <div className="absolute top-8 right-8 h-3 w-3 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all duration-700" />
                        <div className="absolute bottom-8 left-8 h-3 w-3 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all duration-700" />
                    </>
                )}
            </motion.div>
        </SectionLayout>
    );
}
