import { useState } from "react";
import { collection, writeBatch, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Database, CheckCircle2 } from "lucide-react";

const DUMMY_POSTS = [
    {
        title: "Getting Started with React 19",
        slug: "getting-started-react-19",
        excerpt: "Explore the exciting new features in React 19 including the new compiler, Actions, and improved hooks.",
        status: "published",
        tags: [{ id: "react", slug: "react", name: "React" }, { id: "js", slug: "javascript", name: "JavaScript" }],
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800",
        readingTime: 5,
        viewCount: 142,
        createdAt: Date.now() - 7 * 86400000,
        updatedAt: Date.now() - 7 * 86400000,
        publishedAt: Date.now() - 7 * 86400000,
        sections: [{
            id: "s1", type: "CONTENT", order: 0, isVisible: true,
            content: { html: "<p>React 19 brings a host of improvements that make building UIs faster and more intuitive than ever before. In this post, we'll explore the key features and how to use them in your projects.</p><h2>The React Compiler</h2><p>The new React Compiler automatically optimizes your components, eliminating the need for manual memoization with <code>useMemo</code> and <code>useCallback</code>.</p>" }
        }]
    },
    {
        title: "Building a CMS with Firebase",
        slug: "building-cms-firebase",
        excerpt: "A deep dive into building a headless CMS using Firebase Firestore, Storage, and Authentication.",
        status: "published",
        tags: [{ id: "firebase", slug: "firebase", name: "Firebase" }, { id: "cms", slug: "cms", name: "CMS" }],
        coverImage: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
        readingTime: 8,
        viewCount: 89,
        createdAt: Date.now() - 14 * 86400000,
        updatedAt: Date.now() - 14 * 86400000,
        publishedAt: Date.now() - 14 * 86400000,
        sections: [{
            id: "s1", type: "CONTENT", order: 0, isVisible: true,
            content: { html: "<p>Firebase provides a powerful suite of tools that make it easy to build a fully-featured CMS without managing your own backend infrastructure.</p><h2>Data Modeling</h2><p>We'll use Firestore collections for posts, pages, and settings, with Firebase Storage for media assets.</p>" }
        }]
    },
    {
        title: "TypeScript Best Practices in 2025",
        slug: "typescript-best-practices-2025",
        excerpt: "Level up your TypeScript skills with these modern patterns and practices used by top engineering teams.",
        status: "published",
        tags: [{ id: "ts", slug: "typescript", name: "TypeScript" }],
        coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800",
        readingTime: 6,
        viewCount: 203,
        createdAt: Date.now() - 21 * 86400000,
        updatedAt: Date.now() - 21 * 86400000,
        publishedAt: Date.now() - 21 * 86400000,
        sections: [{
            id: "s1", type: "CONTENT", order: 0, isVisible: true,
            content: { html: "<p>TypeScript has become the standard for large-scale JavaScript applications. Here are the patterns that will make your code more maintainable and type-safe.</p>" }
        }]
    },
    {
        title: "The Art of Clean Code",
        slug: "art-of-clean-code",
        excerpt: "Principles and patterns for writing code that is easy to read, maintain, and extend over time.",
        status: "draft",
        tags: [{ id: "clean", slug: "clean-code", name: "Clean Code" }],
        coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800",
        readingTime: 7,
        viewCount: 0,
        createdAt: Date.now() - 2 * 86400000,
        updatedAt: Date.now() - 2 * 86400000,
        sections: [{
            id: "s1", type: "CONTENT", order: 0, isVisible: true,
            content: { html: "<p>Clean code is not just about aesthetics — it's about writing code that communicates intent clearly and can be maintained by any developer on your team.</p>" }
        }]
    },
    {
        title: "Mastering Tailwind CSS",
        slug: "mastering-tailwind-css",
        excerpt: "From utility classes to custom design systems — a comprehensive guide to Tailwind CSS.",
        status: "published",
        tags: [{ id: "css", slug: "css", name: "CSS" }, { id: "tailwind", slug: "tailwind", name: "Tailwind" }],
        coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800",
        readingTime: 9,
        viewCount: 317,
        createdAt: Date.now() - 30 * 86400000,
        updatedAt: Date.now() - 30 * 86400000,
        publishedAt: Date.now() - 30 * 86400000,
        sections: [{
            id: "s1", type: "CONTENT", order: 0, isVisible: true,
            content: { html: "<p>Tailwind CSS has revolutionized how we write styles. Instead of fighting with specificity and naming conventions, you compose designs directly in your markup.</p>" }
        }]
    },
];

type SeedStatus = "idle" | "seeding" | "done" | "error";

export default function SeedDataPage() {
    const [status, setStatus] = useState<SeedStatus>("idle");
    const [seededCount, setSeededCount] = useState(0);

    const handleSeed = async () => {
        setStatus("seeding");
        setSeededCount(0);
        try {
            const batch = writeBatch(db);
            for (const post of DUMMY_POSTS) {
                const ref = doc(collection(db, "posts"));
                batch.set(ref, post);
            }
            await batch.commit();
            setSeededCount(DUMMY_POSTS.length);
            setStatus("done");
            toast({ title: `${DUMMY_POSTS.length} posts seeded successfully!`, variant: "success" });
        } catch (err) {
            setStatus("error");
            toast({ title: "Seeding failed", description: (err as Error).message, variant: "error" });
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Seed Dummy Data</h1>
                <p className="text-muted-foreground">Populate your database with sample posts for testing.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5" />
                        Sample Posts
                    </CardTitle>
                    <CardDescription>
                        This will add {DUMMY_POSTS.length} sample blog posts to Firestore. Existing posts will not be affected.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        {DUMMY_POSTS.map((post, i) => (
                            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                                <div>
                                    <p className="text-sm font-medium">{post.title}</p>
                                    <p className="text-xs text-muted-foreground">{post.readingTime} min read</p>
                                </div>
                                <Badge variant={post.status === "published" ? "default" : "secondary"}>
                                    {post.status}
                                </Badge>
                            </div>
                        ))}
                    </div>

                    {status === "done" && (
                        <div className="flex items-center gap-2 text-green-600 text-sm font-medium">
                            <CheckCircle2 className="h-4 w-4" />
                            {seededCount} posts added to Firestore!
                        </div>
                    )}

                    <Button
                        onClick={handleSeed}
                        disabled={status === "seeding" || status === "done"}
                        className="w-full"
                    >
                        {status === "seeding" ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Seeding...</>
                        ) : status === "done" ? (
                            <><CheckCircle2 className="mr-2 h-4 w-4" /> Done!</>
                        ) : (
                            <><Database className="mr-2 h-4 w-4" /> Seed {DUMMY_POSTS.length} Posts</>
                        )}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
