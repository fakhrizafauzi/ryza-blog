import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PaginationProps {
    page: number
    totalPages: number
    onPageChange: (page: number) => void
    className?: string
}

export function Pagination({ page, totalPages, onPageChange, className }: PaginationProps) {
    if (totalPages <= 1) return null

    // Build page number array with ellipsis
    const getPages = (): (number | "...")[] => {
        if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
        const pages: (number | "...")[] = [1]
        if (page > 3) pages.push("...")
        for (let i = Math.max(2, page - 1); i <= Math.min(totalPages - 1, page + 1); i++) {
            pages.push(i)
        }
        if (page < totalPages - 2) pages.push("...")
        pages.push(totalPages)
        return pages
    }

    return (
        <nav
            aria-label="Pagination"
            className={cn("flex items-center justify-center gap-1", className)}
        >
            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
            >
                <ChevronLeft className="h-4 w-4" />
            </Button>

            {getPages().map((p, i) =>
                p === "..." ? (
                    <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground select-none">
                        …
                    </span>
                ) : (
                    <Button
                        key={p}
                        variant={p === page ? "default" : "outline"}
                        size="icon"
                        className="h-9 w-9"
                        onClick={() => onPageChange(p as number)}
                        aria-label={`Page ${p}`}
                        aria-current={p === page ? "page" : undefined}
                    >
                        {p}
                    </Button>
                )
            )}

            <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
            >
                <ChevronRight className="h-4 w-4" />
            </Button>
        </nav>
    )
}
