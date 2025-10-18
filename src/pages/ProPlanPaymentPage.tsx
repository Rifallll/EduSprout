import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, Loader2 } from "lucide-react"; // Import Loader2 icon
import { toast } from "sonner";

const ProPlanPaymentPage = () => {
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const navigate = useNavigate(); // Hook untuk navigasi

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Mulai loading

    // Simulasi proses pembayaran dengan penundaan
    setTimeout(() => {
      setIsLoading(false); // Hentikan loading

      // Simulasi pembayaran berhasil
      toast.success("Pembayaran Paket Pro berhasil! Selamat menikmati fitur premium.");
      console.log("Pro Plan payment submitted successfully");
      navigate("/pricing/basic"); // Redirect ke halaman konfirmasi (bisa diganti ke halaman konfirmasi Pro jika ada)

      // Jika ingin mensimulasikan kegagalan, bisa seperti ini:
      // toast.error("Pembayaran gagal. Mohon coba lagi.");
      // console.error("Pro Plan payment failed");

    }, 2000); // Simulasi penundaan 2 detik
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CreditCard className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Pembayaran Paket Pro</CardTitle>
          <CardDescription>
            Lanjutkan pembayaran untuk mengaktifkan Paket Pro Anda seharga Rp 250rb/bulan.
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
                disabled={isLoading} // Disable input saat loading
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="email@example.com"
                disabled={isLoading} // Disable input saat loading
              />
            </div>
            <div>
              <Label htmlFor="cardNumber">Nomor Kartu</Label>
              <Input
                id="cardNumber"
                name="cardNumber"
                type="text"
                required
                placeholder="XXXX XXXX XXXX XXXX"
                pattern="[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}"
                maxLength={19}
                disabled={isLoading} // Disable input saat loading
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Tanggal Kadaluarsa</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  required
                  placeholder="MM/YY"
                  pattern="(0[1-9]|1[0-2])\/?([0-9]{2})"
                  maxLength={5}
                  disabled={isLoading} // Disable input saat loading
                />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  type="text"
                  required
                  placeholder="XXX"
                  pattern="[0-9]{3,4}"
                  maxLength={4}
                  disabled={isLoading} // Disable input saat loading
                />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <DollarSign className="mr-2 h-4 w-4" />
              )}
              {isLoading ? "Memproses..." : "Bayar Rp 250rb Sekarang"}
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

export default ProPlanPaymentPage;