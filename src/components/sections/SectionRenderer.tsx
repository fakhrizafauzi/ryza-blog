import type { PostSection } from "@/types/blog";
import { HeroSection } from "./HeroSection";
import { HomeHeroSection } from "./HomeHeroSection";
import { ContentSection } from "./ContentSection";
import { QuoteSection } from "./QuoteSection";
import { CalloutSection } from "./CalloutSection";
import { CodeSection } from "./CodeSection";
import { ImageSplitSection } from "./ImageSplitSection";
import { GallerySection } from "./GallerySection";
import { BlogPostHeader } from "./BlogPostHeader";
import { BlogPostNav } from "./BlogPostNav";
import { BlogTOC } from "./BlogTOC";
import { BlogPostList } from "./BlogPostList";
import { FullImageSection } from "./FullImageSection";
import { FeaturedPostsSection } from "./FeaturedPostsSection";
import { NewsletterSection } from "./NewsletterSection";
import { FAQSection } from "./FAQSection";
import { StatsSection } from "./StatsSection";
import { FeatureGridSection } from "./FeatureGridSection";
import { CTASection } from "./CTASection";
import { TimelineSection } from "./TimelineSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { TeamSection } from "./TeamSection";
import { PricingSection } from "./PricingSection";
import { StepsSection } from "./StepsSection";
import { BannerSection } from "./BannerSection";
import { VideoSection } from "./VideoSection";
import { DividerSection } from "./DividerSection";
import { SpacerSection } from "./SpacerSection";
import { LogoCloudSection } from "./LogoCloudSection";
import { ContactFormSection } from "./ContactFormSection";
import { MapEmbedSection } from "./MapEmbedSection";
import { SocialLinksSection } from "./SocialLinksSection";
import { AuthorBioSection } from "./AuthorBioSection";
import { TagsCloudSection } from "./TagsCloudSection";
import { AlertSection } from "./AlertSection";
import { AccordionSection } from "./AccordionSection";
import { TabsSection } from "./TabsSection";
import { ProgressBarsSection } from "./ProgressBarsSection";
import { IconListSection } from "./IconListSection";
import { TwoColumnSection } from "./TwoColumnSection";
import { ThreeColumnSection } from "./ThreeColumnSection";
import { CardGridSection } from "./CardGridSection";
import { PortfolioSection } from "./PortfolioSection";
import { CountdownSection } from "./CountdownSection";
import { AudioSection } from "./AudioSection";
import { MinimalTextSection } from "./MinimalTextSection";
import { InteractiveMediaSection } from "./InteractiveMediaSection";
import { ParallaxSection } from "./ParallaxSection";
import { MultiColumnSection } from "./MultiColumnSection";
import { ComparisonSection } from "./ComparisonSection";
import { EmbedSection } from "./EmbedSection";
import { TableSection } from "./TableSection";
import { BlogHeroSection } from "./BlogHeroSection";
import { BlogFilterSection } from "./BlogFilterSection";
import { FullPagePostSection } from "./FullPagePostSection";

import { PostHeaderEditorial } from "./editorial/PostHeaderEditorial";
import { PostSubtitle } from "./editorial/PostSubtitle";
import { PostBodyText } from "./editorial/PostBodyText";
import { PostPullQuote } from "./editorial/PostPullQuote";
import { PostImageFull } from "./editorial/PostImageFull";
import { PostImageGrid } from "./editorial/PostImageGrid";
import { PostHighlightBox } from "./editorial/PostHighlightBox";
import { PostTOCMinimal } from "./editorial/PostTOCMinimal";
import { PostAuthorsDash } from "./editorial/PostAuthorsDash";
import { PostTagsResources } from "./editorial/PostTagsResources";
import { PostNextPrevStrip } from "./editorial/PostNextPrevStrip";
import { PostNewsletterEditorial } from "./editorial/PostNewsletterEditorial";
import { PostResourcesBox } from "./editorial/PostResourcesBox";
import { PostSponsoredSlot } from "./editorial/PostSponsoredSlot";
import { PostConclusion } from "./editorial/PostConclusion";
import { PostHeaderMinimal } from "./editorial/PostHeaderMinimal";

