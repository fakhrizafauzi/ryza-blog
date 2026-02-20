import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { nanoid } from "nanoid"
import { collection, getDocs, orderBy, query } from "firebase/firestore" // Added imports
import { db } from "@/lib/firebase" // Added import
import { createPost, updatePost, getPostById, generateSlug } from "@/lib/posts"
import { getAuthors } from "@/lib/authors"
import { SectionEditForm } from "@/components/admin/SectionEditForm"
import { SectionSelector } from "@/components/admin/SectionSelector"
import { TagInput } from "@/components/admin/TagInput"
import { ConfirmDialog } from "@/components/shared/ConfirmDialog"
import { toast } from "@/hooks/use-toast"
import type { BlogPost, PostSection, SectionType, Category, Author } from "@/types/blog" // Added Category, Author
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select"
import {
    ChevronUp, ChevronDown, Trash2, Eye, EyeOff, Save, Loader2, RotateCcw
} from "lucide-react"
import { cn } from "@/lib/utils"
import { DEFAULT_SECTION_CONTENT, SECTION_TYPES } from "@/lib/constants"


type PostMeta = Omit<BlogPost, "id" | "sections">

const DEFAULT_META: PostMeta = {
    title: "",
    slug: "",
    excerpt: "",
    description: "", // Added
    coverImage: "",
    status: "draft",
    tags: [],
    categoryId: "",
    authorId: "", // Added
    viewCount: 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
}

export default function PostEditorPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const isNew = !id

    const [meta, setMeta] = useState<PostMeta>(DEFAULT_META)
    const [sections, setSections] = useState<PostSection[]>([])
    const [categories, setCategories] = useState<Category[]>([]) // Added state
    const [authors, setAuthors] = useState<Author[]>([]) // Added state
    const [saving, setSaving] = useState(false)
    const [loading, setLoading] = useState(!isNew)
    const [slugManual, setSlugManual] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [deletingSectionId, setDeletingSectionId] = useState<string | null>(null)
    const [showResetConfirm, setShowResetConfirm] = useState(false)

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const q = query(collection(db, "categories"), orderBy("name"));
                const snapshot = await getDocs(q);
                const cats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Category));
                setCategories(cats);
            } catch (err) {
                console.error("Failed to fetch categories:", err);
            }
        };

        const fetchAuthorsData = async () => {
            try {
                const data = await getAuthors();
                setAuthors(data);
            } catch (err) {
                console.error("Failed to fetch authors:", err);
            }
        };

        fetchCategories();
        fetchAuthorsData();
    }, []);

    useEffect(() => {
        if (!id) return

        const fetchPost = async () => {
            try {
                const post = await getPostById(id)
                if (post) {
                    const { id: _id, sections: s, ...rest } = post
                    setMeta(rest)
                    setSections([...(s || [])].sort((a, b) => a.order - b.order))
                } else {
                    toast({ title: "Post not found", variant: "error" })
                    navigate("/blog-admin/posts")
                }
            } catch (err) {
                console.error("Failed to fetch post:", err)
                toast({ title: "Failed to load post", description: (err as Error).message, variant: "error" })
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
        fetchPost()
    }, [id, navigate])

    // Auto-initialize new posts with a header section
    useEffect(() => {
        if (isNew && sections.length === 0) {
            setSections([{
                id: nanoid(),
                type: "POST_HEADER_MINIMAL",
                order: 0,
                isVisible: true,
                content: {
                    ...DEFAULT_SECTION_CONTENT["POST_HEADER_MINIMAL"],
                    heading: "New Post Title",
                    text: "Post description goes here...",
                    date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
                    author: "Author Name"
                }
            }])
        }
    }, [isNew])

    const handleTitleChange = (title: string) => {
        setMeta(prev => ({
            ...prev,
            title,
            slug: slugManual ? prev.slug : generateSlug(title),
        }))
        if (errors.title) setErrors(e => ({ ...e, title: "" }))
    }

    const getDefaultContent = (type: string): Record<string, unknown> => {
        return DEFAULT_SECTION_CONTENT[type as SectionType] || {}
    }

    const addSections = (types: string[]) => {
        const newSections: PostSection[] = types.map((type, i) => ({
            id: nanoid(),
            type: type as PostSection["type"],
            order: sections.length + i,
            isVisible: true,
            content: getDefaultContent(type),
        }))
        setSections(prev => [...prev, ...newSections])
        toast({ title: `${types.length} sections added`, variant: "default" })
    }

    const updateSection = (updated: PostSection) => {
        setSections(prev => prev.map(s => s.id === updated.id ? updated : s))
    }

    const deleteSection = (sectionId: string) => {
        setSections(prev => prev.filter(s => s.id !== sectionId).map((s, i) => ({ ...s, order: i })))
        toast({ title: "Section removed", variant: "default" })
    }

    const moveSection = (index: number, direction: "up" | "down") => {
        const newSections = [...sections]
        const target = direction === "up" ? index - 1 : index + 1
        if (target < 0 || target >= newSections.length) return
            ;[newSections[index], newSections[target]] = [newSections[target], newSections[index]]
        setSections(newSections.map((s, i) => ({ ...s, order: i })))
    }

    const toggleVisibility = (sectionId: string) => {
        setSections(prev => prev.map(s => s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s))
    }

    const handleReset = () => {
        setSections([])
        setMeta(DEFAULT_META)
        setSlugManual(false)
        toast({ title: "Post reset to default", description: "All sections and metadata cleared.", variant: "default" })
    }

    const validate = () => {
        const newErrors: Record<string, string> = {}
        if (!meta.title.trim()) newErrors.title = "Title is required"
        if (!meta.slug.trim()) newErrors.slug = "Slug is required"
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSave = async () => {
        if (!validate()) {
            toast({ title: "Please fix the errors before saving", variant: "error" })
            return
        }
        setSaving(true)
        try {
            const data: any = {
                ...meta,
                sections,
                publishedAt: meta.status === "published"
                    ? (meta.publishedAt || Date.now())
                    : (meta.publishedAt || null),
                updatedAt: Date.now(),
            }
            if (isNew) {
                const newId = await createPost(data)
                navigate(`/blog-admin/posts/${newId}/edit`, { replace: true })
            } else {
                await updatePost(id!, data)
            }
            toast({ title: "Post saved successfully!", variant: "success" })
        } catch (err) {
            toast({ title: "Save failed", description: (err as Error).message, variant: "error" })
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-8 w-8 text-muted-foreground" /></div>
    }

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold">{isNew ? "New Post" : "Edit Post"}</h1>
                    {!isNew && <p className="text-sm text-muted-foreground">/blog/{meta.slug}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(true)} disabled={saving || (!sections.length && !meta.title)}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {saving ? "Saving..." : "Save Post"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
                {/* Left: Section Builder */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Sections</h2>
                        <SectionSelector onSelectMultiple={addSections} editorType="post" />
                    </div>

                    {sections.length === 0 && (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
                            <p className="mb-2 font-medium">No sections yet</p>
                            <p className="text-sm">Use the "Add section" dropdown above to add content blocks.</p>
                        </div>
                    )}

                    {sections.map((section, index) => (
                        <div key={section.id} className="border rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs font-mono">
                                        {(SECTION_TYPES as any)[section.type] || section.type}
                                    </Badge>
                                    {!section.isVisible && (
                                        <span className="text-xs text-muted-foreground">(hidden)</span>
                                    )}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => moveSection(index, "up")} disabled={index === 0}>
                                        <ChevronUp className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => moveSection(index, "down")} disabled={index === sections.length - 1}>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleVisibility(section.id)}>
                                        {section.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                        size="icon" variant="ghost"
                                        className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                        onClick={() => setDeletingSectionId(section.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <div className="p-4">
                                <SectionEditForm section={section} onChange={updateSection} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right: Post Meta */}
                <div className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-4">
                        <h2 className="font-semibold">Post Details</h2>

                        <div>
                            <Label>Status</Label>
                            <Select value={meta.status} onValueChange={v => setMeta(p => ({ ...p, status: v as "draft" | "published" }))}>
                                <SelectTrigger className="mt-1">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="published">Published</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label className={errors.title ? "text-destructive" : ""}>
                                Title <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                className={cn("mt-1", errors.title && "border-destructive focus-visible:ring-destructive")}
                                value={meta.title}
                                onChange={e => handleTitleChange(e.target.value)}
                                placeholder="My Awesome Post"
                            />
                            {errors.title && <p className="text-xs text-destructive mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <Label className={errors.slug ? "text-destructive" : ""}>
                                Slug <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                className={cn("mt-1 font-mono text-sm", errors.slug && "border-destructive focus-visible:ring-destructive")}
                                value={meta.slug}
                                onChange={e => {
                                    setSlugManual(true)
                                    setMeta(p => ({ ...p, slug: e.target.value }))
                                    if (errors.slug) setErrors(er => ({ ...er, slug: "" }))
                                }}
                                placeholder="my-awesome-post"
                            />
                            {errors.slug
                                ? <p className="text-xs text-destructive mt-1">{errors.slug}</p>
                                : <p className="text-xs text-muted-foreground mt-1">URL: /blog/{meta.slug || "..."}</p>
                            }
                        </div>

                        <div>
                            <Label>Description (SEO)</Label>
                            <Textarea
                                className="mt-1 resize-none h-20"
                                value={meta.description || ""}
                                onChange={e => setMeta(p => ({ ...p, description: e.target.value }))}
                                placeholder="Meta description for SEO..."
                            />
                        </div>

                        <div>
                            <Label>Author</Label>
                            <Select
                                value={meta.authorId || "default"}
                                onValueChange={v => setMeta(p => ({ ...p, authorId: v === "default" ? "" : v }))}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select an author" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="default">Default (None)</SelectItem>
                                    {authors.map(a => (
                                        <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Category</Label>
                            <Select
                                value={meta.categoryId || "uncategorized"}
                                onValueChange={v => setMeta(p => ({ ...p, categoryId: v === "uncategorized" ? "" : v }))}
                            >
                                <SelectTrigger className="mt-1">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="uncategorized">Uncategorized</SelectItem>
                                    {categories.map(c => (
                                        <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div>
                            <Label>Tags</Label>
                            <div className="mt-1">
                                <TagInput
                                    tags={meta.tags || []}
                                    onChange={tags => setMeta(p => ({ ...p, tags }))}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Excerpt</Label>
                            <Textarea
                                className="mt-1 resize-none"
                                rows={3}
                                value={meta.excerpt}
                                onChange={e => setMeta(p => ({ ...p, excerpt: e.target.value }))}
                                placeholder="A short description of the post..."
                            />
                        </div>

                        <div>
                            <Label>Cover Image URL</Label>
                            <Input
                                className="mt-1"
                                value={meta.coverImage || ""}
                                onChange={e => setMeta(p => ({ ...p, coverImage: e.target.value }))}
                                placeholder="https://..."
                            />
                            {meta.coverImage && (
                                <img src={meta.coverImage} alt="Cover preview" className="mt-2 rounded-md aspect-video object-cover w-full" />
                            )}
                        </div>

                        <div>
                            <Label>Reading Time (minutes)</Label>
                            <Input
                                className="mt-1"
                                type="number"
                                min={1}
                                value={meta.readingTime || 1}
                                onChange={e => setMeta(p => ({ ...p, readingTime: parseInt(e.target.value) || 1 }))}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Delete Section Dialog */}
            <ConfirmDialog
                open={!!deletingSectionId}
                onOpenChange={open => !open && setDeletingSectionId(null)}
                title="Delete Section?"
                description="This section will be permanently removed from the post."
                confirmLabel="Delete"
                onConfirm={() => {
                    if (deletingSectionId) deleteSection(deletingSectionId)
                    setDeletingSectionId(null)
                }}
            />

            <ConfirmDialog
                open={showResetConfirm}
                onOpenChange={setShowResetConfirm}
                title="Reset to Default?"
                description="This will remove ALL sections and reset all post details. This action cannot be undone."
                confirmLabel="Reset Everything"
                variant="destructive"
                onConfirm={() => {
                    handleReset()
                    setShowResetConfirm(false)
                }}
            />
        </div>
    )
}
