import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface SpacerSectionContent {
    size?: "sm" | "md" | "lg" | "xl";
    template?: string;
}

const SIZE_MAP = { sm: "h-8", md: "h-16", lg: "h-32", xl: "h-64" };

export function SpacerSection({ content }: { content: SpacerSectionContent }) {
    const template = content.template || "style-1";
    const height = SIZE_MAP[content.size || "md"];

    return (
        <SectionLayout
            padding="none"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div
                className={cn(
                    "w-full transition-all duration-700",
                    height,
                    template === "style-3" && "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]"
                )}
                aria-hidden="true"
            >
                {template === "style-2" && (
                    <div className="h-full w-full flex items-center justify-center opacity-10">
                        <div className="h-1 w-1 rounded-full bg-primary" />
                    </div>
                )}
            </div>
        </SectionLayout>
    );
}
