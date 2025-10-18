import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, Heart, TrendingUp } from "lucide-react";

const CareerPage = () => {
  return (
    <div className="container py-16"> {/* Increased vertical padding */}
      <div className="text-center mb-16"> {/* Increased bottom margin */}
        <Briefcase className="h-20 w-20 text-primary mx-auto mb-6 animate-fade-in-up" /> {/* Larger icon, added animation */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground animate-fade-in-up delay-100">Bangun Karir di EduSprout</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200">
          Bergabunglah dengan tim kami dan berkontribusi nyata dalam merevolusi pendidikan
          dan generasi muda Indonesia.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"> {/* Increased gap and bottom margin */}
        <div className="space-y-8 animate-fade-in-up delay-300"> {/* Increased space-y */}
          <h2 className="text-3xl font-bold text-primary">Mengapa Berkarir di EduSprout?</h2>
          <p className="text-lg text-foreground leading-relaxed">
            Kami adalah tim yang bersemangat, inovatif, dan berkomitmen untuk menciptakan dampak positif.
            Di EduSprout, Anda akan menemukan lingkungan kerja yang mendukung pertumbuhan dan pengembangan diri.
          </p>
          <ul className="space-y-6"> {/* Increased space-y */}
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md"> {/* Added card-like styling */}
              <Users className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Tim Kolaboratif</h3>
                <p className="text-muted-foreground">Bekerja dengan rekan-rekan yang inspiratif dan suportif.</p>
              </div>
            </li>
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
              <TrendingUp className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Peluang Pertumbuhan</h3>
                <p className="text-muted-foreground">Kesempatan untuk terus belajar dan mengembangkan karir Anda.</p>
              </div>
            </li>
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
              <Heart className="h-6 w-6 text-red-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Dampak Nyata</h3>
                <p className="text-muted-foreground">Kontribusi Anda akan langsung terasa bagi pendidikan Indonesia.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl animate-fade-in-up delay-400">
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

      <Card className="p-10 text-center bg-primary text-primary-foreground shadow-lg animate-fade-in-up delay-500"> {/* Increased padding */}
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Siap Bergabung dengan Kami?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-8 max-w-2xl mx-auto"> {/* Increased bottom margin, added max-width */}
            Lihat posisi yang tersedia dan mulailah perjalanan karir Anda yang bermakna bersama EduSprout.
          </p>
          <Link to="/jobs">
            <Button variant="secondary" size="lg" className="text-primary hover:bg-primary-foreground hover:text-primary transition-colors duration-300">
              Lihat Lowongan Tersedia
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default CareerPage;