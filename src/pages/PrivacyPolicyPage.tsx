import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

const PrivacyPolicyPage = () => {
  return (
    <div className="container py-16">
      <Card className="max-w-4xl mx-auto p-8 shadow-lg">
        <CardHeader className="text-center">
          <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Kebijakan Privasi</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none mt-8 text-foreground">
          <p>
            Selamat datang di Kebijakan Privasi EduSprout. Kami berkomitmen untuk melindungi privasi pengguna kami.
            Dokumen ini menjelaskan jenis informasi yang kami kumpulkan, bagaimana kami menggunakannya, dan langkah-langkah yang kami ambil untuk melindunginya.
          </p>
          <h3>1. Informasi yang Kami Kumpulkan</h3>
          <p>
            Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, seperti nama, alamat email, dan informasi profil lainnya saat Anda mendaftar atau menggunakan layanan kami.
            Kami juga mengumpulkan data penggunaan secara otomatis, seperti alamat IP, jenis browser, dan halaman yang Anda kunjungi.
          </p>
          <h3>2. Bagaimana Kami Menggunakan Informasi Anda</h3>
          <p>
            Informasi yang kami kumpulkan digunakan untuk menyediakan, memelihara, dan meningkatkan layanan kami,
            serta untuk berkomunikasi dengan Anda mengenai pembaruan, penawaran, dan informasi relevan lainnya.
            Kami tidak akan menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda.
          </p>
          <h3>3. Keamanan Data</h3>
          <p>
            Kami menerapkan berbagai langkah keamanan untuk melindungi informasi pribadi Anda dari akses, penggunaan, atau pengungkapan yang tidak sah.
            Namun, tidak ada metode transmisi data melalui internet atau metode penyimpanan elektronik yang 100% aman.
          </p>
          <h3>4. Perubahan pada Kebijakan Privasi Ini</h3>
          <p>
            Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini.
          </p>
          <div className="text-center mt-10">
            <Link to="/" className="block">
              <Button size="lg">Kembali ke Beranda</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicyPage;