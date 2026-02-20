import { useState, useEffect } from "react";
import {
    collection,
    query,
    orderBy,
    getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { BlogPost } from "@/types/blog";

export const POSTS_PER_PAGE = 9;

interface UsePostsOptions {
    category?: string;
    tag?: string;
    status?: "draft" | "published" | "archived";
    search?: string;
    sort?: string;
    pageSize?: number;
}

export function usePosts({ category, tag, search, sort = "latest", pageSize = POSTS_PER_PAGE }: UsePostsOptions = {}) {
    const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
    const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [page, setPage] = useState(1);

    // Fetch all published posts once for efficient client-side filtering/sorting/pagination
    // This is suitable for up to a few thousand posts.
    useEffect(() => {
        const fetchAllPosts = async () => {
            setLoading(true);
            try {
                // Simplified query to avoid composite index requirement
                const q = query(
                    collection(db, "posts"),
                    orderBy("publishedAt", "desc")
                );
                const snapshot = await getDocs(q);
                const docs = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                })) as BlogPost[];
                // Filter published posts client-side
                setAllPosts(docs.filter(p => p.status === "published"));
            } catch (err) {
                console.error("Error fetching posts:", err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchAllPosts();
    }, []);

    // Apply filters and sorting
    useEffect(() => {
        let docs = [...allPosts];

        // Category Filter
        if (category && category !== "All") {
            docs = docs.filter(p =>
                p.categoryId === category ||
                p.category?.name === category ||
                p.category?.slug === category
            );
        }

        // Tag Filter
        if (tag) {
            docs = docs.filter(p => p.tags?.some(t => t.id === tag || t.slug === tag));
        }

        // Search Filter
        if (search) {
            const q = search.toLowerCase();
            docs = docs.filter(p =>
                p.title.toLowerCase().includes(q) ||
                p.excerpt.toLowerCase().includes(q)
            );
        }

        // Sorting
        if (sort === "oldest") {
            docs.sort((a, b) => (a.publishedAt || 0) - (b.publishedAt || 0));
        } else if (sort === "popular") {
            docs.sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0));
        } else {
            // default: latest
            docs.sort((a, b) => (b.publishedAt || 0) - (a.publishedAt || 0));
        }

        setFilteredPosts(docs);
        setPage(1); // Reset to first page on filter change
    }, [allPosts, category, tag, search, sort]);

    const totalPages = Math.ceil(filteredPosts.length / pageSize);
    const paginatedPosts = filteredPosts.slice((page - 1) * pageSize, page * pageSize);

    const goToPage = (pageNum: number) => {
        setPage(Math.max(1, Math.min(pageNum, totalPages)));
    };

    return {
        posts: paginatedPosts,
        loading,
        error,
        page,
        totalPages,
        hasMore: page < totalPages,
        goToPage,
        totalCount: filteredPosts.length
    };
}
