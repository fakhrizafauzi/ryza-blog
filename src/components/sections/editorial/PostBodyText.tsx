import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Lightbox } from "@/components/ui/Lightbox";

interface PostBodyTextContent {
    html?: string;
    template?: string;
}

export function PostBodyText({ content }: { content: PostBodyTextContent }) {
    const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const images = container.getElementsByTagName("img");
        const handleImageClick = (e: Event) => {
            const img = e.target as HTMLImageElement;
            if (img.src) {
                setLightboxSrc(img.src);
            }
        };

        Array.from(images).forEach(img => {
            img.style.cursor = "zoom-in";
            img.addEventListener("click", handleImageClick);
        });

        return () => {
            Array.from(images).forEach(img => {
                img.removeEventListener("click", handleImageClick);
            });
        };
    }, [content.html]);

    if (!content.html) return null;
    const template = content.template || "style-1";

    return (
        <>
            <SectionLayout width="readable" padding="xs" variant="post">
                <motion.div
                    ref={containerRef}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className={cn(
                        "prose prose-zinc dark:prose-invert max-w-none prose-xl md:prose-2xl",
                        "prose-p:leading-[1.8] prose-p:mb-10",
                        "prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase",
                        template === "style-2" && "prose-p:font-serif prose-p:leading-loose",
                        template === "style-3" && "prose-p:font-mono prose-p:text-lg tracking-tight"
                    )}
                    dangerouslySetInnerHTML={{ __html: content.html }}
                />
            </SectionLayout>

            <Lightbox
                src={lightboxSrc}
                isOpen={!!lightboxSrc}
                onClose={() => setLightboxSrc(null)}
            />
        </>
    );
}
