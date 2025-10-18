import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import { toast } from "sonner";

const EnterpriseContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulasi pengiriman formulir
    console.log("Enterprise contact form submitted");
    toast.success("Pesan Anda telah terkirim! Tim sales kami akan segera menghubungi Anda.");
    // Dalam aplikasi nyata, ini akan memanggil API untuk mengirim email atau menyimpan data kontak.
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Handshake className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Hubungi Tim Sales</CardTitle>
          <CardDescription>
            Isi formulir di bawah ini dan tim sales kami akan segera menghubungi Anda untuk membahas Paket Enterprise.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                placeholder="Nama Anda"
              />
            </div>
            <div>
              <Label htmlFor="companyName">Nama Perusahaan</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="Nama Perusahaan Anda"
              />
            </div>
            <div>
              <Label htmlFor="email">Email Perusahaan</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="email@perusahaan.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Nomor Telepon</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+62 812 3456 7890"
              />
            </div>
            <div>
              <Label htmlFor="message">Pesan Anda</Label>
              <Textarea
                id="message"
                name="message"
                rows={4}
                placeholder="Jelaskan kebutuhan Anda..."
              />
            </div>
            <Button type="submit" className="w-full">
              Kirim Pesan
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            <Link to="/pricing" className="font-medium text-primary hover:underline">
              Kembali ke Pilihan Paket
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnterpriseContactPage;