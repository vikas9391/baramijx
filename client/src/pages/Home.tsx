import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ProgramSection from '@/components/ProgramSection';
import RegionalSection from '@/components/RegionalSection';
import ChatSection from '@/components/ChatSection';
import Footer from '@/components/Footer';

/**
 * Home Page - Main campaign website
 * Design: Modern Political Authority with Grassroots Warmth
 * Color Scheme: Navy (#0F1419) + Gold (#D4A574) + Light Cream (#F8F7F5)
 * Typography: Arabic-first with Almarai/Tajawal fonts
 */
export default function Home() {
  const [language, setLanguage] = useState<'ar' | 'fr' | 'en'>('ar');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header language={language} setLanguage={setLanguage} />
      
      {/* Hero Section */}
      <Hero language={language} />
      
      {/* Program Priorities Section */}
      <ProgramSection language={language} />
      
      {/* Regional Issues & Solutions */}
      <RegionalSection language={language} />
      
      {/* Interactive Chat Section */}
      <ChatSection language={language} />
      
      {/* Footer */}
      <Footer language={language} />
    </div>
  );
}
