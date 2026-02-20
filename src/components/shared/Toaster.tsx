import { useToast, dismiss } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react"

const variantStyles = {
    default: "bg-background border text-foreground",
    success: "bg-green-950 border-green-800 text-green-100",
    error: "bg-red-950 border-red-800 text-red-100",
    warning: "bg-yellow-950 border-yellow-800 text-yellow-100",
}

const variantIcons = {
    default: <Info className="h-4 w-4 shrink-0 text-muted-foreground" />,
    success: <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" />,
    error: <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />,
    warning: <AlertCircle className="h-4 w-4 shrink-0 text-yellow-400" />,
}

export function Toaster() {
    const { toasts } = useToast()

    return (
        <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
            {toasts.map(t => (
                <div
                    key={t.id}
                    className={cn(
                        "pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all animate-in slide-in-from-bottom-2 fade-in-0",
                        variantStyles[t.variant ?? "default"]
                    )}
                >
                    {variantIcons[t.variant ?? "default"]}
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold leading-tight">{t.title}</p>
                        {t.description && (
                            <p className="text-xs mt-0.5 opacity-80">{t.description}</p>
                        )}
                    </div>
                    <button
                        onClick={() => dismiss(t.id)}
                        className="shrink-0 opacity-60 hover:opacity-100 transition-opacity"
                    >
                        <X className="h-3.5 w-3.5" />
                    </button>
                </div>
            ))}
        </div>
    )
}
