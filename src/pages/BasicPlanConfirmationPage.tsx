import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const BasicPlanConfirmationPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Paket Basic Anda Aktif!</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Selamat, Anda telah berhasil mengaktifkan Paket Basic EduSprout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-foreground">
            Anda sekarang dapat menikmati fitur-fitur dasar kami secara gratis.
            Jelajahi platform kami dan mulai manfaatkan semua yang kami tawarkan!
          </p>
          <Link to="/" className="block">
            <Button size="lg">Kembali ke Beranda</Button>
          </Link>
          <Link to="/post-job" className="block mt-4">
            <Button variant="outline">Pasang Lowongan Pertama Anda</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default BasicPlanConfirmationPage;