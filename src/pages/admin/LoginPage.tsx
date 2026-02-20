import { useState } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { useAuth } from "@/hooks/useAuth"
import { useRole } from "@/hooks/useRole"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, ShieldCheck, AlertCircle } from "lucide-react"

export default function LoginPage() {
    const { user, loading: authLoading } = useAuth()
    const { isAdmin, loading: roleLoading } = useRole()
    const [loggingIn, setLoggingIn] = useState(false)
    const [error, setError] = useState("")
    const location = useLocation()

    const from = location.state?.from?.pathname || "/blog-admin"

    if (authLoading || roleLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>
    }

    if (user && isAdmin) {
        return <Navigate to={from} replace />
    }

    const handleLogin = async () => {
        try {
            setLoggingIn(true)
            setError("")
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            // Auth state change will trigger re-render and redirect
        } catch (err: any) {
            console.error("Login failed", err)
            setError("Failed to sign in. Please try again.")
        } finally {
            setLoggingIn(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-primary/10 p-3">
                            <ShieldCheck className="h-6 w-6 text-primary" />
                        </div>
                    </div>
                    <CardTitle className="text-2xl">Admin Login</CardTitle>
                    <CardDescription>
                        Sign in to access the dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {error && (
                        <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <p>{error}</p>
                        </div>
                    )}

                    {user && !isAdmin && (
                        <div className="flex items-center gap-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
                            <AlertCircle className="h-4 w-4" />
                            <p>Access Denied: You are not an administrator.</p>
                        </div>
                    )}

                    <Button
                        className="w-full"
                        onClick={handleLogin}
                        disabled={loggingIn || !!(user && !isAdmin)}
                    >
                        {loggingIn ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign in with Google"
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
