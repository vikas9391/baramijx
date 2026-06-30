import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import CandidatePage from "./pages/Candidate";
import ProgramPage from "./pages/Program";
import ProximityBoardPage from "./pages/ProximityBoard";
import FieldWorkPage from "./pages/FieldWork";
import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";


function Router() {
  const [language, setLanguage] = useState<'ar' | 'fr' | 'en'>('ar');

  return (
    <>
      <Header language={language} setLanguage={setLanguage} />
      <Switch>
        <Route path="/" component={() => <Home language={language} />} />
        <Route path="/candidate" component={() => <CandidatePage language={language} />} />
        <Route path="/program" component={() => <ProgramPage language={language} />} />
        <Route path="/proximity-board" component={() => <ProximityBoardPage language={language} />} />
        <Route path="/field-work" component={() => <FieldWorkPage language={language} />} />
        <Route path="/404" component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
      <Footer language={language} />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <div className="flex flex-col min-h-screen">
            <Router />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
