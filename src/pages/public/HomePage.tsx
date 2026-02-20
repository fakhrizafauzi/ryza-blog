import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom" // Keep for fallback
import { ArrowRight, BookOpen, Sparkles } from "lucide-react" // Keep for fallback
import { Button } from "@/components/ui/button" // Keep for fallback
import { PostCard, PostCardSkeleton } from "@/components/blog/PostCard" // Keep for fallback
import { usePosts } from "@/hooks/usePosts" // Keep for fallback
import { SEO } from "@/components/shared/SEO"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { SectionRenderer } from "@/components/sections/SectionRenderer"
import type { Page } from "@/types/blog"

// Fallback components function for FadeUp to keep the file self-contained if we ever revert
function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function HomePage() {
    const [page, setPage] = useState<Page | null>(null)
    const [loading, setLoading] = useState(true)

    // Fallback data loading
    const { posts, loading: postsLoading } = usePosts({ pageSize: 3 })
    const featured = posts.slice(0, 3)

    useEffect(() => {
        const fetchPage = async () => {
            console.log("HomePage: Starting fetchPage...");
            try {
                // Create a timeout promise to prevent hanging indefinitely
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error("Firebase fetch timed out")), 5000)
                );

                const dataPromise = (async () => {
                    const docRef = doc(db, "pages", "home")
                    const docSnap = await getDoc(docRef)
                    return docSnap;
                })();

                // Race the data fetch against the timeout
                const docSnap = await Promise.race([dataPromise, timeoutPromise]) as any;

                if (docSnap.exists()) {
                    console.log("HomePage: Page data found");
                    setPage(docSnap.data() as Page)
                } else {
                    console.log("HomePage: No page data found, falling back");
                }
            } catch (err) {
                console.error("Error fetching home page:", err)
            } finally {
                console.log("HomePage: Loading complete");
                setLoading(false)
            }
        }

        fetchPage()
    }, [])

    if (loading) return <div className="min-h-screen bg-background" />

    // DYNAMIC RENDERER
    if (page && page.sections && page.sections.length > 0) {
        return (
            <div className="flex flex-col">
                <SEO
                    title={page.title}
                    description={page.description || "Ideas worth writing about."}
                />
                {page.sections
                    .filter(section => section.isVisible)
                    .sort((a, b) => a.order - b.order)
                    .map(section => (
                        <SectionRenderer key={section.id} section={section} />
                    ))
                }
            </div>
        )
    }

    // FALLBACK (Original Hardcoded Layout)
    // This ensures the site doesn't break if the user hasn't created the 'home' page yet.
    // It uses the EXACT same code as before.
    return (
        <div className="flex flex-col">
            <SEO
                title="Home"
                description="Ideas worth writing about. A space for thoughts on technology, design, and the things that make life interesting."
            />

            {/* ─── Hero ─────────────────────────────────────────────── */}
            {/* Same Hardcoded Hero */}
            <section className="relative overflow-hidden">
                <div className="pointer-events-none absolute inset-0 -z-10">
                    <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-40 -right-20 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl" />
                </div>

                <div className="container py-28 md:py-40">
                    <div className="max-w-3xl">
                        <FadeUp delay={0} className="mb-4 flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
                                <Sparkles className="h-3 w-3 text-primary" />
                                Personal Blog
                            </span>
                        </FadeUp>

                        <FadeUp delay={0.1}>
                            <h1 className="text-5xl font-extrabold tracking-tight leading-[1.1] md:text-7xl mb-6">
                                Ideas worth{" "}
                                <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                                    writing
                                </span>{" "}
                                about.
                            </h1>
                        </FadeUp>

                        <FadeUp delay={0.2}>
                            <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-xl">
                                A space for thoughts on technology, design, and the things that
                                make life interesting. Written by Ryza.
                            </p>
                        </FadeUp>

                        <FadeUp delay={0.3} className="flex flex-wrap gap-4">
                            <Button size="lg" asChild>
                                <Link to="/blog">
                                    <BookOpen className="mr-2 h-4 w-4" />
                                    Read the Blog
                                </Link>
                            </Button>
                            <Button size="lg" variant="outline" asChild>
                                <a href="#about">About Me</a>
                            </Button>
                        </FadeUp>
                    </div>
                </div>
            </section>

            {/* ─── Featured Posts ────────────────────────────────────── */}
            <section className="container pb-24">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex items-end justify-between mb-10"
                >
                    <div>
                        <p className="text-sm font-medium text-primary mb-1">From the blog</p>
                        <h2 className="text-3xl font-bold tracking-tight">Latest Posts</h2>
                    </div>
                    <Button variant="ghost" asChild className="hidden sm:flex">
                        <Link to="/blog">
                            View all <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsLoading
                        ? Array.from({ length: 3 }).map((_, i) => <PostCardSkeleton key={i} />)
                        : featured.length > 0
                            ? featured.map((post, i) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: i * 0.1 }}
                                >
                                    <PostCard post={post} />
                                </motion.div>
                            ))
                            : (
                                <div className="col-span-3 py-16 text-center text-muted-foreground">
                                    <p>No posts yet.{" "}
                                        <Link to="/blog-admin/posts/new" className="text-primary underline">
                                            Create your first post!
                                        </Link>
                                    </p>
                                </div>
                            )}
                </div>

                <div className="mt-10 text-center sm:hidden">
                    <Button variant="outline" asChild>
                        <Link to="/blog">View all posts <ArrowRight className="ml-2 h-4 w-4" /></Link>
                    </Button>
                </div>
            </section>

            {/* ─── About ────────────────────────────────────────────── */}
            <section id="about" className="border-t bg-muted/30">
                <div className="container py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        >
                            <p className="text-sm font-medium text-primary mb-2">About the author</p>
                            <h2 className="text-3xl font-bold tracking-tight mb-6">Hey, I'm Ryza 👋</h2>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                I'm a developer and writer passionate about building beautiful things on the web.
                                This blog is where I share what I learn, what I build, and what inspires me.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mb-8">
                                Topics range from React and TypeScript to design systems, productivity, and pop culture.
                            </p>
                            <Button asChild>
                                <Link to="/blog">Start Reading <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-2xl border bg-background p-8 shadow-sm"
                        >
                            <h3 className="font-semibold text-lg mb-4">Stay in the loop</h3>
                            <p className="text-sm text-muted-foreground mb-6">
                                Get notified when new posts are published. No spam, ever.
                            </p>
                            <div className="flex gap-2">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="flex-1 rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                                <Button>Subscribe</Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                                By subscribing you agree to our privacy policy.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    )
}
