import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"; // Import social media icons

const Footer = () => {
  return (
    <footer className="border-t border-gray-700 bg-black text-white py-8"> {/* Changed bg to black, text to white, and border color */}
      <div className="container flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="text-2xl font-bold text-white mb-2"> {/* Changed text-foreground to text-white */}
            EduSprout
          </Link>
          <p className="text-sm text-gray-400"> {/* Changed text-muted-foreground to text-gray-400 */}
            &copy; {new Date().getFullYear()} EduSprout. All rights reserved.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-lg font-semibold mb-2">Tautan Cepat</h3>
          <Link to="/events" className="text-sm text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Event
          </Link>
          <Link to="/scholarships" className="text-sm text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Beasiswa
          </Link>
          <Link to="/jobs" className="text-sm text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Lowongan
          </Link>
          <Link to="/news-and-tips" className="text-sm text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Berita & Tips
          </Link>
          {/* Removed Kontak Link */}
        </nav>

        {/* Legal Links */}
        <nav className="flex flex-col items-center md:items-start gap-2">
          <h3 className="text-lg font-semibold mb-2">Informasi</h3>
          <a href="#" className="text-sm text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Kebijakan Privasi
          </a>
          <a href="#" className="text-sm text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Syarat & Ketentuan
          </a>
        </nav>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Facebook size={24} /> {/* Increased icon size */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Instagram size={24} /> {/* Increased icon size */}
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Twitter size={24} /> {/* Increased icon size */}
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Linkedin size={24} /> {/* Increased icon size */}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;