import { useState, useEffect, useCallback } from "react"

export type ToastVariant = "default" | "success" | "error" | "warning"

export interface Toast {
    id: string
    title: string
    description?: string
    variant?: ToastVariant
    duration?: number
}

type ToastListener = (toasts: Toast[]) => void

let toasts: Toast[] = []
const listeners: Set<ToastListener> = new Set()

function notify() {
    listeners.forEach(l => l([...toasts]))
}

export function toast(opts: Omit<Toast, "id">) {
    const id = Math.random().toString(36).slice(2)
    const duration = opts.duration ?? 4000
    toasts = [...toasts, { ...opts, id }]
    notify()
    if (duration > 0) {
        setTimeout(() => dismiss(id), duration)
    }
    return id
}

export function dismiss(id: string) {
    toasts = toasts.filter(t => t.id !== id)
    notify()
}

export function useToast() {
    const [items, setItems] = useState<Toast[]>([...toasts])

    const listener = useCallback((updated: Toast[]) => setItems(updated), [])

    useEffect(() => {
        listeners.add(listener)
        return () => { listeners.delete(listener) }
    }, [listener])

    return { toasts: items, toast, dismiss }
}
