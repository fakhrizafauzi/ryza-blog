import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { usePost } from "@/hooks/usePost";
import { SectionRenderer } from "@/components/sections/SectionRenderer";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { SEO } from "@/components/shared/SEO";
import { ReadingProgress } from "@/components/blog/ReadingProgress";

function BlogDetailSkeleton() {
    return (
        <div className="container max-w-4xl py-12 animate-pulse">
            <Skeleton className="h-4 w-24 mb-8" />
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
            <Skeleton className="aspect-video w-full rounded-xl mb-10" />
            <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
}

export default function BlogDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const { post, loading, error } = usePost(slug || "");

    if (loading) return <BlogDetailSkeleton />;

    if (error) {
        return (
            <div className="container max-w-4xl py-12 text-center">
                <p className="text-destructive">Error loading post: {error.message}</p>
            </div>
        );
    }

    if (!post) {
        return <Navigate to="/blog" replace />;
    }

    const sortedSections = [...(post.sections || [])].sort((a, b) => a.order - b.order);
    const hasHeader = sortedSections.some(s =>
        ['BLOG_POST_HEADER', 'POST_HEADER_MINIMAL', 'POST_HEADER_EDITORIAL'].includes(s.type)
    );
    const showDefaultBackButton = !hasHeader && sortedSections.length > 0;

    return (
        <main className="min-h-screen">
            <ReadingProgress />
            <SEO
                title={post.title}
                description={post.excerpt}
                image={post.coverImage}
                url={`https://ryza-blog.web.app/blog/${post.slug}`}
            />

            {/* Independent Back Button - Only shown if content exists but no header section */}
            {showDefaultBackButton && (
                <div className="container max-w-4xl pt-2 pb-0">
                    <Button variant="ghost" size="sm" className="-ml-2" asChild>
                        <Link to="/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Blog
                        </Link>
                    </Button>
                </div>
            )}

            {/* Dynamic Sections or Fallback Hero */}
            <div className="flex flex-col">
                {sortedSections.length > 0 ? (
                    sortedSections.map(section => (
                        <SectionRenderer
                            key={section.id}
                            section={section}
                            isPostDetail={true}
                        />
                    ))
                ) : (
                    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background selection:bg-primary/20">
                        {/* 1. Ambient Background Layer */}
                        {post.coverImage ? (
                            <>
                                {/* Blurred Image for Atmosphere */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 dark:opacity-20 blur-3xl scale-110 transition-all duration-1000"
                                    style={{ backgroundImage: `url(${post.coverImage})` }}
                                />
                                {/* Gradient Blend - Fades into background color at bottom */}
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                            </>
                        ) : (
                            <div className="absolute inset-x-0 top-0 h-[50vh] bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl opacity-50" />
                        )}

                        {/* 2. Main Content Container - Glassmorphism */}
                        <div className="container relative z-10 max-w-5xl px-4 py-20">
                            {/* Back Button */}
                            <div className="mb-12">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="rounded-full bg-background/50 backdrop-blur-md border-primary/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                                    asChild
                                >
                                    <Link to="/blog">
                                        <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                                        Back to Publication
                                    </Link>
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-20 items-start">
                                {/* Left: Typography */}
                                <div className="space-y-8 order-2 lg:order-1">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-primary">
                                            {post.category?.name && (
                                                <span className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                                                    {post.category.name}
                                                </span>
                                            )}
                                            {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                                        </div>

                                        <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.95] text-foreground">
                                            {post.title}
                                        </h1>
                                    </div>

                                    <p className="text-xl text-muted-foreground leading-relaxed font-light border-l-4 border-primary/20 pl-6">
                                        {post.excerpt}
                                    </p>

                                    {/* Author & Meta */}
                                    <div className="flex items-center gap-4 pt-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-100 to-gray-300 dark:from-zinc-800 dark:to-zinc-700 ring-2 ring-background shadow-lg" />
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Written by Unknown</p>
                                            <p className="text-xs text-muted-foreground">Editor in Chief</p>
                                        </div>
                                    </div>

                                    {/* Editor Prompt */}
                                    <div className="mt-12 p-6 rounded-2xl border border-dashed border-primary/20 bg-primary/5">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            This post is currently in <strong>"Fallback Mode"</strong> because no content sections have been added yet.
                                            The layout you see is generated automatically from the post metadata.
                                        </p>
                                        <Button variant="default" asChild className="rounded-full shadow-lg shadow-primary/20 bg-primary text-primary-foreground hover:opacity-90">
                                            <Link to={`/blog-admin/posts/${post.id}/edit`}>Open Post Editor</Link>
                                        </Button>
                                    </div>
                                </div>

                                {/* Right: Hero Image (Clean) */}
                                {post.coverImage && (
                                    <div className="relative order-1 lg:order-2 group">
                                        <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                                        <div className="relative aspect-[4/5] md:aspect-square lg:aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/10 dark:ring-white/5">
                                            <img
                                                src={post.coverImage}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                            {/* Reflection Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-white/10 opacity-50 pointer-events-none" />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
