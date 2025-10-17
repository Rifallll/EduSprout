import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InfoCard from "@/components/InfoCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const dummyData = {
  events: [
    {
      id: "e1",
      title: "Webinar Pengembangan Karir",
      description: "Pelajari strategi terbaik untuk mengembangkan karir Anda di era digital.",
      category: "Webinar",
      date: "2024-10-26",
      location: "Online",
      link: "/events/webinar-karir",
    },
    {
      id: "e2",
      title: "Lomba Desain UI/UX",
      description: "Tunjukkan kreativitas Anda dalam mendesain antarmuka pengguna yang inovatif.",
      category: "Lomba",
      date: "2024-11-15",
      location: "Kampus A",
      link: "/events/lomba-uiux",
    },
    {
      id: "e3",
      title: "Workshop Coding Python",
      description: "Workshop intensif untuk pemula yang ingin belajar dasar-dasar Python.",
      category: "Workshop",
      date: "2024-12-01",
      location: "Lab Komputer",
      link: "/events/workshop-python",
    },
  ],
  scholarships: [
    {
      id: "s1",
      title: "Beasiswa Unggulan Dalam Negeri",
      description: "Kesempatan emas bagi mahasiswa berprestasi untuk melanjutkan studi di universitas terbaik Indonesia.",
      category: "Lokal",
      date: "Deadline: 2024-11-30",
      link: "/scholarships/unggulan-lokal",
    },
    {
      id: "s2",
      title: "Global Scholarship Program",
      description: "Beasiswa penuh untuk studi S2 di luar negeri, mencakup biaya kuliah dan biaya hidup.",
      category: "Luar Negeri",
      date: "Deadline: 2025-01-15",
      link: "/scholarships/global-program",
    },
  ],
  jobs: [
    {
      id: "j1",
      title: "Junior Web Developer",
      description: "Dicari Junior Web Developer dengan pengalaman React.js untuk startup teknologi.",
      category: "Full-time",
      location: "Jakarta",
      date: "Deadline: 2024-11-20",
      link: "/jobs/junior-webdev",
    },
    {
      id: "j2",
      title: "Content Creator Intern",
      description: "Peluang magang bagi mahasiswa yang tertarik di bidang pembuatan konten digital.",
      category: "Internship",
      location: "Remote",
      date: "Deadline: 2024-12-10",
      link: "/jobs/content-intern",
    },
  ],
};

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-700 text-white py-24 md:py-40 text-center overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div> {/* Subtle pattern */}
        <div className="container relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight animate-fade-in-up">
            Jelajahi Peluang Tanpa Batas
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-4xl mx-auto opacity-0 animate-fade-in-up delay-200">
            Temukan event kampus, beasiswa impian, lowongan karir, dan berita penting dari komunitas Anda.
          </p>
          <div className="flex justify-center gap-6 opacity-0 animate-fade-in-up delay-400">
            <Link to="/events">
              <Button variant="secondary" size="lg" className="px-8 py-3 text-lg shadow-lg hover:scale-105 transition-transform duration-300">
                Lihat Event Terbaru
              </Button>
            </Link>
            <Link to="/scholarships">
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg text-white border-white hover:bg-white hover:text-primary shadow-lg hover:scale-105 transition-transform duration-300">
                Cari Beasiswa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">Mengapa Memilih Kami?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3">Informasi Terlengkap</h3>
            <p className="text-muted-foreground">Akses ribuan event, beasiswa, dan lowongan dari berbagai sumber terpercaya.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3">Mudah Digunakan</h3>
            <p className="text-muted-foreground">Antarmuka intuitif untuk pencarian cepat dan pengalaman pengguna yang menyenangkan.</p>
          </div>
          <div className="p-6 bg-card rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-xl font-semibold mb-3">Selalu Terupdate</h3>
            <p className="text-muted-foreground">Dapatkan notifikasi real-time untuk informasi terbaru yang relevan dengan minat Anda.</p>
          </div>
        </div>
      </section>

      {/* Latest Updates Section with Tabs */}
      <section className="container py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Update Terbaru</h2>

        <Tabs defaultValue="events" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="events">Event & Lomba</TabsTrigger>
            <TabsTrigger value="scholarships">Beasiswa</TabsTrigger>
            <TabsTrigger value="jobs">Lowongan & Karir</TabsTrigger>
          </TabsList>

          <TabsContent value="events">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dummyData.events.slice(0, 3).map((event) => ( // Limit to 3 for cleaner look
                <InfoCard key={event.id} {...event} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/events">
                <Button variant="outline" className="text-primary hover:bg-primary hover:text-primary-foreground">Lihat Semua Event & Lomba &rarr;</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="scholarships">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dummyData.scholarships.slice(0, 2).map((scholarship) => ( // Limit to 2
                <InfoCard key={scholarship.id} {...scholarship} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/scholarships">
                <Button variant="outline" className="text-primary hover:bg-primary hover:text-primary-foreground">Lihat Semua Beasiswa &rarr;</Button>
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="jobs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dummyData.jobs.slice(0, 2).map((job) => ( // Limit to 2
                <InfoCard key={job.id} {...job} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/jobs">
                <Button variant="outline" className="text-primary hover:bg-primary hover:text-primary-foreground">Lihat Semua Lowongan & Karir &rarr;</Button>
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Call to Action Section */}
      <section className="bg-muted py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Siap Menjelajahi Peluang Baru?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            Daftar sekarang untuk mendapatkan update personal dan jangan lewatkan kesempatan emas!
          </p>
          <Link to="/contact"> {/* Or a dedicated signup page */}
            <Button size="lg" className="px-10 py-4 text-lg shadow-lg hover:scale-105 transition-transform duration-300">
              Mulai Sekarang
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;