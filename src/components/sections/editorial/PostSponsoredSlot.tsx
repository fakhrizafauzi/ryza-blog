
import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { ExternalLink, Star } from "lucide-react";

interface PostSponsoredSlotContent {
    label?: string;
    title?: string;
    text?: string;
    buttonLabel?: string;
    buttonUrl?: string;
    template?: string;
}

export function PostSponsoredSlot({ content }: { content: PostSponsoredSlotContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="md" variant="post">
            <div className={cn(
                "relative p-1 px-1 bg-gradient-to-r from-primary/50 via-primary/20 to-primary/50 rounded-[2rem]",
                template === "style-3" && "rounded-none p-0 bg-none border-y-4 border-primary"
            )}>
                <div className={cn(
                    "bg-background p-10 md:p-14 rounded-[1.8rem] text-center",
                    template === "style-3" && "rounded-none"
                )}>
                    <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.5em] text-primary mb-8">
                        <Star className="h-3 w-3 fill-current" />
                        {content.label || "SPONSORED"}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-6 leading-none">
                        {content.title}
                    </h3>

                    <p className="text-lg opacity-60 mb-10 max-w-md mx-auto leading-relaxed">
                        {content.text}
                    </p>

                    <a
                        href={content.buttonUrl}
                        className="inline-flex items-center gap-3 px-10 py-4 bg-primary text-primary-foreground rounded-full font-black uppercase tracking-widest text-sm hover:scale-105 transition-transform"
                    >
                        {content.buttonLabel}
                        <ExternalLink className="h-4 w-4" />
                    </a>
                </div>
            </div>
        </SectionLayout>
    );
}
