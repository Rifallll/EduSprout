import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

// Define types for bookmarkable items
export type BookmarkType = 'job' | 'scholarship';

export interface BookmarkedItem {
    id: string;
    type: BookmarkType;
    title: string;
    subtitle?: string; // Company or Organizer
    location?: string;
    link?: string; // Original link or internal route
    date?: string; // Posted date or Deadline
    data: any; // Store full object for easy restoration
}

interface BookmarkContextType {
    savedJobs: BookmarkedItem[];
    savedScholarships: BookmarkedItem[];
    addBookmark: (item: BookmarkedItem) => void;
    removeBookmark: (id: string, type: BookmarkType) => void;
    isBookmarked: (id: string, type: BookmarkType) => boolean;
    toggleBookmark: (item: BookmarkedItem) => void;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

export const useBookmarks = () => {
    const context = useContext(BookmarkContext);
    if (!context) {
        throw new Error('useBookmarks must be used within a BookmarkProvider');
    }
    return context;
};

interface BookmarkProviderProps {
    children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
    const [savedJobs, setSavedJobs] = useState<BookmarkedItem[]>([]);
    const [savedScholarships, setSavedScholarships] = useState<BookmarkedItem[]>([]);

    // Load from localStorage on mount
    useEffect(() => {
        const loadedJobs = localStorage.getItem('edusprout_saved_jobs');
        const loadedScholarships = localStorage.getItem('edusprout_saved_scholarships');

        if (loadedJobs) setSavedJobs(JSON.parse(loadedJobs));
        if (loadedScholarships) setSavedScholarships(JSON.parse(loadedScholarships));
    }, []);

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('edusprout_saved_jobs', JSON.stringify(savedJobs));
    }, [savedJobs]);

    useEffect(() => {
        localStorage.setItem('edusprout_saved_scholarships', JSON.stringify(savedScholarships));
    }, [savedScholarships]);

    const addBookmark = (item: BookmarkedItem) => {
        if (item.type === 'job') {
            if (!savedJobs.some((j) => j.id === item.id)) {
                setSavedJobs((prev) => [...prev, item]);
                toast.success('Lowongan berhasil disimpan', {
                    description: `${item.title} telah ditambahkan ke daftar simpanan.`,
                });
            }
        } else {
            if (!savedScholarships.some((s) => s.id === item.id)) {
                setSavedScholarships((prev) => [...prev, item]);
                toast.success('Beasiswa berhasil disimpan', {
                    description: `${item.title} telah ditambahkan ke daftar simpanan.`,
                });
            }
        }
    };

    const removeBookmark = (id: string, type: BookmarkType) => {
        if (type === 'job') {
            setSavedJobs((prev) => prev.filter((item) => item.id !== id));
            toast.info('Lowongan dihapus dari simpanan');
        } else {
            setSavedScholarships((prev) => prev.filter((item) => item.id !== id));
            toast.info('Beasiswa dihapus dari simpanan');
        }
    };

    const isBookmarked = (id: string, type: BookmarkType) => {
        if (type === 'job') {
            return savedJobs.some((item) => item.id === id);
        } else {
            return savedScholarships.some((item) => item.id === id);
        }
    };

    const toggleBookmark = (item: BookmarkedItem) => {
        if (isBookmarked(item.id, item.type)) {
            removeBookmark(item.id, item.type);
        } else {
            addBookmark(item);
        }
    };

    return (
        <BookmarkContext.Provider
            value={{
                savedJobs,
                savedScholarships,
                addBookmark,
                removeBookmark,
                isBookmarked,
                toggleBookmark,
            }}
        >
            {children}
        </BookmarkContext.Provider>
    );
};
