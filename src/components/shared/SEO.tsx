import { Helmet } from "react-helmet-async";

interface SEOProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
}

export function SEO({ title, description, image, url }: SEOProps) {
    const siteTitle = "Ryza Blog";
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = "A modern blog about technology, design, and ideas.";
    const metaDescription = description || defaultDescription;
    const metaImage = image || "https://ryza-blog.web.app/og-image.jpg"; // Placeholder
    const metaUrl = url || window.location.href;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />

            {/* Open Graph */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={metaUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />
        </Helmet>
    );
}
