import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, GraduationCap } from "lucide-react"; // Only keep used icons

import { useGamification } from "@/context/GamificationContext";
import XPProgressBar from "@/components/gamification/XPProgressBar";
import NotificationDropdown from "./NotificationDropdown";

const Header = () => {
  const { progress } = useGamification();

  return (
    <header className="fixed top-0 z-50 w-full glass border-b border-white/10 text-foreground transition-all duration-300">
      <div className="container flex h-20 items-center justify-between px-6">
        <Link to="/" className="text-2xl font-black tracking-tighter text-white transition-all hover:opacity-80 flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-primary">EduSprout</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/events" className="text-sm font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-widest">
            Event & Lomba
          </Link>
          <Link to="/scholarships" className="text-sm font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-widest">
            Beasiswa
          </Link>
          <Link to="/jobs" className="text-sm font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-widest">
            Karir
          </Link>
          <Link to="/news-and-tips" className="text-sm font-bold text-white/80 hover:text-primary transition-colors uppercase tracking-widest">
            Berita
          </Link>

          {/* XP Progress Bar */}
          <XPProgressBar />

          <Link to="/dashboard">
            <Button variant="outline" className="rounded-full border-white/10 text-white hover:bg-violet-500 hover:text-white hover:border-violet-500 transition-all">
              Dashboard
            </Button>
          </Link>


          <NotificationDropdown />
        </nav>

        <div className="md:hidden flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Buka Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="glass-dark border-white/10 text-white w-[300px]">
              <nav className="flex flex-col gap-6 pt-12">
                <Link to="/events" className="text-xl font-bold hover:text-primary transition-colors">
                  Event & Lomba
                </Link>
                <Link to="/scholarships" className="text-xl font-bold hover:text-primary transition-colors">
                  Beasiswa
                </Link>
                <Link to="/jobs" className="text-xl font-bold hover:text-primary transition-colors">
                  Karir
                </Link>
                <Link to="/news-and-tips" className="text-xl font-bold hover:text-primary transition-colors">
                  Berita & Tips
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;