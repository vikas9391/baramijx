import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, useLocation } from "wouter";
import { useEffect, useState } from "react";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CandidatePage from "./pages/Candidate";
import ProgramPage from "./pages/Program";
import ProximityBoardPage from "./pages/ProximityBoard";
import FieldWorkPage from "./pages/FieldWork";
import ElectionServicesPage from "./pages/Electionservicespage";
import AdminPage from "./pages/Admin";
import Header from "./components/Header";
import Footer from "./components/Footer";

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function Router() {
  const [language, setLanguage] = useState<'ar' | 'fr' | 'en'>('ar');
  const [programOpen, setProgramOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const isArabic = language === 'ar';
    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.lang = isArabic ? 'ar' : language;
  }, [language]);

  useEffect(() => {
    if (!programOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProgramOpen(false);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [programOpen]);

  const closeProgram = () => setProgramOpen(false);

  if (location === '/admin') {
    return (
      <>
        <ScrollToTop />
        <AdminPage />
      </>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Header language={language} setLanguage={setLanguage} onOpenProgram={() => setProgramOpen(true)} />
      <Switch>
        <Route path="/" component={() => <Home language={language} />} />
        <Route path="/candidate" component={() => <CandidatePage language={language} />} />
        <Route path="/program" component={() => <ProgramPage language={language} />} />
        <Route path="/proximity-board" component={() => <ProximityBoardPage language={language} />} />
        <Route path="/field-work" component={() => <FieldWorkPage language={language} />} />
        <Route path="/election-services" component={() => <ElectionServicesPage language={language} />} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <Footer language={language} />

      {programOpen && (
        <div
          className="fixed inset-0 z-[200] bg-black/80 p-2 sm:p-4 md:p-6 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          aria-label={language === 'ar' ? 'البرنامج الانتخابي' : language === 'fr' ? 'Programme électoral' : 'Electoral program'}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeProgram();
          }}
        >
          <div className="relative w-full h-full max-w-6xl bg-background rounded-xl overflow-hidden shadow-2xl border border-border">
            <div className="absolute top-0 inset-x-0 z-10 h-12 sm:h-14 flex items-center justify-between px-3 sm:px-5 bg-primary/95 text-primary-foreground shadow-md">
              <span className="font-semibold text-sm sm:text-base truncate pr-3">
                {language === 'ar' ? 'البرنامج الانتخابي' : language === 'fr' ? 'Programme électoral' : 'Electoral Program'}
              </span>
              <button
                type="button"
                onClick={closeProgram}
                aria-label={language === 'ar' ? 'إغلاق' : language === 'fr' ? 'Fermer' : 'Close'}
                className="shrink-0 w-9 h-9 rounded-full bg-white/10 text-white text-2xl leading-none hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                ×
              </button>
            </div>
            <iframe
              src="/programme%20fini.pdf"
              title={language === 'ar' ? 'البرنامج الانتخابي' : language === 'fr' ? 'Programme électoral' : 'Electoral program'}
              className="w-full h-full border-0 pt-12 sm:pt-14"
            />
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen bg-background text-foreground transition-colors duration-300">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
