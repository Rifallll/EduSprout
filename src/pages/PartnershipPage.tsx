import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, TrendingUp, Lightbulb, Users } from "lucide-react";

const PartnershipPage = () => {
  return (
    <div className="container py-16"> {/* Increased vertical padding */}
      <div className="text-center mb-16"> {/* Increased bottom margin */}
        <Handshake className="h-20 w-20 text-primary mx-auto mb-6 animate-fade-in-up" /> {/* Larger icon, added animation */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground animate-fade-in-up delay-100">Brand & General Partnership</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200">
          Jalin kemitraan strategis dengan EduSprout, platform anak muda terbesar di Indonesia,
          untuk mencapai tujuan brand Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"> {/* Increased gap and bottom margin */}
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl animate-fade-in-up delay-300">
          <img
            src="https://via.placeholder.com/800x600/2196F3/FFFFFF?text=Strategic+Partnership"
            alt="Strategic Partnership"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-xl font-semibold">Kemitraan yang Saling Menguntungkan</p>
          </div>
        </div>
        <div className="space-y-8 animate-fade-in-up delay-400"> {/* Increased space-y */}
          <h2 className="text-3xl font-bold text-primary">Manfaat Bermitra dengan EduSprout</h2>
          <p className="text-lg text-foreground leading-relaxed">
            Kami menawarkan berbagai bentuk kemitraan yang dapat disesuaikan untuk membantu brand Anda
            terhubung dengan audiens muda yang dinamis dan berpotensi.
          </p>
          <ul className="space-y-6"> {/* Increased space-y */}
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md"> {/* Added card-like styling */}
              <TrendingUp className="h-6 w-6 text-blue-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Peningkatan Brand Awareness</h3>
                <p className="text-muted-foreground">Jangkau ribuan pelajar dan mahasiswa di seluruh Indonesia.</p>
              </div>
            </li>
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
              <Lightbulb className="h-6 w-6 text-yellow-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Engagement Audiens</h3>
                <p className="text-muted-foreground">Terlibat langsung dengan target demografi Anda melalui berbagai program.</p>
              </div>
            </li>
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
              <Users className="h-6 w-6 text-purple-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Dampak Sosial Positif</h3>
                <p className="text-muted-foreground">Berkontribusi pada pengembangan pendidikan dan karir generasi muda.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <Card className="p-10 text-center bg-primary text-primary-foreground shadow-lg animate-fade-in-up delay-500"> {/* Increased padding */}
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Mari Bangun Kemitraan yang Kuat!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-8 max-w-2xl mx-auto"> {/* Increased bottom margin, added max-width */}
            Kami siap membantu Anda merancang strategi kemitraan yang paling efektif.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="text-primary hover:bg-primary-foreground hover:text-primary transition-colors duration-300">
              Hubungi Kami untuk Kemitraan
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PartnershipPage;