import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/hooks/useTheme"
import { AnimatePresence, motion } from "framer-motion"

export function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light")
    }

    return (
        <button
            onClick={toggleTheme}
            className="relative p-2 rounded-full hover:bg-muted transition-colors"
            aria-label="Toggle theme"
        >
            <AnimatePresence mode="wait" initial={false}>
                <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {theme === "dark" ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </motion.div>
            </AnimatePresence>
        </button>
    )
}
