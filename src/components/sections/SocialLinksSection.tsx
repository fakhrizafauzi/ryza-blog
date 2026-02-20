import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useSiteSettings } from "@/components/shared/SiteSettingsProvider";
import * as Icons from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialLinkItem { platform: string; url: string; icon?: string; label?: string; }
interface SocialLinksSectionContent {
    heading?: string;
    subheading?: string;
    links?: SocialLinkItem[];
    template?: string;
}

const ICON_MAP: Record<string, keyof typeof Icons> = {
    twitter: "Twitter",
    github: "Github",
    linkedin: "Linkedin",
    instagram: "Instagram",
    youtube: "Youtube",
    facebook: "Facebook",
    tiktok: "Music2",
    discord: "MessageSquare",
    twitch: "Twitch",
    mastodon: "Share2",
    bluesky: "Cloud",
    website: "Globe",
    email: "Mail",
};

export function SocialLinksSection({ content }: { content: SocialLinksSectionContent }) {
    const { settings } = useSiteSettings();
    const template = content.template || "style-1";

    const links = (content.links && content.links.length > 0)
        ? content.links
        : settings.socialLinks.filter(l => l.enabled).map(l => ({
            platform: l.platform,
            url: l.url,
            label: l.label,
            icon: l.icon
        }));

    if (links.length === 0) return null;

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "narrow"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full">
                {/* Background Decor - Style 1 only */}
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-32 -top-32 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                        <div className="absolute -right-32 bottom-24 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-24 md:mb-32 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-8 leading-[0.9] tracking-tighter",
                                    template === "style-1" && "text-4xl md:text-7xl font-black",
                                    template === "style-2" && "text-4xl md:text-5xl font-serif font-light tracking-tight italic",
                                    template === "style-3" && "text-4xl md:text-6xl font-black uppercase"
                                )}
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "leading-relaxed max-w-2xl transition-all duration-700",
                                    template === "style-1" && "text-xl text-muted-foreground font-light mx-auto",
                                    template === "style-2" && "text-base md:text-lg text-muted-foreground font-serif italic py-6 border-y border-primary/10 mx-auto",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60 ml-0 mr-auto"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "flex flex-wrap items-stretch gap-10 md:gap-14 transition-all duration-700",
                    template === "style-2" ? "justify-center md:grid md:grid-cols-2 lg:grid-cols-3" : "justify-center"
                )}>
                    {links.map((link, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.1, type: "spring", stiffness: 100 }}
                        >
                            <MagneticSocialCard link={link} template={template} />
                        </motion.div>
                    ))}
                </div>

                {/* Visual Accent */}
                <div className="mt-24 flex justify-center">
                    <div className={cn(
                        "flex items-center gap-6",
                        template === "style-2" && "opacity-20",
                        template === "style-3" && "flex-col gap-2"
                    )}>
                        {template !== "style-3" && <div className="h-px w-16 bg-gradient-to-r from-transparent to-primary/20" />}
                        <Sparkles className={cn(
                            "h-5 w-5 text-primary/20 transition-all",
                            template === "style-1" && "animate-pulse",
                            template === "style-3" && "text-primary/40 rotate-12"
                        )} />
                        {template !== "style-3" && <div className="h-px w-16 bg-gradient-to-l from-transparent to-primary/20" />}
                        {template === "style-3" && <span className="text-[10px] font-mono uppercase tracking-[0.5em] opacity-40">End_Section</span>}
                    </div>
                </div>
            </div>
        </SectionLayout>
    );
}

