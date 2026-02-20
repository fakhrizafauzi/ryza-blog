import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionLayout } from "./SectionLayout";
import { ArrowUpRight } from "lucide-react";

interface CardItem { title: string; description?: string; image?: string; link?: string; badge?: string; }
interface CardGridSectionContent {
    heading?: string;
    subheading?: string;
    cards?: CardItem[];
    columns?: 2 | 3 | 4;
    template?: string;
}

export function CardGridSection({ content }: { content: CardGridSectionContent }) {
    const cards = content.cards || [];
    const cols = content.columns || 3;
    const template = content.template || "style-1";

    const gridClass = {
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-2 lg:grid-cols-4",
    }[cols as 2 | 3 | 4] || "grid-cols-1 md:grid-cols-3";

    return (
        <SectionLayout width="wide" padding="lg" align="center">
            <div className="relative w-full">
                {/* Header */}
                {(content.heading || content.subheading) && (
                    <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto px-4">
                        {content.heading && (
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="text-4xl md:text-7xl font-black tracking-tighter mb-6"
                            >
                                {content.heading}
                            </motion.h2>
                        )}
                        {content.subheading && (
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.1 }}
                                className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto"
                            >
                                {content.subheading}
                            </motion.p>
                        )}
                    </div>
                )}

                {/* Grid */}
                <div className={cn("grid gap-8 md:gap-10", gridClass)}>
                    {cards.map((card, i) => (
                        <GridCard key={i} card={card} index={i} template={template} />
                    ))}
                </div>
            </div>
        </SectionLayout>
    );
}

function GridCard({ card, index, template }: { card: CardItem; index: number; template: string }) {
    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
    };

    if (template === "style-2") {
        // STYLE 2: Minimalist Portfolio Style
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                variants={cardVariants}
                className="group cursor-pointer"
            >
                {card.image && (
                    <div className="aspect-square relative overflow-hidden rounded-2xl mb-6">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <ArrowUpRight className="text-white h-12 w-12" />
                        </div>
                    </div>
                )}
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{card.description}</p>
            </motion.div>
        );
    }

    if (template === "style-3") {
        // STYLE 3: Full Width / Horizontal Flex (In a grid this would be interesting)
        return (
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                variants={cardVariants}
                className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
                {card.image && <img src={card.image} alt={card.title} className="w-full md:w-32 h-32 object-cover rounded-xl shrink-0" />}
                <div className="flex flex-col justify-center">
                    <h3 className="text-lg font-black tracking-tight mb-2 uppercase">{card.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{card.description}</p>
                    <a href={card.link} className="text-primary text-[10px] font-black tracking-[0.2em] uppercase flex items-center gap-2">
                        View Project <ArrowUpRight size={12} />
                    </a>
                </div>
            </motion.div>
        );
    }

    // DEFAULT STYLE 1: Glassmorphism Card
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            variants={cardVariants}
            className="group relative flex flex-col rounded-[2.5rem] bg-card/40 backdrop-blur-3xl border border-primary/10 overflow-hidden shadow-2xl hover:border-primary/30 transition-all duration-700"
        >
            {card.image && (
                <div className="aspect-[16/10] overflow-hidden relative">
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                </div>
            )}
            <div className="p-8 md:p-10 flex flex-col flex-grow">
                <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tighter leading-tight group-hover:text-primary transition-colors">
                    {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed font-light mb-8 line-clamp-3">
                    {card.description}
                </p>
                {card.link && (
                    <a href={card.link} className="mt-auto inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-primary">
                        Details <ArrowUpRight size={14} />
                    </a>
                )}
            </div>
        </motion.div>
    );
}
