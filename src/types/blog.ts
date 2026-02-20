export type SectionType =
    | "HERO"
    | "HOME_HERO"
    | "CONTENT"
    | "IMAGE_SPLIT"
    | "QUOTE"
    | "CALLOUT"
    | "CODE"
    | "GALLERY"
    | "EMBED"
    | "TIMELINE"
    | "CTA"
    | "NEWSLETTER"
    | "AUTHOR"
    | "RELATED_POSTS"
    | "FAQ"
    | "TABLE"
    | "STATS"
    | "FEATURE_GRID"
    | "MINIMAL_TEXT"
    | "PARALLAX"
    | "FULL_IMAGE"
    | "MULTI_COLUMN"
    | "FEATURED_POSTS"
    | "TESTIMONIALS"
    | "TEAM"
    | "PRICING"
    | "COMPARISON"
    | "STEPS"
    | "BANNER"
    | "VIDEO"
    | "DIVIDER"
    | "SPACER"
    | "LOGO_CLOUD"
    | "CONTACT_FORM"
    | "MAP_EMBED"
    | "SOCIAL_LINKS"
    | "AUTHOR_BIO"
    | "TAGS_CLOUD"
    | "BREADCRUMB"
    | "ALERT"
    | "ACCORDION"
    | "TABS"
    | "PROGRESS_BARS"
    | "ICON_LIST"
    | "TWO_COLUMN"
    | "THREE_COLUMN"
    | "CARD_GRID"
    | "PORTFOLIO"
    | "COUNTDOWN"
    | "AUDIO"
    | "INTERACTIVE"
    | "BLOG_POST_HEADER"
    | "BLOG_POST_NAV"
    | "BLOG_TOC"
    | "BLOG_POST_LIST"
    | "BLOG_HERO"
    | "BLOG_FILTER"
    | "POST_HEADER_EDITORIAL"
    | "POST_SUBTITLE"
    | "POST_BODY_TEXT"
    | "POST_PULL_QUOTE"
    | "POST_IMAGE_FULL"
    | "POST_IMAGE_GRID"
    | "POST_HIGHLIGHT_BOX"
    | "POST_TOC_MINIMAL"
    | "POST_AUTHORS_DASH"
    | "POST_TAGS_RESOURCES"
    | "POST_NEXT_PREV_STRIP"
    | "POST_NEWSLETTER_EDITORIAL"
    | "POST_RESOURCES_BOX"
    | "POST_SPONSORED_SLOT"
    | "POST_CONCLUSION"
    | "POST_HEADER_MINIMAL"
    | "POST_HEADER_MINIMAL"
    | "FULL_PAGE_CLASSIC"
    | "FULL_PAGE_MODERN"
    | "FULL_PAGE_COVER"
    | "FULL_PAGE_GRID"
    | "FULL_PAGE_SPLIT"
    | "UNKNOWN";

export interface MediaItem {
    id: string;
    url: string;
    alt?: string;
    caption?: string;
    type: "image" | "video";
}

export interface PostSection {
    id: string;
    type: SectionType;
    order: number;
    isVisible: boolean;
    content: any;
}

export interface Tag {
    id: string;
    slug: string;
    name: string;
}

export interface Category {
    id: string;
    slug: string;
    name: string;
    description?: string;
}

export interface Author {
    id: string;
    name: string;
    role?: string;
    bio?: string;
    avatar?: string;
    social?: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
    createdAt?: number;
}

export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    description?: string; // New field for SEO/Meta
    coverImage: string;
    content?: string; // Legacy field, we use sections now
    status: "draft" | "published" | "archived";
    createdAt: number;
    updatedAt: number;
    tags?: Tag[];
    publishedAt?: number;
    readingTime?: number;
    viewCount: number;
    sections: PostSection[];
    authorId?: string;
    categoryId?: string;
    author?: Author;
    category?: Category;
}

export interface Page {
    id: string;
    slug: string;
    title: string;
    description?: string;
    sections: PostSection[];
    updatedAt: number;
}

export interface SocialLink {
    platform: string;
    label: string;
    url: string;
    icon: string;
    enabled: boolean;
}

export interface SiteSettings {
    siteName: string;
    siteTitle?: string;
    description: string;
    logoUrl?: string;
    faviconUrl?: string;
    navLinks: { label: string; url: string }[];
    footerCopyright: string;
    socialLinks: SocialLink[];
    theme: {
        primaryColor: string;
        accentColor: string;
        fontHeadings: string;
        fontBody: string;
    };
}
