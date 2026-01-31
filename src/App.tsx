import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import HomeChargers from "./pages/HomeChargers";
import ChargerDetails from "./pages/ChargerDetails";
import RentYourCharger from "./pages/RentYourCharger";
import AllStationsIndia from "./pages/AllStationsIndia";
import BillingPage from "./pages/BillingPage";
import ChargingVerification from "./pages/ChargingVerification";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/home-chargers" element={<HomeChargers />} />
              <Route path="/home-chargers/:id" element={<ChargerDetails />} />
              <Route path="/all-stations" element={<AllStationsIndia />} />
              <Route path="/billing" element={<BillingPage />} />
              <Route path="/charging-verification" element={<ChargingVerification />} />
              <Route path="/rent-your-charger" element={<RentYourCharger />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
