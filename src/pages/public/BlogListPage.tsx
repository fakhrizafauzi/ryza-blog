import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SEO } from "@/components/shared/SEO";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import type { Page } from "@/types/blog";
import { usePosts } from "@/hooks/usePosts";
import { Pagination } from "@/components/ui/pagination";
import { PostCard, PostCardSkeleton } from "@/components/blog/PostCard";
import { motion } from "framer-motion";

export default function BlogListPage() {
    // 1. Load dynamic page layout
    const [page, setPage] = useState<Page | null>(null);
    const [pageLoading, setPageLoading] = useState(true);

    useEffect(() => {
        const fetchPage = async () => {
            try {
                const docRef = doc(db, "pages", "blog");
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setPage(docSnap.data() as Page);
                }
            } catch (err) {
                console.error("Error fetching blog page:", err);
            } finally {
                setPageLoading(false);
            }
        };
        fetchPage();
    }, []);

    // 2. Post Grid Logic (Always present at bottom or wherever needed)
    // In a full builder, this would be a "BlogGridSection", but for now we append it.
    const [searchParams] = useSearchParams();
    const search = searchParams.get("q") || "";
    const category = searchParams.get("category") || "";
    const tag = searchParams.get("tag") || "";
    const sort = searchParams.get("sort") || "latest";
    // We can also let the 'page' document control whether the grid shows, or pass props to it.
    // For now, we'll render the dynamic sections FIRST, then the standard grid.

    const { posts, loading, error, page: currentPage, totalPages, goToPage } = usePosts({
        pageSize: 9,
        search,
        category,
        tag,
        sort
    });

    const handlePageChange = (newPage: number) => {
        goToPage(newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (pageLoading) return <div className="min-h-screen bg-background" />;

    return (
        <div className="flex flex-col min-h-screen">
            <SEO
                title={page?.title || "The Blog"}
                description={page?.description || "Read our latest articles, tutorials, and insights."}
            />

            {/* DYNAMIC SECTIONS (Top content: Hero, Intro, etc.) */}
            {page && page.sections && page.sections.length > 0 && (
                <div className="flex flex-col">
                    {page.sections
                        .filter(section => section.isVisible)
                        .sort((a, b) => a.order - b.order)
                        .map(section => (
                            <SectionRenderer key={section.id} section={section} />
                        ))
                    }
                </div>
            )}

            {/* STANDARD BLOG GRID (Fallback or default content) */}
            {/* You could optionally hide this if a "BLOG_GRID" section was found in page.sections */}
            <div className="container py-12">
                {!page && (
                    <div className="mb-12 text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">The Blog</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            Writings on code, design, and everything in between.
                        </p>
                    </div>
                )}

                {search && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold">Search results for "{search}"</h2>
                    </div>
                )}

                {error && (
                    <div className="p-4 rounded-md bg-destructive/10 text-destructive mb-8">
                        Error loading posts: {error.message}
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 row-gap-12">
                    {loading
                        ? Array.from({ length: 6 }).map((_, i) => <PostCardSkeleton key={i} />)
                        : posts.length > 0
                            ? posts.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                >
                                    <PostCard post={post} />
                                </motion.div>
                            ))
                            : (
                                <div className="col-span-3 py-12 text-center text-muted-foreground">
                                    No posts found.
                                </div>
                            )}
                </div>

                {!search && totalPages > 1 && (
                    <div className="mt-16 flex flex-col items-center gap-4">
                        <Pagination page={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                        <p className="text-sm text-muted-foreground">
                            Page {currentPage} of {totalPages}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
