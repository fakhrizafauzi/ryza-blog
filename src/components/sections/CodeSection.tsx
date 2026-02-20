import { useState } from "react";
import { Check, Copy, Terminal, Code2 } from "lucide-react";
import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface CodeSectionContent {
    heading?: string;
    subheading?: string;
    language?: string;
    code?: string;
    template?: string;
}

export function CodeSection({ content, isPostDetail }: { content: CodeSectionContent, isPostDetail?: boolean }) {
    const [copied, setCopied] = useState(false);
    const template = content.template || "style-1";

    const handleCopy = async () => {
        if (!content.code) return;
        try {
            await navigator.clipboard.writeText(content.code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error("Failed to copy code:", err);
        }
    };

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : (template === "style-2" ? "readable" : "narrow")}
            padding={isPostDetail ? "sm" : "lg"}
            align="left"
            background={template === "style-3" ? "muted" : "none"}
            variant={isPostDetail ? "post" : "default"}
        >
            {(content.heading || content.subheading) && (
                <div className={cn(
                    "mb-12 max-w-3xl mx-auto px-4",
                    template === "style-3" ? "text-left border-l-4 border-primary pl-8" : "text-center"
                )}>
                    {content.heading && (
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className={cn(
                                "mb-4 leading-tight transition-all duration-700",
                                template === "style-1" && "text-3xl md:text-5xl font-black tracking-tight",
                                template === "style-2" && "text-2xl md:text-4xl font-serif font-light tracking-tight italic",
                                template === "style-3" && "text-4xl md:text-6xl font-black uppercase tracking-tighter",
                                "break-words"
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
                                "text-muted-foreground leading-relaxed transition-all duration-700",
                                template === "style-1" && "text-lg font-light",
                                template === "style-2" && "text-base font-serif italic opacity-80",
                                template === "style-3" && "text-sm font-mono uppercase tracking-[0.2em] opacity-60"
                            )}
                        >
                            {content.subheading}
                        </motion.p>
                    )}
                </div>
            )}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative group overflow-hidden transition-all duration-700",
                    template === "style-1" && "rounded-[2rem] border border-primary/10 bg-zinc-950 shadow-2xl",
                    template === "style-2" && "rounded-none border-y border-primary/10 bg-transparent",
                    template === "style-3" && "rounded-none border-4 border-primary bg-zinc-950 shadow-[15px_15px_0_0_black]"
                )}
            >
                {/* Editor Header */}
                <div className={cn(
                    "flex items-center justify-between px-6 py-4",
                    template === "style-1" && "bg-zinc-900/80 backdrop-blur-xl border-b border-white/5",
                    template === "style-2" && "bg-transparent border-b border-primary/5",
                    template === "style-3" && "bg-primary text-primary-foreground font-mono"
                )}>
                    <div className="flex items-center gap-4">
                        {template === "style-1" && (
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-rose-500/40 border border-rose-500/20" />
                                <div className="w-3 h-3 rounded-full bg-amber-500/40 border border-amber-500/20" />
                                <div className="w-3 h-3 rounded-full bg-emerald-500/40 border border-emerald-500/20" />
                            </div>
                        )}
                        {template === "style-1" && <div className="h-4 w-px bg-white/10 mx-2" />}
                        <span className={cn(
                            "flex items-center gap-2 transition-all",
                            template === "style-1" && "text-[10px] text-zinc-400 font-black uppercase tracking-[0.3em]",
                            template === "style-2" && "text-xs text-primary font-serif italic tracking-wide",
                            template === "style-3" && "text-sm font-black uppercase"
                        )}>
                            {template === "style-3" ? <Code2 className="w-4 h-4" /> : <Terminal className="w-3.5 h-3.5" />}
                            {content.language || "source code"}
                        </span>
                    </div>

                    <button
                        onClick={handleCopy}
                        className={cn(
                            "p-2 transition-all active:scale-95",
                            template === "style-1" && "rounded-xl bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10",
                            template === "style-2" && "text-primary/40 hover:text-primary",
                            template === "style-3" && "bg-white text-black font-bold text-xs uppercase px-4 py-1 hover:translate-x-1 hover:translate-y-1 hover:shadow-none shadow-[4px_4px_0_0_black]"
                        )}
                    >
                        {copied ? (
                            <span className="flex items-center gap-1">
                                <Check className="h-4 w-4" />
                                {template === "style-3" && "COPIED"}
                            </span>
                        ) : (
                            <span className="flex items-center gap-1">
                                <Copy className="h-4 w-4" />
                                {template === "style-3" && "COPY"}
                            </span>
                        )}
                    </button>
                </div>

                {/* Code Body */}
                <div className="relative">
                    <pre className={cn(
                        "overflow-x-auto scrollbar-thin transition-all",
                        template === "style-1" && "p-8 md:p-10 scrollbar-thumb-zinc-800 scrollbar-track-transparent bg-zinc-950",
                        template === "style-2" && "p-6 scrollbar-thumb-primary/10 scrollbar-track-transparent bg-card/10",
                        template === "style-3" && "p-8 scrollbar-thumb-primary scrollbar-track-zinc-900 bg-zinc-900"
                    )}>
                        <code className={cn(
                            "text-sm md:text-base font-mono leading-relaxed transition-all",
                            template === "style-1" && "text-zinc-300",
                            template === "style-2" && "text-foreground/80",
                            template === "style-3" && "text-emerald-500"
                        )}>
                            {content.code}
                        </code>
                    </pre>

                    {/* Gradient Glows */}
                    {template === "style-1" && (
                        <>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-[60px] pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/2 blur-[60px] pointer-events-none" />
                        </>
                    )}
                </div>

                {/* Accents */}
                {template === "style-1" && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary/20 group-hover:bg-primary transition-all duration-700" />
                )}
                {template === "style-3" && (
                    <div className="absolute bottom-4 right-4 text-[10px] font-mono text-primary/30 uppercase tracking-[0.5em] pointer-events-none">
                        System Ready_
                    </div>
                )}
            </motion.div>
        </SectionLayout>
    );
}
