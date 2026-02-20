import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PostNextPrevStripContent {
    showImages?: boolean;
    template?: string;
}

export function PostNextPrevStrip({ content }: { content: PostNextPrevStripContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="full" padding="none" variant="post">
            <div className={cn(
                "grid grid-cols-1 md:grid-cols-2 divide-x divide-primary/5 border-y border-primary/10",
                template === "style-3" && "divide-white/10 bg-zinc-950 text-white border-none"
            )}>
                {/* Previous Post */}
                <Link to="#" className="group relative overflow-hidden flex flex-col justify-center p-12 md:p-20 text-left min-h-[300px] hover:bg-primary/5 transition-colors">
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">
                            <ArrowLeft className="h-3 w-3 transition-transform group-hover:-translate-x-2" />
                            PREVIOUS ARTICLE
                        </span>
                        <h3 className="text-3xl font-black uppercase tracking-tighter leading-none transition-transform group-hover:translate-x-2">
                            The Architecture of Intent: Designing for Longevity
                        </h3>
                    </div>
                    {content.showImages && (
                        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                </Link>

                {/* Next Post */}
                <Link to="#" className="group relative overflow-hidden flex flex-col justify-center items-end p-12 md:p-20 text-right min-h-[300px] hover:bg-primary/5 transition-colors">
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6">
                            NEXT ARTICLE
                            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-2" />
                        </span>
                        <h3 className="text-3xl font-black uppercase tracking-tighter leading-none transition-transform group-hover:-translate-x-2">
                            Structural Integrity in Distributed Systems
                        </h3>
                    </div>
                    {content.showImages && (
                        <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800" className="w-full h-full object-cover grayscale" />
                        </div>
                    )}
                </Link>
            </div>
        </SectionLayout>
    );
}
