import React from "react";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import InfoCard from "@/components/InfoCard";

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
      <section className="relative bg-gradient-to-r from-primary to-blue-600 text-white py-20 md:py-32 text-center">
        <div className="container">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-up">
            Temukan Informasi Kampus & Komunitas Anda
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-fade-in-up delay-200">
            Event menarik, beasiswa impian, lowongan karir, dan berita penting, semua ada di sini!
          </p>
          <div className="flex justify-center gap-4 animate-fade-in-up delay-400">
            <Link to="/events">
              <Button variant="secondary" size="lg" className="hover:scale-105 transition-transform">
                Lihat Event
              </Button>
            </Link>
            <Link to="/scholarships">
              <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-primary hover:scale-105 transition-transform">
                Cari Beasiswa
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Updates Section */}
      <section className="container py-12 md:py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">Update Terbaru</h2>

        {/* Latest Events */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Event & Lomba</h3>
            <Link to="/events">
              <Button variant="link" className="text-primary">Lihat Semua Event & Lomba &rarr;</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyData.events.map((event) => (
              <InfoCard key={event.id} {...event} />
            ))}
          </div>
        </div>

        {/* Latest Scholarships */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Beasiswa</h3>
            <Link to="/scholarships">
              <Button variant="link" className="text-primary">Lihat Semua Beasiswa &rarr;</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyData.scholarships.map((scholarship) => (
              <InfoCard key={scholarship.id} {...scholarship} />
            ))}
          </div>
        </div>

        {/* Latest Jobs */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-semibold">Lowongan & Karir</h3>
            <Link to="/jobs">
              <Button variant="link" className="text-primary">Lihat Semua Lowongan & Karir &rarr;</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dummyData.jobs.map((job) => (
              <InfoCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;