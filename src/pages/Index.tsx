import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  MessageSquare,
  BookOpen,
  Image,
  GraduationCap,
  Plane,
  Megaphone,
  Award,
  Upload, // Import Upload icon
  Handshake, // Import Handshake icon
  Briefcase, // Import Briefcase icon
} from "lucide-react";
import NewsCard from "@/components/NewsCard";
import { useCountUp } from "@/hooks/useCountUp"; // Import the new hook

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
];

const Index = () => {
  const totalEvents = useCountUp({ end: 17556, duration: 3000 });
  const partnersRating = useCountUp({ end: 3997, duration: 3000 });
  const registeredStudents = useCountUp({ end: 2548852, duration: 3000 });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-green-700 text-white py-24 md:py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Platform Informasi Mahasiswa & Pelajar
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Jelajahi peluang tanpa batas: event, beasiswa, lowongan, dan banyak lagi untuk masa depan cerahmu!
          </p>
          <div className="opacity-0 animate-fade-in-up delay-400">
            <Button size="lg" className="px-8 py-3 text-lg shadow-lg hover:scale-105 transition-transform duration-300 bg-white text-primary hover:bg-gray-100">
              Jelajahi EduSprout
            </Button>
          </div>
        </div>
      </section>

      {/* Layanan Kami Section */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in-up">Layanan Kami</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <Calendar className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Event</CardTitle>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 flex-grow">
              Daftar ke 2,000+ event pilihan (webinar, lomba, volunteering, dsb).
            </CardContent>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-100">
            <MessageSquare className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Forum Diskusi</CardTitle>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 flex-grow">
              Tempat buat kamu sharing dan diskusi, tanpa perlu difollback & ga pake antri.
            </CardContent>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-200">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Booku</CardTitle>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 flex-grow">
              200+ ringkasan non-fiksi untuk perluas wawasanmu di mana pun, kapan pun. Ada versi audio & teks, dalam 2 bahasa!
            </CardContent>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-300">
            <Image className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Twibbon</CardTitle>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 flex-grow">
              Peserta acara mau buat twibbon? Lagi ngadain kampanye? Ini pabrik twibbon terbesar anak muda Indonesia!
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-muted py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in-up">Maju Bersama EduSprout</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="animate-fade-in-up">
              <p className="text-5xl font-extrabold text-primary mb-2">{totalEvents.toLocaleString()}</p>
              <p className="text-lg text-muted-foreground">Total Event Terdaftar</p>
            </div>
            <div className="animate-fade-in-up delay-100">
              <p className="text-5xl font-extrabold text-primary mb-2">{partnersRating.toLocaleString()}</p>
              <p className="text-lg text-muted-foreground">Partners Memberikan 5 Bintang</p>
            </div>
            <div className="animate-fade-in-up delay-200">
              <p className="text-5xl font-extrabold text-primary mb-2">{registeredStudents.toLocaleString()}</p>
              <p className="text-lg text-muted-foreground">Mahasiswa & Pelajar Terdaftar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership & Career CTAs */}
      <section className="container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <Upload className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold mb-2">Upload Event di EduSprout</CardTitle>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              Pantau penjualan tiket dan data peserta dengan mudah. Rata-rata pendaftar 112 orang per event! Mau acaramu ramai?
            </p>
            <Button className="w-full mt-auto">Upload Event Sekarang</Button>
          </Card>
          <Card className="p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-100">
            <Handshake className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold mb-2">Brand & General Partnership</CardTitle>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              Platform anak muda terbesar Indonesia. Mulai dari ramein acara, perkenalkan produk, perbagus brand equity, EduSprout bisa bantu semuanya!
            </p>
            <Button className="w-full mt-auto">Kami Siap Membantumu</Button>
          </Card>
          <Card className="p-8 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-200">
            <Briefcase className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl font-bold mb-2">Bangun Karir di EduSprout</CardTitle>
            <p className="text-muted-foreground text-sm mb-4 flex-grow">
              Dampak kami nyata dalam merevolusi pendidikan & generasi muda Indonesia. Sudah siap berkontribusi?
            </p>
            <Button className="w-full mt-auto">Lihat Lowongan EduSprout</Button>
          </Card>
        </div>
      </section>

      {/* Berita & Tips Edukasi Section */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in-up">Berita & Tips Edukasi</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyNews.map((newsItem) => (
            <NewsCard key={newsItem.id} {...newsItem} />
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/news-and-tips">
            <Button variant="outline" className="text-primary hover:bg-primary hover:text-primary-foreground">Lihat Semua Berita & Tips &rarr;</Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-muted py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in-up">Bagaimana Pengalaman Mereka?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 flex flex-col items-center text-center animate-fade-in-up">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Naomi Dominique H." />
                <AvatarFallback>NDH</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">Naomi Dominique H.</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">Universitas Pancasila, Event Organizer</p>
              <CardContent className="text-sm italic text-gray-700 dark:text-gray-300 px-0 pt-2 flex-grow">
                “Recommended parah! Awalnya ragu untuk share event di EduSprout karena mikir takut banyak yang hanya scroll dan sekadar lihat. Ternyata nggak! Banyak yang ikut & nggak zonk sama sekali. Aku sangat menyarankan para event organizer untuk upload event di EduSprout. Ketemu aplikasi ini kayak ketemu harta karun yang harus banget diambil!”
              </CardContent>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center animate-fade-in-up delay-100">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Destilova" />
                <AvatarFallback>D</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">Destilova</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">Universitas Negeri Semarang, Pengguna Aplikasi</p>
              <CardContent className="text-sm italic text-gray-700 dark:text-gray-300 px-0 pt-2 flex-grow">
                “Yang aku paling suka dari EduSprout adalah pas aku daftar ke event itu jelas, mudah dimengerti & tidak ribet. Aplikasi ini cocok untuk siswa maupun mahasiswa karena menyediakan banyak acara pengembangan diri dan lomba yang bisa diikuti anak muda, biar bisa mengembangkan softskill dan pastinya mempercantik CV mereka!”
              </CardContent>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center animate-fade-in-up delay-200">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Zharfan Akbar" />
                <AvatarFallback>ZA</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">Zharfan Akbar</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">Universitas Diponegoro, Software Engineer</p>
              <CardContent className="text-sm italic text-gray-700 dark:text-gray-300 px-0 pt-2 flex-grow">
                “Bekerja di EduSprout tidak mudah, tapi pasti bermanfaat. Kamu akan bekerja dengan rekan-rekan yang membantumu bertumbuh & jadi versi terbaik diri. Semua orang bersemangat dalam bekerja & punya rasa kepemilikan yang tinggi. Jika kamu suka mempelajari hal baru & menyukai tantangan, EduSprout tempat yang cocok untukmu.”
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Program Tahunan Section */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in-up">Program Tahunan Kami</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up">
            <GraduationCap className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Student Leaders Forum (SLF)</CardTitle>
            <p className="text-xs text-muted-foreground mb-2">Diselenggarakan Setiap Januari–April</p>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 mb-4 flex-grow">
              Perayaan semangat dalam aksi, prestasi, dan kolaborasi pemimpin muda dari seluruh Indonesia dalam rangkaian sesi talkshow penuh makna. Siap terinspirasi?
            </CardContent>
            <Button variant="link" className="mt-auto">Segera Hadir</Button>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-100">
            <Award className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Beasiswa EduSprout (BES)</CardTitle>
            <p className="text-xs text-muted-foreground mb-2">Diselenggarakan 3x Setahun</p>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 mb-4 flex-grow">
              Dapatkan dukungan untuk meringankan biaya pendidikan dan siapkan dirimu untuk masa depan cemerlang. Kesempatan ini menantimu.
            </CardContent>
            <Button variant="link" className="mt-auto">Lihat Selengkapnya</Button>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-200">
            <Plane className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Future Leaders Program (FLP)</CardTitle>
            <p className="text-xs text-muted-foreground mb-2">Diselenggarakan 2x Setahun</p>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 mb-4 flex-grow">
              100% Fully-Funded International Leadership Trip ke destinasi terbaik luar negeri selama 6 hari 5 malam. Siap mengikuti perjalanan yang mengubah hidup?
            </CardContent>
            <Button variant="link" className="mt-auto">Lihat Selengkapnya</Button>
          </Card>
          <Card className="p-6 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300 animate-fade-in-up delay-300">
            <Megaphone className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-xl font-semibold mb-2">Festival Mahasiswa Baru & Pelajar Indonesia (FMBPI)</CardTitle>
            <p className="text-xs text-muted-foreground mb-2">Diselenggarakan Setiap Juni–Agustus</p>
            <CardContent className="text-muted-foreground text-sm px-0 pt-2 mb-4 flex-grow">
              Rangkaian sesi talkshow inspiratif dengan pembicara tokoh nasional terbaik, kesempatan lomba, dan dana penunjang pendidikan. Jangan lewatkan!
            </CardContent>
            <Button variant="link" className="mt-auto">Lihat Selengkapnya</Button>
          </Card>
        </div>
      </section>

      {/* Program Testimonials Section */}
      <section className="bg-muted py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 animate-fade-in-up">Apa Kata Mereka Tentang Program Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 flex flex-col items-center text-center animate-fade-in-up">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Dimas Putra Adzie" />
                <AvatarFallback>DPA</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">Dimas Putra Adzie</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">Universitas Lampung, Awardee BES 2021</p>
              <CardContent className="text-sm italic text-gray-700 dark:text-gray-300 px-0 pt-2 flex-grow">
                “BES merupakan program anti-mainstream. Tidak hanya memberi dana, program ini mampu mengembangkan jejaring penerima beasiswa lewat kegiatan diskusi dan grup virtual. Sangat bersyukur bisa menjadi penerima dan saya merekomendasikan program ini ke seluruh pelajar Indonesia!”
              </CardContent>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center animate-fade-in-up delay-100">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Fatma Oryza" />
                <AvatarFallback>FO</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">Fatma Oryza</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">UIN Sunan Ampel Surabaya, Pemenang FLP 2020</p>
              <CardContent className="text-sm italic text-gray-700 dark:text-gray-300 px-0 pt-2 flex-grow">
                “FLP memberikan pengalaman luar biasa mengelilingi megahnya New York dan merasakan atmosfer belajar di Harvard dan MIT, Boston. Plus, aku melakukannya sambil berjejaring dengan putra-putri terbaik bangsa. Segera daftarkan dirimu di FLP selanjutnya untuk merasakan yang sama!”
              </CardContent>
            </Card>
            <Card className="p-6 flex flex-col items-center text-center animate-fade-in-up delay-200">
              <Avatar className="h-20 w-20 mb-4">
                <AvatarImage src="/placeholder.svg" alt="Indah Nurfirmanillah" />
                <AvatarFallback>IN</AvatarFallback>
              </Avatar>
              <CardTitle className="text-lg font-semibold">Indah Nurfirmanillah</CardTitle>
              <p className="text-sm text-muted-foreground mb-4">Sekolah Tinggi Manajemen PPM, Peserta FMBPI 2021</p>
              <CardContent className="text-sm italic text-gray-700 dark:text-gray-300 px-0 pt-2 flex-grow">
                “Jujur, acara FMBPI kemaren super keren banget, diisi oleh pembicara yang sangat luar biasa, dan banyak banget ilmu yang didapat. Aku sangat menunggu berbagai event kece EduSprout yang akan datang! Teman-teman jangan sampe ketinggalan juga ya! Sukses terus EduSprout ❤️”
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;