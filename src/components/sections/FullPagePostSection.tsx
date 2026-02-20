import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Facebook, Twitter, Linkedin, Link as LinkIcon, ArrowRight, Quote } from "lucide-react";
import { ZoomableImage } from "@/components/ui/ZoomableImage";
import { Lightbox } from "@/components/ui/Lightbox";
import { useState, useRef, useEffect } from "react";

interface FullPagePostSectionProps {
    type: string;
    content: {
        heading?: string;
        subheading?: string;
        category?: string;
        author?: string;
        date?: string;
        image?: string;
        html?: string;
        intro?: string;
        quote?: string;
        quoteAuthor?: string;
        galleryImages?: { url: string }[];
        tags?: string;
        showShare?: boolean;
        showBio?: boolean;
        showRelated?: boolean;
        showTOC?: boolean;
        showNewsletter?: boolean;
        [key: string]: any;
    };
    isPostDetail?: boolean;
}

export function FullPagePostSection({ type, content }: FullPagePostSectionProps) {
    // --- Helper Components for "Full Page" Experience ---
    const template = content.template || "style-1";

    const Tags = ({ className }: { className?: string }) => {
        if (!content.tags) return null;
        const tagsList = content.tags.split(",").map(t => t.trim()).filter(Boolean);
        if (tagsList.length === 0) return null;
        return (
            <div className={cn("flex flex-wrap gap-2 mt-8", className)}>
                {tagsList.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs uppercase tracking-wider py-1 px-3 border-foreground/20 text-foreground/70 hover:bg-foreground/5 transition-colors cursor-pointer">
                        #{tag}
                    </Badge>
                ))}
            </div>
        );
    };

    const ShareButtons = ({ className }: { className?: string }) => {
        if (!content.showShare) return null;
        return (
            <div className={cn("flex items-center gap-4 py-6 border-y border-border/40 my-8", className)}>
                <span className="text-sm font-bold uppercase tracking-widest opacity-60 mr-2">Share</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#1DA1F2]/10 hover:text-[#1DA1F2]"><Twitter className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#1877F2]/10 hover:text-[#1877F2]"><Facebook className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-[#0A66C2]/10 hover:text-[#0A66C2]"><Linkedin className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-primary/10 hover:text-primary"><LinkIcon className="h-4 w-4" /></Button>
            </div>
        );
    };

    const AuthorBio = ({ className }: { className?: string }) => {
        if (!content.showBio) return null;
        return (
            <div className={cn("bg-accent/30 rounded-2xl p-8 flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left my-12", className)}>
                <div className="h-20 w-20 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-2xl font-black text-primary shrink-0">
                    {content.author ? content.author.charAt(0) : "A"}
                </div>
                <div className="space-y-2">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">About the Author</p>
                    <h4 className="text-xl font-bold">{content.author || "Author"}</h4>
                    <p className="text-muted-foreground text-sm max-w-lg">
                        Passionate about technology and design. Sharing insights on the future of digital landscapes and verifying the integrity of complex systems.
                    </p>
                    <Button variant="link" className="p-0 h-auto font-bold text-primary">View all posts <ArrowRight className="ml-1 h-3 w-3" /></Button>
                </div>
            </div>
        );
    };

    const RelatedPosts = ({ className }: { className?: string }) => {
        if (!content.showRelated) return null;
        return (
            <div className={cn("space-y-8 my-16 pt-12 border-t", className)}>
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold">Related Articles</h3>
                    <Button variant="outline" size="sm" className="hidden md:flex">Browse Blog</Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group cursor-pointer space-y-3">
                            <div className="aspect-video bg-muted rounded-xl bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center relative overflow-hidden">
                                <span className="text-muted-foreground/20 text-4xl font-black group-hover:scale-110 transition-transform duration-500">0{i}</span>
                            </div>
                            <div className="space-y-1">
                                <p className="text-xs font-bold text-primary uppercase tracking-wider">Category</p>
                                <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">Understanding the Nuances of Modern Web Design</h4>
                            </div>
                        </div>
                    ))}
                </div>
                <Button variant="outline" className="w-full md:hidden">Browse Blog</Button>
            </div>
        );
    };

    const PostFooter = ({ className }: { className?: string }) => (
        <div className={cn("mt-12", className)}>
            <Tags />
            <ShareButtons />
            <AuthorBio />
            <RelatedPosts />
        </div>
    );

    // --- New Sections (Intro, TOC, Quote, Gallery, Newsletter) ---

    const IntroSection = ({ className }: { className?: string }) => {
        if (!content.intro) return null;
        const styles = {
            "style-1": "text-xl md:text-2xl font-medium leading-relaxed text-foreground/80 mb-12 font-serif border-l-4 border-primary pl-6",
            "style-2": "text-xl md:text-2xl leading-relaxed text-foreground/90 mb-12 font-light tracking-wide text-center max-w-2xl mx-auto",
            "style-3": "text-2xl md:text-3xl font-black uppercase leading-tight text-foreground mb-12 border-b-4 border-foreground pb-6",
            "style-4": "text-lg md:text-xl font-mono text-primary mb-12 border border-primary/20 p-6 bg-primary/5",
            "style-5": "text-xl md:text-2xl font-serif italic text-foreground/80 mb-12 bg-secondary/30 p-8 rounded-[3rem]"
        };
        return <div className={cn(styles[template as keyof typeof styles] || styles["style-1"], className)}>{content.intro}</div>;
    };

    const TOCSection = () => {
        if (!content.showTOC) return null;
        const styles = {
            "style-1": "bg-muted/30 p-8 rounded-xl mb-12 border border-border/50",
            "style-2": "bg-transparent py-8 border-y border-border mb-12",
            "style-3": "bg-foreground text-background p-8 mb-12 rounded-none",
            "style-4": "bg-background border border-primary p-6 mb-12 font-mono text-xs",
            "style-5": "bg-secondary/20 p-10 rounded-3xl mb-12"
        };
        return (
            <div className={cn(styles[template as keyof typeof styles] || styles["style-1"])}>
                <h4 className={cn("font-bold uppercase tracking-widest text-xs mb-4", template === "style-3" ? "text-background/70" : "text-muted-foreground")}>Table of Contents</h4>
                <ul className="space-y-3 text-sm font-medium">
                    {["Introduction", "Key Concepts", "Detailed Analysis", "Final Thoughts"].map((item, i) => (
                        <li key={i} className="flex items-center gap-3 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                            <span className={cn("w-1.5 h-1.5 rounded-full", template === "style-3" ? "bg-background" : "bg-primary")} /> {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    const QuoteBlock = () => {
        if (!content.quote) return null;
        return (
            <div className="my-16 relative py-8">
                {template !== "style-2" && (
                    <div className="absolute -top-4 -left-4 text-primary/10 pointer-events-none select-none">
                        <Quote className="h-24 w-24 -scale-x-100 fill-current" />
                    </div>
                )}
                <blockquote className={cn(
                    "relative z-10 text-center mx-auto",
                    template === "style-1" && "text-3xl md:text-4xl font-black italic text-foreground/90 max-w-4xl",
                    template === "style-2" && "text-2xl md:text-3xl font-serif text-foreground/80 max-w-3xl border-l-2 border-primary pl-6 text-left mx-0",
                    template === "style-3" && "text-4xl md:text-6xl font-black uppercase text-primary leading-[0.9]",
                    template === "style-4" && "text-xl font-mono border-l-4 border-primary p-6 bg-muted",
                    template === "style-5" && "text-3xl font-serif italic text-secondary-foreground"
                )}>
                    "{content.quote}"
                    {content.quoteAuthor && (
                        <footer className="mt-6 text-sm font-bold uppercase tracking-widest opacity-70 not-italic">
                            — {content.quoteAuthor}
                        </footer>
                    )}
                </blockquote>
            </div>
        );
    };

    const GalleryBlock = () => {
        const images = content.galleryImages;
        if (!images || images.length === 0) return null;
        return (
            <div className="my-20">
                <h4 className="font-bold text-xs uppercase tracking-widest text-muted-foreground mb-8 text-center md:text-left">Gallery</h4>
                <div className={cn(
                    "grid gap-4",
                    template === "style-3" ? "gap-0" : "gap-4",
                    "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                )}>
                    {images.map((img, i) => (
                        <div key={i} className={cn(
                            "overflow-hidden bg-muted group relative",
                            template === "style-1" && "aspect-square rounded-xl",
                            template === "style-2" && "aspect-[3/4] rounded-none",
                            template === "style-3" && "aspect-square border-2 border-background",
                            template === "style-4" && "aspect-video border border-primary/20 grayscale hover:grayscale-0",
                            template === "style-5" && "aspect-square rounded-[2rem]"
                        )}>
                            <ZoomableImage src={img.url} alt={`Gallery ${i}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const NewsletterBlock = () => {
        if (!content.showNewsletter) return null;
        return (
            <div className={cn(
                "my-20 relative overflow-hidden text-center",
                template === "style-1" && "bg-primary/5 p-12 rounded-3xl border border-primary/10",
                template === "style-2" && "py-12 border-t border-b border-border",
                template === "style-3" && "bg-primary text-primary-foreground p-16 font-black",
                template === "style-4" && "bg-black text-green-500 p-8 font-mono border border-green-500/50",
                template === "style-5" && "bg-gradient-to-tr from-pink-100 to-blue-100 dark:from-pink-900/20 dark:to-blue-900/20 p-12 rounded-[30%_70%_70%_30%/30%_30%_70%_70%]"
            )}>
                <h3 className="text-2xl font-bold mb-4 relative z-10">Stay Updated</h3>
                <p className="opacity-80 mb-8 max-w-md mx-auto relative z-10">Join our newsletter.</p>
                <div className="flex flex-col sm:flex-row max-w-sm mx-auto gap-2 relative z-10">
                    <Input placeholder="email@example.com" className="bg-background/50 border-foreground/10" />
                    <Button variant={template === "style-3" ? "secondary" : "default"}>Subscribe</Button>
                </div>
            </div>
        );
    };

    // Shared Content Elements
    const Meta = ({ className }: { className?: string }) => (
        <div className={cn(
            "flex flex-wrap items-center gap-3 text-sm font-medium tracking-wide uppercase opacity-80",
            template === "style-4" && "font-mono text-xs",
            className
        )}>
            {content.category && <Badge variant={template === "style-3" ? "outline" : "secondary"} className={cn("rounded-full px-3", template === "style-3" && "rounded-none border-foreground text-foreground")}>{content.category}</Badge>}
            {content.date && <span>{content.date}</span>}
            {content.author && <span>By {content.author}</span>}
        </div>
    );

    const BodyText = ({ className }: { className?: string }) => {
        const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
        const containerRef = useRef<HTMLDivElement>(null);

        useEffect(() => {
            const container = containerRef.current;
            if (!container) return;

            const images = container.getElementsByTagName("img");
            const handleImageClick = (e: Event) => {
                const img = e.target as HTMLImageElement;
                if (img.src) {
                    setLightboxSrc(img.src);
                }
            };

            Array.from(images).forEach(img => {
                img.style.cursor = "zoom-in";
                img.addEventListener("click", handleImageClick);
            });

            return () => {
                Array.from(images).forEach(img => {
                    img.removeEventListener("click", handleImageClick);
                });
            };
        }, [content.html]);

        return (
            <>
                <div
                    ref={containerRef}
                    className={cn(
                        "prose prose-zinc dark:prose-invert max-w-none prose-lg md:prose-xl leading-relaxed",
                        template === "style-2" && "prose-serif",
                        template === "style-3" && "prose-mono text-sm uppercase tracking-wide",
                        template === "style-4" && "prose-base font-mono",
                        template === "style-5" && "prose-lg font-serif",
                        className
                    )}
                    dangerouslySetInnerHTML={{ __html: content.html || "" }}
                />
                <Lightbox
                    src={lightboxSrc}
                    isOpen={!!lightboxSrc}
                    onClose={() => setLightboxSrc(null)}
                />
            </>
        );
    };
    const Heading = ({ className }: { className?: string }) => (
        <h1 className={cn(
            "font-black tracking-tight leading-[1]",
            template === "style-1" && "text-4xl md:text-5xl lg:text-7xl",
            template === "style-2" && "text-4xl md:text-6xl font-serif font-light",
            template === "style-3" && "text-5xl md:text-8xl uppercase",
            template === "style-4" && "text-3xl md:text-5xl font-mono",
            template === "style-5" && "text-5xl md:text-7xl font-serif italic",
            className
        )}>
            {content.heading}
        </h1>
    );

    const Subheading = ({ className }: { className?: string }) => (
        content.subheading && (
            <p className={cn(
                "text-xl md:text-2xl text-muted-foreground leading-relaxed",
                template === "style-2" && "font-serif text-foreground/80 font-light",
                template === "style-3" && "font-bold text-foreground",
                template === "style-4" && "font-mono text-sm",
                className
            )}>
                {content.subheading}
            </p>
        )
    );




    // --- Dynamic Section Rendering ---
    const sections: Record<string, React.ReactNode> = {
        header: <div className="space-y-6 text-center"><Meta className="justify-center" /><Heading /><Subheading className="max-w-2xl mx-auto" /></div>,
        image: content.image ? <div className={cn("overflow-hidden shadow-2xl", template === "style-5" ? "rounded-[3rem]" : "rounded-2xl")}><ZoomableImage src={content.image} alt="Cover" className="w-full" /></div> : null,
        intro: <IntroSection />,
        toc: <TOCSection />,
        html: <BodyText />,
        quote: <QuoteBlock />,
        gallery: <GalleryBlock />,
        newsletter: <NewsletterBlock />,
        tags: <Tags />,
        share: <ShareButtons />,
        bio: <AuthorBio />,
        related: <RelatedPosts />
    };

    const defaultOrder = ['header', 'image', 'intro', 'toc', 'html', 'quote', 'gallery', 'newsletter', 'tags', 'share', 'bio', 'related'];
    const order = (content.sectionOrder as string[]) || defaultOrder;

    // --- Layout 1: CLASSIC (Clean, Centered, Traditional) ---
    if (type === "FULL_PAGE_CLASSIC") {
        return (
            <SectionLayout padding="none">
                <div className="container max-w-4xl mx-auto pt-0 md:pt-0 pb-12 md:pb-20 space-y-12">
                    {order.map(key => (
                        <div key={key}>{sections[key]}</div>
                    ))}
                </div>
            </SectionLayout>
        );
    }


    // --- Layout 2: MODERN (Asymmetrical, Bold Typography) ---
    if (type === "FULL_PAGE_MODERN") {
        return (
            <SectionLayout width="wide" padding="none">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-0 pb-24">
                    {/* Title Column */}
                    <div className="lg:col-span-8 flex flex-col justify-end space-y-8 mb-8 lg:mb-0">
                        <Meta />
                        <Heading className="text-6xl lg:text-8xl" />
                        <Subheading className="max-w-xl border-l-4 border-primary pl-6" />
                    </div>

                    {/* Image Column */}
                    <div className="lg:col-span-4 lg:pt-32">
                        {content.image && (
                            <div className="aspect-[3/4] rounded-none overflow-hidden relative group">
                                <ZoomableImage src={content.image} alt={content.heading} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-3 lg:col-start-2 border-t pt-8 hidden lg:block">
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Article Details</p>
                        <ul className="space-y-2 text-sm">
                            <li className="flex justify-between"><span>Read Time:</span> <span className="text-foreground">5 min</span></li>
                            <li className="flex justify-between"><span>Views:</span> <span className="text-foreground">1.2k</span></li>
                            <li className="flex justify-between"><span>Share:</span> <span className="text-foreground">Link</span></li>
                        </ul>
                    </div>
                    <div className="lg:col-span-7">
                        {order.filter(key => key !== 'header' && key !== 'image').map(key => (
                            <div key={key}>{sections[key]}</div>
                        ))}
                        <PostFooter />
                    </div>
                </div>
            </SectionLayout>
        );
    }

    // --- Layout 3: COVER (Immersive Full Screen Background) ---
    if (type === "FULL_PAGE_COVER") {
        return (
            <div className="relative w-full">
                {/* Hero Section */}
                <div className="relative h-screen min-h-[600px] w-full flex items-end pb-24">
                    {content.image && (
                        <>
                            <div className="absolute inset-0 z-0">
                                <img src={content.image} alt={content.heading} className="w-full h-full object-cover" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 pointer-events-none" />
                        </>
                    )}

                    <div className="container relative z-20 max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            <Meta className="text-primary-foreground/80" />
                            <Heading className="text-white drop-shadow-sm" />
                            <Subheading className="text-gray-200 max-w-2xl" />
                        </motion.div>
                    </div>
                </div>

                {/* Content Section */}
                <SectionLayout>
                    <div className="max-w-3xl mx-auto -mt-20 relative z-30 p-8 md:p-12 bg-background rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
                        {order.filter(key => key !== 'header' && key !== 'image').map(key => (
                            <div key={key}>{sections[key]}</div>
                        ))}
                        <PostFooter />
                    </div>
                </SectionLayout>
            </div>
        );
    }

    // --- Layout 4: GRID (Magazine Style) ---
    if (type === "FULL_PAGE_GRID") {
        return (
            <SectionLayout width="full" className="max-w-[1600px] mx-auto" padding="none">
                <div className="pt-0 pb-12 border-b mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-2 space-y-6 flex flex-col justify-center">
                            <Meta />
                            <Heading className="text-5xl lg:text-6xl" />
                            <Subheading className="text-lg leading-snug text-foreground/80" />
                        </div>
                        <div className="lg:col-span-2 h-[300px] md:h-[400px]">
                            {content.image && (
                                <ZoomableImage src={content.image} alt={content.heading} className="w-full h-full object-cover rounded-xl" />
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    <div className="md:col-span-8 md:col-start-3 lg:col-span-6 lg:col-start-4">
                        <p className="text-2xl font-serif italic text-muted-foreground mb-8 text-center leading-relaxed">
                            "{content.subheading || content.heading}"
                        </p>
                        {order.filter(key => key !== 'header' && key !== 'image').map(key => (
                            <div key={key}>{sections[key]}</div>
                        ))}
                        <PostFooter />
                    </div>
                </div>
            </SectionLayout>
        );
    }

    // --- Layout 5: SPLIT (50/50 Visual & Text) ---
    if (type === "FULL_PAGE_SPLIT") {
        return (
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Fixed Left Image */}
                <div className="lg:w-1/2 lg:h-screen lg:sticky lg:top-0 relative h-[50vh]">
                    {content.image && (
                        <ZoomableImage src={content.image} alt={content.heading} className="w-full h-full object-cover" />
                    )}
                    <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                    <div className="absolute bottom-12 left-12 right-12 text-white">
                        <Meta className="text-white/80 mb-4" />
                        <h1 className="text-4xl md:text-5xl font-black leading-tight drop-shadow-md">
                            {content.heading}
                        </h1>
                    </div>
                </div>

                {/* Scrollable Right Content */}
                <div className="lg:w-1/2 bg-background min-h-screen p-8 md:p-12 lg:p-24 overflow-y-auto">
                    {order.filter(key => key !== 'header' && key !== 'image').map(key => (
                        <div key={key}>{sections[key]}</div>
                    ))}
                    <div className="mt-12 pt-8 border-t">
                        <PostFooter />
                    </div>
                </div>
            </div>
        );
    }

    return null;
}
