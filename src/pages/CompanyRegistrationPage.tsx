import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const CompanyRegistrationPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Company registration form submitted");
    // Implementasi pendaftaran perusahaan akan ditambahkan di sini
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Building2 className="h-16 w-16 text-primary mx-auto mb-4" />
          <CardTitle className="text-3xl font-bold">Daftar Perusahaan</CardTitle>
          <CardDescription>
            Daftarkan perusahaan Anda untuk mulai merekrut talenta terbaik di EduSprout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="companyName">Nama Perusahaan</Label>
              <Input
                id="companyName"
                name="companyName"
                type="text"
                required
                placeholder="PT Maju Bersama"
              />
            </div>
            <div>
              <Label htmlFor="companyEmail">Email Perusahaan</Label>
              <Input
                id="companyEmail"
                name="companyEmail"
                type="email"
                autoComplete="email"
                required
                placeholder="hr@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                placeholder="********"
              />
            </div>
            <Button type="submit" className="w-full">
              Daftar Perusahaan
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Sudah punya akun?{" "}
            <Link to="/login" className="font-medium text-primary hover:underline">
              Masuk
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompanyRegistrationPage;