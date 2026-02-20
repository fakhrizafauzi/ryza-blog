import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import {
    Eye, ArrowUpRight, Plus, Activity,
    TrendingUp, Clock, LayoutDashboard, Settings, Database,
    Layout, CheckCircle2, Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar,
} from "recharts";
import { format, formatDistanceToNow } from "date-fns";

const generateMockData = () => {
    const data = [];
    const now = new Date();
    for (let i = 13; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
            name: format(date, "MMM d"),
            views: Math.floor(Math.random() * 80) + 20,
            visitors: Math.floor(Math.random() * 50) + 10,
        });
    }
    return data;
};

interface DashboardStats {
    totalPosts: number;
    publishedPosts: number;
    draftPosts: number;
    totalViews: number;
    totalTags: number;
    totalCategories: number;
    totalMessages: number;
    recentPosts: any[];
    topPosts: any[];
}

export default function AdminDashboardPage() {
    const [stats, setStats] = useState<DashboardStats>({
        totalPosts: 0,
        publishedPosts: 0,
        draftPosts: 0,
        totalViews: 0,
        totalTags: 0,
        totalCategories: 0,
        totalMessages: 0,
        recentPosts: [],
        topPosts: [],
    });
    const [loading, setLoading] = useState(true);
    const [chartData] = useState(generateMockData());

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch Posts
                const postsQuery = query(collection(db, "posts"), orderBy("updatedAt", "desc"));
                const snapshot = await getDocs(postsQuery);
                const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));

                // Fetch Categories
                const catSnapshot = await getDocs(collection(db, "categories"));
                const totalCategories = catSnapshot.size;

                // Fetch Messages
                const msgSnapshot = await getDocs(collection(db, "contact_messages"));
                const totalMessages = msgSnapshot.size;

                const totalPosts = posts.length;
                const publishedPosts = posts.filter(p => p.status === "published").length;
                const draftPosts = posts.filter(p => p.status === "draft").length;
                const totalViews = posts.reduce((acc, curr) => acc + (curr.viewCount || 0), 0);

                // Extract unique tags
                const tagSet = new Set<string>();
                posts.forEach(p => (p.tags || []).forEach((t: { slug: string }) => tagSet.add(t.slug)));

                const recentPosts = posts.slice(0, 5);
                const topPosts = [...posts]
                    .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
                    .slice(0, 5);

                setStats({
                    totalPosts,
                    publishedPosts,
                    draftPosts,
                    totalViews,
                    totalTags: tagSet.size,
                    totalCategories,
                    totalMessages,
                    recentPosts,
                    topPosts
                });
            } catch (error) {
                console.error("Error fetching dashboard stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-28 rounded-xl" />)}
                </div>
                <Skeleton className="h-[300px] rounded-xl" />
            </div>
        );
    }

    const statCards = [
        {
            title: "Total Views",
            value: stats.totalViews.toLocaleString(),
            sub: `Across ${stats.totalPosts} posts`,
            icon: Eye,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
        },
        {
            title: "Categories",
            value: stats.totalCategories.toLocaleString(),
            sub: "Content groups",
            icon: Layout,
            color: "text-pink-500",
            bg: "bg-pink-500/10",
        },
        {
            title: "Contact Messages",
            value: stats.totalMessages.toLocaleString(),
            sub: "Unread inquiries",
            icon: Settings,
            color: "text-orange-500",
            bg: "bg-orange-500/10",
        },
        {
            title: "Published Posts",
            value: stats.publishedPosts,
            sub: `${stats.draftPosts} draft${stats.draftPosts !== 1 ? "s" : ""}`,
            icon: CheckCircle2,
            color: "text-green-500",
            bg: "bg-green-500/10",
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here's your blog overview.</p>
                </div>
                <Button asChild>
                    <Link to="/blog-admin/posts/new">
                        <Plus className="mr-2 h-4 w-4" />
                        New Post
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map(card => (
                    <Card key={card.title}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                            <div className={`p-2 rounded-lg ${card.bg}`}>
                                <card.icon className={`h-4 w-4 ${card.color}`} />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{card.value}</div>
                            <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Chart + Recent Posts */}
            <div className="grid gap-4 lg:grid-cols-7">
                {/* Area Chart */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4" />
                            Traffic Overview
                        </CardTitle>
                        <CardDescription>Views and visitors for the past 14 days.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[260px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData}>
                                    <defs>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888" fontSize={11} tickLine={false} axisLine={false} />
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#27272a" />
                                    <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }} />
                                    <Area type="monotone" dataKey="views" stroke="#8b5cf6" fill="url(#colorViews)" strokeWidth={2} />
                                    <Area type="monotone" dataKey="visitors" stroke="#3b82f6" fill="url(#colorVisitors)" strokeWidth={2} />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Posts */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                Recent Posts
                            </CardTitle>
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/blog-admin/posts">View all</Link>
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {stats.recentPosts.length === 0 ? (
                            <div className="text-center py-6 text-muted-foreground text-sm">
                                No posts yet. <Link to="/blog-admin/posts/new" className="text-primary underline">Create one!</Link>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                {stats.recentPosts.map(post => (
                                    <div key={post.id} className="flex items-start justify-between gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm font-medium leading-tight truncate">{post.title}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {formatDistanceToNow(post.updatedAt, { addSuffix: true })}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-1 shrink-0">
                                            <Badge variant={post.status === "published" ? "default" : "secondary"} className="text-xs">
                                                {post.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" asChild>
                                                <Link to={`/blog-admin/posts/${post.id}/edit`}>
                                                    <Edit3 className="h-3.5 w-3.5" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Top Posts + Quick Actions */}
            <div className="grid gap-4 lg:grid-cols-7">
                {/* Top Posts by Views */}
                <Card className="lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            Top Posts by Views
                        </CardTitle>
                        <CardDescription>Your most-read content.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {stats.topPosts.length === 0 ? (
                            <p className="text-sm text-muted-foreground text-center py-6">No posts yet.</p>
                        ) : (
                            <div className="h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={stats.topPosts.map(p => ({ name: p.title?.slice(0, 20) + "…", views: p.viewCount || 0 }))}>
                                        <XAxis dataKey="name" stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#888" fontSize={10} tickLine={false} axisLine={false} />
                                        <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", borderRadius: "8px" }} />
                                        <Bar dataKey="views" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Common tasks at a glance.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {[
                            { to: "/blog-admin/posts/new", icon: Plus, label: "Create New Post", desc: "Start writing a new blog post" },
                            { to: "/blog-admin/pages/home", icon: Layout, label: "Edit Home Page", desc: "Customize your landing page" },
                            { to: "/blog-admin/settings", icon: Settings, label: "Site Settings", desc: "Update name, logo, nav links" },
                            { to: "/blog-admin/seed", icon: Database, label: "Seed Sample Data", desc: "Add dummy posts for testing" },
                        ].map(action => (
                            <Link
                                key={action.to}
                                to={action.to}
                                className="flex items-center gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors group"
                            >
                                <div className="p-2 rounded-md bg-primary/10 shrink-0">
                                    <action.icon className="h-4 w-4 text-primary" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm font-medium">{action.label}</p>
                                    <p className="text-xs text-muted-foreground">{action.desc}</p>
                                </div>
                                <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
