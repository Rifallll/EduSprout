/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';
import { useNotifications } from './NotificationContext';

export interface ApplicationItem {
    id: string;
    jobTitle: string;
    company: string;
    location: string;
    dateApplied: string;
    status: 'sent' | 'viewed' | 'interview' | 'rejected';
    link: string;
}

interface ApplicationContextType {
    applications: ApplicationItem[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    addApplication: (job: any) => void;
    hasApplied: (jobId: string) => boolean;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplications = () => {
    const context = useContext(ApplicationContext);
    if (!context) {
        throw new Error('useApplications must be used within a ApplicationProvider');
    }
    return context;
};

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [applications, setApplications] = useState<ApplicationItem[]>([]);

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('edusprout_applications');
        if (saved) {
            try {
                setApplications(JSON.parse(saved));
            } catch {
                // Silently handle JSON parse error
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('edusprout_applications', JSON.stringify(applications));
    }, [applications]);

    const { addNotification } = useNotifications();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const addApplication = (job: any) => {
        if (applications.some(app => app.id === job.id)) return;

        const newApplication: ApplicationItem = {
            id: job.id,
            jobTitle: job.title,
            company: job.company || "Unknown Company",
            location: job.location || "Remote",
            dateApplied: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
            status: 'sent',
            link: `/jobs/${job.id}`
        };

        setApplications(prev => [newApplication, ...prev]);
        toast.success("Lamaran Terkirim!", {
            description: `Semoga sukses untuk posisi ${job.title} di ${job.company}!`
        });
        addNotification(
            "Lamaran Terkirim! 🚀",
            `Kamu telah melamar posisi ${job.title} di ${job.company}. Cek statusnya di Dashboard.`,
            'success',
            '/dashboard'
        );
    };

    const hasApplied = (jobId: string) => {
        return applications.some(app => app.id === jobId);
    };

    return (
        <ApplicationContext.Provider value={{ applications, addApplication, hasApplied }}>
            {children}
        </ApplicationContext.Provider>
    );
};
