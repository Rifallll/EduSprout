import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookmarkProvider } from "./context/BookmarkContext";
import { GamificationProvider } from "./context/GamificationContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";
import Events from "./pages/Events";
import EventDetailPage from "./pages/EventDetailPage"; // Re-import to trigger HMR
import Scholarships from "./pages/Scholarships";
import Jobs from "./pages/Jobs";
import NewsAndTips from "./pages/NewsAndTips";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UploadEventPage from "./pages/UploadEventPage";
import PartnershipPage from "./pages/PartnershipPage";
import Dashboard from "./pages/Dashboard";
import JobDetailPage from "./pages/JobDetailPage";
import NewsDetailPage from "./pages/NewsDetailPage";
import ContactPage from "./pages/ContactPage";
import HelpCenterPage from "./pages/HelpCenterPage";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage";
import TermsAndConditionsPage from "./pages/TermsAndConditionsPage";
import ResumeBuilder from "./pages/ResumeBuilder";
import CommunityPage from "./pages/CommunityPage";
import JobsAlertPage from "./pages/JobsAlertPage";
import JobLocationsPage from "./pages/JobLocationsPage";
import JobCategoriesPage from "./pages/JobCategoriesPage";
import CompanyRegistrationPage from "./pages/CompanyRegistrationPage";
import PostJobPage from "./pages/PostJobPage";
import ProductsAndServicesPage from "./pages/ProductsAndServicesPage";
import PricingPage from "./pages/PricingPage";
import BasicPlanConfirmationPage from "./pages/BasicPlanConfirmationPage";
import ProPlanPaymentPage from "./pages/ProPlanPaymentPage";
import EnterpriseContactPage from "./pages/EnterpriseContactPage";
import CareerPage from "./pages/CareerPage"; // Assuming CareerPage exists
import ScholarshipDetailPage from "./pages/ScholarshipDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BookmarkProvider>
        <Toaster />
        <Sonner />
        <GamificationProvider>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:slug" element={<EventDetailPage />} />
                <Route path="scholarships" element={<Scholarships />} />
                <Route path="scholarships/:scholarshipId" element={<ScholarshipDetailPage />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="jobs" element={<Jobs />} />
                <Route path="jobs/:jobId" element={<JobDetailPage />} />
                <Route path="news-and-tips" element={<NewsAndTips />} />
                <Route path="news-and-tips/:newsId" element={<NewsDetailPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="signup" element={<SignupPage />} />
                <Route path="upload-event" element={<UploadEventPage />} />
                <Route path="partnership" element={<PartnershipPage />} />
                <Route path="career" element={<CareerPage />} />
                {/* New Routes from Footer */}
                <Route path="contact" element={<ContactPage />} />
                <Route path="help-center" element={<HelpCenterPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms-and-conditions" element={<TermsAndConditionsPage />} />
                <Route path="resume-builder" element={<ResumeBuilder />} />
                <Route path="community" element={<CommunityPage />} />
                <Route path="jobs-alert" element={<JobsAlertPage />} />
                <Route path="jobs-locations" element={<JobLocationsPage />} />
                <Route path="jobs-categories" element={<JobCategoriesPage />} />
                <Route path="company-registration" element={<CompanyRegistrationPage />} />
                <Route path="post-job" element={<PostJobPage />} />
                <Route path="products-and-services" element={<ProductsAndServicesPage />} />
                <Route path="pricing" element={<PricingPage />} />
                {/* New Pricing Plan Routes */}
                <Route path="pricing/basic" element={<BasicPlanConfirmationPage />} />
                <Route path="pricing/pro" element={<ProPlanPaymentPage />} />
                <Route path="pricing/enterprise" element={<EnterpriseContactPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </GamificationProvider>
      </BookmarkProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;