import React from "react";
import InfoCard from "@/components/InfoCard"; // Import InfoCard

const dummyScholarships = [
  {
    id: "s1",
    title: "Beasiswa Unggulan Dalam Negeri 2025",
    description: "Beasiswa penuh untuk mahasiswa berprestasi di berbagai universitas terbaik di Indonesia.",
    category: "Lokal",
    date: "Deadline: 31 Januari 2025",
    link: "/scholarships/unggulan-dalam-negeri",
  },
  {
    id: "s2",
    title: "Global Leaders Scholarship (USA)",
    description: "Kesempatan studi S2/S3 di universitas terkemuka di Amerika Serikat dengan pendanaan penuh.",
    category: "Internasional",
    date: "Deadline: 15 Februari 2025",
    link: "/scholarships/global-leaders-usa",
  },
  {
    id: "s3",
    title: "Beasiswa Riset Inovasi (Lokal)",
    description: "Dukungan dana untuk proyek penelitian inovatif mahasiswa di bidang sains dan teknologi.",
    category: "Lokal",
    date: "Deadline: 28 Februari 2025",
    link: "/scholarships/riset-inovasi",
  },
  {
    id: "s4",
    title: "Erasmus Mundus Scholarship (Europe)",
    description: "Beasiswa bergengsi untuk program master bersama di berbagai negara Eropa.",
    category: "Internasional",
    date: "Deadline: 10 Maret 2025",
    link: "/scholarships/erasmus-mundus",
  },
  {
    id: "s5",
    title: "Beasiswa Pendidikan Guru (Lokal)",
    description: "Program beasiswa khusus bagi calon guru yang berkomitmen untuk memajukan pendidikan di daerah terpencil.",
    category: "Lokal",
    date: "Deadline: 20 Maret 2025",
    link: "/scholarships/pendidikan-guru",
  },
  {
    id: "s6",
    title: "Chevening Scholarship (UK)",
    description: "Beasiswa penuh untuk studi pascasarjana di universitas-universitas di Inggris.",
    category: "Internasional",
    date: "Deadline: 05 April 2025",
    link: "/scholarships/chevening",
  },
];

const Scholarships = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Info Beasiswa</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Temukan berbagai beasiswa lokal dan internasional untuk mendukung pendidikan Anda.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {dummyScholarships.map((scholarshipItem) => (
          <InfoCard
            key={scholarshipItem.id}
            title={scholarshipItem.title}
            description={scholarshipItem.description}
            category={scholarshipItem.category}
            date={scholarshipItem.date}
            link={scholarshipItem.link}
            linkText="Lihat Beasiswa"
          />
        ))}
      </div>
    </div>
  );
};

export default Scholarships;