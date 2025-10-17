import React from "react";
import NewsCard from "@/components/NewsCard";

const dummyNews = [
  {
    id: "n1",
    title: "10 Tips Sukses Mendapatkan Beasiswa Impian",
    description: "Panduan lengkap untuk mempersiapkan diri dan aplikasi beasiswa agar peluang diterima lebih besar.",
    category: "Tips Edukasi",
    date: "15 Oktober 2024",
    link: "/news-and-tips/tips-beasiswa",
    imageUrl: "https://via.placeholder.com/400x200/FFD700/FFFFFF?text=Tips+Beasiswa",
  },
  {
    id: "n2",
    title: "Tren Karir Paling Diminati di Tahun 2025",
    description: "Analisis mendalam tentang sektor industri dan jenis pekerjaan yang akan booming di masa depan.",
    category: "Berita Karir",
    date: "10 Oktober 2024",
    link: "/news-and-tips/tren-karir",
    imageUrl: "https://via.placeholder.com/400x200/87CEEB/FFFFFF?text=Tren+Karir",
  },
  {
    id: "n3",
    title: "Pentingnya Soft Skill di Dunia Kerja Modern",
    description: "Mengapa soft skill menjadi kunci keberhasilan di samping hard skill yang Anda miliki.",
    category: "Tips Edukasi",
    date: "05 Oktober 2024",
    link: "/news-and-tips/soft-skill",
    imageUrl: "https://via.placeholder.com/400x200/90EE90/FFFFFF?text=Soft+Skill",
  },
  {
    id: "n4",
    title: "Cara Efektif Membangun Portofolio Online",
    description: "Langkah-langkah praktis untuk membuat portofolio digital yang menarik perhatian rekruter.",
    category: "Tips Karir",
    date: "01 Oktober 2024",
    link: "/news-and-tips/portofolio-online",
    imageUrl: "https://via.placeholder.com/400x200/FF6347/FFFFFF?text=Portofolio",
  },
  {
    id: "n5",
    title: "Strategi Jitu Lolos Wawancara Kerja",
    description: "Tips dan trik untuk menghadapi wawancara kerja agar Anda tampil percaya diri dan meyakinkan.",
    category: "Tips Karir",
    date: "28 September 2024",
    link: "/news-and-tips/wawancara-kerja",
    imageUrl: "https://via.placeholder.com/400x200/FFA07A/FFFFFF?text=Wawancara",
  },
  {
    id: "n6",
    title: "Manfaat Bergabung dengan Komunitas Mahasiswa",
    description: "Bagaimana komunitas dapat membantu pengembangan diri dan jaringan profesional Anda.",
    category: "Tips Edukasi",
    date: "20 September 2024",
    link: "/news-and-tips/komunitas-mahasiswa",
    imageUrl: "https://via.placeholder.com/400x200/ADD8E6/FFFFFF?text=Komunitas",
  },
];

const NewsAndTips = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Berita & Tips Edukasi</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Dapatkan informasi terbaru, panduan, dan tips untuk mendukung perjalanan pendidikan dan karir Anda.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {dummyNews.map((newsItem) => (
          <NewsCard key={newsItem.id} {...newsItem} />
        ))}
      </div>
    </div>
  );
};

export default NewsAndTips;