import { cn } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";
import { motion } from "framer-motion";

interface ContentSectionContent {
    html?: string;
    subheading?: string;
    template?: string;
}

export function ContentSection({ content, isPostDetail }: { content: ContentSectionContent, isPostDetail?: boolean }) {
    if (!content.html) return null;
    const template = content.template || "style-1";

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : (template === "style-2" ? "readable" : "narrow")}
            padding={isPostDetail ? "xs" : "lg"}
            align={template === "style-3" ? "center" : "left"}
        >
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative",
                    template === "style-3" && "text-center"
                )}
            >
                {/* Subheading variants */}
                {content.subheading && (
                    <div className={cn(
                        "mb-12 flex items-center gap-4",
                        template === "style-3" && "justify-center"
                    )}>
                        {template === "style-1" && <div className="h-px w-12 bg-primary" />}
                        <span className={cn(
                            "text-xs font-black uppercase tracking-[0.4em] text-primary",
                            template === "style-2" && "font-serif normal-case tracking-widest italic"
                        )}>
                            {content.subheading}
                        </span>
                        {template === "style-3" && <div className="h-1 w-8 bg-primary rounded-full" />}
                    </div>
                )}

                <article
                    className={cn(
                        "prose prose-zinc dark:prose-invert max-w-none w-full break-words overflow-hidden",
                        isPostDetail && "prose-xl md:prose-2xl leading-relaxed",
                        template === "style-1" && [
                            "prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground",
                            "prose-p:text-xl prose-p:font-light prose-p:leading-relaxed prose-p:text-muted-foreground",
                            "prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:rounded-2xl"
                        ],
                        template === "style-2" && [
                            "prose-headings:font-medium prose-headings:font-serif prose-headings:text-foreground",
                            "prose-p:text-lg prose-p:leading-loose prose-p:text-muted-foreground",
                            "prose-blockquote:border-none prose-blockquote:italic prose-blockquote:text-center prose-blockquote:text-xl"
                        ],
                        template === "style-3" && [
                            "prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-primary",
                            "prose-p:text-2xl prose-p:font-medium prose-p:leading-tight prose-p:text-foreground",
                            "prose-blockquote:bg-primary prose-blockquote:text-primary-foreground prose-blockquote:p-12 prose-blockquote:rounded-none prose-blockquote:border-none"
                        ],
                        template === "style-4" && [
                            // STYLE 4: Swiss Grid Content (High Fidelity)
                            "font-mono text-foreground",
                            "prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-tighter prose-headings:text-foreground prose-headings:border-b prose-headings:border-border prose-headings:pb-4 prose-headings:mb-8",
                            "prose-p:text-base prose-p:leading-relaxed prose-p:text-muted-foreground prose-p:mb-6",
                            "prose-strong:text-primary prose-strong:font-bold",
                            "prose-blockquote:border-l-2 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-foreground prose-blockquote:my-8",
                            "prose-a:text-primary prose-a:underline prose-a:decoration-2 prose-a:underline-offset-4 hover:prose-a:text-foreground transition-colors",
                            "prose-li:marker:text-primary prose-li:marker:content-['■'] prose-li:pl-2"
                        ],
                        template === "style-5" && [
                            // STYLE 5: Soft Organic Content (High Fidelity)
                            "prose-headings:font-black prose-headings:tracking-tight prose-headings:text-foreground prose-headings:mb-6",
                            "prose-p:text-lg prose-p:leading-loose prose-p:text-muted-foreground/80 prose-p:mb-8",
                            "prose-blockquote:bg-muted/30 prose-blockquote:p-8 prose-blockquote:rounded-[2rem] prose-blockquote:border-none prose-blockquote:not-italic prose-blockquote:font-medium prose-blockquote:text-xl prose-blockquote:text-primary prose-blockquote:shadow-sm",
                            "prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:text-primary/70 transition-colors prose-a:bg-primary/5 prose-a:rounded-md prose-a:px-1",
                            "prose-img:rounded-[2rem] prose-img:shadow-xl prose-img:my-12 prose-img:border prose-img:border-primary/5"
                        ],
                        "prose-h1:text-4xl md:prose-h1:text-6xl prose-h1:mb-12",
                        "prose-h2:text-3xl md:prose-h2:text-4xl prose-h2:mt-24 prose-h2:mb-8",
                        "prose-pre:bg-card/40 prose-pre:backdrop-blur-3xl prose-pre:border prose-pre:border-primary/10 prose-pre:rounded-[2rem] prose-pre:p-8"
                    )}
                    dangerouslySetInnerHTML={{ __html: content.html }}
                />

                {/* Decorative Elements */}
                {template === "style-1" && (
                    <div className="mt-24 h-px w-full bg-gradient-to-r from-primary/20 via-primary/5 to-transparent" />
                )}
                {template === "style-3" && (
                    <div className="mt-24 h-4 w-24 bg-primary mx-auto rounded-full" />
                )}
                {template === "style-4" && (
                    <div className="mt-24 border-t border-dashed border-border pt-4 flex justify-between items-center text-xs font-mono uppercase tracking-widest text-muted-foreground">
                        <span>End_Of_Section</span>
                        <span>Content_ID: {Math.random().toString(36).substr(2, 6)}</span>
                    </div>
                )}
                {template === "style-5" && (
                    <div className="mt-24 flex justify-center">
                        <div className="w-3 h-3 bg-primary/20 rounded-full mx-2" />
                        <div className="w-3 h-3 bg-primary/40 rounded-full mx-2" />
                        <div className="w-3 h-3 bg-primary/20 rounded-full mx-2" />
                    </div>
                )}
            </motion.div>
        </SectionLayout>
    );
}
