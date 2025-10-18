import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, TrendingUp, Lightbulb, Users } from "lucide-react";

const PartnershipPage = () => {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Handshake className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Brand & General Partnership</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Jalin kemitraan strategis dengan EduSprout, platform anak muda terbesar di Indonesia,
          untuk mencapai tujuan brand Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
          <img
            src="https://via.placeholder.com/800x600/2196F3/FFFFFF?text=Strategic+Partnership"
            alt="Strategic Partnership"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-xl font-semibold">Kemitraan yang Saling Menguntungkan</p>
          </div>
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary">Manfaat Bermitra dengan EduSprout</h2>
          <p className="text-lg text-foreground">
            Kami menawarkan berbagai bentuk kemitraan yang dapat disesuaikan untuk membantu brand Anda
            terhubung dengan audiens muda yang dinamis dan berpotensi.
          </p>
          <ul className="space-y-4 text-foreground">
            <li className="flex items-start">
              <TrendingUp className="h-6 w-6 text-blue-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Peningkatan Brand Awareness</h3>
                <p className="text-muted-foreground">Jangkau ribuan pelajar dan mahasiswa di seluruh Indonesia.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Lightbulb className="h-6 w-6 text-yellow-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Engagement Audiens</h3>
                <p className="text-muted-foreground">Terlibat langsung dengan target demografi Anda melalui berbagai program.</p>
              </div>
            </li>
            <li className="flex items-start">
              <Users className="h-6 w-6 text-purple-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Dampak Sosial Positif</h3>
                <p className="text-muted-foreground">Berkontribusi pada pengembangan pendidikan dan karir generasi muda.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Card className="p-8 text-center bg-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Mari Bangun Kemitraan yang Kuat!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">
            Kami siap membantu Anda merancang strategi kemitraan yang paling efektif.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="text-primary hover:bg-primary-foreground hover:text-primary">
              Hubungi Kami untuk Kemitraan
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnershipPage;