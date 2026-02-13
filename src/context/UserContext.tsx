import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

export interface UserProfile {
    name: string;
    university: string;
    major: string;
    semester: string;
    bio: string;
    avatarUrl?: string; // Optional, maybe allow uploading later or picking from presets
}

interface UserContextType {
    user: UserProfile;
    updateUser: (data: Partial<UserProfile>) => void;
}

const defaultUser: UserProfile = {
    name: "Rifal Azhar",
    university: "Universitas Indonesia",
    major: "Ilmu Komputer",
    semester: "5",
    bio: "Passionate learner aiming for full-stack excellence.",
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<UserProfile>(defaultUser);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('edusprout_user_profile');
        if (saved) {
            try {
                setUser({ ...defaultUser, ...JSON.parse(saved) });
            } catch {
                // Silently handle JSON parse error - use default user profile
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('edusprout_user_profile', JSON.stringify(user));
    }, [user]);

    const updateUser = (data: Partial<UserProfile>) => {
        setUser(prev => {
            const updated = { ...prev, ...data };
            toast.success("Profil Diperbarui", {
                description: "Perubahan profil Anda telah disimpan."
            });
            return updated;
        });
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};
