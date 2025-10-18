import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DollarSign, Check } from "lucide-react";

const PricingPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-4xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <DollarSign className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Harga Layanan Kami</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Pilih paket yang paling sesuai dengan kebutuhan perusahaan Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="flex flex-col p-6 border-2 border-border rounded-lg shadow-md">
              <CardHeader className="pb-4">
                <h3 className="text-2xl font-bold mb-2">Basic</h3>
                <p className="text-muted-foreground">Untuk startup & bisnis kecil</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-5xl font-extrabold text-primary mb-4">Gratis</p>
                <ul className="text-left space-y-2 text-foreground">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> 1 Lowongan Aktif</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Akses Dasar Pencari Kerja</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Dukungan Email</li>
                </ul>
              </CardContent>
              <Button className="mt-6">Pilih Paket Basic</Button>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col p-6 border-2 border-primary rounded-lg shadow-lg scale-105">
              <CardHeader className="pb-4">
                <h3 className="text-2xl font-bold mb-2 text-primary">Pro</h3>
                <p className="text-muted-foreground">Untuk bisnis yang berkembang</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="flex items-baseline text-5xl font-extrabold text-primary mb-4">Rp 250rb<span className="text-base text-muted-foreground ml-1">/bulan</span></p>
                <ul className="text-left space-y-2 text-foreground">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> 5 Lowongan Aktif</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Akses Penuh Database</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Promosi Lowongan</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Dukungan Prioritas</li>
                </ul>
              </CardContent>
              <Button className="mt-6">Pilih Paket Pro</Button>
            </Card>

            {/* Enterprise Plan */}
            <Card className="flex flex-col p-6 border-2 border-border rounded-lg shadow-md">
              <CardHeader className="pb-4">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-muted-foreground">Untuk perusahaan besar</p>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <p className="text-5xl font-extrabold text-primary mb-4">Custom</p>
                <ul className="text-left space-y-2 text-foreground">
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Lowongan Tanpa Batas</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Fitur Kustom</li>
                  <li className="flex items-center"><Check className="h-5 w-5 text-green-500 mr-2" /> Manajer Akun Khusus</li>
                </ul>
              </CardContent>
              <Button className="mt-6">Hubungi Sales</Button>
            </Card>
          </div>
          <Link to="/" className="block mt-8">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingPage;