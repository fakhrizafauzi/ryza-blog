import type { BlogPost } from "@/types/blog";
import { PostCard, PostCardSkeleton } from "./PostCard";

interface BlogGridProps {
    posts: BlogPost[];
    loading: boolean;
}

export function BlogGrid({ posts, loading }: BlogGridProps) {
    if (loading && posts.length === 0) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500">
                {Array.from({ length: 6 }).map((_, i) => (
                    <PostCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    if (!loading && posts.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in zoom-in duration-500">
                <h3 className="text-2xl font-bold tracking-tight">No posts found</h3>
                <p className="text-muted-foreground mt-2">
                    Try adjusting your search or filters.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in zoom-in duration-500">
            {posts.map((post) => (
                <PostCard key={post.id} post={post} />
            ))}
            {loading && Array.from({ length: 3 }).map((_, i) => (
                <PostCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>
    );
}
