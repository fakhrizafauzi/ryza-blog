import {
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    getDoc,
    getDocs,
    doc,
    query,
    orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import type { Author } from "@/types/blog";

export async function createAuthor(data: Omit<Author, "id">): Promise<string> {
    const ref = await addDoc(collection(db, "authors"), {
        ...data,
        createdAt: Date.now(),
    });
    return ref.id;
}

export async function updateAuthor(id: string, data: Partial<Author>): Promise<void> {
    const ref = doc(db, "authors", id);
    await updateDoc(ref, {
        ...data,
        // updatedAt: Date.now(), // Optional if we want to track updates
    });
}

export async function deleteAuthor(id: string): Promise<void> {
    await deleteDoc(doc(db, "authors", id));
}

export async function getAuthorById(id: string): Promise<Author | null> {
    const snap = await getDoc(doc(db, "authors", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Author;
}

export async function getAuthors(): Promise<Author[]> {
    const q = query(collection(db, "authors"), orderBy("name"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    } as Author));
}
