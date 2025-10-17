import React from "react";
import InfoCard from "@/components/InfoCard"; // Import InfoCard

const dummyJobs = [
  {
    id: "j1",
    title: "Junior Front-end Developer",
    description: "Dicari pengembang front-end berbakat untuk bergabung dengan tim inovatif kami.",
    category: "Full-time",
    location: "Jakarta",
    date: "Deadline: 30 November 2024",
    link: "/jobs/junior-frontend",
  },
  {
    id: "j2",
    title: "Content Creator Intern",
    description: "Kesempatan magang bagi mahasiswa yang passionate di bidang pembuatan konten digital.",
    category: "Internship",
    location: "Remote",
    date: "Deadline: 15 Desember 2024",
    link: "/jobs/content-creator-intern",
  },
  {
    id: "j3",
    title: "Marketing Specialist",
    description: "Profesional pemasaran dengan pengalaman untuk mengembangkan strategi digital.",
    category: "Full-time",
    location: "Surabaya",
    date: "Deadline: 20 Desember 2024",
    link: "/jobs/marketing-specialist",
  },
  {
    id: "j4",
    title: "Data Analyst (Part-time)",
    description: "Peluang part-time bagi mahasiswa atau fresh graduate yang tertarik dengan analisis data.",
    category: "Part-time",
    location: "Bandung",
    date: "Deadline: 05 Januari 2025",
    link: "/jobs/data-analyst-parttime",
  },
  {
    id: "j5",
    title: "UI/UX Designer",
    description: "Desainer UI/UX berpengalaman untuk menciptakan pengalaman pengguna yang intuitif dan menarik.",
    category: "Full-time",
    location: "Yogyakarta",
    date: "Deadline: 10 Januari 2025",
    link: "/jobs/ui-ux-designer",
  },
  {
    id: "j6",
    title: "Community Manager",
    description: "Membangun dan mengelola komunitas online untuk brand kami.",
    category: "Full-time",
    location: "Remote",
    date: "Deadline: 25 Januari 2025",
    link: "/jobs/community-manager",
  },
];

const Jobs = () => {
  return (
    <div className="container py-8">
      <h1 className="text-4xl font-bold mb-6 text-center">Info Lowongan & Karir</h1>
      <p className="text-lg text-center text-muted-foreground mb-8">
        Dapatkan informasi lowongan pekerjaan dan peluang karir terbaru dari berbagai perusahaan.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {dummyJobs.map((jobItem) => (
          <InfoCard
            key={jobItem.id}
            title={jobItem.title}
            description={jobItem.description}
            category={jobItem.category}
            location={jobItem.location}
            date={jobItem.date}
            link={jobItem.link}
            linkText="Lihat Detail"
          />
        ))}
      </div>
    </div>
  );
};

export default Jobs;