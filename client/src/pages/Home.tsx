import Hero from '@/components/Hero';
import ProgramSection from '@/components/ProgramSection';
import RegionalSection from '@/components/RegionalSection';
import ChatSection from '@/components/ChatSection';

/**
 * Home Page - Main campaign website
 * Design: Modern Political Authority with Grassroots Warmth
 * Color Scheme: Navy (#0F1419) + Gold (#D4A574) + Light Cream (#F8F7F5)
 * Typography: Arabic-first with Almarai/Tajawal fonts
 */

interface HomeProps {
  language: 'ar' | 'fr' | 'en';
}

export default function Home({ language }: HomeProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <Hero language={language} />
      
      {/* Program Priorities Section */}
      <ProgramSection language={language} />
      
      {/* Regional Issues & Solutions */}
      <RegionalSection language={language} />
      
      {/* Interactive Chat Section */}
      <ChatSection language={language} />
    </div>
  );
}
