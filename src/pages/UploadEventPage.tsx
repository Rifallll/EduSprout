import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle } from "lucide-react"; // Removed unused Users, BarChart icons

const UploadEventPage = () => {
  return (
    <div className="container py-16"> {/* Increased vertical padding */}
      <div className="text-center mb-16"> {/* Increased bottom margin */}
        <Upload className="h-20 w-20 text-primary mx-auto mb-6 animate-fade-in-up" /> {/* Larger icon, added animation */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-foreground animate-fade-in-up delay-100">Upload Event di EduSprout</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-fade-in-up delay-200">
          Maksimalkan jangkauan event Anda dan pantau performanya dengan mudah di platform EduSprout.
          Rata-rata pendaftar 112 orang per event!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"> {/* Increased gap and bottom margin */}
        <div className="space-y-8 animate-fade-in-up delay-300"> {/* Increased space-y */}
          <h2 className="text-3xl font-bold text-primary">Mengapa Upload Event di EduSprout?</h2>
          <p className="text-lg text-foreground leading-relaxed">
            EduSprout adalah platform terdepan untuk menghubungkan event Anda dengan ribuan mahasiswa dan pelajar di seluruh Indonesia. Kami menyediakan fitur lengkap untuk memastikan event Anda sukses.
          </p>
          <ul className="space-y-6"> {/* Increased space-y */}
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md"> {/* Added card-like styling */}
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" /> {/* Adjusted icon color and margin */}
              <div>
                <h3 className="font-semibold text-xl text-foreground">Jangkauan Luas</h3>
                <p className="text-muted-foreground">Akses ke komunitas pelajar dan mahasiswa aktif di seluruh Indonesia.</p>
              </div>
            </li>
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-foreground">Manajemen Mudah</h3>
                <p className="text-muted-foreground">Pantau penjualan tiket, data peserta, dan statistik event secara real-time.</p>
              </div>
            </li>
            <li className="flex items-start p-4 bg-card rounded-lg shadow-sm border border-border transition-all duration-300 hover:shadow-md">
              <CheckCircle className="h-6 w-6 text-green-600 mr-4 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl text-foreground">Promosi Efektif</h3>
                <p className="text-muted-foreground">Dapatkan eksposur lebih melalui fitur promosi unggulan kami.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl animate-fade-in-up delay-400">
          <img
            src="https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Event+Management"
            alt="Event Management"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
            <p className="text-white text-xl font-semibold">Mudah Kelola Event Anda</p>
          </div>
        </div>
      </div>

      <Card className="p-10 text-center bg-primary text-primary-foreground shadow-lg animate-fade-in-up delay-500"> {/* Increased padding */}
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold mb-4">Siap Membuat Event Anda Ramai?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-8 max-w-2xl mx-auto"> {/* Increased bottom margin, added max-width */}
            Jangan lewatkan kesempatan untuk menjangkau audiens yang lebih luas dan membuat event Anda sukses besar.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="text-primary hover:bg-primary-foreground hover:text-primary transition-colors duration-300">
              Upload Event Sekarang
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadEventPage;