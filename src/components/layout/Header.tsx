import React from "react";
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
import { Menu, LogIn, UserPlus, User, LogOut } from "lucide-react"; // Import icons

const Header = () => {
  // Placeholder for authentication state
  const isAuthenticated = false; // Ganti dengan state autentikasi sebenarnya

  const handleLogout = () => {
    console.log("User logged out");
    // Implementasi logout akan ditambahkan di sini
    // Misalnya: auth.logout();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <Link to="/" className="text-xl md:text-2xl font-extrabold tracking-tight text-primary transition-colors duration-200">
          EduSprout
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/events" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
            Event
          </Link>
          <Link to="/scholarships" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
            Beasiswa
          </Link>
          <Link to="/jobs" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
            Lowongan
          </Link>
          <Link to="/news-and-tips" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
            Berita & Tips
          </Link>
          {/* Removed Kontak Link */}
          {/* Dropdown untuk Login/Daftar atau Profil/Logout */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-4">
                <User className="h-5 w-5" />
                <span className="sr-only">Menu Pengguna</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {!isAuthenticated ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/login">
                      <LogIn className="mr-2 h-4 w-4" /> Masuk
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/signup">
                      <UserPlus className="mr-2 h-4 w-4" /> Daftar
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" /> Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Keluar
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 pt-6">
                <Link to="/events" className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                  Event
                </Link>
                <Link to="/scholarships" className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                  Beasiswa
                </Link>
                <Link to="/jobs" className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                  Lowongan
                </Link>
                <Link to="/news-and-tips" className="text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                  Berita & Tips
                </Link>
                {/* Removed Kontak Link */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start text-lg font-medium text-foreground/80 hover:text-primary transition-colors duration-200">
                      <User className="mr-2 h-5 w-5" /> Akun
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    {!isAuthenticated ? (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/login">
                            <LogIn className="mr-2 h-4 w-4" /> Masuk
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/signup">
                            <UserPlus className="mr-2 h-4 w-4" /> Daftar
                          </Link>
                        </DropdownMenuItem>
                      </>
                    ) : (
                      <>
                        <DropdownMenuItem asChild>
                          <Link to="/profile">
                            <User className="mr-2 h-4 w-4" /> Profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" /> Keluar
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;