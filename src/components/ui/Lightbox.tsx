import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LightboxProps {
    src: string | null;
    alt?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function Lightbox({ src, alt, isOpen, onClose }: LightboxProps) {
    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", handleEsc);
            document.body.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "unset";
        };
    }, [isOpen, onClose]);

    if (!isOpen || !src) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 text-white/70 hover:text-white hover:bg-white/10 z-50 rounded-full w-12 h-12"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            >
                <X className="w-6 h-6" />
            </Button>

            <img
                src={src}
                alt={alt || "Full screen image"}
                className="max-h-full max-w-full object-contain rounded-sm shadow-2xl scale-100 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            />

            {alt && (
                <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                    <p className="inline-block bg-black/50 backdrop-blur-md text-white/90 px-4 py-2 rounded-lg text-sm font-medium border border-white/10">
                        {alt}
                    </p>
                </div>
            )}
        </div>,
        document.body
    );
}
