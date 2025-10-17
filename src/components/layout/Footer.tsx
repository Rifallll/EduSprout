import React from "react";
import { Link } from "react-router-dom";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"; // Import social media icons

const Footer = () => {
  return (
    <footer className="border-t bg-background py-8 mt-12">
      <div className="container flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="text-2xl font-bold text-foreground mb-2">
            EduSprout
          </Link>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EduSprout. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-lg font-semibold mb-2">Tautan Cepat</h3>
          <Link to="/events" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Event
          </Link>
          <Link to="/scholarships" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Beasiswa
          </Link>
          <Link to="/jobs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Lowongan
          </Link>
          <Link to="/news-and-tips" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Berita & Tips
          </Link>
          <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Kontak
          </Link>
        </nav>

        {/* Legal Links */}
        <nav className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-lg font-semibold mb-2">Informasi</h3>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Kebijakan Privasi
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Syarat & Ketentuan
          </a>
        </nav>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
      <MadeWithDyad />
    </footer>
  );
};

export default Footer;