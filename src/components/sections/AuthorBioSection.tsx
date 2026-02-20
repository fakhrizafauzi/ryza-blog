import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorBioSectionContent {
    name?: string;
    role?: string;
    bio?: string;
    avatar?: string;
    links?: { label: string; url: string }[];
    template?: string;
}

export function AuthorBioSection({ content }: { content: AuthorBioSectionContent }) {
    const template = content.template || "style-1";

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "narrow"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative group transition-all duration-700 overflow-hidden",
                    template === "style-1" && "p-10 md:p-16 rounded-[3rem] bg-card/40 backdrop-blur-3xl border border-primary/10 shadow-2xl",
                    template === "style-2" && "p-10 md:p-12 bg-transparent border-y border-primary/10 rounded-none",
                    template === "style-3" && "p-10 md:p-16 rounded-none bg-card border-4 border-primary shadow-[20px_20px_0_0_black]"
                )}
            >
                {/* Decorative Halo - Style 1 only */}
                {template === "style-1" && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                )}

                <div className={cn(
                    "relative z-10 flex flex-col items-center space-y-8",
                    template === "style-3" ? "text-left items-start sm:flex-row sm:items-center sm:gap-12 sm:space-y-0" : "text-center items-center"
                )}>
                    {/* Avatar Container */}
                    <div className="relative shrink-0">
                        {template === "style-1" && <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse" />}
                        <div className={cn(
                            "relative h-32 w-32 md:h-40 md:w-40 overflow-hidden shadow-2xl transition-all duration-700",
                            template === "style-1" && "rounded-full border-4 border-background",
                            template === "style-2" && "rounded-full grayscale hover:grayscale-0",
                            template === "style-3" && "rounded-none border-4 border-primary"
                        )}>
                            {content.avatar ? (
                                <img
                                    src={content.avatar}
                                    alt={content.name}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            ) : (
                                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-4xl font-black text-primary">
                                    {content.name?.charAt(0) || "A"}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className={cn(
                        "space-y-4",
                        template === "style-3" && "flex-1"
                    )}>
                        <div className="space-y-1">
                            <h3 className={cn(
                                "tracking-tighter transition-all duration-700 break-words",
                                template === "style-1" && "text-3xl md:text-5xl font-black text-foreground",
                                template === "style-2" && "text-2xl md:text-4xl font-serif font-light",
                                template === "style-3" && "text-4xl md:text-6xl font-black uppercase text-primary"
                            )}>
                                {content.name || "Author"}
                            </h3>
                            {content.role && (
                                <p className={cn(
                                    "font-black uppercase tracking-[0.4em]",
                                    template === "style-1" && "text-sm text-primary",
                                    template === "style-2" && "text-xs text-muted-foreground font-serif italic tracking-[0.2em] lowercase",
                                    template === "style-3" && "text-lg text-foreground font-mono bg-primary/10 px-2 inline-block"
                                )}>
                                    {content.role}
                                </p>
                            )}
                        </div>

                        {content.bio && (
                            <p className={cn(
                                "leading-relaxed transition-all duration-700",
                                template === "style-1" && "text-xl text-muted-foreground font-light max-w-2xl",
                                template === "style-2" && "text-lg text-muted-foreground font-serif italic font-light",
                                template === "style-3" && "text-base font-mono opacity-80"
                            )}>
                                {content.bio}
                            </p>
                        )}

                        {/* Social Links */}
                        {(content.links || []).length > 0 && (
                            <div className={cn(
                                "flex flex-wrap gap-4 pt-6",
                                template === "style-3" ? "justify-start" : "justify-center"
                            )}>
                                {content.links!.map((l, i) => (
                                    <motion.a
                                        key={i}
                                        href={l.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={template === "style-3" ? { x: 5 } : { y: -5 }}
                                        className={cn(
                                            "px-6 py-3 text-sm font-bold tracking-tight transition-all flex items-center gap-2",
                                            template === "style-1" && "rounded-2xl bg-primary/5 hover:bg-primary/10 border border-primary/10",
                                            template === "style-2" && "rounded-none border-b border-primary/20 hover:border-primary text-primary font-serif italic",
                                            template === "style-3" && "rounded-none bg-primary text-primary-foreground uppercase font-mono tracking-widest shadow-[4px_4px_0_0_black] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                        )}
                                    >
                                        {l.label}
                                        <ExternalLink className="h-3 w-3 opacity-50" />
                                    </motion.a>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Corner Accent for Style 1 */}
                {template === "style-1" && (
                    <div className="absolute bottom-0 right-0 h-4 w-4 rounded-full bg-primary/20 group-hover:scale-150 group-hover:bg-primary transition-all duration-700" />
                )}
            </motion.div>
        </SectionLayout>
    );
}
