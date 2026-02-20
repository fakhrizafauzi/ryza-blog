import { Link } from "react-router-dom";
import { Layout, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const PAGES = [
    { slug: "home", title: "Home Page", description: "The landing page of your site." },
    { slug: "blog", title: "Blog List Page", description: "The page listing all your blog posts." },
];

export default function PagesListPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Pages</h1>
                    <p className="text-muted-foreground">Manage the layout of your static pages.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {PAGES.map(page => (
                    <div key={page.slug} className="border rounded-lg p-6 bg-card text-card-foreground shadow-sm flex flex-col">
                        <div className="mb-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                <Layout className="h-5 w-5 text-primary" />
                            </div>
                            <h3 className="font-semibold text-xl">{page.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{page.description}</p>
                        </div>
                        <div className="mt-auto">
                            <Button variant="outline" className="w-full justify-between" asChild>
                                <Link to={`/blog-admin/pages/${page.slug}`}>
                                    Edit Layout <ArrowRight className="h-4 w-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
