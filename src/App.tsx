import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Article from "./pages/Article";
import Stories from "./pages/Stories";
import Journals from "./pages/Journals";
import Illustrations from "./pages/Illustrations";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AdminFab = () => {
  const location = useLocation();
  // Hide the FAB on the admin page itself
  if (location.pathname.startsWith("/admin")) return null;
  return (
    <a
      href="/admin"
      aria-label="Admin"
      className="fixed bottom-6 right-6 z-50 w-8 h-8 rounded-full bg-foreground/10 hover:bg-foreground/20 border border-border backdrop-blur-sm transition-all duration-200 flex items-center justify-center group"
      title="Admin"
    >
      <span className="w-2 h-2 rounded-full bg-foreground/30 group-hover:bg-foreground/60 transition-colors" />
    </a>
  );
};

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminFab />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/journals" element={<Journals />} />
            <Route path="/illustrations" element={<Illustrations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;

