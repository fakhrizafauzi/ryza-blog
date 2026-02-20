import { useState, type KeyboardEvent } from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import type { Tag } from "@/types/blog"
import { nanoid } from "nanoid"

interface TagInputProps {
    tags: Tag[]
    onChange: (tags: Tag[]) => void
}

export function TagInput({ tags, onChange }: TagInputProps) {
    const [input, setInput] = useState("")

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault()
            const val = input.trim()
            if (!val) return

            // Check if tag already exists
            if (tags.some(t => t.name.toLowerCase() === val.toLowerCase())) {
                setInput("")
                return
            }

            const newTag: Tag = {
                id: nanoid(),
                name: val,
                slug: val.toLowerCase().replace(/\s+/g, "-"),
            }

            onChange([...tags, newTag])
            setInput("")
        } else if (e.key === "Backspace" && !input && tags.length > 0) {
            onChange(tags.slice(0, -1))
        }
    }

    const removeTag = (id: string) => {
        onChange(tags.filter(t => t.id !== id))
    }

    return (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
            {tags.map(tag => (
                <Badge key={tag.id} variant="secondary" className="gap-1 pr-1">
                    {tag.name}
                    <button
                        type="button"
                        onClick={() => removeTag(tag.id)}
                        className="hover:bg-destructive hover:text-destructive-foreground rounded-full p-0.5 transition-colors"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </Badge>
            ))}
            <Input
                className="flex-1 border-0 focus-visible:ring-0 p-0 h-auto min-w-[80px]"
                placeholder="Add tags..."
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
            />
        </div>
    )
}
