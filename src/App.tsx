
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import AppLayout from "./components/AppLayout";
import Dashboard from "./pages/Dashboard";
import AccountsPage from "./pages/AccountsPage";
import TransfersPage from "./pages/TransfersPage";
import PaymentsPage from "./pages/PaymentsPage";
import BeneficiariesPage from "./pages/BeneficiariesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="accounts" element={<AccountsPage />} />
              <Route path="transfers" element={<TransfersPage />} />
              <Route path="payments" element={<PaymentsPage />} />
              <Route path="beneficiaries" element={<BeneficiariesPage />} />
              <Route path="settings" element={<SettingsPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
