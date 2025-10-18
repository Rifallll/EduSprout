import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LayoutGrid } from "lucide-react";

const JobCategoriesPage = () => {
  const popularCategories = [
    "Teknologi Informasi", "Pemasaran & Periklanan", "Administrasi", "Layanan Pelanggan",
    "Desain Grafis", "Penyelenggara Acara", "Edukasi & E-Learning", "Keuangan", "Kesehatan"
  ];

  return (
    <div className="container py-16 text-center">
      <Card className="max-w-3xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <LayoutGrid className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Kategori Pekerjaan</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Jelajahi lowongan kerja berdasarkan kategori industri.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-foreground">
            Temukan karir yang sesuai dengan minat dan keahlian Anda.
            Pilih kategori untuk melihat lowongan yang tersedia.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
            {popularCategories.map((category) => (
              <Link key={category} to={`/jobs?category=${encodeURIComponent(category)}`}>
                <Button variant="outline" className="w-full">
                  {category}
                </Button>
              </Link>
            ))}
          </div>
          <Link to="/jobs" className="block mt-8">
            <Button size="lg">Lihat Semua Lowongan</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobCategoriesPage;