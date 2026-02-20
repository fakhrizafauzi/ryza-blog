import { SectionLayout } from "./SectionLayout";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogPostNavContent {
    showImages?: boolean;
    template?: string;
}

export function BlogPostNav({ content }: { content: BlogPostNavContent }) {
    const template = content.template || "style-1";

    // Mock data for nav
    const prevEntry = {
        title: "The Art of Minimalist UI",
        slug: "art-of-minimalist-ui",
        image: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=250&fit=crop"
    };

    const nextEntry = {
        title: "Scaling Engineering Teams",
        slug: "scaling-engineering-teams",
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=250&fit=crop"
    };

    return (
        <SectionLayout width="wide" padding="lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-primary/10 rounded-[2rem] overflow-hidden border border-primary/10">
                {/* Previous Post */}
                <a
                    href={`/blog/${prevEntry.slug}`}
                    className={cn(
                        "group relative p-8 md:p-12 transition-all duration-700 hover:bg-primary/5",
                        template === "style-1" && "bg-background/50 backdrop-blur-xl",
                        template === "style-2" && "bg-background font-serif",
                        template === "style-3" && "bg-background font-mono rounded-none"
                    )}
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-2" />
                            Previous
                        </div>
                        <h3 className={cn(
                            "text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors",
                            template === "style-2" && "font-light italic",
                            template === "style-3" && "uppercase"
                        )}>
                            {prevEntry.title}
                        </h3>
                    </div>
                    {content.showImages && (
                        <div className="absolute top-1/2 right-8 -translate-y-1/2 w-24 h-24 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-20 transition-all duration-700 blur-sm scale-75 group-hover:scale-100 hidden lg:block">
                            <img src={prevEntry.image} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                </a>

                {/* Next Post */}
                <a
                    href={`/blog/${nextEntry.slug}`}
                    className={cn(
                        "group relative p-8 md:p-12 transition-all duration-700 hover:bg-primary/5 border-t md:border-t-0 md:border-l border-primary/10 text-right",
                        template === "style-1" && "bg-background/50 backdrop-blur-xl",
                        template === "style-2" && "bg-background font-serif",
                        template === "style-3" && "bg-background font-mono rounded-none"
                    )}
                >
                    <div className="flex flex-col gap-4 items-end">
                        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
                            Next
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </div>
                        <h3 className={cn(
                            "text-xl md:text-2xl font-bold leading-tight group-hover:text-primary transition-colors",
                            template === "style-2" && "font-light italic",
                            template === "style-3" && "uppercase"
                        )}>
                            {nextEntry.title}
                        </h3>
                    </div>
                    {content.showImages && (
                        <div className="absolute top-1/2 left-8 -translate-y-1/2 w-24 h-24 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-20 transition-all duration-700 blur-sm scale-75 group-hover:scale-100 hidden lg:block">
                            <img src={nextEntry.image} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                </a>
            </div>
        </SectionLayout>
    );
}
