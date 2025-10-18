import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, X } from "lucide-react"; // Import X icon for Twitter

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 py-12 border-t border-border"> {/* Changed background, text color, and border */}
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1: Brand Info & Social Media */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="text-3xl font-extrabold text-primary mb-4">
            EduSprout
          </Link>
          <p className="text-sm text-gray-400 mb-6 max-w-xs"> {/* Adjusted text color */}
            EduSprout adalah platform informasi dan pengembangan diri terbesar untuk mahasiswa dan pelajar di Indonesia. Kami menghubungkan Anda dengan event, beasiswa, lowongan, dan banyak lagi.
          </p>
          <div className="flex space-x-4">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <X size={20} /> {/* Using X for Twitter */}
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Instagram size={20} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Linkedin size={20} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Column 2: Tentang Kami */}
        <nav className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-lg font-semibold mb-3">Tentang Kami</h3>
          <Link to="/contact" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Hubungi Kami
          </Link>
          <Link to="/help-center" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Pusat Bantuan
          </Link>
          <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Kebijakan Privasi
          </Link>
          <Link to="/terms-and-conditions" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Syarat & Ketentuan
          </Link>
        </nav>

        {/* Column 3: Pencari Kerja */}
        <nav className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-lg font-semibold mb-3">Pencari Kerja</h3>
          <Link to="/signup" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Registrasi Pencari Kerja
          </Link>
          <Link to="/resume-builder" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Buat Resume Online
          </Link>
          <Link to="/events" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Event
          </Link>
          <Link to="/scholarships" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Beasiswa
          </Link>
          <Link to="/jobs" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Lowongan
          </Link>
          <Link to="/news-and-tips" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Berita & Tips
          </Link>
        </nav>

        {/* Column 4: Perusahaan */}
        <nav className="flex flex-col items-center md:items-start gap-3">
          <h3 className="text-lg font-semibold mb-3">Perusahaan</h3>
          <Link to="/company-registration" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Registrasi Perusahaan
          </Link>
          <Link to="/post-job" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Pasang Loker
          </Link>
          <Link to="/products-and-services" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Produk dan Layanan
          </Link>
          <Link to="/pricing" className="text-sm text-gray-400 hover:text-primary transition-colors"> {/* Adjusted text color */}
            Harga
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;