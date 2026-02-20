import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useSiteSettings } from "@/components/shared/SiteSettingsProvider";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, Plus, Trash2, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SiteSettings, SocialLink } from "@/types/blog";

const PLATFORM_OPTIONS = [
    { value: "twitter", label: "Twitter / X" },
    { value: "github", label: "GitHub" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "facebook", label: "Facebook" },
    { value: "tiktok", label: "TikTok" },
    { value: "discord", label: "Discord" },
    { value: "twitch", label: "Twitch" },
    { value: "mastodon", label: "Mastodon" },
    { value: "bluesky", label: "Bluesky" },
    { value: "website", label: "Website" },
    { value: "email", label: "Email" },
    { value: "other", label: "Other" },
];

export default function SettingsPage() {
    const { settings, refreshSettings } = useSiteSettings();
    const [formData, setFormData] = useState<SiteSettings>(settings);
    const [saving, setSaving] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => { setFormData(settings); }, [settings]);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!formData.siteName.trim()) e.siteName = "Site name is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSave = async () => {
        if (!validate()) {
            toast({ title: "Please fix the errors before saving", variant: "error" });
            return;
        }
        setSaving(true);
        try {
            await setDoc(doc(db, "settings", "global"), formData);
            await refreshSettings();
            toast({ title: "Settings saved!", variant: "success" });
        } catch (err) {
            toast({ title: "Failed to save settings", description: (err as Error).message, variant: "error" });
        } finally {
            setSaving(false);
        }
    };

    const addNavLink = () => {
        setFormData(f => ({
            ...f,
            navLinks: [...(f.navLinks || []), { label: "", url: "" }]
        }));
    };

    const updateNavLink = (index: number, field: "label" | "url", value: string) => {
        setFormData(f => {
            const links = [...(f.navLinks || [])];
            links[index] = { ...links[index], [field]: value };
            return { ...f, navLinks: links };
        });
    };

    const removeNavLink = (index: number) => {
        setFormData(f => ({
            ...f,
            navLinks: (f.navLinks || []).filter((_, i) => i !== index)
        }));
    };

    // Social Links helpers
    const socialLinks: SocialLink[] = Array.isArray(formData.socialLinks) ? formData.socialLinks : [];

    const addSocialLink = () => {
        setFormData(f => ({
            ...f,
            socialLinks: [...socialLinks, { platform: "other", label: "New Link", url: "", icon: "other", enabled: true }]
        }));
    };

    const updateSocialLink = (index: number, updates: Partial<SocialLink>) => {
        setFormData(f => {
            const links = [...socialLinks];
            links[index] = { ...links[index], ...updates };
            return { ...f, socialLinks: links };
        });
    };

    const removeSocialLink = (index: number) => {
        setFormData(f => ({
            ...f,
            socialLinks: socialLinks.filter((_, i) => i !== index)
        }));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Site Settings</h1>
                    <p className="text-muted-foreground">Manage your global site configuration.</p>
                </div>
                <Button onClick={handleSave} disabled={saving}>
                    {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                    {saving ? "Saving..." : "Save Settings"}
                </Button>
            </div>

            <div className="grid gap-6">
                {/* General */}
                <Card>
                    <CardHeader>
                        <CardTitle>General Information</CardTitle>
                        <CardDescription>Basic details about your website.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label className={errors.siteName ? "text-destructive" : ""}>
                                Site Name <span className="text-destructive">*</span>
                            </Label>
                            <Input
                                className={cn("mt-1", errors.siteName && "border-destructive focus-visible:ring-destructive")}
                                value={formData.siteName}
                                onChange={e => {
                                    setFormData({ ...formData, siteName: e.target.value });
                                    if (errors.siteName) setErrors(er => ({ ...er, siteName: "" }));
                                }}
                            />
                            {errors.siteName && <p className="text-xs text-destructive mt-1">{errors.siteName}</p>}
                        </div>
                        <div>
                            <Label>
                                Website Title (Browser Tab)
                            </Label>
                            <Input
                                className="mt-1"
                                value={formData.siteTitle || ""}
                                onChange={e => setFormData({ ...formData, siteTitle: e.target.value })}
                                placeholder="e.g. Ryza Blog - Personal Website"
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                This title will appear in the browser tab. If left empty, Site Name will be used.
                            </p>
                        </div>
                        <div>
                            <Label>Site Description</Label>
                            <Textarea
                                className="mt-1 resize-none"
                                rows={3}
                                value={formData.description}
                                onChange={e => setFormData({ ...formData, description: e.target.value })}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Branding */}
                <Card>
                    <CardHeader>
                        <CardTitle>Branding</CardTitle>
                        <CardDescription>Logos and icons.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Logo URL</Label>
                            <Input
                                className="mt-1"
                                value={formData.logoUrl || ""}
                                onChange={e => setFormData({ ...formData, logoUrl: e.target.value })}
                                placeholder="https://..."
                            />
                            {formData.logoUrl && (
                                <div className="mt-2 p-2 border rounded max-w-[200px] bg-muted/20">
                                    <img src={formData.logoUrl} alt="Logo preview" className="max-h-12 mx-auto" />
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Navigation Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Navigation Links</CardTitle>
                        <CardDescription>Customize the links shown in the Navbar and Footer.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {(formData.navLinks || []).map((link, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
                                <Input
                                    value={link.label}
                                    onChange={e => updateNavLink(index, "label", e.target.value)}
                                    placeholder="Label (e.g. Home)"
                                    className="flex-1"
                                />
                                <Input
                                    value={link.url}
                                    onChange={e => updateNavLink(index, "url", e.target.value)}
                                    placeholder="URL (e.g. /blog)"
                                    className="flex-1 font-mono text-sm"
                                />
                                <Button
                                    size="icon" variant="ghost"
                                    className="shrink-0 text-destructive hover:bg-destructive/10"
                                    onClick={() => removeNavLink(index)}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addNavLink} className="mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Link
                        </Button>
                    </CardContent>
                </Card>

                {/* Footer */}
                <Card>
                    <CardHeader>
                        <CardTitle>Footer</CardTitle>
                        <CardDescription>Customize the footer copyright text.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Label>Copyright Text</Label>
                        <Input
                            className="mt-1"
                            value={formData.footerCopyright || ""}
                            onChange={e => setFormData({ ...formData, footerCopyright: e.target.value })}
                            placeholder={`© ${new Date().getFullYear()} Your Name. All rights reserved.`}
                        />
                    </CardContent>
                </Card>

                {/* Social Links Manager */}
                <Card>
                    <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                        <CardDescription>
                            Manage social media links shown in the footer. Toggle links on/off without deleting them.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {socialLinks.length === 0 && (
                            <p className="text-sm text-muted-foreground text-center py-4">No social links yet. Add one below.</p>
                        )}
                        {socialLinks.map((link, index) => (
                            <div key={index} className={cn("border rounded-lg p-4 space-y-3 transition-opacity", !link.enabled && "opacity-60")}>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Switch
                                            checked={link.enabled}
                                            onCheckedChange={v => updateSocialLink(index, { enabled: v })}
                                        />
                                        <span className="text-sm font-medium">{link.label || link.platform}</span>
                                        {!link.enabled && <span className="text-xs text-muted-foreground">(hidden)</span>}
                                    </div>
                                    <Button
                                        size="icon" variant="ghost"
                                        className="h-7 w-7 text-destructive hover:bg-destructive/10"
                                        onClick={() => removeSocialLink(index)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                    <div>
                                        <Label className="text-xs mb-1 block">Platform</Label>
                                        <select
                                            className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                                            value={link.platform}
                                            onChange={e => {
                                                const opt = PLATFORM_OPTIONS.find(p => p.value === e.target.value);
                                                updateSocialLink(index, { platform: e.target.value, icon: e.target.value, label: opt?.label || e.target.value });
                                            }}
                                        >
                                            {PLATFORM_OPTIONS.map(opt => (
                                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <Label className="text-xs mb-1 block">Display Label</Label>
                                        <Input
                                            value={link.label}
                                            onChange={e => updateSocialLink(index, { label: e.target.value })}
                                            placeholder="e.g. Follow me"
                                        />
                                    </div>
                                    <div>
                                        <Label className="text-xs mb-1 block">URL</Label>
                                        <Input
                                            value={link.url}
                                            onChange={e => updateSocialLink(index, { url: e.target.value })}
                                            placeholder="https://..."
                                            className="font-mono text-xs"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <Button variant="outline" size="sm" onClick={addSocialLink} className="w-full mt-2">
                            <Plus className="h-4 w-4 mr-2" />
                            Add Social Link
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
