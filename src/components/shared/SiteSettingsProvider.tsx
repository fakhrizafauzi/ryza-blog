import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SiteSettings } from "@/types/blog";

const DEFAULT_SETTINGS: SiteSettings = {
    siteName: "Ryza Blog",
    siteTitle: "Ryza Blog - Personal Website",
    description: "A personal blog.",
    logoUrl: "",
    faviconUrl: "",
    navLinks: [
        { label: "Home", url: "/" },
        { label: "Blog", url: "/blog" },
    ],
    footerCopyright: `© ${new Date().getFullYear()} Ryza Blog. All rights reserved.`,
    socialLinks: [
        { platform: "twitter", label: "Twitter / X", url: "https://twitter.com", icon: "twitter", enabled: true },
        { platform: "github", label: "GitHub", url: "https://github.com", icon: "github", enabled: true },
        { platform: "linkedin", label: "LinkedIn", url: "https://linkedin.com", icon: "linkedin", enabled: true },
        { platform: "instagram", label: "Instagram", url: "https://instagram.com", icon: "instagram", enabled: false },
    ],
    theme: {
        primaryColor: "#000000",
        accentColor: "#6b7280",
        fontHeadings: "Inter",
        fontBody: "Inter"
    }
};

interface SiteSettingsContextType {
    settings: SiteSettings;
    loading: boolean;
    refreshSettings: () => Promise<void>;
}

const SiteSettingsContext = createContext<SiteSettingsContextType>({
    settings: DEFAULT_SETTINGS,
    loading: true,
    refreshSettings: async () => { },
});

export function useSiteSettings() {
    return useContext(SiteSettingsContext);
}

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try {
            const docRef = doc(db, "settings", "global");
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const data = docSnap.data();
                // Merge with default to ensure all fields exist
                setSettings({ ...DEFAULT_SETTINGS, ...data } as SiteSettings);
            }
        } catch (err) {
            console.error("Error fetching site settings:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();
    }, []);

    useEffect(() => {
        if (settings.siteTitle) {
            document.title = settings.siteTitle;
        } else if (settings.siteName) {
            document.title = settings.siteName;
        }
    }, [settings.siteTitle, settings.siteName]);

    return (
        <SiteSettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
            {children}
        </SiteSettingsContext.Provider>
    );
}
