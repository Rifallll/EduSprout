import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Share2, ExternalLink, Clock, Tag } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import dummyEvents from "@/data/dummyEvents.json";

const EventDetailPage = () => {
    const { slug } = useParams();

    // Find event by matching link or ID (for flexibility)
    const event = dummyEvents.find(e =>
        e.link === `/events/${slug}` || e.id === slug
    );

    if (!event) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 text-center">
                <h1 className="text-4xl font-bold text-white mb-4">Event Tidak Ditemukan</h1>
                <p className="text-zinc-400 mb-8 max-w-md">
                    Maaf, event yang Anda cari mungkin sudah berakhir atau tautannya salah.
                </p>
                <Link to="/events">
                    <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white border-0">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali ke Daftar Event
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-12">
            <div className="container px-4 sm:px-6 mx-auto max-w-5xl">
                {/* Back Link */}
                <Link
                    to="/events"
                    className="inline-flex items-center text-zinc-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Kembali ke Event
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Header Image / Gradient Placeholder */}
                        <div className="w-full h-64 sm:h-80 rounded-3xl overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 via-fuchsia-900/40 to-background z-0" />
                            <div className="absolute inset-0 bg-zinc-900/50 flex items-center justify-center">
                                {/* If we had real images, we'd render <img /> here. For now, use a decorative pattern or icon */}
                                <Calendar className="h-24 w-24 text-white/10 group-hover:text-white/20 transition-colors duration-500" />
                            </div>
                            <div className="absolute top-4 right-4 z-10">
                                <Badge className="bg-violet-500/20 text-violet-200 border-violet-500/30 hover:bg-violet-500/30 backdrop-blur-md px-4 py-1.5 text-sm font-medium">
                                    {event.category}
                                </Badge>
                            </div>
                        </div>

                        {/* Event Title & Info */}
                        <div className="space-y-4">
                            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
                                {event.title}
                            </h1>
                            <div className="flex flex-wrap gap-4 text-zinc-400 text-sm sm:text-base">
                                <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-4 py-1.5">
                                    <Calendar className="h-4 w-4 text-fuchsia-400" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 border border-white/5 rounded-full px-4 py-1.5">
                                    <MapPin className="h-4 w-4 text-violet-400" />
                                    <span>{event.location}</span>
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="glass p-8 rounded-3xl border-white/5 space-y-6">
                            <h2 className="text-xl font-bold text-white">Deskripsi Event</h2>
                            <div className="prose prose-invert prose-p:text-zinc-300 prose-headings:text-white max-w-none">
                                <p className="text-lg leading-relaxed">{event.description}</p>
                                <p className="text-zinc-400">
                                    Bergabunglah dengan kami dalam acara yang luar biasa ini. Dapatkan wawasan berharga, jaringan baru, dan pengalaman yang tak terlupakan. Jangan lewatkan kesempatan untuk mengembangkan diri Anda.
                                </p>
                                {/* Dummy additional content */}
                                <h3 className="text-lg font-semibold text-white mt-6">Apa yang akan Anda dapatkan?</h3>
                                <ul className="list-disc pl-5 space-y-2 text-zinc-300">
                                    <li>Sertifikat elektronik resmi</li>
                                    <li>Materi presentasi eksklusif</li>
                                    <li>Kesempatan networking dengan profesional</li>
                                    <li>Sesi tanya jawab langsung</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Actions */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="glass sticky top-24 p-6 rounded-3xl border-white/5 space-y-6">
                            <div className="text-center space-y-2">
                                <h3 className="text-lg font-bold text-white">Tertarik Mengikuti?</h3>
                                <p className="text-sm text-zinc-400">Daftar sekarang sebelum kuota habis!</p>
                            </div>

                            <Button className="w-full bg-white text-zinc-900 hover:bg-zinc-200 font-semibold h-12 text-base shadow-lg shadow-white/5">
                                Daftar Sekarang
                            </Button>

                            <div className="grid grid-cols-2 gap-3">
                                <Button variant="outline" className="w-full border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white">
                                    <Share2 className="mr-2 h-4 w-4" /> Share
                                </Button>
                                <Button variant="outline" className="w-full border-white/10 text-zinc-300 hover:bg-white/5 hover:text-white">
                                    <Clock className="mr-2 h-4 w-4" /> Remind
                                </Button>
                            </div>

                            <div className="border-t border-white/10 pt-6">
                                <h4 className="text-sm font-medium text-white mb-4">Informasi Tambahan</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Penyelenggara</span>
                                        <span className="text-zinc-300 font-medium text-right">EduSprout Official</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Biaya</span>
                                        <span className="text-green-400 font-medium">Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-zinc-500">Kuota</span>
                                        <span className="text-zinc-300">Terbatas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetailPage;
