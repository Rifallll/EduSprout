import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { LifeBuoy } from "lucide-react";

const HelpCenterPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <LifeBuoy className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Pusat Bantuan</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Temukan jawaban atas pertanyaan Anda atau hubungi tim dukungan kami.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-foreground">
            Kami sedang menyusun daftar pertanyaan yang sering diajukan dan panduan lengkap untuk membantu Anda.
            Silakan kembali lagi nanti atau hubungi kami langsung jika Anda membutuhkan bantuan segera.
          </p>
          <Link to="/contact" className="block">
            <Button size="lg">Hubungi Dukungan</Button>
          </Link>
          <Link to="/" className="block mt-4">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpCenterPage;