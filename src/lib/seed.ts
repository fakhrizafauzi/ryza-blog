import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import type { BlogPost } from "@/types/blog";

const SAMPLE_POSTS: Partial<BlogPost>[] = [
    {
        title: "Getting Started with React 19",
        slug: "getting-started-react-19",
        excerpt: "Explore the new features in React 19 including compiler optimizations and server actions.",
        coverImage: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "tech",
        tags: [{ id: "react", name: "React", slug: "react" }, { id: "frontend", name: "Frontend", slug: "frontend" }],
        readingTime: 5,
        viewCount: 120,
        sections: [],
    },
    {
        title: "The Future of AI in Design",
        slug: "future-ai-design",
        excerpt: "How generative AI is reshaping the creative workflow for designers and developers.",
        coverImage: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "design",
        tags: [{ id: "ai", name: "AI", slug: "ai" }, { id: "design", name: "Design", slug: "design" }],
        readingTime: 7,
        viewCount: 85,
        sections: [],
    },
    {
        title: "Minimalist Workspace Setup",
        slug: "minimalist-workspace",
        excerpt: "A guide to decluttering your desk and improving focus with a minimalist setup.",
        coverImage: "https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "lifestyle",
        tags: [{ id: "productivity", name: "Productivity", slug: "productivity" }],
        readingTime: 4,
        viewCount: 230,
        sections: [],
    },
    {
        title: "Understanding TypeScript Generics",
        slug: "typescript-generics",
        excerpt: "Deep dive into generics and how to write reusable, type-safe code.",
        coverImage: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "tech",
        tags: [{ id: "typescript", name: "TypeScript", slug: "typescript" }],
        readingTime: 10,
        viewCount: 45,
        sections: [],
    },
    {
        title: "10 Best VS Code Extensions",
        slug: "vscode-extensions-2024",
        excerpt: "Boost your productivity with these essential VS Code extensions.",
        coverImage: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "tech",
        tags: [{ id: "vscode", name: "VS Code", slug: "vscode" }],
        readingTime: 6,
        viewCount: 310,
        sections: [],
    },
    {
        title: "Sustainable Living Tips",
        slug: "sustainable-living",
        excerpt: "Small changes you can make today for a greener tomorrow.",
        coverImage: "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "lifestyle",
        tags: [{ id: "eco", name: "Eco", slug: "eco" }],
        readingTime: 3,
        viewCount: 150,
        sections: [],
    },
    {
        title: "Mastering CSS Grid",
        slug: "mastering-css-grid",
        excerpt: "Complete guide to building complex layouts with CSS Grid.",
        coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&auto=format&fit=crop&q=60",
        status: "published",
        categoryId: "tech",
        tags: [{ id: "css", name: "CSS", slug: "css" }],
        readingTime: 8,
        viewCount: 95,
        sections: [],
    }
];

export async function seedPosts() {
    const postsRef = collection(db, "posts");

    for (const post of SAMPLE_POSTS) {
        await addDoc(postsRef, {
            ...post,
            createdAt: Date.now(),
            updatedAt: Date.now(),
            publishedAt: Date.now() - Math.floor(Math.random() * 1000000000), // Random past date
        });
    }

    console.log("Seeding complete!");
    alert("Seeding complete! Refresh the blog list.");
}
