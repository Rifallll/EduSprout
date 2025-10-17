import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const LoginPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementasi login akan ditambahkan di sini (misalnya, memanggil API)
    console.log("Login form submitted");
    // Setelah login berhasil, bisa redirect ke halaman lain
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-14rem)] py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Masuk</CardTitle>
          <CardDescription>
            Masukkan email dan password Anda untuk masuk ke akun Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                placeholder="********"
              />
            </div>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>
          <div className="mt-6 text-center text-sm">
            Belum punya akun?{" "}
            <Link to="/signup" className="font-medium text-primary hover:underline">
              Daftar Sekarang
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;