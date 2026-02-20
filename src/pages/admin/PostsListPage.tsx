import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { deletePost } from "@/lib/posts"
import type { BlogPost } from "@/types/blog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { format } from "date-fns"

export default function PostsListPage() {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)

    const loadPosts = async () => {
        setLoading(true)
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"))
        const snap = await getDocs(q)
        setPosts(snap.docs.map(d => ({ id: d.id, ...d.data() })) as BlogPost[])
        setLoading(false)
    }

    useEffect(() => { loadPosts() }, [])

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Delete "${title}"? This cannot be undone.`)) return
        await deletePost(id)
        setPosts(prev => prev.filter(p => p.id !== id))
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Posts</h1>
                    <p className="text-muted-foreground text-sm">{posts.length} total</p>
                </div>
                <Button asChild>
                    <Link to="/blog-admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            <div className="rounded-lg border overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-muted/50 border-b">
                        <tr>
                            <th className="text-left px-4 py-3 font-medium">Title</th>
                            <th className="text-left px-4 py-3 font-medium">Status</th>
                            <th className="text-left px-4 py-3 font-medium">Date</th>
                            <th className="text-right px-4 py-3 font-medium">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <tr key={i} className="border-b">
                                    <td className="px-4 py-3"><Skeleton className="h-4 w-48" /></td>
                                    <td className="px-4 py-3"><Skeleton className="h-5 w-16" /></td>
                                    <td className="px-4 py-3"><Skeleton className="h-4 w-24" /></td>
                                    <td className="px-4 py-3"><Skeleton className="h-8 w-20 ml-auto" /></td>
                                </tr>
                            ))
                            : posts.map(post => (
                                <tr key={post.id} className="border-b hover:bg-muted/30 transition-colors">
                                    <td className="px-4 py-3 font-medium max-w-xs truncate">{post.title}</td>
                                    <td className="px-4 py-3">
                                        <Badge variant={post.status === "published" ? "default" : "secondary"}>
                                            {post.status}
                                        </Badge>
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">
                                        {format(new Date(post.createdAt), "MMM d, yyyy")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button size="sm" variant="outline" asChild>
                                                <Link to={`/blog-admin/posts/${post.id}/edit`}>
                                                    <Pencil className="h-3.5 w-3.5" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="outline"
                                                className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                                                onClick={() => handleDelete(post.id, post.title)}
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        {!loading && posts.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                                    No posts yet. <Link to="/blog-admin/posts/new" className="text-primary underline">Create your first post.</Link>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
