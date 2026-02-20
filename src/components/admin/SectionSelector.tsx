import { useState } from "react";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Plus, Search, Layout, Type, Image as LucideImage, Grid, Database,
    MousePointer2, FileText, Settings, Check, Newspaper
} from "lucide-react";
import { SECTION_CATEGORIES, SECTION_TYPES } from "@/lib/constants";
import type { SectionType } from "@/types/blog";
import { cn } from "@/lib/utils";

interface SectionSelectorProps {
    onSelectMultiple: (types: SectionType[]) => void;
    editorType?: "page" | "post";
}

const CATEGORY_ICONS: Record<string, any> = {
    HEROES: Layout,
    CONTENT: Type,
    MEDIA: LucideImage,
    FEATURES: Grid,
    DATA: Database,
    ENGAGEMENT: MousePointer2,
    POST_DETAIL: Newspaper,
    BLOG: FileText,
    UTILITY: Settings
};

export function SectionSelector({ onSelectMultiple, editorType = "page" }: SectionSelectorProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [selectedTypes, setSelectedTypes] = useState<SectionType[]>([]);

    const categories = Object.entries(SECTION_CATEGORIES);

    // Blog sections that only make sense in a POST context
    const POST_ONLY_SECTIONS = [
        "BLOG_POST_HEADER", "BLOG_POST_NAV", "BLOG_TOC",
        "POST_HEADER_EDITORIAL", "POST_SUBTITLE", "POST_BODY_TEXT", "POST_PULL_QUOTE",
        "POST_IMAGE_FULL", "POST_IMAGE_GRID", "POST_HIGHLIGHT_BOX", "POST_TOC_MINIMAL",
        "POST_AUTHORS_DASH", "POST_TAGS_RESOURCES", "POST_NEXT_PREV_STRIP",
        "POST_NEWSLETTER_EDITORIAL", "POST_RESOURCES_BOX", "POST_SPONSORED_SLOT",
        "POST_CONCLUSION"
    ];
    // Blog sections that only make sense in a PAGE context
    const PAGE_ONLY_SECTIONS = ["BLOG_HERO", "BLOG_FILTER", "BLOG_POST_LIST"];

    const filteredSections = Object.entries(SECTION_TYPES)
        .filter(([type, label]) => {
            const matchesSearch = label.toLowerCase().includes(search.toLowerCase()) || type.toLowerCase().includes(search.toLowerCase());
            if (!matchesSearch) return false;

            // Contextual filtering for blog sections
            if (editorType === "page" && POST_ONLY_SECTIONS.includes(type)) return false;
            if (editorType === "post" && PAGE_ONLY_SECTIONS.includes(type)) return false;

            if (activeCategory) {
                return (SECTION_CATEGORIES as any)[activeCategory].types.includes(type);
            }
            return true;
        })
        .filter(([type]) => type !== "UNKNOWN");

    const toggleSelection = (type: SectionType) => {
        setSelectedTypes(prev =>
            prev.includes(type)
                ? prev.filter(t => t !== type)
                : [...prev, type]
        );
    };

    const handleConfirm = () => {
        if (selectedTypes.length > 0) {
            onSelectMultiple(selectedTypes);
            setIsOpen(false);
            setSelectedTypes([]);
            setSearch("");
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Add Section
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0 overflow-hidden gap-0">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="text-xl font-bold">Add Section</DialogTitle>
                    <div className="relative mt-2">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Find a section..."
                            className="pl-9 bg-muted/50 border-primary/10"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </DialogHeader>

                <div className="flex h-[500px]">
                    {/* Category Sidebar */}
                    <div className="w-64 border-r bg-muted/20 p-4 space-y-1">
                        <button
                            onClick={() => setActiveCategory(null)}
                            className={cn(
                                "flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                activeCategory === null ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                            )}
                        >
                            <Layout className="h-4 w-4" />
                            All Sections
                        </button>
                        <div className="pt-2 pb-1">
                            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Categories</span>
                        </div>
                        {categories.map(([key, cat]) => {
                            const Icon = CATEGORY_ICONS[key] || Layout;
                            return (
                                <button
                                    key={key}
                                    onClick={() => setActiveCategory(key)}
                                    className={cn(
                                        "flex items-center w-full gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                                        activeCategory === key ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                                    )}
                                >
                                    <Icon className="h-4 w-4" />
                                    {cat.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Section Grid */}
                    <div className="flex-1 overflow-y-auto p-6 bg-card">
                        <div className="grid grid-cols-2 gap-4">
                            {filteredSections.map(([type, label]) => {
                                const isSelected = selectedTypes.includes(type as SectionType);
                                return (
                                    <button
                                        key={type}
                                        onClick={() => toggleSelection(type as SectionType)}
                                        className={cn(
                                            "group relative flex flex-col items-start p-4 rounded-xl border transition-all text-left",
                                            isSelected
                                                ? "border-primary bg-primary/10 shadow-sm shadow-primary/20"
                                                : "border-primary/10 bg-muted/10 hover:bg-primary/5 hover:border-primary/30"
                                        )}
                                    >
                                        <div className="flex justify-between w-full items-start">
                                            <span className={cn(
                                                "text-sm font-bold transition-colors",
                                                isSelected ? "text-primary" : "group-hover:text-primary"
                                            )}>{label}</span>
                                            {isSelected && (
                                                <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center">
                                                    <Check className="h-3 w-3 text-primary-foreground" />
                                                </div>
                                            )}
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-mono mt-1 opacity-60 uppercase">{type}</span>
                                    </button>
                                );
                            })}
                        </div>
                        {filteredSections.length === 0 && (
                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-12">
                                <Search className="h-12 w-12 opacity-20 mb-4" />
                                <p>No sections found for your search.</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="p-4 border-t bg-muted/40 flex items-center justify-between px-6">
                    <div className="text-xs text-muted-foreground font-medium">
                        {selectedTypes.length > 0 ? (
                            <span className="text-primary font-bold">{selectedTypes.length} sections selected</span>
                        ) : (
                            "Select one or more sections to add"
                        )}
                    </div>
                    <div className="flex gap-2">
                        {selectedTypes.length > 0 && (
                            <Button variant="ghost" size="sm" onClick={() => setSelectedTypes([])} className="text-xs">
                                Clear
                            </Button>
                        )}
                        <Button
                            size="sm"
                            disabled={selectedTypes.length === 0}
                            onClick={handleConfirm}
                            className="px-6"
                        >
                            Add Selected Sections
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
