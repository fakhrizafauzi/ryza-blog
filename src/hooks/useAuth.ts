import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(
            auth,
            (user) => {
                setUser(user);
                setLoading(false);
            },
            (error) => {
                setError(error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

    return { user, loading, error };
}
