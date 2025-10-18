import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { FileText, Sparkles } from "lucide-react";

const ResumeBuilderPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-2xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <Sparkles className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Buat Resume Online</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Bangun resume profesional Anda dengan mudah dan cepat.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-base text-foreground">
            Fitur pembuat resume online kami akan segera hadir! Kami sedang mengembangkan alat yang intuitif
            untuk membantu Anda menonjol di pasar kerja. Nantikan pembaruan selanjutnya!
          </p>
          <Link to="/jobs" className="block">
            <Button size="lg">Cari Lowongan Sekarang</Button>
          </Link>
          <Link to="/" className="block mt-4">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResumeBuilderPage;