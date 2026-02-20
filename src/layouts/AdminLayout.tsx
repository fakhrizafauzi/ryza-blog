import { useState } from "react"
import { Outlet, NavLink } from "react-router-dom"
import { LayoutDashboard, FileText, LogOut, Tags, Layout, Settings, Menu, X, Folder, User } from "lucide-react"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"

const navItems = [
    { to: "/blog-admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    { to: "/blog-admin/posts", label: "Posts", icon: FileText, end: false },
    { to: "/blog-admin/categories", label: "Categories", icon: Folder, end: false },
    { to: "/blog-admin/authors", label: "Authors", icon: User, end: false },
    { to: "/blog-admin/pages", label: "Pages", icon: Layout, end: false },
    { to: "/blog-admin/tags", label: "Tags", icon: Tags, end: false },
    { to: "/blog-admin/settings", label: "Settings", icon: Settings, end: false },
]

function SidebarContent({ onClose }: { onClose?: () => void }) {
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

    return (
        <>
            <div className="p-4 border-b flex items-center justify-between">
                <span className="font-bold text-lg tracking-tight">Admin</span>
                {onClose && (
                    <button onClick={onClose} className="md:hidden p-1 rounded hover:bg-muted">
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>
            <nav className="flex-1 p-3 space-y-1">
                {navItems.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={end}
                        onClick={onClose}
                        className={({ isActive }) =>
                            cn(
                                "flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )
                        }
                    >
                        <Icon className="h-4 w-4" />
                        {label}
                    </NavLink>
                ))}
            </nav>
            <div className="p-3 border-t">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => setShowLogoutConfirm(true)}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>

            <ConfirmDialog
                open={showLogoutConfirm}
                onOpenChange={setShowLogoutConfirm}
                title="Sign Out"
                description="Are you sure you want to sign out of the admin panel?"
                confirmLabel="Sign Out"
                onConfirm={() => signOut(auth)}
            />
        </>
    )
}

export default function AdminLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-56 border-r bg-muted/30 flex-col shrink-0">
                <SidebarContent />
            </aside>

            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Mobile Drawer */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-full w-64 bg-background border-r flex flex-col transition-transform duration-300 md:hidden",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                <SidebarContent onClose={() => setSidebarOpen(false)} />
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Mobile Top Bar */}
                <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b bg-background sticky top-0 z-30">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="p-1.5 rounded-md hover:bg-muted"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <span className="font-semibold text-sm">Admin Panel</span>
                </div>

                <main className="flex-1 overflow-auto">
                    <div className="p-4 md:p-8">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}
