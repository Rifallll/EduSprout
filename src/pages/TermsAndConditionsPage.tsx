import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText } from "lucide-react";

const TermsAndConditionsPage = () => {
  return (
    <div className="container py-16">
      <Card className="max-w-4xl mx-auto p-8 shadow-lg">
        <CardHeader className="text-center">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Syarat & Ketentuan</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Aturan dan pedoman penggunaan platform EduSprout.
          </CardDescription>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none mt-8 text-foreground">
          <p>
            Selamat datang di EduSprout. Dengan mengakses atau menggunakan platform kami, Anda setuju untuk terikat oleh Syarat & Ketentuan ini.
            Harap baca dengan seksama sebelum menggunakan layanan kami.
          </p>
          <h3>1. Penerimaan Ketentuan</h3>
          <p>
            Dengan menggunakan layanan EduSprout, Anda menyatakan bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat & Ketentuan ini,
            serta Kebijakan Privasi kami. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.
          </p>
          <h3>2. Penggunaan Layanan</h3>
          <p>
            Anda setuju untuk menggunakan layanan kami hanya untuk tujuan yang sah dan sesuai dengan semua hukum dan peraturan yang berlaku.
            Anda tidak boleh menggunakan layanan kami untuk tujuan ilegal atau tidak sah.
          </p>
          <h3>3. Akun Pengguna</h3>
          <p>
            Untuk mengakses fitur tertentu dari layanan kami, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk menjaga kerahasiaan informasi akun Anda,
            termasuk kata sandi, dan untuk semua aktivitas yang terjadi di bawah akun Anda.
          </p>
          <h3>4. Konten Pengguna</h3>
          <p>
            Anda bertanggung jawab penuh atas konten yang Anda posting atau unggah ke platform kami.
            Anda menjamin bahwa Anda memiliki semua hak yang diperlukan untuk konten tersebut dan bahwa konten tersebut tidak melanggar hak pihak ketiga mana pun.
          </p>
          <h3>5. Pembatasan Tanggung Jawab</h3>
          <p>
            EduSprout tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, konsekuensial, atau ganti rugi pun yang timbul dari
            penggunaan atau ketidakmampuan untuk menggunakan layanan kami.
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

export default TermsAndConditionsPage;