import { Outlet } from "react-router-dom"
import { useTheme } from "@/hooks/useTheme"

export default function RootLayout() {
    useTheme() // Initialize theme
    return (
        <div className="min-h-screen bg-background text-foreground antialiased font-sans">
            <Outlet />
        </div>
    )
}
