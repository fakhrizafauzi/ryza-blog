import { useState, useEffect } from "react"
import { collection, getDocs, doc, setDoc, deleteDoc, query, orderBy } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { toast } from "@/hooks/use-toast"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog"
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table"
import { Folder, Plus, Pencil, Trash2, Search, Loader2 } from "lucide-react"
import { nanoid } from "nanoid"
import type { Category } from "@/types/blog"

export default function CategoriesListPage() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingCategory, setEditingCategory] = useState<Category | null>(null)
    const [deletingId, setDeletingId] = useState<string | null>(null)
    const [formData, setFormData] = useState<Partial<Category>>({ name: "", slug: "", description: "" })
    const [saving, setSaving] = useState(false)

    const fetchCategories = async () => {
        setLoading(true)
        try {
            const q = query(collection(db, "categories"), orderBy("name"))
            const snapshot = await getDocs(q)
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category))
            setCategories(data)
        } catch (error) {
            console.error("Error fetching categories:", error)
            toast({ title: "Failed to load categories", variant: "error" })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchCategories() }, [])

    const handleSave = async () => {
        if (!formData.name || !formData.slug) {
            toast({ title: "Name and Slug are required", variant: "error" })
            return
        }

        setSaving(true)
        try {
            // Use existing ID if editing, otherwise use nanoid
            const categoryId = editingCategory ? editingCategory.id : nanoid()

            const data: Category = {
                id: categoryId,
                name: formData.name,
                slug: formData.slug,
                description: formData.description || "",
            }

            await setDoc(doc(db, "categories", categoryId), data)

            toast({ title: `Category ${editingCategory ? "updated" : "created"}`, variant: "success" })
            setIsDialogOpen(false)
            setEditingCategory(null)
            setFormData({ name: "", slug: "", description: "" })
            fetchCategories()
        } catch (error) {
            console.error("Error saving category:", error)
            toast({ title: "Failed to save category", variant: "error" })
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async () => {
        if (!deletingId) return
        try {
            await deleteDoc(doc(db, "categories", deletingId))
            toast({ title: "Category deleted", variant: "success" })
            setCategories(prev => prev.filter(c => c.id !== deletingId))
        } catch (error) {
            console.error("Error deleting category:", error)
            toast({ title: "Failed to delete category", variant: "error" })
        } finally {
            setDeletingId(null)
        }
    }

    const openEdit = (cat: Category) => {
        setEditingCategory(cat)
        setFormData(cat)
        setIsDialogOpen(true)
    }

    const openCreate = () => {
        setEditingCategory(null)
        setFormData({ name: "", slug: "", description: "" })
        setIsDialogOpen(true)
    }

    const generateSlug = (name: string) => {
        return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
    }

    const filtered = categories.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
                    <p className="text-muted-foreground">Manage blog post categories.</p>
                </div>
                <Button onClick={openCreate}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Category
                </Button>
            </div>

            <div className="flex items-center gap-2 max-w-sm">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search categories..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
            </div>

            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Slug</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center">
                                    <Loader2 className="h-6 w-6 animate-spin mx-auto" />
                                </TableCell>
                            </TableRow>
                        ) : filtered.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                                    No categories found.
                                </TableCell>
                            </TableRow>
                        ) : (
                            filtered.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-2">
                                            <Folder className="h-4 w-4 text-muted-foreground" />
                                            {cat.name}
                                        </div>
                                    </TableCell>
                                    <TableCell><code className="text-xs bg-muted px-1 py-0.5 rounded">{cat.slug}</code></TableCell>
                                    <TableCell className="text-muted-foreground text-sm max-w-md truncate">
                                        {cat.description}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon" onClick={() => openEdit(cat)}>
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => setDeletingId(cat.id)}>
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Edit/Create Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editingCategory ? "Edit Category" : "New Category"}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input
                                value={formData.name}
                                onChange={e => {
                                    const name = e.target.value
                                    setFormData(prev => ({
                                        ...prev,
                                        name,
                                        slug: !editingCategory ? generateSlug(name) : prev.slug
                                    }))
                                }}
                                placeholder="e.g. Technology"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Slug</Label>
                            <Input
                                value={formData.slug}
                                onChange={e => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                placeholder="e.g. technology"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label>Description</Label>
                            <Textarea
                                value={formData.description}
                                onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Optional description..."
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave} disabled={saving}>
                            {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <ConfirmDialog
                open={!!deletingId}
                onOpenChange={(open) => !open && setDeletingId(null)}
                title="Delete Category?"
                description="This action cannot be undone. Posts in this category will not be deleted but will lose this categorization."
                confirmLabel="Delete"
                onConfirm={handleDelete}
            />
        </div>
    )
}
