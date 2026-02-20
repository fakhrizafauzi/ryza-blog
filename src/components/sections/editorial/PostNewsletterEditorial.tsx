import { SectionLayout } from "../SectionLayout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PostNewsletterEditorialContent {
    title?: string;
    text?: string;
    template?: string;
}

export function PostNewsletterEditorial({ content }: { content: PostNewsletterEditorialContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout width="readable" padding="md" variant="post">
            <div className={cn(
                "p-12 md:p-20 text-center relative overflow-hidden",
                template === "style-1" && "bg-muted/50 rounded-[4rem] border-2 border-primary/10",
                template === "style-2" && "bg-primary text-primary-foreground rounded-2xl",
                template === "style-3" && "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 rounded-none border-x-[20px] border-primary"
            )}>
                {/* Decorative Pattern for style-1 */}
                {template === "style-1" && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                        style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: '24px 24px' }}
                    />
                )}

                <div className="relative z-10">
                    <h3 className={cn(
                        "text-4xl md:text-5xl font-black mb-6 uppercase tracking-tighter leading-none",
                        template === "style-2" && "text-white"
                    )}>
                        {content.title || "WEEKLY INTELLIGENCE"}
                    </h3>
                    <p className="text-lg opacity-60 mb-10 max-w-md mx-auto leading-relaxed font-medium">
                        {content.text || "Join our network of 50,000+ architects and engineers for high-end technical insights."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <Input
                            placeholder="your@email.com"
                            className={cn(
                                "h-14 px-6 bg-background rounded-full border-primary/20",
                                template === "style-3" && "rounded-none border-zinc-900 dark:border-white/20 bg-transparent text-zinc-900 dark:text-white placeholder:text-zinc-500"
                            )}
                        />
                        <Button className={cn(
                            "h-14 px-10 rounded-full font-black uppercase tracking-widest",
                            template === "style-3" && "rounded-none bg-primary text-zinc-900"
                        )}>
                            JOIN THE LIST
                        </Button>
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}
