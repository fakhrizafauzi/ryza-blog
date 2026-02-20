import { useState } from "react";
import { motion } from "framer-motion";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Loader2, Send, Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface ContactFormSectionContent {
    heading?: string;
    subheading?: string;
    recipientEmail?: string;
    successMessage?: string;
    submitLabel?: string;
    template?: string;
}

export function ContactFormSection({ content }: { content: ContactFormSectionContent }) {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const template = content.template || "style-1";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await addDoc(collection(db, "contact_messages"), {
                ...form,
                to: content.recipientEmail || "default",
                createdAt: Date.now(),
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting contact form:", err);
            setError("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Contact
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                    {/* Left: Info */}
                    <div className="p-8 md:p-20 flex flex-col justify-between min-h-[600px] bg-muted/5">
                        <div>
                            {content.heading && (
                                <h2 className="text-4xl md:text-8xl font-bold tracking-tighter text-foreground uppercase leading-[0.85] mb-8">
                                    {content.heading || "Contact"}
                                </h2>
                            )}
                            {content.subheading && (
                                <p className="text-lg md:text-xl text-muted-foreground font-mono max-w-md">
                                    {content.subheading}
                                </p>
                            )}
                        </div>

                        <div className="space-y-8 mt-12">
                            <div>
                                <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Email</h4>
                                <a href="mailto:hello@example.com" className="text-2xl font-bold hover:text-primary transition-colors">hello@example.com</a>
                            </div>
                            <div>
                                <h4 className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-2">Office</h4>
                                <p className="text-xl font-medium">123 Innovation Dr.<br />San Francisco, CA 94103</p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="p-8 md:p-20 flex flex-col justify-center">
                        {submitted ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-primary/5 border border-primary/20 p-12 text-center"
                            >
                                <Check className="w-12 h-12 text-primary mx-auto mb-6" />
                                <h3 className="text-2xl font-bold uppercase tracking-widest mb-2">Message Sent</h3>
                                <p className="text-muted-foreground font-mono">We'll get back to you shortly.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-0 divide-y divide-border border border-border">
                                <div className="group relative">
                                    <label className="absolute top-4 left-6 text-xs font-mono uppercase tracking-widest text-muted-foreground pointer-events-none">Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-transparent px-6 pb-4 pt-10 text-xl font-bold focus:outline-none focus:bg-muted/30 transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="absolute top-4 left-6 text-xs font-mono uppercase tracking-widest text-muted-foreground pointer-events-none">Email</label>
                                    <input
                                        type="email"
                                        required
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        className="w-full bg-transparent px-6 pb-4 pt-10 text-xl font-bold focus:outline-none focus:bg-muted/30 transition-colors"
                                        placeholder="john@example.com"
                                    />
                                </div>
                                <div className="group relative">
                                    <label className="absolute top-4 left-6 text-xs font-mono uppercase tracking-widest text-muted-foreground pointer-events-none">Message</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={form.message}
                                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                                        className="w-full bg-transparent px-6 pb-4 pt-10 text-xl font-bold focus:outline-none focus:bg-muted/30 transition-colors resize-none"
                                        placeholder="How can we help?"
                                    />
                                </div>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-20 text-lg font-bold uppercase tracking-widest rounded-none hover:bg-primary hover:text-primary-foreground transition-all"
                                >
                                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : "Send Message"}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Contact (High Fidelity)
        return (
            <SectionLayout width="container" padding="lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="order-2 lg:order-1">
                        <div className="relative rounded-[4rem] bg-white dark:bg-zinc-800/80 p-12 md:p-16 shadow-2xl border border-white/50 dark:border-white/5 overflow-hidden">
                            {/* Organic Background Blobs */}
                            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-rose-200 dark:bg-rose-900/30 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none opacity-60" />
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-200 dark:bg-indigo-900/30 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none opacity-60" />

                            <div className="relative z-10">
                                <h3 className="text-3xl font-black mb-8">Send a Message</h3>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="space-y-4">
                                        <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            className="bg-muted/30 p-2 rounded-[2rem] focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:shadow-lg focus-within:ring-2 ring-primary/20 transition-all"
                                        >
                                            <Input
                                                placeholder="Your Name"
                                                value={form.name}
                                                onChange={e => setForm({ ...form, name: e.target.value })}
                                                className="h-14 border-none bg-transparent shadow-none px-6 text-lg focus-visible:ring-0 rounded-[1.5rem]"
                                                required
                                            />
                                        </motion.div>
                                        <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            className="bg-muted/30 p-2 rounded-[2rem] focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:shadow-lg focus-within:ring-2 ring-primary/20 transition-all"
                                        >
                                            <Input
                                                type="email"
                                                placeholder="Your Email"
                                                value={form.email}
                                                onChange={e => setForm({ ...form, email: e.target.value })}
                                                className="h-14 border-none bg-transparent shadow-none px-6 text-lg focus-visible:ring-0 rounded-[1.5rem]"
                                                required
                                            />
                                        </motion.div>
                                        <motion.div
                                            whileFocus={{ scale: 1.02 }}
                                            className="bg-muted/30 p-2 rounded-[2rem] focus-within:bg-white dark:focus-within:bg-zinc-900 focus-within:shadow-lg focus-within:ring-2 ring-primary/20 transition-all"
                                        >
                                            <Textarea
                                                placeholder="How can we help?"
                                                value={form.message}
                                                onChange={e => setForm({ ...form, message: e.target.value })}
                                                className="min-h-[160px] border-none bg-transparent shadow-none p-6 text-lg focus-visible:ring-0 resize-none rounded-[1.5rem]"
                                                required
                                            />
                                        </motion.div>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02, y: -2 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={loading}
                                        className="w-full h-16 rounded-[2rem] bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-xl shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                            <>
                                                {content.submitLabel || "Send Message"} <Send className="w-5 h-5" />
                                            </>
                                        )}
                                    </motion.button>
                                    {submitted && (
                                        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-green-600 font-bold text-center mt-4">
                                            {content.successMessage || "Message sent successfully!"}
                                        </motion.p>
                                    )}
                                    {error && <p className="text-red-500 font-bold text-center mt-4">{error}</p>}
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-block p-6 rounded-[2.5rem] bg-white dark:bg-zinc-800 shadow-xl mb-10 rotate-3"
                        >
                            <MessageSquare className="w-12 h-12 text-primary" fill="currentColor" fillOpacity={0.2} />
                        </motion.div>

                        {content.heading && (
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-8 drop-shadow-sm leading-none">
                                {content.heading || "Let's Chat"}
                            </h2>
                        )}
                        {content.subheading && (
                            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12">
                                {content.subheading}
                            </p>
                        )}

                        <div className="flex flex-col gap-6 items-center lg:items-start">
                            <a href={`mailto:${content.recipientEmail}`} className="flex items-center gap-4 p-4 pr-8 rounded-full bg-white/50 dark:bg-zinc-800/50 hover:bg-white hover:shadow-lg transition-all border border-transparent hover:border-indigo-100 group">
                                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <span className="text-lg font-bold text-foreground overflow-hidden text-ellipsis">hello@ryza.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full">
                {template === "style-1" && (
                    <>
                        <div className="absolute -left-24 -top-24 h-96 w-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute -right-24 bottom-0 h-96 w-96 bg-primary/2 blur-[150px] rounded-full pointer-events-none" />
                    </>
                )}

                <div className={cn(
                    "flex gap-16 md:gap-20 lg:gap-32 min-h-[600px] md:min-h-[700px]",
                    template === "style-1" && "flex-col lg:flex-row items-stretch",
                    template === "style-2" && "flex-col items-center text-center",
                    template === "style-3" && "flex-col lg:flex-row-reverse items-center"
                )}>
                    {/* Info Side */}
                    <motion.div
                        initial={{ opacity: 0, x: template === "style-3" ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "flex flex-col justify-between py-4 md:py-8",
                            template === "style-1" && "w-full lg:w-[45%]",
                            template === "style-2" && "w-full max-w-2xl",
                            template === "style-3" && "w-full lg:w-[40%] text-right items-end"
                        )}
                    >
                        <div>
                            {template === "style-1" && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center gap-3 px-4 py-1.5 md:px-6 md:py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-8 md:mb-12 shadow-2xl"
                                >
                                    <Mail className="h-4 w-4" />
                                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em]">Get in Touch</span>
                                </motion.div>
                            )}

                            {template === "style-2" && (
                                <div className="flex items-center justify-center gap-4 mb-8">
                                    <div className="h-px w-12 bg-primary/20" />
                                    <span className="font-serif italic text-primary">Contact</span>
                                    <div className="h-px w-12 bg-primary/20" />
                                </div>
                            )}

                            <h2 className={cn(
                                "mb-6 md:mb-10 leading-[0.9]",
                                template === "style-1" && "text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50",
                                template === "style-2" && "text-4xl sm:text-5xl md:text-7xl font-serif font-light tracking-tight text-foreground",
                                template === "style-3" && "text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-[0.05em] text-foreground"
                            )}>
                                {content.heading || "Let's Talk"}
                            </h2>

                            <p className={cn(
                                "max-w-xl",
                                template === "style-1" && "text-lg md:text-2xl text-muted-foreground font-light leading-relaxed",
                                template === "style-2" && "text-xl md:text-2xl text-muted-foreground font-serif italic",
                                template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60 ml-auto"
                            )}>
                                {content.subheading || "We help brands and businesses create world-class digital experiences. Reach out to start the conversation."}
                            </p>
                        </div>

                        <div className={cn(
                            "space-y-6 md:space-y-8 mt-12 md:mt-20",
                            template === "style-2" && "flex flex-wrap justify-center gap-8 space-y-0",
                            template === "style-3" && "border-r-4 border-primary pr-8"
                        )}>
                            {[
                                { icon: Mail, label: "Email", value: "hello@example.com" },
                                { icon: MapPin, label: "Studio", value: "San Francisco, CA" },
                                { icon: Phone, label: "Phone", value: "+1 (555) 000-0000" }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 + (i * 0.1) }}
                                    className={cn(
                                        "flex items-center gap-4 group cursor-pointer",
                                        template === "style-2" && "flex-col gap-2 p-6 border border-primary/10 rounded-xl hover:bg-primary/5 transition-colors",
                                        template === "style-3" && "flex-row-reverse text-right"
                                    )}
                                >
                                    <div className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-500",
                                        template === "style-1" && "bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110",
                                        template === "style-2" && "bg-transparent text-primary w-auto h-auto",
                                        template === "style-3" && "bg-foreground text-background group-hover:bg-primary group-hover:text-foreground"
                                    )}>
                                        <item.icon className={cn(
                                            "w-5 h-5 md:w-6 md:h-6",
                                            template === "style-2" && "w-6 h-6 md:w-8 md:h-8"
                                        )} />
                                    </div>
                                    <div>
                                        <div className={cn(
                                            "mb-1",
                                            template === "style-1" && "text-[10px] uppercase tracking-[0.2em] font-bold text-muted-foreground group-hover:text-primary transition-colors",
                                            template === "style-2" && "hidden",
                                            template === "style-3" && "text-[10px] font-mono uppercase tracking-widest opacity-50"
                                        )}>{item.label}</div>
                                        <div className={cn(
                                            "text-lg md:text-xl",
                                            template === "style-1" && "font-medium text-foreground",
                                            template === "style-2" && "font-serif text-lg",
                                            template === "style-3" && "font-bold uppercase tracking-tight"
                                        )}>{item.value}</div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: template === "style-3" ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                            "relative",
                            template === "style-1" && "w-full lg:w-[55%] lg:pl-12",
                            template === "style-2" && "w-full max-w-xl",
                            template === "style-3" && "w-full lg:w-[60%] lg:pr-12"
                        )}
                    >
                        <div className={cn(
                            "relative overflow-hidden",
                            template === "style-1" && "p-8 md:p-12 rounded-[2.5rem] bg-card/40 dark:bg-card/20 backdrop-blur-xl border border-primary/10 shadow-2xl",
                            template === "style-2" && "p-0 bg-transparent",
                            template === "style-3" && "p-10 bg-card border-4 border-primary shadow-[12px_12px_0px_0px_rgba(var(--primary),0.3)]"
                        )}>
                            {template === "style-1" && (
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[80px] rounded-full pointer-events-none" />
                            )}

                            {submitted ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center h-full min-h-[400px] text-center"
                                >
                                    <div className={cn(
                                        "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                                        template === "style-1" && "bg-primary/10 text-primary",
                                        template === "style-2" && "bg-transparent text-primary border border-primary",
                                        template === "style-3" && "bg-primary text-primary-foreground"
                                    )}>
                                        <Check className="w-10 h-10" />
                                    </div>
                                    <h3 className={cn(
                                        "text-2xl mb-2",
                                        template === "style-1" && "font-bold",
                                        template === "style-2" && "font-serif italic",
                                        template === "style-3" && "font-black uppercase tracking-widest"
                                    )}>Message Received</h3>
                                    <p className="text-muted-foreground">{content.successMessage || "We'll get back to you shortly."}</p>
                                    <Button
                                        onClick={() => setSubmitted(false)}
                                        variant="ghost"
                                        className="mt-8 hover:bg-transparent hover:text-primary"
                                    >
                                        Send another message
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="relative z-10 space-y-6 md:space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <div className="group space-y-2">
                                            <Label
                                                htmlFor="name"
                                                className={cn(
                                                    "ml-4 transition-colors",
                                                    focusedField === "name" ? "text-primary" : "text-muted-foreground",
                                                    template === "style-2" && "font-serif italic",
                                                    template === "style-3" && "font-mono uppercase text-xs"
                                                )}
                                            >
                                                Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={form.name}
                                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                onFocus={() => setFocusedField("name")}
                                                onBlur={() => setFocusedField(null)}
                                                className={cn(
                                                    "h-14 px-6 transition-all duration-300",
                                                    template === "style-1" && "rounded-2xl bg-background/50 border-primary/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10",
                                                    template === "style-2" && "rounded-none border-0 border-b border-primary/20 bg-transparent px-0 focus:border-primary focus:ring-0",
                                                    template === "style-3" && "rounded-none border-2 border-primary/20 bg-background focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(var(--primary),1)] focus:translate-x-[-2px] focus:translate-y-[-2px]"
                                                )}
                                                placeholder={template === "style-2" ? "John Doe" : "What's your name?"}
                                                required
                                            />
                                        </div>
                                        <div className="group space-y-2">
                                            <Label
                                                htmlFor="email"
                                                className={cn(
                                                    "ml-4 transition-colors",
                                                    focusedField === "email" ? "text-primary" : "text-muted-foreground",
                                                    template === "style-2" && "font-serif italic",
                                                    template === "style-3" && "font-mono uppercase text-xs"
                                                )}
                                            >
                                                Email
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={form.email}
                                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                onFocus={() => setFocusedField("email")}
                                                onBlur={() => setFocusedField(null)}
                                                className={cn(
                                                    "h-14 px-6 transition-all duration-300",
                                                    template === "style-1" && "rounded-2xl bg-background/50 border-primary/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10",
                                                    template === "style-2" && "rounded-none border-0 border-b border-primary/20 bg-transparent px-0 focus:border-primary focus:ring-0",
                                                    template === "style-3" && "rounded-none border-2 border-primary/20 bg-background focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(var(--primary),1)] focus:translate-x-[-2px] focus:translate-y-[-2px]"
                                                )}
                                                placeholder={template === "style-2" ? "john@example.com" : "hello@example.com"}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="group space-y-2">
                                        <Label
                                            htmlFor="message"
                                            className={cn(
                                                "ml-4 transition-colors",
                                                focusedField === "message" ? "text-primary" : "text-muted-foreground",
                                                template === "style-2" && "font-serif italic",
                                                template === "style-3" && "font-mono uppercase text-xs"
                                            )}
                                        >
                                            Message
                                        </Label>
                                        <Textarea
                                            id="message"
                                            value={form.message}
                                            onChange={(e) => setForm({ ...form, message: e.target.value })}
                                            onFocus={() => setFocusedField("message")}
                                            onBlur={() => setFocusedField(null)}
                                            rows={5}
                                            className={cn(
                                                "p-6 resize-none transition-all duration-300",
                                                template === "style-1" && "rounded-3xl bg-background/50 border-primary/10 focus:border-primary focus:bg-background focus:ring-4 focus:ring-primary/10",
                                                template === "style-2" && "rounded-none border-0 border-b border-primary/20 bg-transparent px-0 focus:border-primary focus:ring-0 min-h-[100px]",
                                                template === "style-3" && "rounded-none border-2 border-primary/20 bg-background focus:border-primary focus:shadow-[4px_4px_0px_0px_rgba(var(--primary),1)] focus:translate-x-[-2px] focus:translate-y-[-2px]"
                                            )}
                                            placeholder={template === "style-2" ? "Tell us about your project..." : "Tell us about your project goals and timeline..."}
                                            required
                                        />
                                    </div>

                                    {error && (
                                        <p className="text-destructive text-sm text-center">{error}</p>
                                    )}

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className={cn(
                                            "w-full h-16 text-lg tracking-wide transition-all duration-500",
                                            template === "style-1" && "rounded-2xl font-bold bg-primary text-primary-foreground hover:scale-[1.02] shadow-xl hover:shadow-primary/20",
                                            template === "style-2" && "rounded-none h-12 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-serif italic",
                                            template === "style-3" && "rounded-none border-2 border-primary bg-primary text-primary-foreground font-mono uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]"
                                        )}
                                    >
                                        {loading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <span className="flex items-center gap-3">
                                                {content.submitLabel || "Send Message"}
                                                {template !== "style-2" && <Send className="w-5 h-5" />}
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </SectionLayout>
    );
}
