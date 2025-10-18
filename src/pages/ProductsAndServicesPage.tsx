import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Package, Lightbulb, Users } from "lucide-react";

const ProductsAndServicesPage = () => {
  return (
    <div className="container py-16 text-center">
      <Card className="max-w-4xl mx-auto p-8 shadow-lg">
        <CardHeader>
          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-4xl font-bold mb-4">Produk dan Layanan Kami</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Kami menawarkan berbagai solusi untuk membantu perusahaan Anda berkembang.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Perekrutan Talenta Muda</h3>
              <p className="text-muted-foreground">
                Akses ke database talenta muda terbaik di Indonesia untuk mengisi posisi di perusahaan Anda.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 border rounded-lg shadow-sm">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Brand & General Partnership</h3>
              <p className="text-muted-foreground">
                Jalin kemitraan strategis untuk meningkatkan visibilitas merek Anda di kalangan audiens muda.
              </p>
            </div>
          </div>
          <Link to="/partnership" className="block mt-8">
            <Button size="lg">Lihat Detail Kemitraan</Button>
          </Link>
          <Link to="/" className="block mt-4">
            <Button variant="outline">Kembali ke Beranda</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductsAndServicesPage;