import { Info, AlertTriangle, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface CalloutSectionContent {
    type?: "info" | "warning" | "tip";
    title?: string;
    text?: string;
    template?: string;
}

const CALLOUT_STYLES = {
    info: {
        accent: "bg-blue-500",
        shadow: "shadow-blue-500/10",
        icon: Info,
        border: "border-blue-500/20",
        text: "text-blue-500",
        muted: "bg-blue-500/10",
    },
    warning: {
        accent: "bg-amber-500",
        shadow: "shadow-amber-500/10",
        icon: AlertTriangle,
        border: "border-amber-500/20",
        text: "text-amber-500",
        muted: "bg-amber-500/10",
    },
    tip: {
        accent: "bg-emerald-500",
        shadow: "shadow-emerald-500/10",
        icon: Lightbulb,
        border: "border-emerald-500/20",
        text: "text-emerald-500",
        muted: "bg-emerald-500/10",
    },
};

export function CalloutSection({ content, isPostDetail }: { content: CalloutSectionContent, isPostDetail?: boolean }) {
    const type = content.type || "info";
    const template = content.template || "style-1";
    const style = CALLOUT_STYLES[type];
    const Icon = style.icon;

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : "narrow"}
            padding={isPostDetail ? "sm" : "md"}
            align="center"
            variant={isPostDetail ? "post" : "default"}
            background={template === "style-3" ? "muted" : "none"}
        >
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative group transition-all duration-700",
                    template === "style-1" && cn(
                        "p-8 md:p-12 rounded-[2.5rem] bg-card/40 backdrop-blur-3xl border shadow-2xl overflow-hidden",
                        style.border,
                        style.shadow
                    ),
                    template === "style-2" && "p-6 border-l-4 rounded-none bg-transparent " + style.border + " " + style.muted.replace("bg-", "border-l-"),
                    template === "style-3" && "p-10 border-4 rounded-none bg-card " + style.border.replace("/20", "") + " shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white]"
                )}
            >
                {/* Decorative Elements */}
                {template === "style-1" && (
                    <>
                        <div className={cn("absolute left-0 top-0 bottom-0 w-2 h-full", style.accent)} />
                        <div className={cn(
                            "absolute -right-20 -top-20 h-40 w-40 blur-[80px] opacity-20",
                            style.accent
                        )} />
                    </>
                )}

                <div className={cn(
                    "flex relative z-10",
                    template === "style-1" && "flex-col md:flex-row gap-8 items-start",
                    template === "style-2" && "flex-row gap-6 items-center",
                    template === "style-3" && "flex-col gap-6"
                )}>
                    <div className={cn(
                        "transition-all duration-500",
                        template === "style-1" && [
                            "p-4 rounded-2xl bg-background/50 border border-primary/10 shadow-xl shrink-0 group-hover:scale-110",
                            style.text
                        ],
                        template === "style-2" && [
                            "shrink-0",
                            style.text
                        ],
                        template === "style-3" && [
                            "w-12 h-12 flex items-center justify-center font-black text-2xl",
                            style.accent,
                            "text-white"
                        ]
                    )}>
                        <Icon className={cn(
                            template === "style-1" && "h-8 w-8",
                            template === "style-2" && "h-10 w-10",
                            template === "style-3" && "h-6 w-6"
                        )} />
                    </div>

                    <div className="flex-1 space-y-3">
                        {content.title && (
                            <h3 className={cn(
                                "leading-none text-foreground transition-colors",
                                template === "style-1" && "text-2xl font-black tracking-tight",
                                template === "style-2" && "text-xl font-serif font-bold italic",
                                template === "style-3" && "text-2xl font-black uppercase tracking-tighter " + style.text,
                                "break-words"
                            )}>
                                {content.title}
                            </h3>
                        )}
                        <p className={cn(
                            "leading-relaxed transition-colors",
                            template === "style-1" && "text-lg text-muted-foreground font-light",
                            template === "style-2" && "text-base text-foreground/80 font-serif italic",
                            template === "style-3" && "text-lg font-mono font-medium"
                        )}>
                            {content.text}
                        </p>
                    </div>
                </div>
            </motion.div>
        </SectionLayout>
    );
}
