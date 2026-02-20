import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

interface BannerSectionContent {
    text?: string;
    subtext?: string;
    variant?: "info" | "warning" | "success" | "error" | "primary";
    template?: string;
}

const VARIANT_CONFIG = {
    info: {
        bg: "bg-blue-500/10",
        border: "border-blue-500/20",
        text: "text-blue-400",
        icon: Info,
        glow: "shadow-[0_0_20px_rgba(59,130,246,0.2)]"
    },
    warning: {
        bg: "bg-orange-500/10",
        border: "border-orange-500/20",
        text: "text-orange-400",
        icon: AlertTriangle,
        glow: "shadow-[0_0_20px_rgba(249,115,22,0.2)]"
    },
    success: {
        bg: "bg-emerald-500/10",
        border: "border-emerald-500/20",
        text: "text-emerald-400",
        icon: CheckCircle2,
        glow: "shadow-[0_0_20px_rgba(16,185,129,0.2)]"
    },
    error: {
        bg: "bg-red-500/10",
        border: "border-red-500/20",
        text: "text-red-400",
        icon: XCircle,
        glow: "shadow-[0_0_20px_rgba(239,68,68,0.2)]"
    },
    primary: {
        bg: "bg-primary/10",
        border: "border-primary/20",
        text: "text-primary",
        icon: Sparkles,
        glow: "shadow-[0_0_20px_rgba(var(--primary),0.2)]"
    }
};

export function BannerSection({ content }: { content: BannerSectionContent }) {
    const template = content.template || "style-1";
    const config = VARIANT_CONFIG[content.variant || "primary"];
    const Icon = config.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full"
        >
            <div className={cn(
                "relative py-4 px-6 transition-all duration-700 overflow-hidden group",
                template === "style-1" && cn("backdrop-blur-3xl border-y", config.bg, config.border, config.glow),
                template === "style-2" && cn("bg-transparent border-y border-primary/10"),
                template === "style-3" && cn("bg-zinc-950 border-y-4 border-primary")
            )}>
                {/* Immersive Background Glow - Style 1 only */}
                {template === "style-1" && (
                    <>
                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[200%] w-[150%] bg-gradient-to-b from-white/[0.03] to-transparent rounded-full -translate-y-1/2" />
                    </>
                )}

                <div className={cn(
                    "relative z-10 container mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 min-h-[50px]",
                    template === "style-3" && "md:justify-start"
                )}>
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "p-2 rounded-xl transition-transform duration-700 group-hover:scale-110",
                            template === "style-1" && cn("bg-white/5", config.text),
                            template === "style-2" && "bg-transparent text-primary/60",
                            template === "style-3" && "bg-primary text-primary-foreground rounded-none"
                        )}>
                            <Icon className="h-5 w-5" />
                        </div>
                        <p className={cn(
                            "leading-none transition-all duration-700",
                            template === "style-1" && cn("text-lg font-black tracking-tighter", config.text),
                            template === "style-2" && "text-base font-serif italic text-foreground",
                            template === "style-3" && "text-xl font-mono font-bold uppercase tracking-tight text-white"
                        )}>
                            {content.text}
                        </p>
                    </div>

                    {content.subtext && (
                        <div className="flex items-center gap-4 text-sm md:text-base">
                            <div className={cn(
                                "hidden md:block h-1 w-1 rounded-full",
                                template === "style-3" ? "bg-primary" : "bg-foreground/20"
                            )} />
                            <p className={cn(
                                "font-light tracking-wide uppercase text-xs md:text-sm",
                                template === "style-1" && "text-muted-foreground",
                                template === "style-2" && "text-primary/40 font-serif italic lowercase font-normal",
                                template === "style-3" && "text-primary/60 font-mono tracking-[0.2em]"
                            )}>
                                {content.subtext}
                            </p>
                        </div>
                    )}
                </div>

                {/* Subtle Edge Glow Overlay for Style 1 & 3 */}
                {(template === "style-1" || template === "style-3") && (
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000"
                        style={{ backgroundImage: "linear-gradient(45deg, var(--primary) 25%, transparent 25%, transparent 50%, var(--primary) 50%, var(--primary) 75%, transparent 75%, transparent)", backgroundSize: "4px 4px" }}
                    />
                )}
            </div>
        </motion.div>
    );
}
