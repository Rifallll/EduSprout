import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, X } from "lucide-react"; // Import X icon for Twitter

const Footer = () => {
  return (
    <footer className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-50 z-0 border-t border-white/5"></div>

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
          {/* Column 1: Brand Info & Social Media */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <Link to="/" className="text-4xl font-black text-white hover:text-primary transition-colors tracking-tighter">
              Edu<span className="text-primary italic">Sprout</span>
            </Link>
            <p className="text-lg text-white/50 leading-relaxed font-medium">
              Platform revolusioner untuk mahasiswa Indonesia. Menghubungkan mimpi dengan peluang nyata di tingkat nasional.
            </p>
            <div className="flex space-x-6">
              {[
                { Icon: X, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Facebook, label: "Facebook" }
              ].map(({ Icon, label }, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={label}
                  title={label}
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group"
                >
                  <Icon size={20} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Tentang Kami */}
          <nav className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-white/80">Perusahaan</h3>
            <Link to="/contact" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Hubungi Kami</Link>
            <Link to="/help-center" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Pusat Bantuan</Link>
            <Link to="/privacy-policy" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Kebijakan Privasi</Link>
            <Link to="/career" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Karir & Budaya</Link>
          </nav>

          {/* Column 3: Pencari Kerja */}
          <nav className="flex flex-col items-center md:items-start gap-4">
            <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-white/80">Eksplorasi</h3>
            <Link to="/events" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Lomba Nasional</Link>
            <Link to="/scholarships" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Info Beasiswa</Link>
            <Link to="/jobs" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Lowongan Kerja</Link>
            <Link to="/news-and-tips" className="text-white/40 hover:text-white hover:translate-x-2 transition-all font-medium">Berita & Tips</Link>
          </nav>

          {/* Column 4: Perusahaan */}
          <nav className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
            <h3 className="text-xl font-black mb-4 uppercase tracking-widest text-white/80">Kemitraan</h3>
            <p className="text-white/40 mb-4 font-medium italic">"Berdayakan jutaan pelajar Indonesia melalui kolaborasi strategis."</p>
            <Link to="/partnership">
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                Mulai Kerjasama
              </button>
            </Link>
          </nav>
        </div>

        <div className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-white/30 text-sm font-medium tracking-widest uppercase">
            © 2026 EDUSPROUT INDONESIA. SEMUA HAK DILINDUNGI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;