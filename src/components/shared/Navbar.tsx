import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { Menu, X, Sun, Moon, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/useTheme"
import { useSiteSettings } from "@/components/shared/SiteSettingsProvider"
import { cn } from "@/lib/utils"

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const location = useLocation()
    const { theme, setTheme } = useTheme()
    const { settings } = useSiteSettings()

    // Derived from settings or props if we were to add them, 
    // but for now we'll implement the logic internally based on a new prop if we can,
    // or just assume we might want to switch via props.
    // However, since Navbar is global, let's assume valid variants are "default", "style-4", "style-5"
    // For verification, we can control this via a prop if we update the App layout, but here we can just add the code.
    // Let's create a 'variant' prop.
    const variant = (settings as any).navbarVariant || "default";


    useEffect(() => { setIsOpen(false) }, [location.pathname])

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10)
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const navLinks = settings.navLinks?.length
        ? settings.navLinks
        : [{ label: "Home", url: "/" }, { label: "Blog", url: "/blog" }]

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                // DEFAULT / STYLE 1
                variant === "default" && (isScrolled ? "bg-background/80 backdrop-blur-md border-b shadow-sm py-3" : "bg-transparent py-5"),

                // STYLE 4: Swiss Sticky
                variant === "style-4" && cn(
                    "border-b border-border bg-background py-0",
                    isScrolled ? "py-2" : "py-4"
                ),

                // STYLE 5: Organic Floating
                variant === "style-5" && cn(
                    "py-4",
                    isScrolled ? "px-4" : "px-0"
                )
            )}
        >
            <div className={cn(
                "container flex items-center justify-between",
                variant === "style-5" && isScrolled && "bg-background/80 backdrop-blur-xl rounded-full border border-white/20 shadow-lg px-6 py-3 transition-all duration-500"
            )}>
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight z-50">
                    <div className="bg-primary/10 p-1.5 rounded-lg">
                        {settings.logoUrl ? (
                            <img src={settings.logoUrl} alt="Logo" className="h-5 w-5 object-contain" />
                        ) : (
                            <Sparkles className="h-5 w-5 text-primary" />
                        )}
                    </div>
                    <span>{settings.siteName || "Ryza Blog"}</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.url}
                            to={link.url}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-muted",
                                variant === "style-4" && "rounded-none uppercase tracking-widest text-xs font-bold hover:bg-primary hover:text-primary-foreground",
                                variant === "style-5" && "hover:bg-primary/5 hover:text-primary",
                                location.pathname === link.url
                                    ? variant === "style-4" ? "bg-primary text-primary-foreground" : "text-foreground bg-muted"
                                    : "text-muted-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="hidden md:flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                        className="rounded-full"
                    >
                        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        <span className="sr-only">Toggle theme</span>
                    </Button>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden z-50 p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Nav Overlay */}
                {isOpen && (
                    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 flex flex-col items-center justify-center space-y-8 md:hidden">
                        {navLinks.map((link) => (
                            <Link
                                key={link.url}
                                to={link.url}
                                className="text-2xl font-bold"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex gap-4 mt-8">
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                            >
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
