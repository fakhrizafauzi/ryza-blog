import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface InteractiveMediaContent {
    heading?: string;
    subheading?: string;
    type?: "video" | "embed";
    url?: string;
    html?: string;
    height?: number;
    layout?: "split" | "full" | "centered";
    mediaPosition?: "left" | "right";
    template?: string;
}

function getEmbedUrl(url: string): string {
    if (!url) return "";

    // YouTube
    const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s?]+)/);
    if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}`;

    // Vimeo
    const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

    // Figma
    if (url.includes("figma.com/file/") || url.includes("figma.com/proto/")) {
        return `https://www.figma.com/embed?embed_host=share&url=${encodeURIComponent(url)}`;
    }

    return url;
}

export function InteractiveMediaSection({ content }: { content: InteractiveMediaContent }) {
    const template = content.template || "style-1";
    const layout = content.layout || "split";
    const mediaPosition = content.mediaPosition || "right";
    const height = content.height || 600;
    const embedUrl = getEmbedUrl(content.url || "");

    const renderMedia = () => {
        if (content.type === "embed" && content.html) {
            return (
                <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: content.html }}
                />
            );
        }

        if (embedUrl) {
            return (
                <iframe
                    src={embedUrl}
                    className="w-full h-full border-0"
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            );
        }

        return (
            <div className="flex items-center justify-center w-full h-full bg-muted/20 text-muted-foreground italic text-sm">
                No media source provided
            </div>
        );
    };

    const mediaContent = (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={cn(
                "relative overflow-hidden w-full transition-all duration-700",
                template === "style-1" && "rounded-[2rem] border border-primary/20 shadow-2xl bg-card/50 backdrop-blur-xl",
                template === "style-2" && "rounded-none border border-primary/10",
                template === "style-3" && "rounded-none border-4 border-primary shadow-[15px_15px_0_0_black] dark:shadow-[15px_15px_0_0_white]"
            )}
            style={{ height: `${height}px` }}
        >
            {renderMedia()}
        </motion.div>
    );

    const textContent = (
        <div className={cn(
            "flex flex-col justify-center h-full",
            layout === "centered" ? "text-center mb-12" : ""
        )}>
            {content.heading && (
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                        "mb-6 leading-tight",
                        template === "style-1" && "text-4xl md:text-5xl font-black tracking-tight",
                        template === "style-2" && "text-3xl md:text-4xl font-serif font-light tracking-tight",
                        template === "style-3" && "text-4xl md:text-6xl font-black uppercase tracking-tighter"
                    )}
                >
                    {content.heading}
                </motion.h2>
            )}
            {content.subheading && (
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className={cn(
                        "text-xl text-muted-foreground font-light leading-relaxed",
                        template === "style-2" && "font-serif italic",
                        template === "style-3" && "font-mono uppercase text-sm tracking-widest opacity-60"
                    )}
                >
                    {content.subheading}
                </motion.p>
            )}
        </div>
    );

    return (
        <SectionLayout
            width={layout === "full" ? "full" : "wide"}
            padding="lg"
            background={template === "style-3" ? "muted" : "none"}
        >
            {layout === "centered" ? (
                <div className="max-w-4xl mx-auto">
                    {textContent}
                    {mediaContent}
                </div>
            ) : layout === "full" ? (
                <div className="space-y-12">
                    {(content.heading || content.subheading) && (
                        <div className="max-w-4xl mx-auto text-center px-4">
                            {textContent}
                        </div>
                    )}
                    <div className="w-full">
                        {mediaContent}
                    </div>
                </div>
            ) : (
                <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center",
                    mediaPosition === "left" ? "lg:flex-row-reverse" : ""
                )}>
                    <div className={cn(mediaPosition === "left" ? "lg:order-2" : "lg:order-1")}>
                        {textContent}
                    </div>
                    <div className={cn(mediaPosition === "left" ? "lg:order-1" : "lg:order-2")}>
                        {mediaContent}
                    </div>
                </div>
            )}
        </SectionLayout>
    );
}
