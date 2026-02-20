import { useState } from "react"
import { Link } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { LogOut, Shield } from "lucide-react"

import { auth } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"
import { useRole } from "@/hooks/useRole"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function UserNav() {
    const { user, loading } = useAuth()
    const { isAdmin } = useRole()
    const [isLoggingIn, setIsLoggingIn] = useState(false)

    const handleLogin = async () => {
        try {
            setIsLoggingIn(true)
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)

            // Strict Admin Check
            const email = result.user.email?.toLowerCase()
            const simpleAdminCheck = email === "fakhrizafauzii@gmail.com" ||
                (import.meta.env.VITE_ADMIN_EMAILS || "").includes(email);

            if (!simpleAdminCheck) {
                await signOut(auth)
                alert("Access Denied: You are not an administrator.")
            }
        } catch (error) {
            console.error("Login failed", error)
        } finally {
            setIsLoggingIn(false)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.error("Logout failed", error)
        }
    }

    if (loading) {
        return <div className="h-8 w-8 animate-pulse rounded-full bg-muted" />
    }

    if (!user) {
        return (
            <Button variant="default" size="sm" onClick={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? "Signing in..." : "Login"}
            </Button>
        )
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || ""} alt={user.displayName || "User"} />
                        <AvatarFallback>{user.displayName?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                    <>
                        <DropdownMenuItem asChild>
                            <Link to="/blog-admin">
                                <Shield className="mr-2 h-4 w-4" />
                                <span>Admin Dashboard</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
