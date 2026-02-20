import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2, Loader2, User, Github, Globe, Linkedin, Twitter } from "lucide-react";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { createAuthor, updateAuthor, deleteAuthor } from "@/lib/authors";
import type { Author } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

export default function AuthorsPage() {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
    const [deletingAuthorId, setDeletingAuthorId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Author>>({
        name: "",
        role: "",
        bio: "",
        avatar: "",
        social: { twitter: "", linkedin: "", github: "", website: "" }
    });
    const [saving, setSaving] = useState(false);

    const fetchAuthors = async () => {
        try {
            const q = query(collection(db, "authors"), orderBy("name"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Author));
            setAuthors(data);
        } catch (err) {
            console.error(err);
            toast({ title: "Failed to fetch authors", variant: "error" });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (editingAuthor) {
                await updateAuthor(editingAuthor.id, formData);
                toast({ title: "Author updated successfully" });
            } else {
                if (!formData.name) throw new Error("Name is required");
                await createAuthor(formData as any);
                toast({ title: "Author created successfully" });
            }
            setIsDialogOpen(false);
            fetchAuthors();
            resetForm();
        } catch (err) {
            console.error(err);
            toast({ title: "Failed to save author", variant: "error" });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!deletingAuthorId) return;
        try {
            await deleteAuthor(deletingAuthorId);
            toast({ title: "Author deleted" });
            fetchAuthors();
        } catch (err) {
            console.error(err);
            toast({ title: "Failed to delete author", variant: "error" });
        } finally {
            setDeletingAuthorId(null);
        }
    };

    const resetForm = () => {
        setEditingAuthor(null);
        setFormData({
            name: "",
            role: "",
            bio: "",
            avatar: "",
            social: { twitter: "", linkedin: "", github: "", website: "" }
        });
    };

    const handleEdit = (author: Author) => {
        setEditingAuthor(author);
        setFormData({
            name: author.name,
            role: author.role || "",
            bio: author.bio || "",
            avatar: author.avatar || "",
            social: {
                twitter: author.social?.twitter || "",
                linkedin: author.social?.linkedin || "",
                github: author.social?.github || "",
                website: author.social?.website || "",
            }
        });
        setIsDialogOpen(true);
    };

    const filteredAuthors = authors.filter(a =>
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.role?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Authors</h1>
                    <p className="text-muted-foreground mt-1">Manage blog authors and contributors.</p>
                </div>
                <Button onClick={() => { resetForm(); setIsDialogOpen(true); }}>
                    <Plus className="w-4 h-4 mr-2" /> Add Author
                </Button>
            </div>

            <div className="flex items-center gap-4 bg-background/50 p-1 rounded-lg border w-full sm:w-auto self-start">
                <Search className="w-4 h-4 text-muted-foreground ml-3" />
                <Input
                    placeholder="Search authors..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 bg-transparent w-full sm:w-64"
                />
            </div>

            <div className="border rounded-xl bg-card overflow-hidden shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead>Author</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead className="hidden md:table-cell">Bio</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-40 text-center">
                                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
                                </TableCell>
                            </TableRow>
                        ) : filteredAuthors.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-40 text-center text-muted-foreground">
                                    No authors found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filteredAuthors.map((author) => (
                                <TableRow key={author.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={author.avatar} />
                                                <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{author.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {author.role || "-"}
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm max-w-xs truncate">
                                        {author.bio || "-"}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(author)}>
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                                                onClick={() => setDeletingAuthorId(author.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>{editingAuthor ? "Edit Author" : "New Author"}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label>Full Name</Label>
                                <Input
                                    required
                                    value={formData.name}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. John Doe"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role / Title</Label>
                                <Input
                                    value={formData.role}
                                    onChange={e => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="e.g. Senior Editor"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Avatar URL</Label>
                            <Input
                                value={formData.avatar}
                                onChange={e => setFormData({ ...formData, avatar: e.target.value })}
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Bio</Label>
                            <Textarea
                                value={formData.bio}
                                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                placeholder="Short biography..."
                                rows={3}
                            />
                        </div>

                        <div className="space-y-4 border-t pt-4">
                            <Label className="text-muted-foreground uppercase text-xs tracking-wider">Social Links</Label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-2">
                                    <Twitter className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={formData.social?.twitter}
                                        onChange={e => setFormData({ ...formData, social: { ...formData.social, twitter: e.target.value } })}
                                        placeholder="Twitter URL"
                                        className="text-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Linkedin className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={formData.social?.linkedin}
                                        onChange={e => setFormData({ ...formData, social: { ...formData.social, linkedin: e.target.value } })}
                                        placeholder="LinkedIn URL"
                                        className="text-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Github className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={formData.social?.github}
                                        onChange={e => setFormData({ ...formData, social: { ...formData.social, github: e.target.value } })}
                                        placeholder="GitHub URL"
                                        className="text-sm"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-muted-foreground" />
                                    <Input
                                        value={formData.social?.website}
                                        onChange={e => setFormData({ ...formData, social: { ...formData.social, website: e.target.value } })}
                                        placeholder="Website URL"
                                        className="text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 pt-4">
                            <Button type="button" variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                            <Button type="submit" disabled={saving}>
                                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                                {editingAuthor ? "Save Changes" : "Create Author"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={!!deletingAuthorId}
                onOpenChange={(open) => !open && setDeletingAuthorId(null)}
                title="Delete Author"
                description="Are you sure? This action cannot be undone."
                confirmLabel="Delete"
                variant="destructive"
                onConfirm={handleDelete}
            />
        </div>
    );
}
