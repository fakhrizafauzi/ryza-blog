import { motion } from "framer-motion";
import { SectionLayout } from "./SectionLayout";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface TableSectionContent {
    heading?: string;
    subheading?: string;
    headers?: string[];
    rows?: Array<{ cells: string[] }>;
    striped?: boolean;
}

export function TableSection({ content }: { content: TableSectionContent }) {
    const headers = content.headers || [];
    const rows = content.rows || [];

    return (
        <SectionLayout width="wide" padding="lg">
            <div className="relative">
                {/* Background Decor */}
                <div className="absolute -left-20 -top-20 h-64 w-64 bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="absolute -right-20 bottom-20 h-64 w-64 bg-primary/2 blur-[80px] rounded-full pointer-events-none" />

                {(content.heading || content.subheading) && (
                    <div className="text-center mb-24 max-w-4xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9] break-words"
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

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative overflow-hidden rounded-[4rem] bg-card/40 backdrop-blur-3xl border border-primary/10 shadow-2xl overflow-x-auto"
                >
                    <table className="w-full border-collapse">
                        {headers.length > 0 && (
                            <thead>
                                <tr className="border-b border-primary/10">
                                    {headers.map((h, i) => (
                                        <th key={i} className="px-12 py-12 text-left">
                                            <div className="flex items-center gap-3">
                                                <div className="h-1 w-4 bg-primary rounded-full" />
                                                <span className="font-black text-[10px] uppercase tracking-[0.4em] text-muted-foreground/60 transition-colors">
                                                    {h}
                                                </span>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                        )}
                        <tbody className="divide-y divide-primary/5">
                            {rows.map((row, i) => (
                                <motion.tr
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.05 }}
                                    className={cn(
                                        "transition-all duration-700 group",
                                        content.striped && i % 2 !== 0 ? "bg-primary/[0.01]" : ""
                                    )}
                                >
                                    {(row.cells || []).map((cell, j) => (
                                        <td key={j} className="px-12 py-10">
                                            <div className="flex items-center gap-4 transition-transform duration-700 group-hover:translate-x-2">
                                                <Sparkles className="h-3 w-3 text-primary/0 group-hover:text-primary transition-all duration-700 -ml-6 group-hover:ml-0" />
                                                <span className="text-lg text-muted-foreground font-light group-hover:text-foreground transition-colors duration-500">
                                                    {cell}
                                                </span>
                                            </div>
                                        </td>
                                    ))}
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Subtle Overlay Pattern */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{ backgroundImage: "radial-gradient(circle at 2px 2px, rgba(var(--primary), 1) 1px, transparent 0)", backgroundSize: "32px 32px" }}
                    />
                </motion.div>
            </div>
        </SectionLayout>
    );
}
