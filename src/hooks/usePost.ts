import { useState, useEffect } from "react";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/types/blog";

export function usePost(slug: string) {
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!slug) return;

        const fetchPost = async () => {
            setLoading(true);
            setError(null);
            try {
                const q = query(
                    collection(db, "posts"),
                    where("slug", "==", slug),
                    limit(1)
                );
                const snapshot = await getDocs(q);

                if (snapshot.empty) {
                    setPost(null);
                } else {
                    const doc = snapshot.docs[0];
                    setPost({ id: doc.id, ...doc.data() } as BlogPost);
                }
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    return { post, loading, error };
}
