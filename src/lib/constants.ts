import type { SectionType } from "@/types/blog";

export const SECTION_CATEGORIES = {
    HEROES: {
        label: "Heroes & Headers",
        types: ["HERO", "HOME_HERO", "BLOG_HERO", "BREADCRUMB"] as SectionType[]
    },
    CONTENT: {
        label: "Content & Layout",
        types: ["CONTENT", "IMAGE_SPLIT", "MINIMAL_TEXT", "MULTI_COLUMN", "TWO_COLUMN", "THREE_COLUMN"] as SectionType[]
    },
    MEDIA: {
        label: "Media & Interactive",
        types: ["GALLERY", "FULL_IMAGE", "PARALLAX", "VIDEO", "AUDIO", "EMBED", "MAP_EMBED", "INTERACTIVE"] as SectionType[]
    },
    FEATURES: {
        label: "Features & Grids",
        types: ["FEATURE_GRID", "CARD_GRID", "PORTFOLIO", "STATS", "ICON_LIST", "LOGO_CLOUD"] as SectionType[]
    },
    DATA: {
        label: "Information & Data",
        types: ["FAQ", "ACCORDION", "TABS", "TIMELINE", "STEPS", "PRICING", "COMPARISON", "TABLE", "PROGRESS_BARS", "COUNTDOWN"] as SectionType[]
    },
    ENGAGEMENT: {
        label: "Engagement",
        types: ["CTA", "NEWSLETTER", "CONTACT_FORM", "SOCIAL_LINKS", "BANNER", "ALERT", "CALLOUT"] as SectionType[]
    },
    POST_DETAIL: {
        label: "Post Detail",
        types: [
            "POST_HEADER_EDITORIAL", "POST_SUBTITLE", "POST_BODY_TEXT", "POST_PULL_QUOTE",
            "POST_IMAGE_FULL", "POST_IMAGE_GRID", "POST_HIGHLIGHT_BOX", "POST_TOC_MINIMAL",
            "POST_AUTHORS_DASH", "POST_TAGS_RESOURCES", "POST_NEXT_PREV_STRIP",
            "POST_NEWSLETTER_EDITORIAL", "POST_RESOURCES_BOX", "POST_SPONSORED_SLOT",
            "POST_CONCLUSION", "BLOG_POST_HEADER", "BLOG_POST_NAV", "BLOG_TOC",
            "POST_HEADER_MINIMAL"
        ] as SectionType[]
    },
    FULL_PAGE: {
        label: "Full Page Layouts",
        types: ["FULL_PAGE_CLASSIC", "FULL_PAGE_MODERN", "FULL_PAGE_COVER", "FULL_PAGE_GRID", "FULL_PAGE_SPLIT"] as SectionType[]
    },
    BLOG: {
        label: "Blog Index",
        types: ["BLOG_HERO", "BLOG_FILTER", "BLOG_POST_LIST", "FEATURED_POSTS", "TAGS_CLOUD"] as SectionType[]
    },
    UTILITY: {
        label: "Utility",
        types: ["DIVIDER", "SPACER"] as SectionType[]
    }
};

