import { useState } from "react";
import { X, AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLayout } from "./SectionLayout";

interface AlertSectionContent {
    title?: string;
    text?: string;
    variant?: "info" | "warning" | "success" | "error";
    dismissible?: boolean;
    template?: string;
}

const STYLES = {
    info: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-500",
        textDark: "text-blue-200",
        accent: "bg-blue-500",
        icon: Info,
    },
    warning: {
        bg: "bg-amber-500/10",
        border: "border-amber-500/20",
        text: "text-amber-500",
        textDark: "text-amber-200",
        accent: "bg-amber-500",
        icon: AlertTriangle,
    },
    success: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-500",
        textDark: "text-emerald-200",
        accent: "bg-emerald-500",
        icon: CheckCircle,
    },
    error: {
        bg: "bg-rose-500/10",
        border: "border-rose-500/20",
        text: "text-rose-500",
        textDark: "text-rose-200",
        accent: "bg-rose-500",
        icon: AlertCircle,
    },
};

export function AlertSection({ content }: { content: AlertSectionContent }) {
    const [dismissed, setDismissed] = useState(false);
    const template = content.template || "style-1";
    const variant = content.variant || "info";
    const style = STYLES[variant];
    const Icon = style.icon;

    return (
        <AnimatePresence>
            {!dismissed && (
                <SectionLayout
                    width="narrow"
                    padding="sm"
                    align="center"
                    background={template === "style-3" ? "muted" : "none"}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "relative group overflow-hidden flex items-center p-6 md:p-8 gap-6 transition-all duration-700",
                            template === "style-1" && [
                                "rounded-[2rem] border backdrop-blur-3xl shadow-2xl",
                                style.bg,
                                style.border
                            ],
                            template === "style-2" && [
                                "rounded-none border-l-4 bg-transparent",
                                style.border.replace("border-", "border-l-"),
                                style.bg
                            ],
                            template === "style-3" && [
                                "rounded-none border-4 bg-card shadow-[8px_8px_0_0_rgba(0,0,0,1)]",
                                style.border.replace("/20", "")
                            ]
                        )}
                    >
                        {/* Style 1 Glow Effect */}
                        {template === "style-1" && (
                            <div className={cn("absolute -left-10 top-0 bottom-0 w-24 blur-[50px] opacity-20", style.accent)} />
                        )}

                        <div className={cn(
                            "relative z-10 transition-all",
                            template === "style-1" && ["p-3 rounded-xl bg-background/50 border border-white/5", style.textDark],
                            template === "style-2" && [style.text],
                            template === "style-3" && ["p-3", style.accent, "text-white"]
                        )}>
                            <Icon className="h-6 w-6" />
                        </div>

                        <div className="flex-1 relative z-10">
                            {content.title && (
                                <h4 className={cn(
                                    "mb-1 transition-all",
                                    template === "style-1" && "font-black tracking-tight text-foreground text-lg",
                                    template === "style-2" && "font-serif font-bold italic text-foreground text-lg",
                                    template === "style-3" && "font-mono font-black uppercase tracking-tighter text-foreground text-xl",
                                    "break-words"
                                )}>
                                    {content.title}
                                </h4>
                            )}
                            {content.text && (
                                <p className={cn(
                                    "leading-relaxed transition-all",
                                    template === "style-1" && "text-muted-foreground font-light",
                                    template === "style-2" && "text-foreground/70 font-serif italic text-sm",
                                    template === "style-3" && "text-foreground/80 font-mono text-sm uppercase tracking-tight"
                                )}>
                                    {content.text}
                                </p>
                            )}
                        </div>

                        {content.dismissible && (
                            <button
                                onClick={() => setDismissed(true)}
                                className={cn(
                                    "relative z-10 p-2 rounded-full transition-all",
                                    template === "style-1" && "hover:bg-white/5 text-muted-foreground hover:text-foreground",
                                    template === "style-2" && "text-muted-foreground hover:text-primary",
                                    template === "style-3" && "hover:bg-primary/10 text-primary border-2 border-primary"
                                )}
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}

                        {/* Animated Bottom Line (Style 1 & 3) */}
                        {(template === "style-1" || template === "style-3") && (
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 1.5 }}
                                className={cn(
                                    "absolute bottom-0 left-0 right-0 origin-left",
                                    template === "style-3" ? "h-2" : "h-1",
                                    style.accent
                                )}
                            />
                        )}
                    </motion.div>
                </SectionLayout>
            )}
        </AnimatePresence>
    );
}
