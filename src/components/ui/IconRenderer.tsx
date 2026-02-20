import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

interface IconRendererProps {
    name: string;
    className?: string;
    size?: number | string;
    strokeWidth?: number;
}

export function IconRenderer({ name, className, size = 24, strokeWidth = 2 }: IconRendererProps) {
    const IconComponent = (Icons as any)[name];

    if (!IconComponent) {
        // Fallback to a default icon if not found
        const HelpCircle = Icons.HelpCircle;
        return <HelpCircle className={cn("text-muted-foreground/50", className)} size={size} strokeWidth={strokeWidth} />;
    }

    return <IconComponent className={className} size={size} strokeWidth={strokeWidth} />;
}
