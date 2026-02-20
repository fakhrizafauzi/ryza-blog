import { cn } from "@/lib/utils";
import React from "react";

export interface SectionLayoutProps {
    children: React.ReactNode;
    // Layout controls
    width?: "full" | "wide" | "container" | "narrow" | "readable";
    padding?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    background?: "default" | "muted" | "primary" | "dark" | "none";

    // Aesthetic modifiers
    glass?: boolean;
    border?: "none" | "top" | "bottom" | "both";

    // Legacy/Alignment support (optional toggle)
    align?: "left" | "center" | "right";

    // Layout variations
    variant?: "default" | "post";
    // Template Support (Style 1-5)
    template?: string; // e.g. "style-1", "style-4"

    id?: string;
    className?: string;
}

export function SectionLayout({
    children,
    width = "container",
    padding = "lg",
    background = "none",
    glass = false,
    border = "none",
    align = "left",
    variant = "default",
    template,
    id,
    className
}: SectionLayoutProps) {

    // Helper to resolve defaults based on template if not explicitly overridden
    const resolveDefaults = () => {
        // If it's a POST variant, enforce readable width and moderate padding by default,
        // UNLESS the template specifically demands otherwise (like "full width" style).
        // But for a "news detail" look, almost everything should be readable width.
        if (variant === "post") {
            // For posts, we override defaults to ensure readability
            // Styles can still apply (e.g. background color, fonts), but layout is constrained.
            if (!template) {
                return { width: "readable", padding: "sm", background, border };
            }

            // If template exists, we might want to respect its "vibe" but constrain width
            switch (template) {
                case "style-4": // Swiss - keep full width capability but maybe pad it? 
                    // Actually, Swiss usually looks good full width. Let's keep it if explicitly requested.
                    // But user said "too much margin". 
                    // Let's force readable width for everything in post detail except generic full-width sections.
                    return {
                        width: width === "container" ? "readable" : width,
                        padding: padding === "lg" ? "sm" : padding, // Reduce default padding
                        background: "none",
                        border: "bottom"
                    };
                default:
                    return {
                        width: width === "container" ? "readable" : width,
                        padding: padding === "lg" ? "sm" : padding,
                        background: background === "none" ? (template === "style-3" ? "primary" : "none") : background,
                        border: border
                    };
            }
        }

        if (!template) return { width, padding, background, border };

        switch (template) {
            case "style-2": // Editorial / Serif
                return {
                    width: width === "container" ? "readable" : width, // Default to readable for text
                    padding: padding === "lg" ? "lg" : padding,
                    background: background === "none" ? "muted" : background,
                    border: border === "none" ? "none" : border,
                };
            case "style-3": // Brutalist / Bold
                return {
                    width: width,
                    padding: padding === "lg" ? "xl" : padding,
                    background: background === "none" ? "primary" : background,
                    border: "both" // Enforce borders
                };
            case "style-4": // Swiss / Technical
                return {
                    width: width === "container" ? "full" : width,
                    padding: padding === "lg" ? "none" : padding, // Often handles its own padding
                    background: "none",
                    border: "bottom"
                };
            case "style-5": // Organic / Soft
                return {
                    width: width,
                    padding: "lg",
                    background: "none", // Often uses floating cards/blobs
                    border: "none"
                };
            default: // Style 1 or unknown
                return { width, padding, background, border };
        }
    };

    // Use resolved values or props if no template
    const resolved = template ? resolveDefaults() : { width, padding, background, border };

    // Override resolved with explicit props if they differ from default? 
    // Actually, the prop is passed in, so we should prioritize the PROP if it was set explicitly by the user, 
    // but here we only know the final value.
    // A better way: The component caller usually passes defaults.
    // Let's assume if the prop matches the default default ("container", "lg", etc), we can override.

    // Re-assign for internal use
    const finalWidth = resolved.width as keyof typeof widthClasses;
    const finalPadding = resolved.padding as keyof typeof paddingClasses;
    const finalBg = resolved.background as keyof typeof bgClasses;
    const finalBorder = resolved.border as keyof typeof borderClasses; // Note: type cast might be needed if values differ string-wise

    const widthClasses = {
        full: "w-full px-0",
        wide: "container max-w-7xl px-4 sm:px-10 md:px-12",
        container: "container px-4 sm:px-8 md:px-10",
        readable: "container max-w-4xl px-4 sm:px-10",
        narrow: "container max-w-2xl px-6",
    };

    const paddingClasses = {
        none: "py-0",
        xs: "py-4 md:py-6",
        sm: "py-8 md:py-12",
        md: "py-12 md:py-20",
        lg: "py-14 sm:py-20 md:py-28 lg:py-36",
        xl: "py-24 md:py-40 lg:py-48",
    };

    const bgClasses = {
        default: "bg-background",
        muted: "bg-muted/30 dark:bg-muted/10",
        primary: "bg-primary text-primary-foreground",
        dark: "bg-zinc-900 border-zinc-800 text-white dark:bg-black",
        none: "bg-transparent",
    };

    const alignClasses = {
        left: "text-left items-start w-full",
        center: "text-center items-center mx-auto w-full",
        right: "text-right items-end ml-auto w-full",
    };

    const borderClasses = {
        none: "",
        top: "border-t border-border/40",
        bottom: "border-b border-border/40",
        both: "border-y border-border/40",
    };

    // Wrapper class handles background and vertical padding
    const sectionClass = cn(
        "relative w-full overflow-hidden transition-colors duration-700",
        bgClasses[finalBg] || bgClasses.default,
        paddingClasses[finalPadding] || paddingClasses.md,
        borderClasses[finalBorder] || borderClasses.none,
        glass && "backdrop-blur-xl bg-background/60 dark:bg-background/40 border border-white/10 dark:border-white/5 shadow-2xl",
        className
    );

    const variantClasses = cn(
        variant === "post" && [
            "prose-xl md:prose-2xl",
            "prose-p:leading-relaxed prose-p:text-foreground/90",
            "prose-headings:text-foreground prose-headings:font-black",
            "[&_p]:mb-8",
            "selection:bg-primary/20",
        ]
    );

    // Inner container handles max-width and horizontal padding
    const containerClass = cn(
        "mx-auto flex flex-col h-full relative z-10",
        widthClasses[finalWidth] || widthClasses.container,
        alignClasses[align]
    );

    return (
        <section id={id} className={sectionClass}>
            {/* Ambient Background Effects */}
            {background === 'dark' && (
                <>
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none mix-blend-overlay" />
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
                </>
            )}

            {background === 'default' && (
                <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20 pointer-events-none" />
            )}

            {/* Template Grid Overlay (Subtle) */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
                style={{ backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`, backgroundSize: '40px 40px' }}
            />

            <div className={cn(containerClass, variantClasses)}>
                {children}
            </div>
        </section>
    );
}
