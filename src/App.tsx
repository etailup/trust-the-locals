import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { WishlistProvider } from "./contexts/WishlistContext";
import Index from "./pages/Index";
import About from "./pages/About";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import HowItWorks from "./pages/HowItWorks";
import NotFound from "./pages/NotFound";
import Login from "./pages/portal/Login";
import Experiences from "./pages/portal/Experiences";
import ExperienceDetail from "./pages/portal/ExperienceDetail";
import Booking from "./pages/portal/Booking";
import Wishlist from "./pages/portal/Wishlist";
import Profile from "./pages/portal/Profile";
import Concierge from "./pages/portal/Concierge";
// Our Locals
import Locals from "./pages/portal/Locals";
import Chefs from "./pages/portal/locals/Chefs";
import Security from "./pages/portal/locals/Security";
import PersonalTrainers from "./pages/portal/locals/PersonalTrainers";
import Nannies from "./pages/portal/locals/Nannies";
import Guides from "./pages/portal/locals/Guides";
import Drivers from "./pages/portal/locals/Drivers";
import PersonalConcierge from "./pages/portal/locals/PersonalConcierge";
import MassageTherapists from "./pages/portal/locals/MassageTherapists";
// Experiences Categories
import FoodWine from "./pages/portal/experiences/FoodWine";
import History from "./pages/portal/experiences/History";
import Premium from "./pages/portal/experiences/Premium";
// Seasonal
import Seasonal from "./pages/portal/Seasonal";
import Winter from "./pages/portal/seasonal/Winter";
import Spring from "./pages/portal/seasonal/Spring";
import Summer from "./pages/portal/seasonal/Summer";
import Autumn from "./pages/portal/seasonal/Autumn";
// Events & Groups
import EventsGroups from "./pages/portal/EventsGroups";
import EventGroupDetail from "./pages/portal/EventGroupDetail";
import SeasonalDetail from "./pages/portal/SeasonalDetail";
import LocalCareDetail from "./pages/portal/LocalCareDetail";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/portal/login" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <WishlistProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/portal/login" element={<Login />} />
            <Route path="/portal" element={<Navigate to="/portal/experiences" replace />} />
            <Route path="/portal/dashboard" element={<Navigate to="/portal/experiences" replace />} />
            <Route
              path="/portal/experiences"
              element={
                <ProtectedRoute>
                  <Experiences />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/experience/:id"
              element={
                <ProtectedRoute>
                  <ExperienceDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/seasonal/:id"
              element={
                <ProtectedRoute>
                  <SeasonalDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/local-care"
              element={
                <ProtectedRoute>
                  <LocalCareDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/booking/:id"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/wishlist"
              element={
                <ProtectedRoute>
                  <Wishlist />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/portal/concierge"
              element={
                <ProtectedRoute>
                  <Concierge />
                </ProtectedRoute>
              }
            />
            {/* Our Locals Routes */}
            <Route path="/portal/locals" element={<ProtectedRoute><Locals /></ProtectedRoute>} />
            <Route path="/portal/locals/chefs" element={<ProtectedRoute><Chefs /></ProtectedRoute>} />
            <Route path="/portal/locals/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
            <Route path="/portal/locals/trainers" element={<ProtectedRoute><PersonalTrainers /></ProtectedRoute>} />
            <Route path="/portal/locals/nannies" element={<ProtectedRoute><Nannies /></ProtectedRoute>} />
            <Route path="/portal/locals/guides" element={<ProtectedRoute><Guides /></ProtectedRoute>} />
            <Route path="/portal/locals/drivers" element={<ProtectedRoute><Drivers /></ProtectedRoute>} />
            <Route path="/portal/locals/concierge" element={<ProtectedRoute><PersonalConcierge /></ProtectedRoute>} />
            <Route path="/portal/locals/massage" element={<ProtectedRoute><MassageTherapists /></ProtectedRoute>} />
            {/* Experiences Categories Routes */}
            <Route path="/portal/experiences/food-wine" element={<ProtectedRoute><FoodWine /></ProtectedRoute>} />
            <Route path="/portal/experiences/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="/portal/experiences/premium" element={<ProtectedRoute><Premium /></ProtectedRoute>} />
            {/* Seasonal Routes */}
            <Route path="/portal/seasonal" element={<ProtectedRoute><Seasonal /></ProtectedRoute>} />
            <Route path="/portal/seasonal/winter" element={<ProtectedRoute><Winter /></ProtectedRoute>} />
            <Route path="/portal/seasonal/spring" element={<ProtectedRoute><Spring /></ProtectedRoute>} />
            <Route path="/portal/seasonal/summer" element={<ProtectedRoute><Summer /></ProtectedRoute>} />
            <Route path="/portal/seasonal/autumn" element={<ProtectedRoute><Autumn /></ProtectedRoute>} />
            {/* Events & Groups Routes */}
            <Route path="/portal/events-groups" element={<ProtectedRoute><EventsGroups /></ProtectedRoute>} />
            <Route path="/portal/events-groups/:id" element={<ProtectedRoute><EventGroupDetail /></ProtectedRoute>} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
