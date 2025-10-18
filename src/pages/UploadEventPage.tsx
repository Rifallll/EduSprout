import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, CheckCircle, Users, BarChart } from "lucide-react";

const UploadEventPage = () => {
  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <Upload className="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Upload Event di EduSprout</h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Maksimalkan jangkauan event Anda dan pantau performanya dengan mudah di platform EduSprout.
          Rata-rata pendaftar 112 orang per event!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-16">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-primary">Mengapa Upload Event di EduSprout?</h2>
          <p className="text-lg text-foreground">
            EduSprout adalah platform terdepan untuk menghubungkan event Anda dengan ribuan mahasiswa dan pelajar di seluruh Indonesia. Kami menyediakan fitur lengkap untuk memastikan event Anda sukses.
          </p>
          <ul className="space-y-4 text-foreground">
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Jangkauan Luas</h3>
                <p className="text-muted-foreground">Akses ke komunitas pelajar dan mahasiswa aktif di seluruh Indonesia.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Manajemen Mudah</h3>
                <p className="text-muted-foreground">Pantau penjualan tiket, data peserta, dan statistik event secara real-time.</p>
              </div>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-xl">Promosi Efektif</h3>
                <p className="text-muted-foreground">Dapatkan eksposur lebih melalui fitur promosi unggulan kami.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
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

      <Card className="p-8 text-center bg-primary text-primary-foreground shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">Siap Membuat Event Anda Ramai?</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg mb-6">
            Jangan lewatkan kesempatan untuk menjangkau audiens yang lebih luas dan membuat event Anda sukses besar.
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="text-primary hover:bg-primary-foreground hover:text-primary">
              Upload Event Sekarang
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadEventPage;