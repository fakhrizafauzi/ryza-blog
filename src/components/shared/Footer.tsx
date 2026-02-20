import { Link } from "react-router-dom"
import * as Icons from "lucide-react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useSiteSettings } from "@/components/shared/SiteSettingsProvider"
import { cn } from "@/lib/utils"

export function Footer() {
    const { settings } = useSiteSettings()
    const variant = (settings as any).footerVariant || "default";

    const ICON_MAP: Record<string, keyof typeof Icons> = {
        twitter: "Twitter",
        github: "Github",
        linkedin: "Linkedin",
        instagram: "Instagram",
        youtube: "Youtube",
        facebook: "Facebook",
    };

    const navLinks = settings.navLinks?.length
        ? settings.navLinks
        : [{ label: "Home", url: "/" }, { label: "Blog", url: "/blog" }]

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

    const activeSocialLinks = settings.socialLinks?.filter(l => l.enabled) || []

    return (
        <footer className={cn(
            "border-t bg-muted/30",
            variant === "style-4" && "border-t-2 border-border bg-background font-mono",
            variant === "style-5" && "border-t px-4 pb-4 bg-transparent border-none"
        )}>
            {variant === "style-5" && (
                <div className="w-full h-24 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
            )}

            <div className={cn(
                "container py-12 md:py-16",
                variant === "style-5" && "bg-zinc-100 dark:bg-zinc-900 rounded-[3rem] px-8 md:px-16"
            )}>
                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12",
                    variant === "style-4" && "divide-y md:divide-y-0 md:divide-x divide-border gap-0"
                )}>
                    {/* Brand */}
                    <div className={cn(
                        "md:col-span-2 space-y-4",
                        variant === "style-4" && "p-8 md:p-12 md:border-r border-border"
                    )}>
                        <Link to="/" className={cn(
                            "text-xl font-bold tracking-tight",
                            variant === "style-4" && "uppercase tracking-widest text-2xl"
                        )}>
                            {settings.siteName || "Ryza Blog"}
                        </Link>
                        <p className={cn(
                            "text-muted-foreground max-w-sm leading-relaxed",
                            variant === "style-4" && "font-sans text-xs"
                        )}>
                            {settings.description || "A personal blog about technology, design, and building digital products."}
                        </p>
                        <div className="flex gap-4">
                            {activeSocialLinks.map((link, i) => {
                                const IconName = ICON_MAP[link.platform.toLowerCase()] || "Link";
                                const LucideIcon = (Icons as any)[IconName] || Icons.Link;
                                return (
                                    <a
                                        key={i}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={cn(
                                            "text-muted-foreground hover:text-foreground transition-colors",
                                            variant === "style-4" && "border border-border p-2 hover:bg-foreground hover:text-background rounded-none"
                                        )}
                                        title={link.label}
                                    >
                                        <LucideIcon className="h-5 w-5" />
                                        <span className="sr-only">{link.label}</span>
                                    </a>
                                )
                            })}
                        </div>
                    </div>

                    {/* Dynamic Navigation */}
                    <div className={cn(
                        variant === "style-4" && "p-8 md:p-12 md:border-r border-border"
                    )}>
                        <p className={cn(
                            "text-sm font-semibold mb-3",
                            variant === "style-4" && "uppercase tracking-widest text-xs text-muted-foreground/50 mb-6"
                        )}>Navigation</p>
                        <ul className="space-y-2">
                            {navLinks.map(link => (
                                <li key={link.url}>
                                    <Link to={link.url} className={cn(
                                        "text-sm text-muted-foreground hover:text-foreground transition-colors",
                                        variant === "style-4" && "uppercase font-bold tracking-wider hover:translate-x-1 inline-block transition-transform"
                                    )}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Scroll to Top */}
                    <div className={cn(
                        "flex flex-col items-start gap-4",
                        variant === "style-4" && "p-8 md:p-12 bg-muted/5 justify-between"
                    )}>
                        <p className={cn(
                            "text-sm font-semibold mb-1",
                            variant === "style-4" && "uppercase tracking-widest text-xs text-muted-foreground/50"
                        )}>Back to top</p>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={scrollToTop}
                            className={cn(
                                "rounded-full",
                                variant === "style-4" && "rounded-none w-16 h-16 border-2 border-foreground hover:bg-foreground hover:text-background"
                            )}
                        >
                            <ArrowUp className="h-4 w-4" />
                            <span className="sr-only">Scroll to top</span>
                        </Button>
                    </div>
                </div>

                <div className={cn(
                    "mt-12 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground",
                    variant === "style-4" && "border-t text-[10px] uppercase tracking-widest font-mono p-4 bg-background border border-border mt-0"
                )}>
                    <p>{settings.footerCopyright || `© ${new Date().getFullYear()} ${settings.siteName || "Ryza Blog"}. All rights reserved.`}</p>
                    <p>Built with React &amp; Firebase.</p>
                </div>
            </div>
        </footer>
    )
}
