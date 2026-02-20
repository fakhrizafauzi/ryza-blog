import { useAuth } from "./useAuth";

export function useRole() {
    const { user, loading } = useAuth();

    if (loading || !user) {
        return { isAdmin: false, loading };
    }

    const envEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
        .split(",")
        .map((email: string) => email.trim().toLowerCase());

    const allowedAdminEmails = [...envEmails, "fakhrizafauzii@gmail.com"];

    const isAdmin = user.email ? allowedAdminEmails.includes(user.email.toLowerCase()) : false;

    return { isAdmin, loading };
}
