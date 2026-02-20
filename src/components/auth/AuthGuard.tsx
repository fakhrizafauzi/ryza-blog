import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useRole } from "@/hooks/useRole";

interface AuthGuardProps {
    requireAdmin?: boolean;
}

export function AuthGuard({ requireAdmin = false }: AuthGuardProps) {
    const { user, loading: authLoading } = useAuth();
    const { isAdmin, loading: roleLoading } = useRole();
    const location = useLocation();

    if (authLoading || roleLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/blog-admin/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}
