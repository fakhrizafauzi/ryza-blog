import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Trash2, Search, ArrowUp, ArrowDown } from "lucide-react";
import type { PostSection } from "@/types/blog";
import { LUCIDE_ICONS } from "@/lib/icons";
import { useState } from "react";

interface SectionFormProps {
    section: PostSection;
    onChange: (updated: PostSection) => void;
}

function updateContent(section: PostSection, key: string, value: unknown): PostSection {
    return { ...section, content: { ...section.content, [key]: value } };
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function Field({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
    return <div className={className}><Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mb-1.5 block">{label}</Label>{children}</div>;
}

function IconSelector({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    const [search, setSearch] = useState("");
    const filteredIcons = LUCIDE_ICONS.filter(icon =>
        icon.label.toLowerCase().includes(search.toLowerCase()) ||
        icon.name.toLowerCase().includes(search.toLowerCase())
    ).slice(0, 100);

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Icon" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
                <div className="flex items-center px-3 pb-2 border-b sticky top-0 bg-popover z-10">
                    <Search className="h-4 w-4 mr-2 text-muted-foreground" />
                    <Input
                        placeholder="Search icons..."
                        className="h-8 border-none focus-visible:ring-0 px-0"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        onKeyDown={(e) => e.stopPropagation()}
                    />
                </div>
                {filteredIcons.map((icon) => (
                    <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center gap-2">
                            <span className="text-xs">{icon.label}</span>
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}

function TemplateSelector({ value, onChange }: { value: string; onChange: (val: string) => void }) {
    return (
        <Field label="Design Style">
            <Select value={value || "style-1"} onValueChange={onChange}>
                <SelectTrigger className="w-full border-primary/20 bg-primary/5 font-bold">
                    <SelectValue placeholder="Select Style" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="style-1" className="font-bold">Style 1: Modern & Immersive</SelectItem>
                    <SelectItem value="style-2" className="font-bold">Style 2: Minimalist & Clean</SelectItem>
                    <SelectItem value="style-3" className="font-bold">Style 3: Bold & Typographic</SelectItem>
                    <SelectItem value="style-4" className="font-bold">Style 4: Swiss Grid (Technical)</SelectItem>
                    <SelectItem value="style-5" className="font-bold">Style 5: Soft Organic (Friendly)</SelectItem>
                </SelectContent>
            </Select>
        </Field>
    );
}

function ArrayEditor<T extends Record<string, unknown>>({
    items, onChange, defaultItem, renderItem,
}: {
    items: T[];
    onChange: (items: T[]) => void;
    defaultItem: T;
    renderItem: (item: T, index: number, update: (item: T) => void, remove: () => void) => React.ReactNode;
}) {
    return (
        <div className="space-y-4">
            {items.map((item, i) => renderItem(
                item,
                i,
                (updated) => onChange(items.map((x, j) => j === i ? updated : x)),
                () => onChange(items.filter((_, j) => j !== i)),
            ))}
            <Button type="button" variant="outline" size="sm" className="w-full border-dashed py-6 rounded-xl hover:bg-primary/5" onClick={() => onChange([...items, { ...defaultItem }])}>
                <Plus className="h-3.5 w-3.5 mr-1.5" /> Add New Item
            </Button>
        </div>
    );
}

// ─── Section Forms ─────────────────────────────────────────────────────────────

function HeroForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Textarea value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Field label="Background Image URL"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.backgroundImage || ""} onChange={e => onChange(updateContent(section, "backgroundImage", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Primary Button Text"><Input value={c.primaryButtonText || ""} onChange={e => onChange(updateContent(section, "primaryButtonText", e.target.value))} /></Field>
                <Field label="Primary Button Link"><Input value={c.primaryButtonLink || ""} onChange={e => onChange(updateContent(section, "primaryButtonLink", e.target.value))} /></Field>
            </div>
        </div>
    );
}

function HomeHeroForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <div className="grid grid-cols-2 gap-3">
                <Field label="Badge"><Input value={c.badge || ""} onChange={e => onChange(updateContent(section, "badge", e.target.value))} /></Field>
                <Field label="Highlighted Word"><Input value={c.highlightedWord || ""} onChange={e => onChange(updateContent(section, "highlightedWord", e.target.value))} /></Field>
            </div>
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Description"><Textarea value={c.description || ""} onChange={e => onChange(updateContent(section, "description", e.target.value))} /></Field>
            <Field label="Background Image (Style 3)"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.backgroundImage || ""} onChange={e => onChange(updateContent(section, "backgroundImage", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Primary Link"><Input placeholder="https://example.com" value={c.primaryButtonLink || ""} onChange={e => onChange(updateContent(section, "primaryButtonLink", e.target.value))} /></Field>
                <Field label="Secondary Link"><Input placeholder="https://example.com" value={c.secondaryButtonLink || ""} onChange={e => onChange(updateContent(section, "secondaryButtonLink", e.target.value))} /></Field>
            </div>
        </div>
    );
}

function ContentForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Subheading (Style 1/2/3)"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Field label="HTML Content"><Textarea rows={8} className="font-mono text-xs" value={c.html || ""} onChange={e => onChange(updateContent(section, "html", e.target.value))} /></Field>
        </div>
    );
}

function QuoteForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Quote Text"><Textarea rows={3} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <Field label="Author"><Input value={c.author || ""} onChange={e => onChange(updateContent(section, "author", e.target.value))} /></Field>
            <Field label="Role"><Input value={c.role || ""} onChange={e => onChange(updateContent(section, "role", e.target.value))} /></Field>
        </div>
    );
}

function CalloutForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Type">
                <Select value={c.type || "info"} onValueChange={v => onChange(updateContent(section, "type", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="tip">Tip</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Text"><Textarea rows={3} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
        </div>
    );
}

function CodeForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading (Style 1/2/3)"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading (Style 1/2/3)"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Field label="Language">
                <Select value={c.language || "javascript"} onValueChange={v => onChange(updateContent(section, "language", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {["javascript", "typescript", "python", "java", "csharp", "php", "go", "ruby", "html", "css", "json", "yaml", "markdown"].map(lang => (
                            <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </Field>
            <Field label="Code"><Textarea rows={8} className="font-mono text-xs" value={c.code || ""} onChange={e => onChange(updateContent(section, "code", e.target.value))} /></Field>
        </div>
    );
}

function ImageSplitForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Text"><Textarea rows={3} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <Field label="Image URL"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>

        </div>
    );
}

function FullImageForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Image URL"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>
            <Field label="Caption"><Input value={c.caption || ""} onChange={e => onChange(updateContent(section, "caption", e.target.value))} /></Field>
        </div>
    );
}

function GalleryForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const images: string[] = c.images || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Columns">
                <Select value={String(c.columns || 3)} onValueChange={v => onChange(updateContent(section, "columns", Number(v)))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{[2, 3, 4, 5].map(n => <SelectItem key={n} value={String(n)}>{n} Columns</SelectItem>)}</SelectContent>
                </Select>
            </Field>
            <Label className="text-xs">Images</Label>
            <ArrayEditor
                items={images.map(url => ({ url }))}
                onChange={v => onChange(updateContent(section, "images", v.map(x => x.url)))}
                defaultItem={{ url: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={item.url} onChange={e => update({ url: e.target.value })} />
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                )}
            />
        </div>
    );
}

function FAQForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { question: string; answer: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Label className="text-xs">FAQ Items</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ question: "New Question", answer: "Answer here." }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Item {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Question" value={item.question} onChange={e => update({ ...item, question: e.target.value })} />
                        <Textarea placeholder="Answer" rows={2} value={item.answer} onChange={e => update({ ...item, answer: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function StatsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { value: string; label: string; description?: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Columns">
                <Select value={String(c.columns || 4)} onValueChange={v => onChange(updateContent(section, "columns", Number(v)))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {[2, 3, 4].map(n => <SelectItem key={n} value={String(n)}>{n} Columns</SelectItem>)}
                    </SelectContent>
                </Select>
            </Field>
            <Label className="text-xs">Stats</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ value: "100+", label: "Label" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Stat {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Value (e.g. 100+)" value={item.value} onChange={e => update({ ...item, value: e.target.value })} />
                            <Input placeholder="Label" value={item.label} onChange={e => update({ ...item, label: e.target.value })} />
                        </div>
                        <Input placeholder="Description (optional)" value={item.description || ""} onChange={e => update({ ...item, description: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function FeatureGridForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { icon?: string; title: string; description: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Textarea value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Field label="Columns">
                <Select value={String(c.columns || 3)} onValueChange={v => onChange(updateContent(section, "columns", Number(v)))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{[2, 3, 4].map(n => <SelectItem key={n} value={String(n)}>{n} Columns</SelectItem>)}</SelectContent>
                </Select>
            </Field>
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block">Features</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ icon: "Sparkles", title: "Feature", description: "Description" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border border-primary/10 bg-card rounded-2xl p-6 space-y-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-primary">Feature {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <div className="grid grid-cols-[140px_1fr] gap-3">
                            <Field label="Icon">
                                <IconSelector value={item.icon || ""} onChange={v => update({ ...item, icon: v })} />
                            </Field>
                            <Field label="Title">
                                <Input placeholder="Title" value={item.title} onChange={e => update({ ...item, title: e.target.value })} />
                            </Field>
                        </div>
                        <Field label="Description">
                            <Textarea placeholder="Description" rows={3} value={item.description} onChange={e => update({ ...item, description: e.target.value })} />
                        </Field>
                    </div>
                )}
            />
        </div>
    );
}

function CTAForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Textarea value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>

            <div className="grid grid-cols-2 gap-4">
                <Field label="Button Label"><Input value={c.buttonLabel || ""} onChange={e => onChange(updateContent(section, "buttonLabel", e.target.value))} /></Field>
                <Field label="Button URL"><Input placeholder="https://example.com" value={c.buttonUrl || ""} onChange={e => onChange(updateContent(section, "buttonUrl", e.target.value))} /></Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Field label="Secondary Label"><Input value={c.secondaryLabel || ""} onChange={e => onChange(updateContent(section, "secondaryLabel", e.target.value))} /></Field>
                <Field label="Secondary URL"><Input placeholder="https://example.com" value={c.secondaryUrl || ""} onChange={e => onChange(updateContent(section, "secondaryUrl", e.target.value))} /></Field>
            </div>
        </div>
    );
}

function NewsletterForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Subtitle"><Input value={c.subtitle || ""} onChange={e => onChange(updateContent(section, "subtitle", e.target.value))} /></Field>
            <Field label="Placeholder"><Input value={c.placeholder || ""} onChange={e => onChange(updateContent(section, "placeholder", e.target.value))} /></Field>
            <Field label="Button Text"><Input value={c.buttonText || ""} onChange={e => onChange(updateContent(section, "buttonText", e.target.value))} /></Field>
        </div>
    );
}

function AuthorForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Name"><Input value={c.name || ""} onChange={e => onChange(updateContent(section, "name", e.target.value))} /></Field>
            <Field label="Avatar URL"><Input placeholder="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" value={c.avatar || ""} onChange={e => onChange(updateContent(section, "avatar", e.target.value))} /></Field>
            <Field label="Bio"><Textarea rows={3} value={c.bio || ""} onChange={e => onChange(updateContent(section, "bio", e.target.value))} /></Field>
        </div>
    );
}

function RelatedPostsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Count"><Input type="number" value={c.count || 3} onChange={e => onChange(updateContent(section, "count", Number(e.target.value)))} /></Field>
            <Field label="Tags (comma-separated)"><Input value={(c.tags || []).join(", ")} onChange={e => onChange(updateContent(section, "tags", e.target.value.split(",").map((s: string) => s.trim())))} /></Field>
        </div>
    );
}

function FeaturedPostsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Subtitle"><Input value={c.subtitle || ""} onChange={e => onChange(updateContent(section, "subtitle", e.target.value))} /></Field>
            <Field label="Count"><Input type="number" value={c.count || 3} onChange={e => onChange(updateContent(section, "count", Number(e.target.value)))} /></Field>
            <div className="flex items-center gap-2">
                <Switch checked={!!c.showLink} onCheckedChange={v => onChange(updateContent(section, "showLink", v))} />
                <Label className="text-xs">Show "View All" link</Label>
            </div>
        </div>
    );
}

function TimelineForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { date: string; title: string; description?: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Timeline Events</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ date: "2024", title: "Event", description: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Event {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <div className="grid grid-cols-[100px_1fr] gap-2">
                            <Input placeholder="Date" value={item.date} onChange={e => update({ ...item, date: e.target.value })} />
                            <Input placeholder="Title" value={item.title} onChange={e => update({ ...item, title: e.target.value })} />
                        </div>
                        <Textarea placeholder="Description" rows={2} value={item.description || ""} onChange={e => update({ ...item, description: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function TestimonialsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { quote: string; author: string; role?: string; avatar?: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Testimonials</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ quote: "Great product!", author: "Jane Doe", role: "CEO" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Testimonial {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Textarea placeholder="Quote" rows={2} value={item.quote} onChange={e => update({ ...item, quote: e.target.value })} />
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Author" value={item.author} onChange={e => update({ ...item, author: e.target.value })} />
                            <Input placeholder="Role" value={item.role || ""} onChange={e => update({ ...item, role: e.target.value })} />
                        </div>
                        <Input placeholder="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" value={item.avatar || ""} onChange={e => update({ ...item, avatar: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function TeamForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const members: { name: string; role: string; bio?: string; avatar?: string }[] = c.members || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Team Members</Label>
            <ArrayEditor
                items={members}
                onChange={v => onChange(updateContent(section, "members", v))}
                defaultItem={{ name: "Jane Doe", role: "Developer" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Member {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Name" value={item.name} onChange={e => update({ ...item, name: e.target.value })} />
                            <Input placeholder="Role" value={item.role} onChange={e => update({ ...item, role: e.target.value })} />
                        </div>
                        <Input placeholder="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike" value={item.avatar || ""} onChange={e => update({ ...item, avatar: e.target.value })} />
                        <Textarea placeholder="Bio" rows={2} value={item.bio || ""} onChange={e => update({ ...item, bio: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function PricingForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const plans: { name: string; price: string; period: string; features: string[]; highlighted?: boolean; buttonLabel: string; buttonUrl: string }[] = c.plans || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Pricing Plans</Label>
            <ArrayEditor
                items={plans}
                onChange={v => onChange(updateContent(section, "plans", v))}
                defaultItem={{ name: "Basic", price: "$0", period: "month", features: ["1 User"], buttonLabel: "Buy", buttonUrl: "#" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Plan {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Plan Name" value={item.name} onChange={e => update({ ...item, name: e.target.value })} />
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Price" value={item.price} onChange={e => update({ ...item, price: e.target.value })} />
                            <Input placeholder="Period" value={item.period} onChange={e => update({ ...item, period: e.target.value })} />
                        </div>
                        <div className="flex items-center gap-2">
                            <Switch checked={!!item.highlighted} onCheckedChange={v => update({ ...item, highlighted: v })} />
                            <Label className="text-xs">Highlighted</Label>
                        </div>
                        <Input placeholder="Features (comma-separated)" value={(item.features || []).join(", ")} onChange={e => update({ ...item, features: e.target.value.split(",").map((s: string) => s.trim()) })} />
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Button Label" value={item.buttonLabel} onChange={e => update({ ...item, buttonLabel: e.target.value })} />
                            <Input placeholder="https://example.com" value={item.buttonUrl} onChange={e => update({ ...item, buttonUrl: e.target.value })} />
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

function StepsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const steps: { title: string; description?: string }[] = c.steps || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>

            <Label className="text-xs">Steps</Label>
            <ArrayEditor
                items={steps}
                onChange={v => onChange(updateContent(section, "steps", v))}
                defaultItem={{ title: "Step", description: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Step {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Title" value={item.title} onChange={e => update({ ...item, title: e.target.value })} />
                        <Textarea placeholder="Description" rows={2} value={item.description || ""} onChange={e => update({ ...item, description: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function BannerForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Text"><Input value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <Field label="Subtext"><Input value={c.subtext || ""} onChange={e => onChange(updateContent(section, "subtext", e.target.value))} /></Field>
            <Field label="Variant">
                <Select value={c.variant || "info"} onValueChange={v => onChange(updateContent(section, "variant", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {["info", "warning", "success", "error", "primary"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                </Select>
            </Field>
        </div>
    );
}

function VideoForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="URL (YouTube, Vimeo, or direct MP4)"><Input placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ" value={c.url || ""} onChange={e => onChange(updateContent(section, "url", e.target.value))} /></Field>
            <Field label="Thumbnail URL (optional)"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.thumbnail || ""} onChange={e => onChange(updateContent(section, "thumbnail", e.target.value))} /></Field>
            <Field label="Caption"><Input value={c.caption || ""} onChange={e => onChange(updateContent(section, "caption", e.target.value))} /></Field>
            <Field label="Aspect Ratio">
                <Select value={c.aspectRatio || "16/9"} onValueChange={v => onChange(updateContent(section, "aspectRatio", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="16/9">16:9</SelectItem>
                        <SelectItem value="4/3">4:3</SelectItem>
                        <SelectItem value="1/1">1:1</SelectItem>
                    </SelectContent>
                </Select>
            </Field>
        </div>
    );
}

function DividerForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Style">
                <Select value={c.style || "line"} onValueChange={v => onChange(updateContent(section, "style", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {["line", "dots", "thick"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                </Select>
            </Field>
            <Field label="Label (optional)"><Input value={c.label || ""} onChange={e => onChange(updateContent(section, "label", e.target.value))} /></Field>
        </div>
    );
}

function SpacerForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Size">
                <Select value={c.size || "md"} onValueChange={v => onChange(updateContent(section, "size", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        {["sm", "md", "lg", "xl"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                    </SelectContent>
                </Select>
            </Field>
        </div>
    );
}

function ContactFormForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Field label="Email Recipient"><Input placeholder="your@email.com" value={c.emailTo || ""} onChange={e => onChange(updateContent(section, "emailTo", e.target.value))} /></Field>
            <Field label="Success Message"><Input value={c.successMessage || ""} onChange={e => onChange(updateContent(section, "successMessage", e.target.value))} /></Field>
        </div>
    );
}

function MapEmbedForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Google Maps Embed URL"><Textarea rows={3} className="text-xs" placeholder='<iframe src="https://www.google.com/maps/embed?..." ...></iframe>' value={c.embedUrl || ""} onChange={e => onChange(updateContent(section, "embedUrl", e.target.value))} /></Field>
            <Field label="Height (px)"><Input type="number" value={c.height || 450} onChange={e => onChange(updateContent(section, "height", Number(e.target.value)))} /></Field>
            <Field label="Caption"><Input value={c.caption || ""} onChange={e => onChange(updateContent(section, "caption", e.target.value))} /></Field>
        </div>
    );
}

function LogoCloudForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const logos: { src: string; alt: string }[] = c.logos || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Logos</Label>
            <ArrayEditor
                items={logos}
                onChange={v => onChange(updateContent(section, "logos", v))}
                defaultItem={{ src: "", alt: "Logo" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Logo {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <Input placeholder="https://cdn.simpleicons.org/react/61DAFB" value={item.src} onChange={e => update({ ...item, src: e.target.value })} />
                        <Input placeholder="Alt Text" value={item.alt} onChange={e => update({ ...item, alt: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function AlertForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Variant">
                <Select value={c.variant || "info"} onValueChange={v => onChange(updateContent(section, "variant", v))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{["info", "warning", "success", "error"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                </Select>
            </Field>
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Text"><Textarea rows={2} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <div className="flex items-center space-x-2">
                <Switch checked={!!c.dismissible} onCheckedChange={v => onChange(updateContent(section, "dismissible", v))} />
                <Label className="text-xs">Dismissible</Label>
            </div>
        </div>
    );
}

function AccordionForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { title: string; content: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <div className="flex items-center gap-2">
                <Switch checked={!!c.allowMultiple} onCheckedChange={v => onChange(updateContent(section, "allowMultiple", v))} />
                <Label className="text-xs">Allow multiple open</Label>
            </div>
            <Label className="text-xs">Accordion Items</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ title: "Item", content: "Content here." }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Item {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Title" value={item.title} onChange={e => update({ ...item, title: e.target.value })} />
                        <Textarea placeholder="Content" rows={2} value={item.content} onChange={e => update({ ...item, content: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function TabsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const tabs: { label: string; content: string }[] = c.tabs || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Tabs</Label>
            <ArrayEditor
                items={tabs}
                onChange={v => onChange(updateContent(section, "tabs", v))}
                defaultItem={{ label: "Tab", content: "Content here." }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Tab {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Tab Label" value={item.label} onChange={e => update({ ...item, label: e.target.value })} />
                        <Textarea placeholder="Content" rows={3} value={item.content} onChange={e => update({ ...item, content: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function ProgressBarsForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { label: string; value: number; color?: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Progress Bars</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ label: "Skill", value: 80 }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Bar {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Label" value={item.label} onChange={e => update({ ...item, label: e.target.value })} />
                            <Input type="number" min={0} max={100} placeholder="Value %" value={item.value} onChange={e => update({ ...item, value: Number(e.target.value) })} />
                        </div>
                        <Input placeholder="Color (e.g. #3b82f6)" value={item.color || ""} onChange={e => update({ ...item, color: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function IconListForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { icon?: string; text: string; description?: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Columns">
                <Select value={String(c.columns || 1)} onValueChange={v => onChange(updateContent(section, "columns", Number(v)))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="1">1 Column</SelectItem><SelectItem value="2">2 Columns</SelectItem></SelectContent>
                </Select>
            </Field>
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block">Items</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ icon: "Check", text: "Item" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border border-primary/10 bg-card rounded-2xl p-6 space-y-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-primary">Item {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <div className="grid grid-cols-[140px_1fr] gap-3">
                            <Field label="Icon">
                                <IconSelector value={item.icon || ""} onChange={v => update({ ...item, icon: v })} />
                            </Field>
                            <Field label="Text">
                                <Input placeholder="Text" value={item.text} onChange={e => update({ ...item, text: e.target.value })} />
                            </Field>
                        </div>
                        <Field label="Description (optional)">
                            <Input placeholder="Description" value={item.description || ""} onChange={e => update({ ...item, description: e.target.value })} />
                        </Field>
                    </div>
                )}
            />
        </div>
    );
}

function SocialLinksForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const links: { platform: string; url: string; label: string }[] = c.links || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>

            <Label className="text-xs">Social Links</Label>
            <ArrayEditor
                items={links}
                onChange={v => onChange(updateContent(section, "links", v))}
                defaultItem={{ platform: "twitter", url: "https://twitter.com", label: "Twitter" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Link {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Platform (e.g. twitter)" value={item.platform} onChange={e => update({ ...item, platform: e.target.value })} />
                            <Input placeholder="Label" value={item.label} onChange={e => update({ ...item, label: e.target.value })} />
                        </div>
                        <Input placeholder="URL" value={item.url} onChange={e => update({ ...item, url: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function AuthorBioForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Name"><Input value={c.name || ""} onChange={e => onChange(updateContent(section, "name", e.target.value))} /></Field>
            <Field label="Role"><Input value={c.role || ""} onChange={e => onChange(updateContent(section, "role", e.target.value))} /></Field>
            <Field label="Avatar URL"><Input placeholder="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" value={c.avatar || ""} onChange={e => onChange(updateContent(section, "avatar", e.target.value))} /></Field>
            <Field label="Bio"><Textarea rows={3} value={c.bio || ""} onChange={e => onChange(updateContent(section, "bio", e.target.value))} /></Field>
        </div>
    );
}

function TagsCloudForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const tags: { name: string; slug: string }[] = c.tags || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Tags</Label>
            <ArrayEditor
                items={tags}
                onChange={v => onChange(updateContent(section, "tags", v))}
                defaultItem={{ name: "New Tag", slug: "new-tag" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="flex gap-2 items-center">
                        <Input placeholder="Name" value={item.name} onChange={e => update({ ...item, name: e.target.value })} />
                        <Input placeholder="Slug" value={item.slug} onChange={e => update({ ...item, slug: e.target.value })} />
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                )}
            />
        </div>
    );
}

function TwoColumnForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <div className="grid grid-cols-2 gap-2">
                <Field label="Left Heading"><Input value={c.leftHeading || ""} onChange={e => onChange(updateContent(section, "leftHeading", e.target.value))} /></Field>
                <Field label="Right Heading"><Input value={c.rightHeading || ""} onChange={e => onChange(updateContent(section, "rightHeading", e.target.value))} /></Field>
            </div>
            <Field label="Left Content"><Textarea rows={4} value={c.leftContent || ""} onChange={e => onChange(updateContent(section, "leftContent", e.target.value))} /></Field>
            <Field label="Right Content"><Textarea rows={4} value={c.rightContent || ""} onChange={e => onChange(updateContent(section, "rightContent", e.target.value))} /></Field>
        </div>
    );
}

function CardGridForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const cards: { title: string; description?: string; image?: string; link?: string; badge?: string }[] = c.cards || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Columns">
                <Select value={String(c.columns || 3)} onValueChange={v => onChange(updateContent(section, "columns", Number(v)))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{[2, 3, 4].map(n => <SelectItem key={n} value={String(n)}>{n} Columns</SelectItem>)}</SelectContent>
                </Select>
            </Field>
            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground block">Cards</Label>
            <ArrayEditor
                items={cards}
                onChange={v => onChange(updateContent(section, "cards", v))}
                defaultItem={{ title: "Card Title", description: "Description" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border border-primary/10 bg-card rounded-2xl p-6 space-y-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-[10px] font-black uppercase tracking-tighter text-primary">Card {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <Field label="Title">
                            <Input placeholder="Title" value={item.title} onChange={e => update({ ...item, title: e.target.value })} />
                        </Field>
                        <Field label="Description">
                            <Textarea placeholder="Description" rows={2} value={item.description || ""} onChange={e => update({ ...item, description: e.target.value })} />
                        </Field>
                        <Field label="Image URL">
                            <Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={item.image || ""} onChange={e => update({ ...item, image: e.target.value })} />
                        </Field>
                        <div className="grid grid-cols-2 gap-3">
                            <Field label="Link URL">
                                <Input placeholder="https://example.com" value={item.link || ""} onChange={e => update({ ...item, link: e.target.value })} />
                            </Field>
                            <Field label="Badge">
                                <Input placeholder="Badge" value={item.badge || ""} onChange={e => update({ ...item, badge: e.target.value })} />
                            </Field>
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

function CountdownForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Target Date & Time"><Input type="datetime-local" value={c.targetDate || ""} onChange={e => onChange(updateContent(section, "targetDate", e.target.value))} /></Field>
            <Field label="Subtext"><Input value={c.subtext || ""} onChange={e => onChange(updateContent(section, "subtext", e.target.value))} /></Field>
        </div>
    );
}

function AudioForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Audio URL"><Input placeholder="https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a731ad.mp3" value={c.url || ""} onChange={e => onChange(updateContent(section, "url", e.target.value))} /></Field>
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Description"><Textarea rows={2} value={c.description || ""} onChange={e => onChange(updateContent(section, "description", e.target.value))} /></Field>
        </div>
    );
}

function MinimalTextForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Text"><Textarea rows={3} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <Field label="Subtext"><Input value={c.subtext || ""} onChange={e => onChange(updateContent(section, "subtext", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Size">
                    <Select value={c.size || "lg"} onValueChange={v => onChange(updateContent(section, "size", v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>{["sm", "md", "lg", "xl"].map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}</SelectContent>
                    </Select>
                </Field>
                <Field label="Alignment">
                    <Select value={c.align || "center"} onValueChange={v => onChange(updateContent(section, "align", v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            </div>
            <div className="flex items-center gap-2 pt-2">
                <Switch checked={!!c.italic} onCheckedChange={v => onChange(updateContent(section, "italic", v))} />
                <Label className="text-xs">Italicize main text</Label>
            </div>
        </div>
    );
}

function ParallaxForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Background Image URL"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-2">
                <Field label="Height (px)"><Input type="number" value={c.height || 500} onChange={e => onChange(updateContent(section, "height", Number(e.target.value)))} /></Field>
                <Field label="Overlay (0-1)"><Input type="number" step="0.1" min={0} max={1} value={c.overlay ?? 0.5} onChange={e => onChange(updateContent(section, "overlay", Number(e.target.value)))} /></Field>
            </div>
        </div>
    );
}

function ComparisonForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const rows: { feature: string; a?: string | boolean; b?: string | boolean }[] = c.rows || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-2">
                <Field label="Label A"><Input value={c.labelA || ""} onChange={e => onChange(updateContent(section, "labelA", e.target.value))} /></Field>
                <Field label="Label B"><Input value={c.labelB || ""} onChange={e => onChange(updateContent(section, "labelB", e.target.value))} /></Field>
            </div>
            <Label className="text-xs">Rows</Label>
            <ArrayEditor
                items={rows}
                onChange={v => onChange(updateContent(section, "rows", v))}
                defaultItem={{ feature: "Feature", a: true, b: false }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Row {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Feature name" value={item.feature} onChange={e => update({ ...item, feature: e.target.value })} />
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="A value (or true/false)" value={String(item.a ?? "")} onChange={e => {
                                const v = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;
                                update({ ...item, a: v });
                            }} />
                            <Input placeholder="B value (or true/false)" value={String(item.b ?? "")} onChange={e => {
                                const v = e.target.value === "true" ? true : e.target.value === "false" ? false : e.target.value;
                                update({ ...item, b: v });
                            }} />
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

function TableForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Headers (comma-separated)">
                <Input
                    value={(c.headers || []).join(", ")}
                    onChange={e => onChange(updateContent(section, "headers", e.target.value.split(",").map((s: string) => s.trim())))}
                />
            </Field>
            <Field label="Rows (one row per line, cells comma-separated)">
                <Textarea
                    rows={6}
                    className="font-mono text-xs"
                    value={(c.rows || []).map((r: { cells: string[] }) => (r.cells || []).join(", ")).join("\n")}
                    onChange={e => {
                        const newRows = e.target.value.split("\n").map(line => ({
                            cells: line.split(",").map(s => s.trim())
                        }));
                        onChange(updateContent(section, "rows", newRows));
                    }}
                />
            </Field>
            <div className="flex items-center gap-2">
                <Switch checked={!!c.striped} onCheckedChange={v => onChange(updateContent(section, "striped", v))} />
                <Label className="text-xs">Striped rows</Label>
            </div>
        </div>
    );
}

function MultiColumnForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const columns: { heading: string; content: string }[] = c.columns || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Label className="text-xs">Columns</Label>
            <ArrayEditor
                items={columns}
                onChange={v => onChange(updateContent(section, "columns", v))}
                defaultItem={{ heading: "Column Title", content: "Column content." }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Column {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <Input placeholder="Heading" value={item.heading} onChange={e => update({ ...item, heading: e.target.value })} />
                        <Textarea placeholder="Content" rows={3} value={item.content} onChange={e => update({ ...item, content: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function PortfolioForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { title: string; category: string; description: string; image?: string; link?: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Label className="text-xs">Portfolio Items</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ title: "Project Name", category: "Design", description: "Project description." }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-medium text-muted-foreground">Project {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-3 w-3" /></Button>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <Input placeholder="Title" value={item.title} onChange={e => update({ ...item, title: e.target.value })} />
                            <Input placeholder="Category" value={item.category} onChange={e => update({ ...item, category: e.target.value })} />
                        </div>
                        <Textarea placeholder="Description" rows={2} value={item.description} onChange={e => update({ ...item, description: e.target.value })} />
                        <Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={item.image || ""} onChange={e => update({ ...item, image: e.target.value })} />
                        <Input placeholder="https://example.com" value={item.link || ""} onChange={e => update({ ...item, link: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function EmbedForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Embed HTML">
                <Textarea
                    rows={5}
                    className="font-mono text-xs"
                    placeholder='<iframe src="https://www.figma.com/embed?embed_host=share&url=..." width="800" height="450" allowfullscreen></iframe>'
                    value={c.html || ""}
                    onChange={e => onChange(updateContent(section, "html", e.target.value))}
                />
            </Field>
            <Field label="Height (px)"><Input type="number" value={c.height || 400} onChange={e => onChange(updateContent(section, "height", Number(e.target.value)))} /></Field>
            <Field label="Caption"><Input value={c.caption || ""} onChange={e => onChange(updateContent(section, "caption", e.target.value))} /></Field>
        </div>
    );
}

function InteractiveMediaForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Textarea rows={2} value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>

            <div className="grid grid-cols-2 gap-3">
                <Field label="Type">
                    <Select value={c.type || "embed"} onValueChange={v => onChange(updateContent(section, "type", v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="video">Video (YT/Vimeo)</SelectItem>
                            <SelectItem value="embed">Embed (URL or HTML)</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <Field label="Layout">
                    <Select value={c.layout || "split"} onValueChange={v => onChange(updateContent(section, "layout", v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="split">Split Layout</SelectItem>
                            <SelectItem value="full">Full Width</SelectItem>
                            <SelectItem value="centered">Centered</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            </div>

            <Field label="Media URL (Youtube/Figma/etc)">
                <Input
                    placeholder="https://www.figma.com/file/..."
                    value={c.url || ""}
                    onChange={e => onChange(updateContent(section, "url", e.target.value))}
                />
            </Field>

            <Field label="Custom Embed HTML (Optional)">
                <Textarea
                    rows={4}
                    className="font-mono text-xs"
                    placeholder="<iframe ...></iframe>"
                    value={c.html || ""}
                    onChange={e => onChange(updateContent(section, "html", e.target.value))}
                />
            </Field>

            <div className="grid grid-cols-2 gap-3">
                <Field label="Height (px)"><Input type="number" value={c.height || 600} onChange={e => onChange(updateContent(section, "height", Number(e.target.value)))} /></Field>
                <Field label="Media Position">
                    <Select value={c.mediaPosition || "right"} onValueChange={v => onChange(updateContent(section, "mediaPosition", v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
            </div>
        </div>
    );
}

function BlogHeroForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-3">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Subheading"><Input value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
            <Field label="Background Image URL"><Input placeholder="https://images.unsplash.com/photo-1498050108023-c5249f4df085" value={c.backgroundImage || ""} onChange={e => onChange(updateContent(section, "backgroundImage", e.target.value))} /></Field>
            <div className="flex items-center gap-2">
                <Switch checked={!!c.showSearch} onCheckedChange={v => onChange(updateContent(section, "showSearch", v))} />
                <Label className="text-xs">Show search bar</Label>
            </div>
        </div>
    );
}

function BlogFilterForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-3">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Label"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <div className="space-y-2">
                {[
                    { key: "showCategories", label: "Show category filters" },
                    { key: "showTags", label: "Show tag filters" },
                    { key: "showSort", label: "Show sort dropdown" },
                ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2">
                        <Switch checked={!!c[key]} onCheckedChange={v => onChange(updateContent(section, key, v))} />
                        <Label className="text-xs">{label}</Label>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BlogPostHeaderForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <div className="grid grid-cols-2 gap-3">
                {[
                    { key: "showDate", label: "Show Date" },
                    { key: "showAuthor", label: "Show Author" },
                    { key: "showCategory", label: "Show Category" },
                    { key: "showReadingTime", label: "Show Reading Time" },
                ].map(({ key, label }) => (
                    <div key={key} className="flex items-center gap-2 border p-2 rounded-lg">
                        <Switch checked={!!c[key]} onCheckedChange={v => onChange(updateContent(section, key, v))} />
                        <Label className="text-xs">{label}</Label>
                    </div>
                ))}
            </div>
            <Field label="Title Override (Optional)"><Input placeholder="Leave empty to use post title" value={c.titleOverride || ""} onChange={e => onChange(updateContent(section, "titleOverride", e.target.value))} /></Field>
            <Field label="Excerpt Override (Optional)"><Textarea rows={2} placeholder="Leave empty to use post excerpt" value={c.excerptOverride || ""} onChange={e => onChange(updateContent(section, "excerptOverride", e.target.value))} /></Field>
        </div>
    );
}

function BlogPostNavForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <div className="flex items-center gap-2">
                <Switch checked={!!c.showImages} onCheckedChange={v => onChange(updateContent(section, "showImages", v))} />
                <Label className="text-xs">Show post image previews</Label>
            </div>
        </div>
    );
}

function BlogTOCForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <div className="flex items-center gap-2">
                <Switch checked={!!c.collapsible} onCheckedChange={v => onChange(updateContent(section, "collapsible", v))} />
                <Label className="text-xs">Collapsible</Label>
            </div>
        </div>
    );
}
function BlogPostListForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Layout">
                    <Select value={c.layout || "grid"} onValueChange={v => onChange(updateContent(section, "layout", v))}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="grid">Grid</SelectItem>
                            <SelectItem value="list">List</SelectItem>
                        </SelectContent>
                    </Select>
                </Field>
                <Field label="Posts Per Page"><Input type="number" value={c.postsPerPage || 6} onChange={e => onChange(updateContent(section, "postsPerPage", Number(e.target.value)))} /></Field>
            </div>
            <div className="flex items-center gap-2">
                <Switch checked={!!c.showPagination} onCheckedChange={v => onChange(updateContent(section, "showPagination", v))} />
                <Label className="text-xs">Show pagination</Label>
            </div>
        </div>
    );
}

function PostHeaderEditorialForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Author"><Input value={c.author || ""} onChange={e => onChange(updateContent(section, "author", e.target.value))} /></Field>
                <Field label="Date"><Input value={c.date || ""} onChange={e => onChange(updateContent(section, "date", e.target.value))} /></Field>
            </div>
            <Field label="Category"><Input value={c.category || ""} onChange={e => onChange(updateContent(section, "category", e.target.value))} /></Field>
            <Field label="Background Image URL"><Input placeholder="https://images.unsplash.com..." value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>
        </div>
    );
}

function PostSubtitleForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Subtitle Text"><Textarea rows={3} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
        </div>
    );
}

function PostBodyTextForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="HTML Content"><Textarea rows={12} className="font-mono text-xs" value={c.html || ""} onChange={e => onChange(updateContent(section, "html", e.target.value))} /></Field>
        </div>
    );
}

function PostPullQuoteForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Quote Text"><Textarea rows={4} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <Field label="Author (Optional)"><Input value={c.author || ""} onChange={e => onChange(updateContent(section, "author", e.target.value))} /></Field>
        </div>
    );
}

function PostImageFullForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Image URL"><Input placeholder="https://images.unsplash.com..." value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>
            <Field label="Caption"><Input value={c.caption || ""} onChange={e => onChange(updateContent(section, "caption", e.target.value))} /></Field>
        </div>
    );
}

function PostImageGridForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const images: { url: string; caption?: string }[] = c.images || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Label className="text-xs font-bold uppercase tracking-widest">Images</Label>
            <ArrayEditor
                items={images}
                onChange={v => onChange(updateContent(section, "images", v))}
                defaultItem={{ url: "", caption: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border p-3 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <span className="text-[10px] font-black uppercase">Image {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <Input placeholder="URL" value={item.url} onChange={e => update({ ...item, url: e.target.value })} />
                        <Input placeholder="Caption" value={item.caption || ""} onChange={e => update({ ...item, caption: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function PostHighlightBoxForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: string[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Label className="text-xs font-bold uppercase tracking-widest">Highlight Items</Label>
            <ArrayEditor
                items={items.map(text => ({ text }))}
                onChange={v => onChange(updateContent(section, "items", v.map(x => x.text)))}
                defaultItem={{ text: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="flex gap-2">
                        <Input placeholder="Highlight text" value={item.text} onChange={e => update({ text: e.target.value })} />
                        <Button type="button" variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                    </div>
                )}
            />
        </div>
    );
}

function PostTOCMinimalForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
        </div>
    );
}

function PostAuthorsDashForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const authors: { name: string; role?: string; avatar?: string }[] = c.authors || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Label className="text-xs font-bold uppercase tracking-widest">Authors</Label>
            <ArrayEditor
                items={authors}
                onChange={v => onChange(updateContent(section, "authors", v))}
                defaultItem={{ name: "", role: "", avatar: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border p-3 rounded-lg space-y-2">
                        <div className="flex justify-between">
                            <span className="text-[10px] font-black uppercase">Author {i + 1}</span>
                            <Button type="button" variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={remove}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                        <Input placeholder="Name" value={item.name} onChange={e => update({ ...item, name: e.target.value })} />
                        <Input placeholder="Role" value={item.role || ""} onChange={e => update({ ...item, role: e.target.value })} />
                        <Input placeholder="Avatar URL" value={item.avatar || ""} onChange={e => update({ ...item, avatar: e.target.value })} />
                    </div>
                )}
            />
        </div>
    );
}

function PostTagsResourcesForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const tags: string[] = c.tags || [];
    const links: { label: string; url: string }[] = c.links || [];
    return (
        <div className="space-y-6">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest">Tags</Label>
                <ArrayEditor
                    items={tags.map(t => ({ t }))}
                    onChange={v => onChange(updateContent(section, "tags", v.map(x => x.t)))}
                    defaultItem={{ t: "" }}
                    renderItem={(item, i, update, remove) => (
                        <div key={i} className="flex gap-2">
                            <Input placeholder="Tag name" value={item.t} onChange={e => update({ t: e.target.value })} />
                            <Button type="button" variant="ghost" size="icon" onClick={remove}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    )}
                />
            </div>
            <div className="space-y-4">
                <Label className="text-xs font-bold uppercase tracking-widest">Reference Links</Label>
                <ArrayEditor
                    items={links}
                    onChange={v => onChange(updateContent(section, "links", v))}
                    defaultItem={{ label: "", url: "" }}
                    renderItem={(item, i, update, remove) => (
                        <div key={i} className="border p-3 rounded-lg space-y-2">
                            <Input placeholder="Label" value={item.label} onChange={e => update({ ...item, label: e.target.value })} />
                            <Input placeholder="URL" value={item.url} onChange={e => update({ ...item, url: e.target.value })} />
                            <Button type="button" variant="ghost" size="sm" className="w-full text-destructive h-8" onClick={remove}><Trash2 className="h-3 w-3 mr-1" /> Remove</Button>
                        </div>
                    )}
                />
            </div>
        </div>
    );
}

function PostNextPrevStripForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <div className="flex items-center gap-2">
                <Switch checked={!!c.showImages} onCheckedChange={v => onChange(updateContent(section, "showImages", v))} />
                <Label className="text-xs">Show background image previews</Label>
            </div>
        </div>
    );
}

function PostNewsletterEditorialForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Text"><Textarea value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
        </div>
    );
}

function PostResourcesBoxForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    const items: { label: string; url: string }[] = c.items || [];
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Label className="text-xs font-bold uppercase tracking-widest">Resource Items</Label>
            <ArrayEditor
                items={items}
                onChange={v => onChange(updateContent(section, "items", v))}
                defaultItem={{ label: "", url: "" }}
                renderItem={(item, i, update, remove) => (
                    <div key={i} className="border p-3 rounded-lg space-y-2">
                        <Input placeholder="Resource label (e.g. PDF Guide)" value={item.label} onChange={e => update({ ...item, label: e.target.value })} />
                        <Input placeholder="Download URL" value={item.url} onChange={e => update({ ...item, url: e.target.value })} />
                        <div className="flex justify-end"><Button type="button" variant="ghost" size="icon" onClick={remove} className="text-destructive"><Trash2 className="h-4 w-4" /></Button></div>
                    </div>
                )}
            />
        </div>
    );
}

function PostSponsoredSlotForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Badge (e.g. SPONSOR)"><Input value={c.label || ""} onChange={e => onChange(updateContent(section, "label", e.target.value))} /></Field>
            <Field label="Title"><Input value={c.title || ""} onChange={e => onChange(updateContent(section, "title", e.target.value))} /></Field>
            <Field label="Text"><Textarea value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Button Label"><Input value={c.buttonLabel || ""} onChange={e => onChange(updateContent(section, "buttonLabel", e.target.value))} /></Field>
                <Field label="Button URL"><Input value={c.buttonUrl || ""} onChange={e => onChange(updateContent(section, "buttonUrl", e.target.value))} /></Field>
            </div>
        </div>
    );
}

function PostConclusionForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Concluding Text"><Textarea rows={5} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
        </div>
    );
}

// ─── Reorder Helper ───────────────────────────────────────────────────────────

function SectionReorder({ order, onChange }: { order: string[]; onChange: (newOrder: string[]) => void }) {
    const labels: Record<string, string> = {
        header: "Header (Title & Meta)",
        image: "Featured Image",
        intro: "Introduction",
        toc: "Table of Contents",
        html: "Main Content",
        quote: "Pull Quote",
        gallery: "Image Gallery",
        newsletter: "Newsletter",
        tags: "Tags",
        share: "Share Buttons",
        bio: "Author Bio",
        related: "Related Posts"
    };

    const move = (index: number, direction: 'up' | 'down') => {
        const newOrder = [...order];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newOrder.length) return;
        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        onChange(newOrder);
    };

    return (
        <div className="space-y-2 border p-4 rounded-xl bg-background/50">
            <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">Section Order</h4>
            {order.map((key, index) => (
                <div key={key} className="flex items-center justify-between bg-card p-2 rounded-lg border shadow-sm text-sm">
                    <span className="font-medium">{labels[key] || key}</span>
                    <div className="flex gap-1">
                        <Button
                            type="button" variant="ghost" size="icon" className="h-6 w-6"
                            onClick={() => move(index, 'up')} disabled={index === 0}
                        >
                            <ArrowUp className="h-3 w-3" />
                        </Button>
                        <Button
                            type="button" variant="ghost" size="icon" className="h-6 w-6"
                            onClick={() => move(index, 'down')} disabled={index === order.length - 1}
                        >
                            <ArrowDown className="h-3 w-3" />
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function FullPagePostForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};

    // Initialize default order if missing
    const defaultOrder = ['header', 'image', 'intro', 'toc', 'html', 'quote', 'gallery', 'newsletter', 'tags', 'share', 'bio', 'related'];
    const order = (c.sectionOrder as string[]) || defaultOrder;

    const handleOrderChange = (newOrder: string[]) => {
        onChange(updateContent(section, "sectionOrder", newOrder));
    };

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
                    <div className="mt-6">
                        <SectionReorder order={order} onChange={handleOrderChange} />
                    </div>
                </div>

                <div className="space-y-4 border p-4 rounded-xl bg-primary/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Header & Meta</h4>
                    <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
                    <Field label="Subheading"><Textarea value={c.subheading || ""} onChange={e => onChange(updateContent(section, "subheading", e.target.value))} /></Field>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Author"><Input value={c.author || ""} onChange={e => onChange(updateContent(section, "author", e.target.value))} /></Field>
                        <Field label="Date"><Input value={c.date || ""} onChange={e => onChange(updateContent(section, "date", e.target.value))} /></Field>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <Field label="Category"><Input value={c.category || ""} onChange={e => onChange(updateContent(section, "category", e.target.value))} /></Field>
                        <Field label="Image URL"><Input value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Body Content</h4>
                <Field label="HTML Content">
                    <Textarea
                        rows={15}
                        className="font-mono text-sm leading-relaxed min-h-[400px]"
                        value={c.html || ""}
                        onChange={e => onChange(updateContent(section, "html", e.target.value))}
                    />
                </Field>
            </div>

            <div className="space-y-4 border p-4 rounded-xl bg-primary/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Intermediate Content</h4>
                <Field label="Intro Text (Lead Paragraph)"><Textarea value={c.intro || ""} onChange={e => onChange(updateContent(section, "intro", e.target.value))} placeholder="A captivating opening paragraph..." /></Field>
                <div className="flex items-center justify-between border-b pb-2">
                    <Label className="text-sm">Show Table of Contents</Label>
                    <Switch checked={!!c.showTOC} onCheckedChange={v => onChange(updateContent(section, "showTOC", v))} />
                </div>

                <div className="space-y-3 pt-4 border-t">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Pull Quote</Label>
                    <Field label="Quote Text"><Textarea value={c.quote || ""} onChange={e => onChange(updateContent(section, "quote", e.target.value))} placeholder="Inspirational quote..." /></Field>
                    <Field label="Quote Author"><Input value={c.quoteAuthor || ""} onChange={e => onChange(updateContent(section, "quoteAuthor", e.target.value))} placeholder="Author Name" /></Field>
                </div>
            </div>

            <div className="space-y-4 border p-4 rounded-xl bg-primary/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Gallery Images</h4>
                <ArrayEditor
                    items={(c.galleryImages as { url: string }[]) || []}
                    onChange={items => onChange(updateContent(section, "galleryImages", items))}
                    defaultItem={{ url: "" }}
                    renderItem={(item, index, update, remove) => (
                        <div key={index} className="flex gap-2 items-center mb-2">
                            <Input value={item.url} onChange={e => update({ ...item, url: e.target.value })} placeholder="Image URL" className="flex-1" />
                            <Button type="button" variant="ghost" size="icon" onClick={remove}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                        </div>
                    )}
                />
            </div>

            <div className="space-y-4 border p-4 rounded-xl bg-primary/5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Footer Elements</h4>

                <Field label="Tags (Comma separated)">
                    <Input value={c.tags || ""} onChange={e => onChange(updateContent(section, "tags", e.target.value))} placeholder="Technology, AI, Future..." />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-between border-b pb-2">
                        <Label className="text-sm">Show Share Buttons</Label>
                        <Switch checked={!!c.showShare} onCheckedChange={v => onChange(updateContent(section, "showShare", v))} />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                        <Label className="text-sm">Show Newsletter</Label>
                        <Switch checked={!!c.showNewsletter} onCheckedChange={v => onChange(updateContent(section, "showNewsletter", v))} />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                        <Label className="text-sm">Show Author Bio</Label>
                        <Switch checked={!!c.showBio} onCheckedChange={v => onChange(updateContent(section, "showBio", v))} />
                    </div>
                    <div className="flex items-center justify-between border-b pb-2">
                        <Label className="text-sm">Show Related Posts</Label>
                        <Switch checked={!!c.showRelated} onCheckedChange={v => onChange(updateContent(section, "showRelated", v))} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function PostHeaderMinimalForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-4">
            <TemplateSelector value={c.template} onChange={v => onChange(updateContent(section, "template", v))} />
            <Field label="Heading"><Input value={c.heading || ""} onChange={e => onChange(updateContent(section, "heading", e.target.value))} /></Field>
            <Field label="Excerpt"><Textarea rows={3} value={c.text || ""} onChange={e => onChange(updateContent(section, "text", e.target.value))} /></Field>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Category"><Input value={c.category || ""} onChange={e => onChange(updateContent(section, "category", e.target.value))} /></Field>
                <Field label="Date"><Input value={c.date || ""} onChange={e => onChange(updateContent(section, "date", e.target.value))} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <Field label="Author"><Input value={c.author || ""} onChange={e => onChange(updateContent(section, "author", e.target.value))} /></Field>
                <Field label="Back Label"><Input value={c.backLabel || ""} onChange={e => onChange(updateContent(section, "backLabel", e.target.value))} /></Field>
            </div>
            <Field label="Back Link"><Input value={c.backLink || ""} onChange={e => onChange(updateContent(section, "backLink", e.target.value))} /></Field>
            <Field label="Image URL"><Input placeholder="https://images.unsplash.com..." value={c.image || ""} onChange={e => onChange(updateContent(section, "image", e.target.value))} /></Field>
        </div>
    );
}

function GenericForm({ section, onChange }: SectionFormProps) {
    const c = section.content || {};
    return (
        <div className="space-y-3">
            {Object.keys(c).length === 0 ? (
                <p className="text-xs text-muted-foreground">No configurable fields for this section type.</p>
            ) : (
                Object.entries(c).map(([key, value]) => (
                    <Field key={key} label={key}>
                        <Input value={String(value)} onChange={e => onChange(updateContent(section, key, e.target.value))} />
                    </Field>
                ))
            )}
        </div>
    );
}

// ─── Main Export ───────────────────────────────────────────────────────────────

export function SectionEditForm({ section, onChange }: SectionFormProps) {


    const renderForm = () => {
        switch (section.type) {
            case "HERO": return <HeroForm section={section} onChange={onChange} />;
            case "HOME_HERO": return <HomeHeroForm section={section} onChange={onChange} />;
            case "CONTENT": return <ContentForm section={section} onChange={onChange} />;
            case "QUOTE": return <QuoteForm section={section} onChange={onChange} />;
            case "CALLOUT": return <CalloutForm section={section} onChange={onChange} />;
            case "CODE": return <CodeForm section={section} onChange={onChange} />;
            case "IMAGE_SPLIT": return <ImageSplitForm section={section} onChange={onChange} />;
            case "GALLERY": return <GalleryForm section={section} onChange={onChange} />;
            case "FULL_IMAGE": return <FullImageForm section={section} onChange={onChange} />;
            case "NEWSLETTER": return <NewsletterForm section={section} onChange={onChange} />;
            case "AUTHOR": return <AuthorForm section={section} onChange={onChange} />;
            case "RELATED_POSTS": return <RelatedPostsForm section={section} onChange={onChange} />;
            case "FEATURED_POSTS": return <FeaturedPostsForm section={section} onChange={onChange} />;
            case "FAQ": return <FAQForm section={section} onChange={onChange} />;
            case "STATS": return <StatsForm section={section} onChange={onChange} />;
            case "FEATURE_GRID": return <FeatureGridForm section={section} onChange={onChange} />;
            case "CTA": return <CTAForm section={section} onChange={onChange} />;
            case "TIMELINE": return <TimelineForm section={section} onChange={onChange} />;
            case "TESTIMONIALS": return <TestimonialsForm section={section} onChange={onChange} />;
            case "TEAM": return <TeamForm section={section} onChange={onChange} />;
            case "PRICING": return <PricingForm section={section} onChange={onChange} />;
            case "STEPS": return <StepsForm section={section} onChange={onChange} />;
            case "BANNER": return <BannerForm section={section} onChange={onChange} />;
            case "VIDEO": return <VideoForm section={section} onChange={onChange} />;
            case "DIVIDER": return <DividerForm section={section} onChange={onChange} />;
            case "SPACER": return <SpacerForm section={section} onChange={onChange} />;
            case "LOGO_CLOUD": return <LogoCloudForm section={section} onChange={onChange} />;
            case "CONTACT_FORM": return <ContactFormForm section={section} onChange={onChange} />;
            case "MAP_EMBED": return <MapEmbedForm section={section} onChange={onChange} />;
            case "SOCIAL_LINKS": return <SocialLinksForm section={section} onChange={onChange} />;
            case "AUTHOR_BIO": return <AuthorBioForm section={section} onChange={onChange} />;
            case "TAGS_CLOUD": return <TagsCloudForm section={section} onChange={onChange} />;
            case "ALERT": return <AlertForm section={section} onChange={onChange} />;
            case "ACCORDION": return <AccordionForm section={section} onChange={onChange} />;
            case "TABS": return <TabsForm section={section} onChange={onChange} />;
            case "PROGRESS_BARS": return <ProgressBarsForm section={section} onChange={onChange} />;
            case "ICON_LIST": return <IconListForm section={section} onChange={onChange} />;
            case "TWO_COLUMN": return <TwoColumnForm section={section} onChange={onChange} />;
            case "THREE_COLUMN": return <MultiColumnForm section={section} onChange={onChange} />;
            case "MULTI_COLUMN": return <MultiColumnForm section={section} onChange={onChange} />;
            case "CARD_GRID": return <CardGridForm section={section} onChange={onChange} />;
            case "PORTFOLIO": return <PortfolioForm section={section} onChange={onChange} />;
            case "COUNTDOWN": return <CountdownForm section={section} onChange={onChange} />;
            case "AUDIO": return <AudioForm section={section} onChange={onChange} />;
            case "MINIMAL_TEXT": return <MinimalTextForm section={section} onChange={onChange} />;
            case "PARALLAX": return <ParallaxForm section={section} onChange={onChange} />;
            case "COMPARISON": return <ComparisonForm section={section} onChange={onChange} />;
            case "TABLE": return <TableForm section={section} onChange={onChange} />;
            case "EMBED": return <EmbedForm section={section} onChange={onChange} />;
            case "INTERACTIVE": return <InteractiveMediaForm section={section} onChange={onChange} />;
            case "BLOG_POST_HEADER": return <BlogPostHeaderForm section={section} onChange={onChange} />;
            case "BLOG_POST_NAV": return <BlogPostNavForm section={section} onChange={onChange} />;
            case "BLOG_TOC": return <BlogTOCForm section={section} onChange={onChange} />;
            case "BLOG_POST_LIST": return <BlogPostListForm section={section} onChange={onChange} />;
            case "BLOG_HERO": return <BlogHeroForm section={section} onChange={onChange} />;
            case "BLOG_FILTER": return <BlogFilterForm section={section} onChange={onChange} />;
            case "POST_HEADER_EDITORIAL": return <PostHeaderEditorialForm section={section} onChange={onChange} />;
            case "POST_SUBTITLE": return <PostSubtitleForm section={section} onChange={onChange} />;
            case "POST_BODY_TEXT": return <PostBodyTextForm section={section} onChange={onChange} />;
            case "POST_PULL_QUOTE": return <PostPullQuoteForm section={section} onChange={onChange} />;
            case "POST_IMAGE_FULL": return <PostImageFullForm section={section} onChange={onChange} />;
            case "POST_IMAGE_GRID": return <PostImageGridForm section={section} onChange={onChange} />;
            case "POST_HIGHLIGHT_BOX": return <PostHighlightBoxForm section={section} onChange={onChange} />;
            case "POST_TOC_MINIMAL": return <PostTOCMinimalForm section={section} onChange={onChange} />;
            case "POST_AUTHORS_DASH": return <PostAuthorsDashForm section={section} onChange={onChange} />;
            case "POST_TAGS_RESOURCES": return <PostTagsResourcesForm section={section} onChange={onChange} />;
            case "POST_NEXT_PREV_STRIP": return <PostNextPrevStripForm section={section} onChange={onChange} />;
            case "POST_NEWSLETTER_EDITORIAL": return <PostNewsletterEditorialForm section={section} onChange={onChange} />;
            case "POST_RESOURCES_BOX": return <PostResourcesBoxForm section={section} onChange={onChange} />;
            case "POST_SPONSORED_SLOT": return <PostSponsoredSlotForm section={section} onChange={onChange} />;
            case "POST_CONCLUSION": return <PostConclusionForm section={section} onChange={onChange} />;
            case "POST_HEADER_MINIMAL": return <PostHeaderMinimalForm section={section} onChange={onChange} />;

            // Full Page Layouts
            case "FULL_PAGE_CLASSIC":
            case "FULL_PAGE_MODERN":
            case "FULL_PAGE_COVER":
            case "FULL_PAGE_GRID":
            case "FULL_PAGE_SPLIT":
                return <FullPagePostForm section={section} onChange={onChange} />;

            default: return <GenericForm section={section} onChange={onChange} />;
        }
    };

    return (
        <div className="space-y-6">

            {renderForm()}
        </div>
    );
}
