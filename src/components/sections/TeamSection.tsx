import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { Twitter, Linkedin, Github, Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface TeamMember {
    name: string;
    role: string;
    bio?: string;
    avatar?: string;
    social?: { twitter?: string; linkedin?: string; github?: string }
}

interface TeamSectionContent {
    heading?: string;
    subheading?: string;
    members?: TeamMember[];
    template?: string;
}

export function TeamSection({ content }: { content: TeamSectionContent }) {
    const members = content.members || [];
    const template = content.template || "style-1";

    const displayMembers = members.length > 0 ? members : [
        {
            name: "Alexander Vance",
            role: "Principal Architect",
            bio: "Driving the technical vision and premium aesthetic of our next-gen platform.",
            social: { twitter: "#", linkedin: "#", github: "#" }
        },
        {
            name: "Sarah Montgomery",
            role: "Design Director",
            bio: "Crafting immersive digital experiences that blend beauty with absolute performance.",
            social: { twitter: "#", linkedin: "#" }
        },
        {
            name: "Marcus Thorne",
            role: "Product Strategy",
            bio: "Bridging the gap between complex technology and human-centric design.",
            social: { twitter: "#", github: "#" }
        },
        {
            name: "Elena Rossi",
            role: "Engineering Lead",
            bio: "Specializing in high-performance architectures and buttery smooth animations.",
            social: { linkedin: "#", github: "#" }
        }
    ];

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Team
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                {/* Header Strip */}
                {(content.heading || content.subheading) && (
                    <div className="border-b border-border p-8 md:p-20">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                            {content.heading && (
                                <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.85]">
                                    {content.heading}
                                </h2>
                            )}
                            {content.subheading && (
                                <div className="md:border-l md:border-foreground/10 md:pl-8">
                                    <p className="text-lg text-muted-foreground font-mono">
                                        {content.subheading}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-border">
                    {displayMembers.map((member, i) => (
                        <div key={i} className="group min-h-[500px] flex flex-col justify-between p-8 hover:bg-muted/30 transition-colors relative">
                            <div className="mb-8 overflow-hidden aspect-[4/5] bg-muted relative">
                                {member.avatar ? (
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground font-mono text-4xl">
                                        {member.name.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-6 h-6 text-foreground" />
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between items-baseline mb-2">
                                    <h3 className="text-xl font-bold uppercase tracking-wider">{member.name}</h3>
                                </div>
                                <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-4">{member.role}</p>

                                <div className="flex gap-4 pt-4 border-t border-border/50">
                                    {member.social?.twitter && <Twitter className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />}
                                    {member.social?.linkedin && <Linkedin className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />}
                                    {member.social?.github && <Github className="w-4 h-4 hover:text-primary cursor-pointer transition-colors" />}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Team
        return (
            <SectionLayout width="container" padding="lg">
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
                        {content.heading && (
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6">
                                {content.heading}
                            </h2>
                        )}
                        {content.subheading && (
                            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                {content.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {displayMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -10 }}
                            className="group"
                        >
                            <div className="relative mb-6 rounded-[2.5rem] overflow-hidden aspect-[3/4] shadow-md group-hover:shadow-xl transition-all duration-500">
                                {member.avatar ? (
                                    <img
                                        src={member.avatar}
                                        alt={member.name}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-primary/20">
                                        <Sparkles className="w-20 h-20" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-8">
                                    <div className="flex gap-4 text-white">
                                        {member.social?.twitter && <Twitter className="w-5 h-5 hover:text-primary-foreground transition-colors cursor-pointer" />}
                                        {member.social?.linkedin && <Linkedin className="w-5 h-5 hover:text-primary-foreground transition-colors cursor-pointer" />}
                                        {member.social?.github && <Github className="w-5 h-5 hover:text-primary-foreground transition-colors cursor-pointer" />}
                                    </div>
                                </div>
                            </div>

                            <div className="text-center">
                                <h3 className="text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">{member.name}</h3>
                                <p className="text-muted-foreground font-medium">{member.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full">
                {/* Background Decor - Style 1 only */}
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-24 -top-24 h-96 w-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -right-24 bottom-24 h-96 w-96 bg-primary/2 blur-[150px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-32 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-8 leading-[1] md:leading-[0.9]",
                                    template === "style-1" && "text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight italic",
                                    template === "style-3" && "text-5xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter"
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
                                    "leading-relaxed transition-all duration-700",
                                    template === "style-1" && "text-lg md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto",
                                    template === "style-2" && "text-xl md:text-2xl text-muted-foreground font-serif italic py-6 border-y border-primary/10 max-w-2xl mx-auto",
                                    template === "style-3" && "text-sm md:text-lg font-mono uppercase tracking-widest opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 md:gap-y-24",
                    template === "style-2" && "gap-y-12"
                )}>
                    {displayMembers.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative"
                        >
                            <div className="relative mb-8 overflow-hidden">
                                {template === "style-1" && (
                                    <div className="absolute inset-0 bg-primary/20 blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                )}

                                <div className={cn(
                                    "relative w-full aspect-[3/4] overflow-hidden transition-all duration-700",
                                    template === "style-1" && "rounded-[2rem] bg-card/40 dark:bg-card/20 backdrop-blur-xl border border-primary/10 group-hover:border-primary/30 group-hover:translate-y-[-8px] shadow-2xl group-hover:shadow-primary/20",
                                    template === "style-2" && "rounded-full grayscale hover:grayscale-0",
                                    template === "style-3" && "rounded-none border-2 border-primary/20 group-hover:border-primary grayscale group-hover:grayscale-0 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] group-hover:translate-x-[-4px] group-hover:translate-y-[-4px] group-hover:shadow-[12px_12px_0px_0px_rgba(var(--primary),1)]"
                                )}>
                                    {member.avatar ? (
                                        <img
                                            src={member.avatar}
                                            alt={member.name}
                                            className={cn(
                                                "w-full h-full object-cover transition-transform duration-1000",
                                                template === "style-1" && "group-hover:scale-110",
                                                template === "style-2" && "scale-105 group-hover:scale-100",
                                                template === "style-3" && "group-hover:scale-110"
                                            )}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-muted/50 text-muted-foreground/50">
                                            {template === "style-1" ? <Sparkles className="h-12 w-12 opacity-50" /> : <span className="text-4xl font-bold opacity-30">{member.name[0]}</span>}
                                        </div>
                                    )}

                                    {/* Social Overlay - Style 1 */}
                                    {template === "style-1" && (
                                        <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex justify-center gap-4">
                                            {member.social?.twitter && <Twitter className="h-5 w-5 text-white/80 hover:text-white cursor-pointer transition-colors" />}
                                            {member.social?.linkedin && <Linkedin className="h-5 w-5 text-white/80 hover:text-white cursor-pointer transition-colors" />}
                                            {member.social?.github && <Github className="h-5 w-5 text-white/80 hover:text-white cursor-pointer transition-colors" />}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className={cn(
                                "text-center",
                                template === "style-3" && "text-left pl-2"
                            )}>
                                <h3 className={cn(
                                    "mb-2 transition-colors duration-500",
                                    template === "style-1" && "text-2xl font-bold tracking-tight group-hover:text-primary",
                                    template === "style-2" && "text-3xl font-serif font-medium",
                                    template === "style-3" && "text-xl font-black uppercase tracking-widest"
                                )}>
                                    {member.name}
                                </h3>
                                <p className={cn(
                                    "mb-4 transition-colors duration-500",
                                    template === "style-1" && "text-sm font-bold uppercase tracking-[0.2em] text-primary/80 group-hover:text-primary",
                                    template === "style-2" && "text-base font-serif italic text-muted-foreground",
                                    template === "style-3" && "text-xs font-mono text-primary bg-primary/10 inline-block px-2 py-1"
                                )}>
                                    {member.role}
                                </p>
                                {member.bio && (
                                    <p className={cn(
                                        "text-muted-foreground transition-opacity duration-500",
                                        template === "style-1" && "text-sm leading-relaxed opacity-60 group-hover:opacity-100",
                                        template === "style-2" && "text-sm italic opacity-80",
                                        template === "style-3" && "text-xs font-mono leading-relaxed mt-2"
                                    )}>
                                        {member.bio}
                                    </p>
                                )}

                                {/* Socials for Styles 2 & 3 */}
                                {template !== "style-1" && (
                                    <div className={cn(
                                        "flex gap-4 mt-4 transition-opacity",
                                        template === "style-2" && "justify-center opacity-40 group-hover:opacity-100",
                                        template === "style-3" && "justify-start border-t border-border mt-4 pt-4 opacity-60 group-hover:opacity-100"
                                    )}>
                                        {member.social?.twitter && <Twitter className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />}
                                        {member.social?.linkedin && <Linkedin className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />}
                                        {member.social?.github && <Github className="h-4 w-4 hover:text-primary cursor-pointer transition-colors" />}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