function MagneticSocialCard({ link, template }: { link: SocialLinkItem, template: string }) {
    const ref = useRef<HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e: React.MouseEvent) => {
        if (template !== "style-1") return;
        const { clientX, clientY } = e;
        const rect = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (rect.left + rect.width / 2);
        const middleY = clientY - (rect.top + rect.height / 2);
        setPosition({ x: middleX * 0.4, y: middleY * 0.4 });
    };

    const reset = () => {
        setPosition({ x: 0, y: 0 });
    };

    const IconName = ICON_MAP[link.platform.toLowerCase()] || "Link";
    // @ts-ignore
    const LucideIcon = Icons[IconName] as React.ElementType || Icons.Link;

    return (
        <motion.a
            ref={ref}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "relative group flex flex-col items-center justify-center transition-all duration-700 overflow-hidden h-full",
                template === "style-1" && "p-12 md:p-14 rounded-[4rem] bg-card/40 backdrop-blur-3xl border border-primary/10 hover:border-primary/30 shadow-2xl hover:shadow-primary/10",
                template === "style-2" && "p-8 md:p-12 bg-transparent border-0 hover:scale-110",
                template === "style-3" && "p-10 md:p-12 border-4 border-primary bg-card rounded-none shadow-[8px_8px_0_0_black] dark:shadow-[8px_8px_0_0_white] hover:translate-x-2 hover:-translate-y-2"
            )}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={template === "style-1" ? { x: position.x, y: position.y } : {}}
            transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.2 }}
        >
            {/* Halo Depth Effect - Style 1 only */}
            {template === "style-1" && (
                <>
                    <div className="absolute inset-0 bg-primary/2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <div className="absolute -inset-10 bg-primary/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                </>
            )}

            <div className={cn(
                "relative z-10 flex flex-col items-center",
                template === "style-1" && "gap-8",
                template === "style-2" && "gap-4",
                template === "style-3" && "gap-6"
            )}>
                <div className="relative">
                    {/* Style 1 Decor */}
                    {template === "style-1" && (
                        <div className="absolute -inset-4 bg-primary/30 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    )}

                    <div className={cn(
                        "transition-all duration-700 flex items-center justify-center",
                        template === "style-1" && "relative p-7 rounded-[2rem] bg-primary/5 text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground shadow-2xl group-hover:scale-110",
                        template === "style-2" && "p-6 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                        template === "style-3" && "p-6 bg-primary text-primary-foreground rounded-none rotate-3 group-hover:rotate-0"
                    )}>
                        <LucideIcon className={cn(
                            "stroke-[1]",
                            template === "style-1" && "w-12 h-12",
                            template === "style-2" && "w-10 h-10 stroke-[2]",
                            template === "style-3" && "w-10 h-10 stroke-[2.5]"
                        )} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-1">
                    <span className={cn(
                        "uppercase transition-all duration-500",
                        template === "style-1" && "text-[10px] font-black tracking-[0.5em] text-muted-foreground/40 group-hover:text-primary",
                        template === "style-2" && "text-sm font-serif italic text-muted-foreground/60 group-hover:text-primary",
                        template === "style-3" && "text-xs font-mono font-bold tracking-widest text-primary/60 group-hover:text-primary"
                    )}>
                        {link.platform}
                    </span>
                    <span className={cn(
                        "uppercase transition-all duration-700",
                        template === "style-1" && "text-xs font-black tracking-[0.2em] text-foreground opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0",
                        template === "style-2" && "hidden",
                        template === "style-3" && "text-[10px] font-mono font-black opacity-30 group-hover:opacity-100"
                    )}>
                        {link.label || "Connect"}
                    </span>
                </div>
            </div>

            {/* Magnetic Tracer Dot - Style 1 only */}
            {template === "style-1" && (
                <motion.div
                    animate={{ x: position.x * 1.8, y: position.y * 1.8 }}
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity shadow-[0_0_20px_rgba(var(--primary),0.8)]"
                />
            )}

            {/* Subtle Grid Pattern Overlay - Style 1 & 3 */}
            {(template === "style-1" || template === "style-3") && (
                <div className="absolute inset-0 opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity duration-1000"
                    style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "24px 24px" }}
                />
            )}
        </motion.a>
    );
}
