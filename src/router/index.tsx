import { createBrowserRouter } from "react-router-dom"
import RootLayout from "@/layouts/RootLayout"
import PublicLayout from "@/layouts/PublicLayout"
import AdminLayout from "@/layouts/AdminLayout"
import HomePage from "@/pages/public/HomePage"
import BlogListPage from "@/pages/public/BlogListPage"
import BlogDetailPage from "@/pages/public/BlogDetailPage"
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage"
import PostsListPage from "@/pages/admin/PostsListPage"
import PostEditorPage from "@/pages/admin/PostEditorPage"
import TagsListPage from "@/pages/admin/TagsListPage"
import PagesListPage from "@/pages/admin/PagesListPage"
import PageEditorPage from "@/pages/admin/PageEditorPage"
import SettingsPage from "@/pages/admin/SettingsPage"

import CategoriesListPage from "@/pages/admin/CategoriesListPage"
import AuthorsPage from "@/pages/admin/AuthorsPage"
import SeedDataPage from "@/pages/admin/SeedDataPage"
import { AuthGuard } from "@/components/auth/AuthGuard"
import LoginPage from "@/pages/admin/LoginPage"
import ErrorPage from "@/pages/ErrorPage"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <PublicLayout />,
                children: [
                    { index: true, element: <HomePage /> },
                    { path: "blog", element: <BlogListPage /> },
                    { path: "blog/:slug", element: <BlogDetailPage /> },
                ],
            },
            {
                path: "/blog-admin", // Renamed from /admin
                children: [
                    { path: "login", element: <LoginPage /> },
                    {
                        element: <AuthGuard requireAdmin={true} />,
                        children: [
                            {
                                element: <AdminLayout />,
                                children: [
                                    { index: true, element: <AdminDashboardPage /> },
                                    { path: "posts", element: <PostsListPage /> },
                                    { path: "posts/new", element: <PostEditorPage /> },
                                    { path: "posts/:id/edit", element: <PostEditorPage /> },
                                    { path: "pages", element: <PagesListPage /> },
                                    { path: "pages/:slug", element: <PageEditorPage /> },
                                    { path: "categories", element: <CategoriesListPage /> },
                                    { path: "authors", element: <AuthorsPage /> },
                                    { path: "tags", element: <TagsListPage /> },
                                    { path: "settings", element: <SettingsPage /> },
                                    { path: "seed", element: <SeedDataPage /> },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    }
], {
    basename: import.meta.env.BASE_URL
});
