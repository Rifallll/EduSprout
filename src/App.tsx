import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Events from "./pages/Events";
import Scholarships from "./pages/Scholarships";
import Jobs from "./pages/Jobs";
import Contact from "./pages/Contact";
import NewsAndTips from "./pages/NewsAndTips";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadEventPage from "./pages/UploadEventPage"; // Import the new page
import PartnershipPage from "./pages/PartnershipPage"; // Import the new page
import CareerPage from "./pages/CareerPage"; // Import the new page

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="events" element={<Events />} />
            <Route path="scholarships" element={<Scholarships />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="news-and-tips" element={<NewsAndTips />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="upload-event" element={<UploadEventPage />} /> {/* New route */}
            <Route path="partnership" element={<PartnershipPage />} /> {/* New route */}
            <Route path="career" element={<CareerPage />} /> {/* New route */}
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;