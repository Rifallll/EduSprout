import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import {
    Search,
    Calendar,
    GraduationCap,
    Briefcase,
    Newspaper,
    Phone,
    Home,
} from "lucide-react";

const SearchCommand = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = (command: () => void) => {
        setOpen(false);
        command();
    };

    return (
        <CommandDialog open={open} onOpenChange={setOpen}>
            <CommandInput placeholder="Cari layanan, berita, atau event..." />
            <CommandList className="glass-dark border-none">
                <CommandEmpty>Hasil tidak ditemukan.</CommandEmpty>
                <CommandGroup heading="Navigasi">
                    <CommandItem onSelect={() => runCommand(() => navigate("/"))}>
                        <Home className="mr-2 h-4 w-4" />
                        <span>Beranda</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate("/events"))}>
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Event & Lomba</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate("/scholarships"))}>
                        <GraduationCap className="mr-2 h-4 w-4" />
                        <span>Info Beasiswa</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate("/jobs"))}>
                        <Briefcase className="mr-2 h-4 w-4" />
                        <span>Cari Karir</span>
                    </CommandItem>
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="Lainnya">
                    <CommandItem onSelect={() => runCommand(() => navigate("/news-and-tips"))}>
                        <Newspaper className="mr-2 h-4 w-4" />
                        <span>Berita & Tips</span>
                    </CommandItem>
                    <CommandItem onSelect={() => runCommand(() => navigate("/contact"))}>
                        <Phone className="mr-2 h-4 w-4" />
                        <span>Hubungi Kami</span>
                    </CommandItem>
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
};

export default SearchCommand;
