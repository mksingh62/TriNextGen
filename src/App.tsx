import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";
import About from "./pages/About";
import Services from "./pages/Services";
import LoginPage from "./pages/admin/LoginPage";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BackendTest from "./components/BackendTest";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Routes with Navbar and Footer */}
            <Route path="/" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <Index />
                </main>
                <Footer />
              </div>
            } />
            {/* Careers route without Navbar and Footer since they are included in the component */}
            <Route path="/careers" element={<Careers />} />
            <Route path="/about" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <About />
                </main>
                <Footer />
              </div>
            } />
            {/* Services routes without Navbar and Footer since they are included in the component */}
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceId" element={<Services />} />
            <Route path="/backend-test" element={
              <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow">
                  <BackendTest />
                </main>
                <Footer />
              </div>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            {/* Admin routes without Navbar and Footer */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <CookieConsent />
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;