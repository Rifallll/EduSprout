import React from 'react';
import { Bell, Check, Trash2, Info, Trophy, AlertTriangle, CheckCircle, ArrowUpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNotifications, NotificationType } from "@/context/NotificationContext";
import { Link } from 'react-router-dom';
import { Badge } from "@/components/ui/badge";

const NotificationDropdown = () => {
    const { notifications, unreadCount, markAsRead, markAllAsRead, clearAll } = useNotifications();

    const getIcon = (type: NotificationType) => {
        switch (type) {
            case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
            case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
            case 'error': return <AlertTriangle className="h-4 w-4 text-red-400" />;
            case 'achievement': return <Trophy className="h-4 w-4 text-yellow-400" />;
            case 'level-up': return <ArrowUpCircle className="h-4 w-4 text-violet-400" />;
            default: return <Info className="h-4 w-4 text-blue-400" />;
        }
    };

    const formatTime = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;

        if (diff < 60000) return 'Baru saja';
        if (diff < 3600000) return `${Math.floor(diff / 60000)} menit lalu`;
        if (diff < 86400000) return `${Math.floor(diff / 3600000)} jam lalu`;
        return new Date(timestamp).toLocaleDateString();
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative text-white hover:bg-white/10">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-red-500 border border-zinc-900 animate-pulse" />
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[380px] bg-zinc-950/95 backdrop-blur-xl border-white/10 text-white p-0">
                <div className="flex items-center justify-between p-4 border-b border-white/10">
                    <h4 className="font-bold text-sm">Notifikasi {unreadCount > 0 && `(${unreadCount})`}</h4>
                    <div className="flex gap-1">
                        {unreadCount > 0 && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-white" onClick={markAllAsRead} title="Tandai semua dibaca">
                                <Check className="h-3.5 w-3.5" />
                            </Button>
                        )}
                        {notifications.length > 0 && (
                            <Button variant="ghost" size="icon" className="h-6 w-6 text-zinc-400 hover:text-red-400" onClick={clearAll} title="Hapus semua">
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        )}
                    </div>
                </div>

                <div className="h-[400px] overflow-y-auto pr-2">
                    {notifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-zinc-500">
                            <Bell className="h-8 w-8 mb-2 opacity-20" />
                            <p className="text-sm">Belum ada notifikasi</p>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={`relative flex gap-3 p-4 hover:bg-white/5 transition-colors cursor-pointer border-b border-white/5 last:border-0 ${!notif.isRead ? 'bg-violet-500/5' : ''}`}
                                    onClick={() => markAsRead(notif.id)}
                                >
                                    <div className="mt-1 shrink-0">
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <p className={`text-sm font-medium leading-none ${!notif.isRead ? 'text-white' : 'text-zinc-400'}`}>
                                                {notif.title}
                                            </p>
                                            <span className="text-[10px] text-zinc-500 ml-2 whitespace-nowrap">
                                                {formatTime(notif.timestamp)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-zinc-400 leading-snug line-clamp-2">
                                            {notif.message}
                                        </p>
                                        {notif.link && (
                                            <Link to={notif.link} className="inline-block mt-2">
                                                <Badge variant="outline" className="text-[10px] border-violet-500/30 text-violet-300 hover:bg-violet-500/20">
                                                    Lihat Detail
                                                </Badge>
                                            </Link>
                                        )}
                                    </div>
                                    {!notif.isRead && (
                                        <div className="absolute top-4 right-2 w-1.5 h-1.5 rounded-full bg-violet-500" />
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default NotificationDropdown;
