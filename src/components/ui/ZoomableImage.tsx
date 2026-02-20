import { useState } from "react";
import { ZoomIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Lightbox } from "./Lightbox";

interface ZoomableImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    className?: string;
    containerClassName?: string;
}

export function ZoomableImage({ className, containerClassName, alt, src, ...props }: ZoomableImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [error, setError] = useState(false);

    if (!src && !error) return null;

    if (error) {
        return (
            <div className={cn("bg-muted flex items-center justify-center text-muted-foreground p-8 min-h-[200px] w-full h-full", className, containerClassName)}>
                <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-black/5 flex items-center justify-center mx-auto">
                        <ZoomIn className="w-6 h-6 opacity-20" />
                    </div>
                    <p className="text-xs font-medium opacity-50 uppercase tracking-widest">Image unavailable</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div
                className={cn("relative group cursor-zoom-in block", containerClassName)}
                onClick={() => setIsOpen(true)}
            >
                <img
                    src={src}
                    alt={alt || "Image"}
                    onError={() => setError(true)}
                    className={cn("transition-all duration-300 group-hover:brightness-90", className)}
                    {...props}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-black/50 text-white p-2 rounded-full backdrop-blur-sm">
                        <ZoomIn className="w-6 h-6" />
                    </div>
                </div>
            </div>

            <Lightbox
                src={src || null}
                alt={alt}
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
            />
        </>
    );
}
