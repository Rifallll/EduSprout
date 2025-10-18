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
// import Contact from "./pages/Contact"; // Removed import
import NewsAndTips from "./pages/NewsAndTips";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadEventPage from "./pages/UploadEventPage";
import PartnershipPage from "./pages/PartnershipPage";
import CareerPage from "./pages/CareerPage";
import JobDetailPage from "./pages/JobDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage"; // Import the new NewsDetailPage

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
            <Route path="jobs/:jobId" element={<JobDetailPage />} />
            {/* Removed Contact Route */}
            <Route path="news-and-tips" element={<NewsAndTips />} />
            <Route path="news-and-tips/:newsId" element={<NewsDetailPage />} /> {/* New route for news details */}
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="upload-event" element={<UploadEventPage />} />
            <Route path="partnership" element={<PartnershipPage />} />
            <Route path="career" element={<CareerPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;