import { SectionLayout } from "./SectionLayout";

interface SectionRendererProps {
    section: PostSection;
    isPostDetail?: boolean;
}

export function SectionRenderer({ section, isPostDetail = false }: SectionRendererProps) {
    if (!section.isVisible) return null;
    const { type, content } = section;
    const align = content?.align || "left";

    const renderContent = () => {
        switch (type) {
            case "TABLE": return <TableSection content={content} />; // Table might need it too
            case "BLOG_POST_HEADER": return <BlogPostHeader content={content} />;
            case "BLOG_POST_NAV": return <BlogPostNav content={content} />;
            case "BLOG_TOC": return <BlogTOC content={content} />;
            case "BLOG_POST_LIST": return <BlogPostList content={content} />;
            case "BLOG_HERO": return <BlogHeroSection content={content} />;
            case "CONTENT": return <ContentSection content={content} isPostDetail={isPostDetail} />;
            case "QUOTE": return <QuoteSection content={content} isPostDetail={isPostDetail} />;
            case "CALLOUT": return <CalloutSection content={content} isPostDetail={isPostDetail} />;
            case "CODE": return <CodeSection content={content} isPostDetail={isPostDetail} />;
            case "IMAGE_SPLIT": return <ImageSplitSection content={content} isPostDetail={isPostDetail} />;
            case "HERO": return <HeroSection content={content} />; // Usually not used in posts
            case "HOME_HERO": return <HomeHeroSection content={content} />;

            // Full Page Layouts
            case "FULL_PAGE_CLASSIC":
            case "FULL_PAGE_MODERN":
            case "FULL_PAGE_COVER":
            case "FULL_PAGE_GRID":
            case "FULL_PAGE_SPLIT":
                return <FullPagePostSection type={type} content={content} isPostDetail={isPostDetail} />;

            // Add to others as needed, e.g. Gallery, Video, Embed
            case "GALLERY": return <GallerySection content={content} isPostDetail={isPostDetail} />;
            case "VIDEO": return <VideoSection content={content} isPostDetail={isPostDetail} />;
            case "EMBED": return <EmbedSection content={content} isPostDetail={isPostDetail} />;
            case "DIVIDER": return <DividerSection content={content} />; // Divider usually fine

            // ... strict defaults for others


            case "FULL_IMAGE": return <FullImageSection content={content} />;
            case "FEATURED_POSTS": return <FeaturedPostsSection content={content} />;
            case "NEWSLETTER": return <NewsletterSection content={content} />;
            case "FAQ": return <FAQSection content={content} />;
            case "STATS": return <StatsSection content={content} />;
            case "FEATURE_GRID": return <FeatureGridSection content={content} />;
            case "CTA": return <CTASection content={content} />;
            case "TIMELINE": return <TimelineSection content={content} />;
            case "TESTIMONIALS": return <TestimonialsSection content={content} />;
            case "TEAM": return <TeamSection content={content} />;
            case "PRICING": return <PricingSection content={content} />;
            case "STEPS": return <StepsSection content={content} />;
            case "BANNER": return <BannerSection content={content} />;

            case "SPACER": return <SpacerSection content={content} />;
            case "LOGO_CLOUD": return <LogoCloudSection content={content} />;
            case "CONTACT_FORM": return <ContactFormSection content={content} />;
            case "MAP_EMBED": return <MapEmbedSection content={content} />;
            case "SOCIAL_LINKS": return <SocialLinksSection content={content} />;
            case "AUTHOR_BIO": return <AuthorBioSection content={content} />;
            case "AUTHOR": return <AuthorBioSection content={content} />;
            case "TAGS_CLOUD": return <TagsCloudSection content={content} />;
            case "ALERT": return <AlertSection content={content} />;
            case "ACCORDION": return <AccordionSection content={content} />;
            case "TABS": return <TabsSection content={content} />;
            case "PROGRESS_BARS": return <ProgressBarsSection content={content} />;
            case "ICON_LIST": return <IconListSection content={content} />;
            case "TWO_COLUMN": return <TwoColumnSection content={content} />;
            case "THREE_COLUMN": return <ThreeColumnSection content={content} />;
            case "CARD_GRID": return <CardGridSection content={content} />;
            case "PORTFOLIO": return <PortfolioSection content={content} />;
            case "COUNTDOWN": return <CountdownSection content={content} />;
            case "AUDIO": return <AudioSection content={content} />;
            case "MINIMAL_TEXT": return <MinimalTextSection content={content} />;
            case "PARALLAX": return <ParallaxSection content={content} />;
            case "MULTI_COLUMN": return <MultiColumnSection content={content} />;
            case "COMPARISON": return <ComparisonSection content={content} />;

            case "INTERACTIVE": return <InteractiveMediaSection content={content} />;

            case "BLOG_FILTER": return <BlogFilterSection content={content} />;
            case "RELATED_POSTS": return <FeaturedPostsSection content={content} />;
            case "POST_HEADER_EDITORIAL": return <PostHeaderEditorial content={content} />;
            case "POST_SUBTITLE": return <PostSubtitle content={content} />;
            case "POST_BODY_TEXT": return <PostBodyText content={content} />;
            case "POST_PULL_QUOTE": return <PostPullQuote content={content} />;
            case "POST_IMAGE_FULL": return <PostImageFull content={content} />;
            case "POST_IMAGE_GRID": return <PostImageGrid content={content} />;
            case "POST_HIGHLIGHT_BOX": return <PostHighlightBox content={content} />;
            case "POST_TOC_MINIMAL": return <PostTOCMinimal content={content} />;
            case "POST_AUTHORS_DASH": return <PostAuthorsDash content={content} />;
            case "POST_TAGS_RESOURCES": return <PostTagsResources content={content} />;
            case "POST_NEXT_PREV_STRIP": return <PostNextPrevStrip content={content} />;
            case "POST_NEWSLETTER_EDITORIAL": return <PostNewsletterEditorial content={content} />;
            case "POST_RESOURCES_BOX": return <PostResourcesBox content={content} />;
            case "POST_SPONSORED_SLOT": return <PostSponsoredSlot content={content} />;
            case "POST_CONCLUSION": return <PostConclusion content={content} />;
            case "POST_HEADER_MINIMAL": return <PostHeaderMinimal content={content} />;
            default:
                console.warn(`Unknown section type: ${type}`);
                return null;
        }
    };

    // Hero and full-width sections handle their own padding/containment
    const isFullWidth = [
        "HERO", "HOME_HERO", "PARALLAX", "FULL_IMAGE", "BANNER", "BLOG_HERO",
        "TESTIMONIALS", "SOCIAL_LINKS", "LOGO_CLOUD", "BLOG_FILTER",
        "NEWSLETTER", "CTA", "STATS", "TIMELINE", "TEAM", "PRICING", "STEPS",
        "FAQ", "CONTACT_FORM", "PORTFOLIO", "CARD_GRID", "TWO_COLUMN", "THREE_COLUMN", "MULTI_COLUMN", "INTERACTIVE",
        "BLOG_POST_HEADER", "BLOG_POST_NAV", "BLOG_POST_LIST",
        "POST_HEADER_EDITORIAL", "POST_SUBTITLE", "POST_BODY_TEXT", "POST_PULL_QUOTE",
        "POST_IMAGE_FULL", "POST_IMAGE_GRID", "POST_HIGHLIGHT_BOX", "POST_TOC_MINIMAL",
        "POST_AUTHORS_DASH", "POST_TAGS_RESOURCES", "POST_NEXT_PREV_STRIP",
        "POST_NEWSLETTER_EDITORIAL", "POST_RESOURCES_BOX", "POST_SPONSORED_SLOT",
        "POST_CONCLUSION", "POST_HEADER_MINIMAL"
    ].includes(type);

    if (isFullWidth) {
        return renderContent();
    }

    // Determine background color/patterns for certain sections
    let bgClassName = "";
    if (type === "STATS") bgClassName = "bg-muted/30";
    if (type === "ALERT") bgClassName = ""; // Alert handles its own card style

    return (
        <SectionLayout
            align={align}
            id={section.id}
            className={bgClassName}
            variant={isPostDetail ? "post" : "default"}
        >
            {renderContent()}
        </SectionLayout>
    );
}
