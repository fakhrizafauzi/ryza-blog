import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Check, Mail, ArrowRight, Sparkles } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";

interface NewsletterSectionContent {
    title?: string;
    subtitle?: string;
    placeholder?: string;
    buttonText?: string;
    template?: string;
}

export function NewsletterSection({ content }: { content: NewsletterSectionContent }) {
    const {
        title = "Stay in the loop",
        subtitle = "Get notified when new posts are published. No spam, ever.",
        placeholder = "Enter your email address",
        buttonText = "Join Now",
        template = "style-1"
    } = content;

    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        setStatus("idle");
        try {
            const q = query(collection(db, "newsletter_subscriptions"), where("email", "==", email));
            const snap = await getDocs(q);
            if (!snap.empty) {
                setStatus("success");
                return;
            }

            await addDoc(collection(db, "newsletter_subscriptions"), {
                email,
                subscribedAt: Date.now(),
            });
            setStatus("success");
            setEmail("");
        } catch (err) {
            console.error("Newsletter error:", err);
            setStatus("error");
            setErrorMessage("Failed to subscribe. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Newsletter (High Fidelity)
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border font-mono">
                <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                    <div className="p-12 md:p-24 flex flex-col justify-center min-h-[500px] relative overflow-hidden">
                        <div className="absolute top-0 left-0 p-4 border-b border-r border-border text-xs font-bold uppercase tracking-widest bg-background z-10">
                            Newsletter_Module_01
                        </div>

                        <div className="relative z-10">
                            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-8 block">
                                Stay Updated
                            </span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground uppercase leading-[0.85] mb-8">
                                {title}
                            </h2>
                            <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-md border-l-4 border-foreground pl-6 py-1">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="p-12 md:p-24 bg-foreground text-background flex items-center justify-center relative overflow-hidden">
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(var(--background) 1px, transparent 1px), linear-gradient(90deg, var(--background) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        <div className="w-full max-w-lg relative z-10">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-center border-2 border-background p-12"
                                    >
                                        <div className="inline-flex items-center justify-center w-20 h-20 bg-background text-foreground mb-8">
                                            <Check className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-3xl font-black uppercase tracking-widest mb-4">Confirmed</h3>
                                        <p className="text-background/80 font-mono text-sm">You have been added to the registry.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="space-y-0">
                                        <div className="relative group">
                                            <label className="text-xs font-bold uppercase tracking-widest text-background/60 mb-2 block group-focus-within:text-background transition-colors">
                                                Email Address
                                            </label>
                                            <Input
                                                type="email"
                                                placeholder={placeholder}
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className="h-20 bg-transparent border-b-4 border-background/20 text-background rounded-none text-2xl md:text-3xl font-bold placeholder:text-background/20 focus:border-background focus:ring-0 px-0 transition-colors"
                                                required
                                                disabled={loading}
                                            />
                                        </div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full h-20 bg-background text-foreground rounded-none uppercase tracking-widest font-black text-lg hover:bg-background/90 transition-colors mt-12"
                                        >
                                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                                <span className="flex w-full justify-between items-center">
                                                    {buttonText}
                                                    <ArrowRight className="w-6 h-6" />
                                                </span>
                                            )}
                                        </Button>
                                        {status === 'error' && (
                                            <p className="text-red-400 font-mono text-xs mt-4 uppercase tracking-widest">{errorMessage}</p>
                                        )}
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Newsletter (Refined)
        return (
            <SectionLayout width="container" padding="lg">
                <div className="rounded-[4rem] bg-amber-50 dark:bg-zinc-900/50 p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/50 dark:border-white/5">
                    {/* Organic Décor */}
                    <div className="absolute top-0 right-0 p-0 pointer-events-none opacity-20 dark:opacity-5">
                        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#F59E0B" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.9,32.3C59.6,43.1,48.3,51.8,36.4,58.3C24.5,64.8,12,69.1,-0.9,70.7C-13.9,72.2,-28.1,71.1,-40.5,64.8C-52.9,58.5,-63.5,47,-70.9,34.3C-78.3,21.6,-82.5,7.7,-79.8,-5.1C-77.1,-17.9,-67.5,-29.6,-56.9,-39.2C-46.3,-48.8,-34.7,-56.3,-22.6,-64.8C-10.5,-73.3,2.1,-82.8,15.2,-83.4C28.3,-84,42,-75.7,44.7,-76.4Z" transform="translate(100 100)" />
                        </svg>
                    </div>
                    <div className="absolute bottom-0 left-0 p-0 pointer-events-none opacity-20 dark:opacity-5">
                        <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#8B5CF6" d="M41.5,-70.5C54.3,-64.1,65.6,-54.6,73.8,-43.2C82,-31.8,87.1,-18.5,85.8,-5.8C84.5,6.9,76.8,19,67.6,29.8C58.4,40.6,47.7,50.1,36.2,56.5C24.7,62.9,12.4,66.2,-0.4,66.9C-13.2,67.6,-26.3,65.7,-38.3,59.3C-50.3,52.9,-61.2,42,-68.8,29.7C-76.4,17.4,-80.7,3.7,-77.6,-8.7C-74.5,-21.1,-64,-32.2,-53.4,-41.2C-42.8,-50.2,-32.1,-57.1,-20.5,-64.3C-8.9,-71.5,3.6,-79,16.5,-80.1C29.4,-81.2,42.7,-75.9,41.5,-70.5Z" transform="translate(100 100)" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <motion.div
                            whileHover={{ rotate: 10, scale: 1.1 }}
                            className="w-20 h-20 rounded-[2rem] bg-gradient-to-tr from-amber-200 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 flex items-center justify-center mx-auto mb-10 text-amber-600 dark:text-amber-400 shadow-xl shadow-amber-500/10"
                        >
                            <Mail className="w-10 h-10" strokeWidth={2.5} />
                        </motion.div>

                        <h2 className="text-5xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
                            {title}
                        </h2>
                        <p className="text-xl md:text-2xl text-muted-foreground/80 mb-12 font-medium leading-relaxed">
                            {subtitle}
                        </p>

                        <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-xl p-3 rounded-full shadow-2xl shadow-indigo-500/5 max-w-xl mx-auto border border-white/40 dark:border-white/5">
                            <AnimatePresence mode="wait">
                                {status === "success" ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="h-16 flex items-center justify-center gap-3 text-green-600 dark:text-green-400 font-black text-lg"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                            <Check className="w-6 h-6" />
                                        </div>
                                        <span>You're subscribed!</span>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubscribe} className="flex gap-2">
                                        <Input
                                            type="email"
                                            placeholder={placeholder}
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            className="h-16 border-none bg-transparent shadow-none focus-visible:ring-0 text-xl px-6 placeholder:text-muted-foreground/40 font-medium text-foreground"
                                            required
                                            disabled={loading}
                                        />
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="h-16 w-16 md:w-auto md:px-10 rounded-full bg-foreground text-background font-bold text-lg hover:scale-105 transition-transform shadow-lg"
                                        >
                                            {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : (
                                                <>
                                                    <span className="hidden md:inline">{buttonText}</span>
                                                    <ArrowRight className="md:hidden w-6 h-6" />
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </AnimatePresence>
                        </div>
                        {status === 'error' && (
                            <p className="text-red-500 mt-6 font-bold">{errorMessage}</p>
                        )}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    return (
        <SectionLayout
            width={template === "style-2" ? "readable" : "wide"}
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                    "relative w-full transition-all duration-1000",
                    template === "style-1" && "rounded-[3rem] md:rounded-[4rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 p-10 sm:p-16 md:p-32 shadow-2xl overflow-hidden isolation",
                    template === "style-2" && "p-0 bg-transparent border-none text-center",
                    template === "style-3" && "p-8 md:p-16 bg-card border-x-4 border-primary rounded-none shadow-xl"
                )}
            >
                {template === "style-1" && (
                    <div className="absolute inset-0 pointer-events-none opacity-40">
                        <div className="absolute -top-1/2 -left-1/4 w-full h-[150%] bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-[120px] animate-pulse" />
                        <div className="absolute -bottom-1/2 -right-1/4 w-full h-[150%] bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-[120px] animate-pulse delay-700" />
                    </div>
                )}

                <div className={cn(
                    "relative z-10 w-full",
                    template === "style-3" ? "grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center text-left" : "max-w-4xl mx-auto flex flex-col items-center"
                )}>
                    <div className={template === "style-3" ? "space-y-6" : "flex flex-col items-center"}>
                        {template === "style-1" && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="mb-8 md:mb-12 p-5 md:p-6 rounded-[1.5rem] md:rounded-[2rem] bg-primary/5 text-primary border border-primary/10 shadow-2xl"
                            >
                                <Mail className="h-8 w-8 md:h-10 md:w-10" />
                            </motion.div>
                        )}

                        {template === "style-2" && (
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-px w-12 bg-primary/20" />
                                <span className="font-serif italic text-primary">Newsletter</span>
                                <div className="h-px w-12 bg-primary/20" />
                            </div>
                        )}

                        <h2 className={cn(
                            "leading-[1] md:leading-[0.9] mb-6 md:mb-8 break-words",
                            template === "style-3" ? "text-left" : "text-center",
                            template === "style-1" && "text-4xl sm:text-5xl md:text-8xl font-black tracking-tighter",
                            template === "style-2" && "text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-tight",
                            template === "style-3" && "text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-[0.05em]"
                        )}>
                            {title}
                        </h2>

                        <p className={cn(
                            "mb-10 md:mb-16 leading-relaxed max-w-2xl px-4",
                            template === "style-3" ? "text-left px-0" : "text-center",
                            template === "style-1" && "text-lg md:text-2xl text-muted-foreground font-light",
                            template === "style-2" && "text-base md:text-xl text-muted-foreground font-serif italic py-4 border-y border-primary/10",
                            template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-widest opacity-60"
                        )}>
                            {subtitle}
                        </p>
                    </div>

                    <div className={cn(
                        "w-full px-4",
                        template === "style-3" ? "px-0" : "max-w-xl"
                    )}>
                        <AnimatePresence mode="wait">
                            {status === "success" ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={cn(
                                        "p-10 md:p-12 text-center",
                                        template === "style-1" && "bg-primary/5 rounded-[2.5rem] md:rounded-[3rem] border border-primary/20 backdrop-blur-md",
                                        template === "style-2" && "bg-transparent font-serif",
                                        template === "style-3" && "bg-primary text-primary-foreground"
                                    )}
                                >
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: "spring", damping: 12, stiffness: 200 }}
                                        className={cn(
                                            "w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-2xl ",
                                            template === "style-3" ? "bg-white text-primary" : "bg-primary text-primary-foreground shadow-primary/30"
                                        )}
                                    >
                                        <Check className="w-8 h-8 md:w-10 md:h-10 stroke-[3]" />
                                    </motion.div>
                                    <h3 className="text-2xl md:text-3xl font-black mb-3 md:mb-4 tracking-tighter">You're In!</h3>
                                    <p className={cn(
                                        "text-base md:text-lg mb-8 md:mb-10",
                                        template === "style-3" ? "opacity-80" : "text-muted-foreground font-light"
                                    )}>Check your inbox for something special.</p>
                                    <Button
                                        variant={template === "style-3" ? "secondary" : "outline"}
                                        className={cn(
                                            "rounded-xl md:rounded-2xl h-12 md:h-14 px-8 md:px-10 font-black tracking-[0.2em] uppercase text-[10px] md:text-xs transition-all",
                                            template === "style-1" && "border-primary/20 hover:bg-primary/5"
                                        )}
                                        onClick={() => setStatus("idle")}
                                    >
                                        Add Another
                                    </Button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubscribe} className={cn(
                                    "space-y-8 md:space-y-10",
                                    template === "style-2" && "space-y-6"
                                )}>
                                    <div className="relative group">
                                        {template === "style-1" && <div className="absolute -inset-4 bg-primary/10 blur-3xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 pointer-events-none" />}
                                        <div className={cn(
                                            "flex items-stretch gap-4 sm:gap-0 relative",
                                            template === "style-3" ? "flex-col" : "flex-col sm:flex-row"
                                        )}>
                                            <Input
                                                type="email"
                                                placeholder={placeholder}
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                className={cn(
                                                    "transition-all shadow-2xl",
                                                    template === "style-1" && "h-16 md:h-24 sm:pl-8 sm:pr-48 rounded-[1.5rem] md:rounded-[2.5rem] border-primary/10 bg-background/30 dark:bg-zinc-950/30 backdrop-blur-xl text-lg md:text-xl font-light focus:ring-4 focus:ring-primary/20",
                                                    template === "style-2" && "h-16 border-none border-b border-primary/20 bg-transparent rounded-none text-center font-serif text-xl focus:ring-0 focus:border-primary",
                                                    template === "style-3" && "h-16 md:h-20 rounded-none border-2 border-primary bg-background font-mono text-base focus:ring-0 focus:bg-primary/5"
                                                )}
                                                required
                                                disabled={loading}
                                            />
                                            <div className={cn(
                                                template === "style-1" && "sm:absolute sm:right-3 sm:top-3 sm:bottom-3",
                                                template === "style-2" && "mt-4",
                                                template === "style-3" && "mt-4"
                                            )}>
                                                <Button
                                                    type="submit"
                                                    disabled={loading}
                                                    className={cn(
                                                        "font-black tracking-[0.2em] uppercase text-[10px] md:text-xs shadow-2xl shadow-primary/20 group/btn transition-all",
                                                        template === "style-1" && "h-16 sm:h-full w-full sm:w-auto rounded-[1.25rem] md:rounded-[2rem] px-8 md:px-10",
                                                        template === "style-2" && "h-12 w-full bg-transparent border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground font-serif italic tracking-normal normal-case text-lg",
                                                        template === "style-3" && "h-16 md:h-20 w-full rounded-none bg-primary text-primary-foreground hover:translate-x-2 hover:-translate-y-2 shadow-[4px_4px_0_0_rgba(0,0,0,1)] active:shadow-none active:translate-x-0 active:translate-y-0"
                                                    )}
                                                >
                                                    {loading ? <Loader2 className="w-5 h-5 md:w-6 md:h-6 animate-spin" /> : (
                                                        <span className="flex items-center justify-center gap-3">
                                                            {buttonText}
                                                            {template !== "style-2" && <ArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover/btn:translate-x-2" />}
                                                        </span>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                    {template !== "style-2" && (
                                        <div className={cn(
                                            "flex flex-col gap-4 md:gap-6",
                                            template === "style-3" ? "items-start" : "items-center"
                                        )}>
                                            <div className={cn(
                                                "flex items-center gap-3 md:gap-4 text-[9px] md:text-[10px] uppercase text-muted-foreground/40",
                                                template === "style-3" ? "font-mono font-bold" : "font-black tracking-[0.4em]"
                                            )}>
                                                {template !== "style-3" && <div className="h-px w-6 md:w-8 bg-primary/10" />}
                                                <span>Join 10,000+ Visionaries</span>
                                                {template !== "style-3" && <div className="h-px w-6 md:w-8 bg-primary/10" />}
                                                {template === "style-3" && <div className="h-2 w-2 bg-primary ml-2 animate-bounce" />}
                                            </div>

                                            <div className="flex items-center gap-2 group cursor-help">
                                                <Sparkles className="h-3 w-3 text-primary animate-pulse" />
                                                <span className={cn(
                                                    "text-[9px] md:text-[10px] transition-colors group-hover:text-primary",
                                                    template === "style-3" ? "font-mono font-bold" : "font-bold text-muted-foreground/60"
                                                )}>Weekly insights, curated for you.</span>
                                            </div>
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xs md:text-sm text-destructive font-black tracking-tight">
                                            {errorMessage}
                                        </motion.p>
                                    )}
                                </form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </motion.div>
        </SectionLayout>
    );
}
