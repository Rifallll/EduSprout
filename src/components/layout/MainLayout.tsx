import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import FloatingWhatsAppButton from "../FloatingWhatsAppButton"; // Import the new component

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      {/* Add the FloatingWhatsAppButton here */}
      <FloatingWhatsAppButton phoneNumber="6281234567890" message="Halo EduSprout, saya ingin bertanya tentang..." />
    </div>
  );
};

export default MainLayout;