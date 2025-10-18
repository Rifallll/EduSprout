import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Heart, TrendingUp } from "lucide-react";

const CareerPage = () => {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Briefcase className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Bangun Karir di EduSprout</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Bergabunglah dengan tim kami dan berkontribusi nyata dalam merevolusi pendidikan
          dan generasi muda Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary">Mengapa Berkarir di EduSprout?</h2>
          <p className="text-lg text-foreground">
            Kami adalah tim yang bersemangat, inovatif, dan berkomitmen untuk menciptakan dampak positif.
            Di EduSprout, Anda akan menemukan lingkungan kerja yang mendukung pertumbuhan dan pengembangan diri.
          </p>
          <ul className="space-y-4 text-foreground">
            <li className="flex items-start">
              <Users className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Tim Kolaboratif</h3>
                <p className="text-muted-foreground">Bekerja dengan rekan-rekan yang inspiratif dan suportif.</p>
              </div>
            </li>
            <li className="flex items-start">
              <TrendingUp className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Peluang Pertumbuhan</h3>
                <p className="text-muted-foreground">Kesempatan untuk terus belajar dan mengembangkan karir Anda.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Heart className="h-6 w-6 text-red-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Dampak Nyata</h3>
                <p className="text-muted-foreground">Kontribusi Anda akan langsung terasa bagi pendidikan Indonesia.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://via.placeholder.com/800x600/FF9800/FFFFFF?text=Career+at+EduSprout"
            alt="Career at EduSprout"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-xl font-semibold">Wujudkan Potensi Terbaik Anda</p>
          </div>
        </div>
      </div>

      <Card className="p-8 text-center bg-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Siap Bergabung dengan Kami?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">
            Lihat posisi yang tersedia dan mulailah perjalanan karir Anda yang bermakna bersama EduSprout.
          </p>
          <Link to="/jobs">
            <Button variant="secondary" size="lg" className="text-primary hover:bg-primary-foreground hover:text-primary">
              Lihat Lowongan Tersedia
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPage;