import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const PostJobPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post job form submitted");
    // Implementasi posting lowongan akan ditambahkan di sini
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Pasang Lowongan Kerja</CardTitle>
          <CardDescription>
            Isi detail lowongan kerja Anda untuk menjangkau ribuan pencari kerja.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="jobTitle">Judul Lowongan</Label>
              <Input
                id="jobTitle"
                name="jobTitle"
                type="text"
                required
                placeholder="Contoh: Software Engineer"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Nama Perusahaan</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="PT EduSprout Indonesia"
              />
            </div>
            <div>
              <Label htmlFor="location">Lokasi</Label>
              <Input
                id="location"
                name="location"
                type="text"
                required
                placeholder="Contoh: Jakarta, Remote"
              />
            </div>
            <div>
              <Label htmlFor="description">Deskripsi Pekerjaan</Label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Jelaskan tanggung jawab dan kualifikasi..."
                rows={6}
              />
            </div>
            <Button type="submit" className="w-full">
              Pasang Lowongan
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Butuh bantuan?{" "}
            <Link to="/contact" className="font-medium text-primary hover:underline">
              Hubungi Kami
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJobPage;