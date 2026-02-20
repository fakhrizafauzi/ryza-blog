import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { SectionEditForm } from "@/components/admin/SectionEditForm";
import { SectionSelector } from "@/components/admin/SectionSelector";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { toast } from "@/hooks/use-toast";
import type { Page, PostSection, SectionType } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
    ChevronUp, ChevronDown, Trash2, Eye, EyeOff, Save, Loader2, RotateCcw
} from "lucide-react";
import { nanoid } from "nanoid";
import { SECTION_TYPES, DEFAULT_SECTION_CONTENT } from "@/lib/constants";


export default function PageEditorPage() {
    const { slug } = useParams<{ slug: string }>();

    const [page, setPage] = useState<Page | null>(null);
    const [sections, setSections] = useState<PostSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deletingSectionId, setDeletingSectionId] = useState<string | null>(null);
    const [showResetConfirm, setShowResetConfirm] = useState(false);

    useEffect(() => {
        if (!slug) return;
        const fetchPage = async () => {
            try {
                const docRef = doc(db, "pages", slug);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data() as Page;
                    setPage(data);
                    setSections(data.sections || []);
                } else {
                    setPage({
                        id: slug,
                        slug,
                        title: slug === "home" ? "Home Page" : "Blog Page",
                        updatedAt: Date.now(),
                        sections: []
                    });
                }
            } catch (err) {
                console.error("Error fetching page:", err);
                toast({ title: "Failed to load page", variant: "error" });
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    const getDefaultContent = (type: string): Record<string, unknown> => {
        return DEFAULT_SECTION_CONTENT[type as SectionType] || {};
    };

    const addSections = (types: string[]) => {
        const newSections: PostSection[] = types.map((type, i) => ({
            id: nanoid(),
            type: type as PostSection["type"],
            order: sections.length + i,
            isVisible: true,
            content: getDefaultContent(type),
        }));
        setSections(prev => [...prev, ...newSections]);
        toast({ title: `${types.length} sections added`, variant: "default" });
    };

    const updateSection = (updated: PostSection) => {
        setSections(prev => prev.map(s => s.id === updated.id ? updated : s));
    };

    const deleteSection = (sectionId: string) => {
        setSections(prev => prev.filter(s => s.id !== sectionId).map((s, i) => ({ ...s, order: i })));
        toast({ title: "Section removed", variant: "default" });
    };

    const moveSection = (index: number, direction: "up" | "down") => {
        const newSections = [...sections];
        const target = direction === "up" ? index - 1 : index + 1;
        if (target < 0 || target >= newSections.length) return;
        [newSections[index], newSections[target]] = [newSections[target], newSections[index]];
        setSections(newSections.map((s, i) => ({ ...s, order: i })));
    };

    const toggleVisibility = (sectionId: string) => {
        setSections(prev => prev.map(s => s.id === sectionId ? { ...s, isVisible: !s.isVisible } : s));
    };

    const handleReset = () => {
        setSections([]);
        if (page) {
            setPage({
                ...page,
                title: page.slug === "home" ? "Home Page" : page.slug === "blog" ? "Blog Page" : page.title,
                description: ""
            });
        }
        toast({ title: "Page reset to default", description: "All sections removed.", variant: "default" });
    };

    const handleSave = async () => {
        if (!page) return;
        setSaving(true);
        try {
            const data: Page = { ...page, sections, updatedAt: Date.now() };
            await setDoc(doc(db, "pages", page.slug), data);
            toast({ title: "Page saved successfully!", variant: "success" });
        } catch (err) {
            console.error("Error saving page:", err);
            toast({ title: "Failed to save page", description: (err as Error).message, variant: "error" });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin h-8 w-8 text-muted-foreground" /></div>;
    }

    if (!page) return <div>Page not found</div>;

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Edit Page: {page.title}</h1>
                    <p className="text-sm text-muted-foreground">/{page.slug}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(true)} disabled={saving || sections.length === 0}>
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>
                    <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        {saving ? "Saving..." : "Save Page"}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-lg">Sections</h2>
                        <SectionSelector onSelectMultiple={addSections} editorType="page" />
                    </div>

                    {sections.length === 0 && (
                        <div className="border-2 border-dashed rounded-lg p-12 text-center text-muted-foreground">
                            <p className="mb-2 font-medium">No sections yet</p>
                            <p className="text-sm">Use the "Add section" dropdown above to start building.</p>
                        </div>
                    )}

                    {sections.map((section, index) => (
                        <div key={section.id} className="border rounded-lg overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b">
                                <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="text-xs font-mono">
                                        {(SECTION_TYPES as any)[section.type] || section.type}
                                    </Badge>
                                    {!section.isVisible && <span className="text-xs text-muted-foreground">(hidden)</span>}
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

                <div className="space-y-4">
                    <div className="border rounded-lg p-4 space-y-4">
                        <h2 className="font-semibold">Page Settings</h2>
                        <div>
                            <Label>Page Title</Label>
                            <Input
                                className="mt-1"
                                value={page.title}
                                onChange={e => setPage({ ...page, title: e.target.value })}
                            />
                        </div>
                        <div>
                            <Label>Description (SEO)</Label>
                            <Textarea
                                className="mt-1 resize-none"
                                rows={3}
                                value={page.description || ""}
                                onChange={e => setPage({ ...page, description: e.target.value })}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={!!deletingSectionId}
                onOpenChange={open => !open && setDeletingSectionId(null)}
                title="Delete Section?"
                description="This section will be permanently removed from the page."
                confirmLabel="Delete"
                onConfirm={() => {
                    if (deletingSectionId) deleteSection(deletingSectionId);
                    setDeletingSectionId(null);
                }}
            />

            <ConfirmDialog
                open={showResetConfirm}
                onOpenChange={setShowResetConfirm}
                title="Reset to Default?"
                description="This will remove ALL sections and reset page settings. This action cannot be undone."
                confirmLabel="Reset Everything"
                variant="destructive"
                onConfirm={() => {
                    handleReset();
                    setShowResetConfirm(false);
                }}
            />
        </div>
    );
}
