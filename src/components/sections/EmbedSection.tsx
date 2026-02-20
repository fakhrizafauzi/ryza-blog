import { SectionLayout } from "./SectionLayout";

interface EmbedSectionContent {
    html?: string;
    caption?: string;
    height?: number;
}

export function EmbedSection({ content, isPostDetail }: { content: EmbedSectionContent, isPostDetail?: boolean }) {
    const height = content.height || 400;
    if (!content.html) return (
        <div className="bg-muted rounded-xl flex items-center justify-center h-32 text-muted-foreground text-sm">No embed HTML provided</div>
    );

    return (
        <SectionLayout
            width={isPostDetail ? "readable" : "container"}
            padding={isPostDetail ? "sm" : "md"}
            variant={isPostDetail ? "post" : "default"}
        >
            <div>
                <div
                    className="rounded-xl overflow-hidden border"
                    style={{ height }}
                    dangerouslySetInnerHTML={{ __html: content.html }}
                />
                {content.caption && <p className="text-center text-sm text-muted-foreground mt-3">{content.caption}</p>}
            </div>
        </SectionLayout>
    );
}
