import { motion } from "framer-motion";
import { Check, Zap, ArrowRight } from "lucide-react";
import { SectionLayout } from "./SectionLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PricingPlan {
    name: string;
    price: string;
    period?: string;
    description?: string;
    features: string[];
    highlight?: boolean;
    ctaText?: string;
}

interface PricingSectionContent {
    heading?: string;
    subheading?: string;
    plans?: PricingPlan[];
    template?: string;
}

export function PricingSection({ content }: { content: PricingSectionContent }) {
    const plans = content.plans || [];
    const template = content.template || "style-1";

    const displayPlans = plans.length > 0 ? plans : [
        {
            name: "Starter",
            price: "$29",
            period: "/mo",
            description: "Perfect for individuals.",
            features: ["5 Projects", "Basic Analytics", "e-mail Support"],
            ctaText: "Get Started"
        },
        {
            name: "Pro",
            price: "$79",
            period: "/mo",
            description: "Best for growing teams.",
            features: ["Unlimited Projects", "Advanced Analytics", "Priority Support", "Team Collaboration"],
            highlight: true,
            ctaText: "Go Pro"
        },
        {
            name: "Enterprise",
            price: "Custom",
            description: "For large scale organizations.",
            features: ["SSO & Security", "Custom Integrations", "Dedicated Manager", "SLA"],
            ctaText: "Contact Sales"
        }
    ];

    if (template === "style-4") {
        // STYLE 4: Swiss Grid Pricing
        return (
            <SectionLayout width="full" padding="none" className="bg-background border-b border-border">
                {/* Header Strip */}
                {(content.heading || content.subheading) && (
                    <div className="border-b border-border p-12 md:p-20">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                            <div className="max-w-2xl">
                                {content.heading && (
                                    <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground uppercase leading-[0.9] mb-4">
                                        {content.heading}
                                    </h2>
                                )}
                                {content.subheading && (
                                    <p className="text-lg md:text-xl text-muted-foreground font-mono">
                                        {content.subheading}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
                    {displayPlans.map((plan, i) => (
                        <div key={i} className={cn(
                            "group p-12 md:p-16 flex flex-col h-full hover:bg-muted/30 transition-colors relative",
                            plan.highlight && "bg-muted/10"
                        )}>
                            {plan.highlight && (
                                <div className="absolute top-0 right-0 p-4">
                                    <div className="bg-primary text-primary-foreground text-xs font-bold uppercase tracking-widest px-3 py-1">
                                        Best Value
                                    </div>
                                </div>
                            )}

                            <div className="mb-12">
                                <h3 className="text-2xl font-bold uppercase tracking-widest mb-4 group-hover:text-primary transition-colors">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1 mb-4">
                                    <span className="text-5xl font-mono font-bold tracking-tighter">
                                        {plan.price}
                                    </span>
                                    {plan.period && <span className="text-muted-foreground text-lg">{plan.period}</span>}
                                </div>
                                <p className="text-muted-foreground text-lg leading-relaxed">{plan.description}</p>
                            </div>

                            <div className="flex-1 mb-12">
                                <ul className="space-y-4">
                                    {plan.features.map((feature, f) => (
                                        <li key={f} className="flex items-start gap-3">
                                            <div className="mt-1 w-1.5 h-1.5 bg-primary/50 group-hover:bg-primary transition-colors" />
                                            <span className="text-sm font-medium uppercase tracking-wide opacity-80">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Button
                                variant={plan.highlight ? "default" : "outline"}
                                className="w-full text-base font-bold uppercase tracking-widest py-8 rounded-none border-2 hover:translate-y-[-4px] hover:shadow-lg transition-all"
                            >
                                {plan.ctaText || "Get Started"} <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </div>
            </SectionLayout>
        );
    }

    if (template === "style-5") {
        // STYLE 5: Soft Organic Pricing (High Fidelity)
        return (
            <SectionLayout width="container" padding="lg">
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto relative z-10">
                        {content.heading && (
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground mb-6 drop-shadow-sm">
                                {content.heading}
                            </h2>
                        )}
                        {content.subheading && (
                            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                                {content.subheading}
                            </p>
                        )}
                    </div>
                )}

                <div className="relative">
                    {/* Organic Background Blobs */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none opacity-40 dark:opacity-10">
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-purple-200 dark:bg-purple-900/40 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse" />
                        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-200 dark:bg-indigo-900/40 rounded-full blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-pulse delay-700" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center relative z-10">
                        {displayPlans.map((plan, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -12, scale: 1.02 }}
                                className={cn(
                                    "p-8 md:p-12 rounded-[3.5rem] transition-all duration-500 flex flex-col relative overflow-hidden backdrop-blur-md",
                                    plan.highlight
                                        ? "bg-white/90 dark:bg-zinc-800/90 shadow-2xl shadow-indigo-500/20 border-2 border-primary/20 scale-110 z-20"
                                        : "bg-white/60 dark:bg-zinc-900/60 shadow-lg border border-white/40 dark:border-white/5 hover:bg-white/80 dark:hover:bg-zinc-800/80"
                                )}
                            >
                                {plan.highlight && (
                                    <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/20 blur-[40px] rounded-full pointer-events-none" />
                                )}

                                <div className="mb-8 relative">
                                    <h3 className={cn(
                                        "text-xl font-bold uppercase tracking-wider mb-2",
                                        plan.highlight ? "text-primary" : "text-muted-foreground"
                                    )}>
                                        {plan.name}
                                    </h3>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-6xl md:text-7xl font-black tracking-tighter text-foreground">
                                            {plan.price}
                                        </span>
                                        {plan.period && <span className="opacity-60 text-xl font-medium">{plan.period}</span>}
                                    </div>
                                    <p className="mt-4 text-muted-foreground leading-relaxed font-medium">{plan.description}</p>
                                </div>

                                <ul className="space-y-4 mb-10 flex-1 relative">
                                    {plan.features.map((feature, f) => (
                                        <li key={f} className="flex items-center gap-3">
                                            <div className={cn(
                                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                                plan.highlight ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                                            )}>
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className={cn(
                                                "font-medium",
                                                plan.highlight ? "text-foreground" : "text-muted-foreground"
                                            )}>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Button
                                    className={cn(
                                        "w-full h-16 rounded-[2rem] text-xl font-bold shadow-xl transition-all hover:shadow-2xl hover:scale-[1.02]",
                                        plan.highlight
                                            ? "bg-primary text-primary-foreground shadow-primary/25"
                                            : "bg-white dark:bg-zinc-800 text-foreground border border-transparent hover:border-primary/10"
                                    )}
                                >
                                    {plan.ctaText || "Choose Plan"}
                                </Button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </SectionLayout>
        );
    }

    // Default Styles (1, 2, 3)
    return (
        <SectionLayout
            width="wide"
            padding="lg"
            align="center"
            background={template === "style-3" ? "muted" : "none"}
        >
            <div className="relative w-full z-10">
                {template === "style-1" && (
                    <>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                    </>
                )}

                {(content.heading || content.subheading) && (
                    <div className={cn(
                        "mb-16 md:mb-32 max-w-4xl mx-auto px-4",
                        template === "style-3" ? "text-left" : "text-center"
                    )}>
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "mb-8 leading-[1] md:leading-[0.9] break-words",
                                    template === "style-1" && "text-5xl md:text-8xl font-black tracking-tighter",
                                    template === "style-2" && "text-4xl md:text-6xl font-serif font-light tracking-tight",
                                    template === "style-3" && "text-5xl md:text-7xl font-black uppercase tracking-[0.1em]"
                                )}
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className={cn(
                                    "leading-relaxed max-w-2xl px-4",
                                    template === "style-3" ? "mr-auto" : "mx-auto",
                                    template === "style-1" && "text-lg md:text-2xl text-muted-foreground font-light",
                                    template === "style-2" && "text-base md:text-xl text-muted-foreground font-serif italic",
                                    template === "style-3" && "text-sm md:text-base font-mono uppercase tracking-[0.2em] opacity-60"
                                )}
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn(
                    "grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative",
                    template === "style-2" && "max-w-6xl mx-auto"
                )}>
                    {displayPlans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                            className={cn(
                                "group relative flex flex-col transition-all duration-700",
                                template === "style-1" && "p-10 md:p-12 rounded-[2.5rem] bg-card/40 dark:bg-card/20 backdrop-blur-3xl border border-primary/10 shadow-2xl hover:border-primary/20 hover:shadow-primary/5",
                                template === "style-1" && plan.highlight && "bg-card/60 dark:bg-card/40 border-primary/30 z-10 md:-mt-8 md:-mb-8 shadow-primary/10",
                                template === "style-2" && "p-10 bg-transparent border border-primary/10 h-full hover:border-primary/30",
                                template === "style-2" && plan.highlight && "bg-primary/5 border-primary/20",
                                template === "style-3" && "p-8 border-4 border-primary/10 bg-card hover:border-primary shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] hover:shadow-[12px_12px_0px_0px_rgba(var(--primary),0.2)] hover:-translate-y-1 hover:-translate-x-1"
                            )}
                        >
                            {plan.highlight && template === "style-1" && (
                                <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
                            )}

                            {plan.highlight && template === "style-3" && (
                                <div className="absolute -top-4 -right-4 bg-primary text-primary-foreground px-4 py-1 font-mono text-xs font-bold uppercase tracking-widest border-2 border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)]">
                                    Popular
                                </div>
                            )}

                            <div className="mb-8 md:mb-12">
                                <h3 className={cn(
                                    "transition-colors duration-500",
                                    template === "style-1" && "text-xl font-bold tracking-tight mb-2 group-hover:text-primary",
                                    template === "style-2" && "text-2xl font-serif italic mb-4",
                                    template === "style-3" && "text-lg font-black uppercase tracking-widest mb-4"
                                )}>
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className={cn(
                                        "leading-none transition-all duration-500",
                                        template === "style-1" && "text-5xl md:text-6xl font-black tracking-tighter group-hover:text-primary",
                                        template === "style-2" && "text-5xl font-light font-serif",
                                        template === "style-3" && "text-5xl md:text-6xl font-mono font-bold"
                                    )}>{plan.price}</span>
                                    {plan.period && (
                                        <span className={cn(
                                            "text-muted-foreground",
                                            template === "style-2" && "font-serif italic",
                                            template === "style-3" && "font-mono text-xs"
                                        )}>{plan.period}</span>
                                    )}
                                </div>
                                {plan.description && (
                                    <p className={cn(
                                        "mt-4 text-muted-foreground",
                                        template === "style-2" && "font-serif text-sm",
                                        template === "style-3" && "font-mono text-xs opacity-70"
                                    )}>{plan.description}</p>
                                )}
                            </div>

                            <ul className="space-y-4 md:space-y-5 mb-10 md:mb-12 flex-1">
                                {plan.features.map((feature, f) => (
                                    <li key={f} className="flex items-start gap-3">
                                        <div className={cn(
                                            "mt-1 flex items-center justify-center shrink-0 transition-colors",
                                            template === "style-1" && "w-5 h-5 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground",
                                            template === "style-2" && "text-primary",
                                            template === "style-3" && "w-4 h-4 bg-primary text-primary-foreground"
                                        )}>
                                            {template === "style-1" ? <Check className="w-3 h-3" /> : template === "style-3" ? <Zap className="w-3 h-3 icon-bold" /> : <Check className="w-4 h-4" />}
                                        </div>
                                        <span className={cn(
                                            "text-sm",
                                            template === "style-2" && "font-serif",
                                            template === "style-3" && "font-mono text-xs"
                                        )}>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                size="lg"
                                className={cn(
                                    "w-full transition-all duration-500",
                                    template === "style-1" && "rounded-2xl h-14 text-base font-bold",
                                    template === "style-1" && !plan.highlight && "bg-muted/50 text-foreground hover:bg-primary hover:text-primary-foreground",
                                    template === "style-1" && plan.highlight && "bg-primary text-primary-foreground hover:scale-105 shadow-xl shadow-primary/20",
                                    template === "style-2" && "rounded-none h-12 bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-serif italic text-lg",
                                    template === "style-3" && "rounded-none h-14 border-2 border-primary bg-transparent text-primary hover:bg-primary hover:text-primary-foreground font-mono uppercase tracking-widest font-bold shadow-[4px_4px_0px_0px_rgba(var(--primary),1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1"
                                )}
                            >
                                {plan.ctaText || "Get Started"}
                            </Button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
