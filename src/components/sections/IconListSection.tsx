import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { Check, Sparkles } from "lucide-react";

interface IconListItem { icon?: string; text: string; description?: string; }
interface IconListSectionContent {
    heading?: string;
    subheading?: string;
    items?: IconListItem[];
    columns?: 1 | 2;
}

export function IconListSection({ content }: { content: IconListSectionContent }) {
    const items = content.items || [];
    const cols = content.columns === 2 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1";

    return (
        <SectionLayout width="narrow" padding="lg">
            <div className="relative">
                {/* Background Decor */}
                <div className="absolute -left-20 -top-20 h-48 w-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="absolute -right-20 bottom-20 h-48 w-48 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />

                {(content.heading || content.subheading) && (
                    <div className="text-center mb-20 max-w-3xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl md:text-6xl font-black tracking-tighter mb-6 leading-[0.9] break-words"
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
                                className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed"
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                <div className={cn("grid gap-6 md:gap-8", cols)}>
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative flex items-start gap-8 p-8 md:p-10 rounded-[2.5rem] bg-card/40 backdrop-blur-3xl border border-primary/10 hover:border-primary/20 transition-all duration-700 hover:scale-[1.02] shadow-xl overflow-hidden"
                        >
                            {/* Inner Decor */}
                            <div className="absolute -right-10 -top-10 h-24 w-24 bg-primary/5 blur-[40px] rounded-full group-hover:bg-primary/10 transition-colors duration-1000" />

                            <div className="relative shrink-0">
                                <div className="absolute -inset-4 bg-primary/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                <div className="relative h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-700 shadow-lg">
                                    {item.icon ? (
                                        <span className="text-2xl">{item.icon}</span>
                                    ) : (
                                        <Check className="h-6 w-6 stroke-[3]" />
                                    )}
                                </div>
                            </div>

                            <div className="relative pt-1">
                                <h3 className="font-black text-xl md:text-2xl tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                                    {item.text}
                                </h3>
                                {item.description && (
                                    <p className="text-lg text-muted-foreground font-light leading-relaxed group-hover:text-foreground/80 transition-colors duration-700">
                                        {item.description}
                                    </p>
                                )}
                            </div>

                            <Sparkles className="absolute top-6 right-6 h-4 w-4 text-primary/0 group-hover:text-primary/20 transition-all duration-1000 transform group-hover:scale-110" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}
