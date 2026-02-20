import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface BlogFilterProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    categories?: { id: string; name: string }[];
}

export function BlogFilter({
    search,
    setSearch,
    category,
    setCategory,
    categories = [
        { id: "tech", name: "Technology" },
        { id: "lifestyle", name: "Lifestyle" },
        { id: "design", name: "Design" },
    ], // TODO: Fetch from Firestore
}: BlogFilterProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-between">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search posts..."
                    className="pl-8"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
