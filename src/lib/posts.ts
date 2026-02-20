import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    doc,
} from "firebase/firestore";
import { db } from "./firebase";
import type { BlogPost } from "@/types/blog";

export async function createPost(data: Omit<BlogPost, "id">): Promise<string> {
    const ref = await addDoc(collection(db, "posts"), {
        ...data,
        createdAt: Date.now(),
        updatedAt: Date.now(),
    });
    return ref.id;
}

export async function updatePost(id: string, data: Partial<BlogPost>): Promise<void> {
    const ref = doc(db, "posts", id);
    await updateDoc(ref, {
        ...data,
        updatedAt: Date.now(),
    });
}

export async function deletePost(id: string): Promise<void> {
    await deleteDoc(doc(db, "posts", id));
}

export async function getPostById(id: string): Promise<BlogPost | null> {
    const snap = await getDoc(doc(db, "posts", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as BlogPost;
}

export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
}
