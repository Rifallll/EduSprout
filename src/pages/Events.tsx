import React from "react";
import InfoCard from "@/components/InfoCard"; // Import InfoCard

const dummyEvents = [
  {
    id: "e1",
    title: "Webinar 'Masa Depan AI di Industri Kreatif'",
    description: "Pelajari bagaimana kecerdasan buatan mengubah lanskap industri kreatif dan peluang karir di dalamnya.",
    category: "Webinar",
    date: "20 November 2024",
    location: "Online (Zoom)",
    link: "/events/webinar-ai-kreatif",
  },
  {
    id: "e2",
    title: "Lomba Desain Poster 'Lingkungan Bersih, Masa Depan Cerah'",
    description: "Tunjukkan kreativitasmu dalam mendesain poster untuk kampanye lingkungan. Total hadiah jutaan rupiah!",
    category: "Lomba",
    date: "Deadline: 30 November 2024",
    location: "Online",
    link: "/events/lomba-desain-poster",
  },
  {
    id: "e3",
    title: "Workshop 'Dasar-dasar Pemrograman Web dengan React'",
    description: "Workshop intensif untuk pemula yang ingin menguasai dasar-dasar pengembangan web front-end.",
    category: "Workshop",
    date: "05 Desember 2024",
    location: "Kampus A, Ruang Lab Komputer",
    link: "/events/workshop-react",
  },
  {
    id: "e4",
    title: "Seminar Karir 'Jalur Sukses di Startup Teknologi'",
    description: "Dengarkan pengalaman para profesional sukses di dunia startup teknologi dan tips untuk memulai karirmu.",
    category: "Seminar",
    date: "10 Desember 2024",
    location: "Auditorium Kampus B",
    link: "/events/seminar-startup",
  },
  {
    id: "e5",
    title: "Volunteering 'Bersih-bersih Pantai Lokal'",
    description: "Bergabunglah dengan kami untuk membersihkan pantai dan berkontribusi pada kelestarian lingkungan.",
    category: "Volunteering",
    date: "17 Desember 2024",
    location: "Pantai Indah",
    link: "/events/volunteering-pantai",
  },
  {
    id: "e6",
    title: "Kompetisi Debat Nasional 'Peran Pemuda dalam Pembangunan Bangsa'",
    description: "Ajang adu argumen dan pemikiran kritis antar mahasiswa se-Indonesia.",
    category: "Lomba",
    date: "22 Desember 2024",
    location: "Online & Offline",
    link: "/events/kompetisi-debat",
  },
];

const Events = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Event EduSprout</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Jelajahi berbagai event menarik dari kampus dan komunitas di seluruh Indonesia.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {dummyEvents.map((eventItem) => (
          <InfoCard
            key={eventItem.id}
            title={eventItem.title}
            description={eventItem.description}
            category={eventItem.category}
            date={eventItem.date}
            location={eventItem.location}
            link={eventItem.link}
            linkText="Lihat Event"
          />
        ))}
      </div>
    </div>
  );
};

export default Events;