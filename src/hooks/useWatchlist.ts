import { useState, useEffect } from 'react';
import { doc, setDoc, deleteDoc, onSnapshot, collection } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useAuth } from '../contexts/useAuth';

export interface WatchlistItem {
    id: number;
    title: string;
    poster_path: string | null;
    media_type: 'movie' | 'tv';
    vote_average: number;
    release_date?: string;
    first_air_date?: string;
}

export const useWatchlist = () => {
    const { currentUser } = useAuth();
    const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!currentUser) { setWatchlist([]); setLoading(false); return; }

        // realtime listener — updates instantly when Firestore changes
        const ref = collection(db, 'watchlists', currentUser.uid, 'items');
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const items = snapshot.docs.map(doc => doc.data() as WatchlistItem);
            setWatchlist(items);
            setLoading(false);
        });

        return unsubscribe;
    }, [currentUser]);

    const addToWatchlist = async (item: WatchlistItem) => {
        if (!currentUser) return;
        const ref = doc(db, 'watchlists', currentUser.uid, 'items', String(item.id));
        // Firestore doesn't accept undefined — replace with null
        const clean = Object.fromEntries(
            Object.entries(item).map(([k, v]) => [k, v ?? null])
        );
        await setDoc(ref, clean);
    };

    const removeFromWatchlist = async (id: number) => {
        if (!currentUser) return;
        const ref = doc(db, 'watchlists', currentUser.uid, 'items', String(id));
        await deleteDoc(ref);
    };

    const isInWatchlist = (id: number) => watchlist.some(item => item.id === id);

    const toggleWatchlist = async (item: WatchlistItem) => {
        if (isInWatchlist(item.id)) {
            await removeFromWatchlist(item.id);
        } else {
            await addToWatchlist(item);
        }
    };

    return { watchlist, loading, addToWatchlist, removeFromWatchlist, isInWatchlist, toggleWatchlist };
};
