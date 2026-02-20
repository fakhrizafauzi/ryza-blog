import { motion } from "framer-motion";
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";

interface PostImageFullContent {
    image?: string;
    caption?: string;
    template?: string;
}

export function PostImageFull({ content }: { content: PostImageFullContent }) {
    if (!content.image) return null;
    const template = content.template || "style-1";

    return (
        <SectionLayout width="full" padding="none" variant="post">
            <div className={cn(
                "relative w-full overflow-hidden",
                template === "style-1" && "aspect-[21/9]",
                template === "style-2" && "aspect-video container max-w-7xl px-4 my-20",
                template === "style-3" && "aspect-[16/10] grayscale contrast-125"
            )}>
                <motion.img
                    initial={{ scale: 1.1 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.5 }}
                    src={content.image}
                    alt={content.caption}
                    className={cn(
                        "w-full h-full object-cover",
                        template === "style-2" && "rounded-[3rem]"
                    )}
                />

                {content.caption && (
                    <div className={cn(
                        "absolute bottom-0 left-0 right-0 p-8",
                        template === "style-1" && "bg-gradient-to-t from-black/80 to-transparent text-white",
                        template === "style-2" && "relative mt-4 bg-transparent text-muted-foreground pt-4 pb-0 px-0",
                        template === "style-3" && "bg-white text-black p-4 inline-block w-auto right-auto top-8 left-8 h-fit uppercase font-black text-xs tracking-widest"
                    )}>
                        <p className={cn(
                            "text-sm font-medium",
                            template === "style-1" && "max-w-readable mx-auto text-center"
                        )}>
                            {content.caption}
                        </p>
                    </div>
                )}
            </div>
        </SectionLayout>
    );
}
