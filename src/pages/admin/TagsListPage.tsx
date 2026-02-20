import { useState, useEffect } from "react";
import { collection, getDocs, query, orderBy, updateDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Trash2, Tag, Loader2, Search, Hash } from "lucide-react";

interface TagData {
    name: string;
    slug: string;
    count: number;
    postIds: string[];
}

export default function TagsListPage() {
    const [tags, setTags] = useState<TagData[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [deletingTag, setDeletingTag] = useState<TagData | null>(null);

    const fetchTags = async () => {
        setLoading(true);
        try {
            // Tags are stored inline in posts — extract unique tags from all posts
            const q = query(collection(db, "posts"), orderBy("updatedAt", "desc"));
            const snapshot = await getDocs(q);

            const tagMap = new Map<string, TagData>();

            snapshot.docs.forEach(docSnap => {
                const post = docSnap.data();
                const postTags: { id?: string; slug: string; name: string }[] = post.tags || [];
                postTags.forEach(tag => {
                    const key = tag.slug;
                    if (tagMap.has(key)) {
                        const existing = tagMap.get(key)!;
                        existing.count++;
                        existing.postIds.push(docSnap.id);
                    } else {
                        tagMap.set(key, {
                            name: tag.name,
                            slug: tag.slug,
                            count: 1,
                            postIds: [docSnap.id],
                        });
                    }
                });
            });

            const sorted = Array.from(tagMap.values()).sort((a, b) => b.count - a.count);
            setTags(sorted);
        } catch (error) {
            console.error("Error fetching tags:", error);
            toast({ title: "Failed to load tags", variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchTags(); }, []);

    const handleDelete = async (tag: TagData) => {
        try {
            // Remove this tag from all posts that have it
            const updates = tag.postIds.map(async postId => {
                const postRef = doc(db, "posts", postId);
                const postSnap = await getDocs(query(collection(db, "posts")));
                const postDoc = postSnap.docs.find(d => d.id === postId);
                if (!postDoc) return;
                const postData = postDoc.data();
                const updatedTags = (postData.tags || []).filter((t: { slug: string }) => t.slug !== tag.slug);
                await updateDoc(postRef, { tags: updatedTags });
            });
            await Promise.all(updates);
            setTags(prev => prev.filter(t => t.slug !== tag.slug));
            toast({ title: `Tag "${tag.name}" removed from all posts`, variant: "success" });
        } catch (error) {
            console.error("Error deleting tag:", error);
            toast({ title: "Failed to delete tag", variant: "error" });
        }
    };

    const filtered = tags.filter(t =>
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.slug.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Tags</h1>
                    <p className="text-muted-foreground">
                        {tags.length} unique tag{tags.length !== 1 ? "s" : ""} across all posts.
                    </p>
                </div>
            </div>

            {/* Search */}
            {tags.length > 0 && (
                <div className="relative max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="pl-9"
                        placeholder="Search tags..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : tags.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed rounded-lg text-center">
                    <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Hash className="h-7 w-7 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold">No tags yet</h3>
                    <p className="text-muted-foreground max-w-sm mt-2 text-sm">
                        Tags are created when you add them to posts in the Post Editor. Go create a post and add some tags!
                    </p>
                </div>
            ) : filtered.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                    <Tag className="h-8 w-8 mx-auto mb-2" />
                    <p>No tags match "{search}"</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filtered.map(tag => (
                        <div
                            key={tag.slug}
                            className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/40 transition-colors group"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <Hash className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                                <div className="min-w-0">
                                    <p className="font-medium text-sm truncate">{tag.name}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{tag.slug}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                <Badge variant="secondary" className="text-xs">
                                    {tag.count}
                                </Badge>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
                                    onClick={() => setDeletingTag(tag)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={!!deletingTag}
                onOpenChange={open => !open && setDeletingTag(null)}
                title={`Delete tag "${deletingTag?.name}"?`}
                description={`This will remove the tag from ${deletingTag?.count} post${(deletingTag?.count ?? 0) > 1 ? "s" : ""}. This action cannot be undone.`}
                confirmLabel="Delete Tag"
                onConfirm={async () => {
                    if (deletingTag) await handleDelete(deletingTag);
                    setDeletingTag(null);
                }}
            />
        </div>
    );
}