export const SECTION_TYPES: Record<SectionType, string> = {
    HERO: "Hero Section",
    HOME_HERO: "Home Hero",
    CONTENT: "Content Block",
    IMAGE_SPLIT: "Image + Text Split",
    QUOTE: "Quote Block",
    CALLOUT: "Callout Box",
    CODE: "Code Block",
    GALLERY: "Image Gallery",
    EMBED: "HTML Embed",
    TIMELINE: "Timeline",
    CTA: "Call to Action",
    NEWSLETTER: "Newsletter Signup",
    AUTHOR: "Author Box",
    RELATED_POSTS: "Related Posts",
    FEATURED_POSTS: "Featured Posts",
    FAQ: "FAQ Section",
    TABLE: "Data Table",
    STATS: "Stats Grid",
    FEATURE_GRID: "Feature Grid",
    MINIMAL_TEXT: "Minimal Text",
    PARALLAX: "Parallax Image",
    FULL_IMAGE: "Full Width Image",
    MULTI_COLUMN: "Multi-Column Layout",
    TESTIMONIALS: "Testimonials",
    TEAM: "Team Members",
    PRICING: "Pricing Plans",
    COMPARISON: "Comparison Table",
    STEPS: "Steps / Process",
    BANNER: "Banner / Announcement",
    VIDEO: "Video Embed",
    DIVIDER: "Divider",
    SPACER: "Spacer",
    LOGO_CLOUD: "Logo Cloud",
    CONTACT_FORM: "Contact Form",
    MAP_EMBED: "Map Embed",
    SOCIAL_LINKS: "Social Links",
    AUTHOR_BIO: "Author Bio Card",
    TAGS_CLOUD: "Tags Cloud",
    BREADCRUMB: "Breadcrumb",
    ALERT: "Alert / Notice",
    ACCORDION: "Accordion",
    TABS: "Tabs",
    PROGRESS_BARS: "Progress Bars",
    ICON_LIST: "Icon List",
    TWO_COLUMN: "Two Column",
    THREE_COLUMN: "Three Column",
    CARD_GRID: "Card Grid",
    PORTFOLIO: "Portfolio Grid",
    COUNTDOWN: "Countdown Timer",
    AUDIO: "Audio Player",
    INTERACTIVE: "Interactive Media",
    BLOG_POST_HEADER: "Blog Post Header",
    BLOG_POST_NAV: "Post Navigation",
    BLOG_TOC: "Table of Contents",
    BLOG_POST_LIST: "Blog Post List",
    BLOG_HERO: "Blog Hero (Blog Page Only)",
    BLOG_FILTER: "Blog Filter Bar (Blog Page Only)",
    POST_HEADER_EDITORIAL: "Editorial Post Header",
    POST_SUBTITLE: "Post Subtitle",
    POST_BODY_TEXT: "Editorial Body Text",
    POST_PULL_QUOTE: "Pull Quote",
    POST_IMAGE_FULL: "Full Bleed Image",
    POST_IMAGE_GRID: "Post Image Gallery",
    POST_HIGHLIGHT_BOX: "Key Highlights",
    POST_TOC_MINIMAL: "Minimal TOC",
    POST_AUTHORS_DASH: "Authors Dash",
    POST_TAGS_RESOURCES: "Tags & Related Links",
    POST_NEXT_PREV_STRIP: "Post Nav Strip",
    POST_NEWSLETTER_EDITORIAL: "Newsletter Inset",
    POST_RESOURCES_BOX: "Resource Box",
    POST_SPONSORED_SLOT: "Sponsored Slot",
    POST_CONCLUSION: "Concluding Thoughts",
    POST_HEADER_MINIMAL: "Minimal Post Header",
    FULL_PAGE_CLASSIC: "Full Page: Classic News",
    FULL_PAGE_MODERN: "Full Page: Modern Feature",
    FULL_PAGE_COVER: "Full Page: Cover Story",
    FULL_PAGE_GRID: "Full Page: Magazine Grid",
    FULL_PAGE_SPLIT: "Full Page: Split Screen",
    UNKNOWN: "Unknown Section",
};

export const DEFAULT_SECTION_CONTENT: Record<SectionType, Record<string, unknown>> = {
    HERO: {
        heading: "Crafting Digital Excellence",
        subheading: "Where vision meets innovation. We build high-end digital experiences that define the future.",
        backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&h=900&fit=crop",
        layout: "center",
        primaryButtonText: "Start the Journey",
        primaryButtonLink: "#",
        template: "style-1"
    },
    HOME_HERO: {
        badge: "Architecting the Future",
        heading: "Engineering thoughts into digital reality.",
        highlightedWord: "reality",
        description: "Explore the intersection of high-end design, robust engineering, and creative vision from a senior developer's perspective.",
        primaryButtonText: "Explore the Blog",
        primaryButtonLink: "/blog",
        secondaryButtonText: "Learn About Me",
        secondaryButtonLink: "#about",
        template: "style-1"
    },
    CONTENT: {
        html: "<p>Architecture is fundamentally about the synthesis of form and function. In the digital realm, this translates to code that is as performant as it is elegant. Every line of code should serve a purpose, every interaction should feel intentional.</p>",
        template: "style-1"
    },
    IMAGE_SPLIT: {
        heading: "Precision Engineering",
        text: "We specialize in building highly scalable, performant applications using the latest technologies. Our approach is data-driven and user-centric, ensuring maximum impact for every feature we deploy.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop",
        imagePosition: "right",
        template: "style-1"
    },
    QUOTE: {
        text: "Quality is not an act, it is a habit. In the world of software, excellence is the only standard that truly matters.",
        author: "Aristotle (Adapted for Engineering)",
        template: "style-1"
    },
    CALLOUT: {
        type: "info",
        title: "Architecture Note",
        text: "Always prioritize maintainability and scalability when designing core system components.",
        template: "style-1"
    },
    CODE: {
        language: "typescript",
        code: "export const solve = (problem: Problem): Solution => {\n  const architecture = design(problem);\n  return implement(architecture);\n};",
        template: "style-1"
    },
    GALLERY: {
        images: [
            { id: "1", url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600", alt: "Workstation" },
            { id: "2", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600", alt: "Code" },
            { id: "3", url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600", alt: "Laptop" }
        ],
        columns: 3,
        template: "style-1"
    },
    EMBED: { html: "", height: 400, template: "style-1" },
    TIMELINE: {
        heading: "Our Journey",
        items: [
            { date: "2024", title: "Global Expansion", description: "Launched our services in 15 new countries including Japan and Germany." },
            { date: "2023", title: "Series A Funding", description: "Raised $20M to accelerate our product development and team growth." }
        ],
        template: "style-1"
    },
    CTA: {
        heading: "Elevate Your Digital Presence",
        subheading: "Join over 50,000 visionary companies transforming their digital landscape with our high-end solutions.",
        buttonLabel: "Get Started Now",
        buttonUrl: "#",
        template: "style-1"
    },
    NEWSLETTER: {
        title: "Visionary Insights",
        subtitle: "Weekly curated intelligence on technology trends, architectural patterns, and design excellence.",
        placeholder: "your@visionary.com",
        buttonText: "Join the Network",
        template: "style-1"
    },
    AUTHOR: {
        name: "Alexander Ryza",
        bio: "Senior Software Architect with over 12 years of experience in building distributed systems and high-performance web applications.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        template: "style-1"
    },
    RELATED_POSTS: { count: 3, tags: [], template: "style-1" },
    FEATURED_POSTS: {
        title: "Architectural Deep Dives",
        subtitle: "Explore our latest technical insights and strategic analyses.",
        count: 3,
        showLink: true,
        template: "style-1"
    },
    FAQ: {
        heading: "Strategic Queries",
        subheading: "Everything you need to know about our methodology and delivery process.",
        items: [
            { question: "How do you handle scalability?", answer: "We utilize cloud-native horizontal scaling strategies combined with optimized edge delivery." },
            { question: "What is your typical project timeline?", answer: "Strategic discovery typically takes 2 weeks, followed by iterative delivery every 14 days." }
        ],
        template: "style-1"
    },
    TABLE: {
        heading: "Performance Comparison",
        headers: ["Metric", "Standard System", "Our Architecture"],
        rows: [
            { cells: ["Response Time", "250ms", "45ms"] },
            { cells: ["Throughput", "1.2k req/s", "15.4k req/s"] }
        ],
        striped: true,
        template: "style-1"
    },
    STATS: {
        heading: "Global Impact",
        columns: 4,
        items: [
            { value: "50k+", label: "Visonaries" },
            { value: "1.2B+", label: "Invocations" },
            { value: "99.99%", label: "Durability" },
            { value: "24/7", label: "Strategic Ops" }
        ],
        template: "style-1"
    },
    FEATURE_GRID: {
        heading: "Core Capabilities",
        subheading: "Engineered for maximum performance and reliability.",
        columns: 3,
        items: [
            { icon: "Zap", title: "Ultra Performance", description: "Sub-millisecond latency for critical path operations." },
            { icon: "Shield", title: "Ironclad Security", description: "Zero-trust architecture and enterprise-grade encryption." },
            { icon: "Layers", title: "Modular Design", description: "Highly decoupled systems for maximum flexibility." }
        ],
        template: "style-1"
    },
    MINIMAL_TEXT: {
        text: "Excellence is never an accident.",
        subtext: "It is always the result of high intention, sincere effort, and intelligent execution.",
        size: "lg",
        align: "center",
        template: "style-1"
    },
    PARALLAX: {
        image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1600&h=900&fit=crop",
        heading: "Atmospheric Depth",
        subheading: "Immersive perspective for cinematic storytelling.",
        height: 600,
        overlay: 0.6,
        template: "style-1"
    },
    FULL_IMAGE: {
        image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600&h=900&fit=crop",
        caption: "Urban Landscapes: A Study in Structural Symmetry",
        template: "style-1"
    },
    MULTI_COLUMN: {
        heading: "Strategic Pillars",
        count: 3,
        columns: [
            { heading: "Innovation", content: "Continuously pushing the boundaries of what's possible in software design." },
            { heading: "Reliability", content: "Building systems that stand the test of time and high-traffic demands." },
            { heading: "User Experience", content: "Crafting intuitive interfaces that empower and delight users." }
        ],
        template: "style-1"
    },
    TESTIMONIALS: {
        heading: "Trusted by Industry Leaders",
        items: [
            { quote: "Their architectural approach redefined how we handle real-time data at scale. Truly a world-class team.", author: "Sarah Jenkins", role: "CTO, TechGrowth Global" }
        ],
        template: "style-1"
    },
    TEAM: {
        heading: "The Elite Visionaries",
        members: [
            { name: "Julian Vance", role: "Lead Systems Architect", bio: "Former NASA engineer focusing on distributed reliability.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" }
        ],
        template: "style-1"
    },
    PRICING: {
        heading: "Investment Models",
        plans: [
            { name: "Visionary", price: "$0", period: "forever", features: ["100k Monthly reqs", "Community support", "Basic analytics"], buttonLabel: "Start Building", buttonUrl: "#" },
            { name: "Enterprise", price: "$999", period: "month", features: ["Unlimited scalability", "Dedicated architect", "Custom integrations", "24/7 Strategic Support"], buttonLabel: "Scale Now", buttonUrl: "#", highlighted: true }
        ],
        template: "style-1"
    },
    COMPARISON: {
        heading: "Technical Superiority",
        labelA: "Legacy Systems",
        labelB: "Our Architecture",
        rows: [
            { feature: "Edge Caching", a: false, b: true },
            { feature: "AI Optimization", a: false, b: true },
            { feature: "Zero-Downtime Updates", a: true, b: true }
        ],
        template: "style-1"
    },
    STEPS: {
        heading: "The Delivery Process",
        layout: "horizontal",
        steps: [
            { title: "Strategic Discovery", description: "Aligning vision with technical feasibility." },
            { title: "Rapid Iteration", description: "Efficiently building the core foundations." },
            { title: "Global Launch", description: "Scaling your solution to a world-wide audience." }
        ],
        template: "style-1"
    },
    BANNER: {
        text: "🚀 Architecture v3.0 is live!",
        subtext: "Experience 2x faster performance across the entire platform.",
        variant: "primary",
        template: "style-1"
    },
    VIDEO: {
        url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        caption: "Operational Excellence: Behind the Scenes",
        aspectRatio: "16/9",
        template: "style-1"
    },
    DIVIDER: { style: "line", label: "CONTINUE READING", template: "style-1" },
    SPACER: { size: "md", template: "style-1" },
    LOGO_CLOUD: {
        heading: "Empowering Global Giants",
        logos: [
            { src: "https://cdn.worldvectorlogo.com/logos/google-2015.svg", alt: "Google", name: "Google" },
            { src: "https://cdn.worldvectorlogo.com/logos/microsoft.svg", alt: "Microsoft", name: "Microsoft" },
            { src: "https://cdn.worldvectorlogo.com/logos/amazon-2.svg", alt: "Amazon", name: "Amazon" }
        ],
        template: "style-1"
    },
    CONTACT_FORM: {
        heading: "Initiate Strategic Contact",
        subheading: "Tell us about your next big challenge. Let's build it together.",
        submitLabel: "Dispatch Signal",
        successMessage: "Signal received. Our strategic team will respond shortly.",
        template: "style-1"
    },
    MAP_EMBED: { embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25436351647!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid", height: 400, caption: "Global Headquarters: New York City", template: "style-1" },
    SOCIAL_LINKS: {
        heading: "Connect with Alexander",
        links: [
            { platform: "Twitter", url: "https://twitter.com", label: "Twitter", icon: "Twitter" },
            { platform: "Github", url: "https://github.com", label: "GitHub", icon: "Github" },
            { platform: "Linkedin", url: "https://linkedin.com", label: "LinkedIn", icon: "Linkedin" }
        ],
        layout: "row",
        template: "style-1"
    },
    AUTHOR_BIO: {
        name: "Alexander Ryza",
        role: "Strategic Architect",
        bio: "Devoted to the pursuit of technical excellence and minimalist design. I help companies build software that scale millions of users with elegance.",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        template: "style-1"
    },
    TAGS_CLOUD: {
        heading: "Deep Dive by Topic",
        tags: [
            { name: "Architecture", slug: "architecture" },
            { name: "Performance", slug: "performance" },
            { name: "Minimalism", slug: "minimalism" },
            { name: "Strategy", slug: "strategy" }
        ],
        template: "style-1"
    },
    BREADCRUMB: { showHome: true, homeLabel: "Vault", template: "style-1" },
    ALERT: { variant: "info", title: "Strategic Update", text: "New architectural patterns for 2024 have been released in the blog.", dismissible: true, template: "style-1" },
    ACCORDION: {
        heading: "Technical Specifications",
        allowMultiple: false,
        items: [
            { title: "Base Infrastructure", content: "Built on globally distributed edge networks for minimal latency." },
            { title: "Security Protocols", content: "Utilizing TLS 1.3 and advanced dDoS mitigation layers." }
        ],
        template: "style-1"
    },
    TABS: {
        heading: "Technology Stack",
        tabs: [
            { label: "Frontend", content: "React, Next.js, Framer Motion, Tailwind CSS." },
            { label: "Backend", content: "Node.js, Go, PostgreSQL, Redis." }
        ],
        template: "style-1"
    },
    PROGRESS_BARS: {
        heading: "Architectural Expertise",
        items: [
            { label: "High-Traffic Systems", value: 95 },
            { label: "Distributed Integrity", value: 88 },
            { label: "Human-Centric Design", value: 92 }
        ],
        template: "style-1"
    },
    ICON_LIST: {
        heading: "Why Choose Our Methodology?",
        columns: 2,
        items: [
            { icon: "Rocket", text: "Rapid Deployment", description: "Automated CI/CD pipelines for instant delivery." },
            { icon: "Shield", text: "Unmatched Security", description: "Continuous monitoring and threat detection." },
            { icon: "TrendingUp", text: "Organic Growth", description: "SEO-optimized structures for maximum visibility." },
            { icon: "Activity", text: "Active Intelligence", description: "Real-time analytics and performance insights." }
        ],
        template: "style-1"
    },
    TWO_COLUMN: {
        leftHeading: "Vision",
        leftContent: "We see software not just as code, but as a medium for solving the world's most complex challenges with simplicity.",
        rightHeading: "Strategy",
        rightContent: "By combining rigorous engineering with intuitive design, we create solutions that are both powerful and accessible.",
        gap: "xl",
        template: "style-1"
    },
    THREE_COLUMN: {
        heading: "Our Core Values",
        columns: [
            { heading: "Speed", content: "We optimize for developer velocity and system performance." },
            { heading: "Clarity", content: "Code and design should be self-evident and easy to reason about." },
            { heading: "Integrity", content: "We building for the long-term, never compromising on quality." }
        ],
        template: "style-1"
    },
    CARD_GRID: {
        heading: "Strategic Services",
        subheading: "Tailored solutions for high-impact results.",
        columns: 3,
        cards: [
            { title: "Architecture Audit", description: "In-depth analysis of your current technical landscape." },
            { title: "Custom Engineering", description: "End-to-end development of high-performance apps." },
            { title: "Design Systems", description: "Building scalable visual languages for your products." }
        ],
        template: "style-1"
    },
    PORTFOLIO: {
        heading: "Selected Works",
        subheading: "A showcase of engineering excellence and visual depth.",
        items: [
            { title: "Vortex Intelligence", category: "AI / Architecture", description: "Scaling real-time analysis to millions of endpoints.", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" },
            { title: "Lumina Labs", category: "Design Systems", description: "Creating a cohesive visual language for a biotech giant.", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800" }
        ],
        template: "style-1"
    },
    COUNTDOWN: {
        heading: "The Next Evolution",
        targetDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 16),
        subtext: "Prepare for a paradigm shift in digital architecture.",
        template: "style-1"
    },
    AUDIO: {
        url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        title: "The Sound of Innovation",
        description: "Ambient frequencies for deep work and strategic thinking.",
        template: "style-1"
    },
    INTERACTIVE: {
        heading: "Live Interactive Experience",
        subheading: "Embed complex interactive frames like Figma designs, Spline scenes, or YouTube videos with full layout control.",
        type: "embed", // 'video' | 'embed'
        url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNJ6iS7J1M1X5o2W3X1V2V3%2FRyza-CMS-Design-System%3Fnode-id%3D0%253A1",
        height: 600,
        layout: "split", // 'split' | 'full' | 'centered'
        mediaPosition: "right",
        template: "style-1"
    },
    BLOG_POST_HEADER: {
        showDate: true,
        showAuthor: true,
        showCategory: true,
        showReadingTime: true,
        template: "style-1"
    },
    BLOG_POST_NAV: {
        showImages: true,
        template: "style-1"
    },
    BLOG_TOC: {
        title: "In this article",
        collapsible: true,
        template: "style-1"
    },
    BLOG_POST_LIST: {
        heading: "Latest Stories",
        postsPerPage: 6,
        showPagination: true,
        layout: "grid", // 'grid' | 'list'
        template: "style-1"
    },
    BLOG_HERO: {
        heading: "Strategic Intelligence",
        subheading: "Deep dives into architecture, performance, and the pursuit of excellence.",
        showSearch: true,
        backgroundImage: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&h=900&fit=crop",
        template: "style-1"
    },
    BLOG_FILTER: { heading: "Categorize by:", showCategories: true, showTags: true, showSort: true, template: "style-1" },
    POST_HEADER_EDITORIAL: { heading: "The Future of Digital Architecture", author: "Alexander Ryza", date: "Oct 24, 2024", category: "Strategy", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600", template: "style-1" },
    POST_SUBTITLE: { text: "Exploring the intersection of intention and outcome in modern system design.", template: "style-1" },
    POST_BODY_TEXT: { html: "<p>The evolution of digital systems is moving towards a synthesis of raw performance and intuitive human interaction...</p>", template: "style-1" },
    POST_PULL_QUOTE: { text: "Design is not what it looks like; it's how it works.", author: "Steve Jobs", template: "style-1" },
    POST_IMAGE_FULL: { image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1600", caption: "The structural integrity of modern urban landscapes.", template: "style-1" },
    POST_IMAGE_GRID: { images: [{ url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800", caption: "Infrastructure" }, { url: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800", caption: "Interface" }], template: "style-1" },
    POST_HIGHLIGHT_BOX: { title: "Key Takeaways", items: ["Performance is a feature", "Simplicity is the ultimate sophistication", "Data drives design"], template: "style-1" },
    POST_TOC_MINIMAL: { title: "On this page", template: "style-1" },
    POST_AUTHORS_DASH: { authors: [{ name: "Alexander Ryza", role: "Architect", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" }], template: "style-1" },
    POST_TAGS_RESOURCES: { tags: ["Architecture", "Performance"], links: [{ label: "Source Code", url: "#" }], template: "style-1" },
    POST_NEXT_PREV_STRIP: { showImages: true, template: "style-1" },
    POST_NEWSLETTER_EDITORIAL: { title: "Stay Informed", text: "Join our network of over 50k architects.", template: "style-1" },
    POST_RESOURCES_BOX: { title: "Downloads", items: [{ label: "Architectural PDF", url: "#" }], template: "style-1" },
    POST_SPONSORED_SLOT: { label: "SPONSORED", title: "Scale your business with NextPhase", text: "The definitive platform for global growth.", buttonLabel: "Visit NextPhase", buttonUrl: "#", template: "style-1" },
    POST_CONCLUSION: { heading: "Final Thoughts", text: "As we look towards the next decade of digital evolution, the core principles of quality and intention remain our most valuable compass.", template: "style-1" },
    POST_HEADER_MINIMAL: {
        heading: "The Art of Minimalist Design",
        text: "A deep dive into why less is more in the contemporary digital landscape.",
        category: "Design",
        author: "Alexander Ryza",
        date: "Oct 24, 2024",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=1600",
        backLabel: "Back to Publication",
        backLink: "/blog",
        template: "style-1"
    },
    FULL_PAGE_CLASSIC: {
        heading: "Global Market Shift",
        subheading: "A comprehensive analysis of the changing economic landscape.",
        category: "Economics",
        author: "Alexander Ryza",
        date: "Oct 24, 2024",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
        html: "<p>The global economy is undergoing a seismic shift...</p>",
        template: "style-1"
    },
    FULL_PAGE_MODERN: {
        heading: "The Future is Now",
        subheading: "How AI is redefining the boundaries of creativity.",
        category: "Technology",
        author: "Sarah Connor",
        date: "Nov 12, 2024",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1600",
        html: "<p>Artificial intelligence is no longer formatted sci-fi...</p>",
        template: "style-1"
    },
    FULL_PAGE_COVER: {
        heading: "Into the Wild",
        subheading: "A journey through the world's most untouched landscapes.",
        category: "Travel",
        author: "Jack London",
        date: "Dec 01, 2024",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1600",
        html: "<p>The wilderness holds a certain allure that civilization cannot match...</p>",
        template: "style-1"
    },
    FULL_PAGE_GRID: {
        heading: "Design Trends 2025",
        subheading: "What to expect in the coming year of digital design.",
        category: "Design",
        author: "Jane Doe",
        date: "Jan 15, 2025",
        image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600",
        html: "<p>Minimalism is evolving into something more expressive...</p>",
        template: "style-1"
    },
    FULL_PAGE_SPLIT: {
        heading: "Urban Architecture",
        subheading: "The collision of history and modernity in city planning.",
        category: "Architecture",
        author: "Ted Mosby",
        date: "Feb 20, 2025",
        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800",
        html: "<p>Skyscrapers rising next to historic cathedrals create a unique visual language...</p>",
        template: "style-1"
    },
    UNKNOWN: { template: "style-1" },
};

export const SECTION_LABELS = SECTION_TYPES;
