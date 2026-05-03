import { useState, useEffect } from 'react';
import LoadingScreen from './components/LoadingScreen';
import MatrixBackground from './components/MatrixBackground';
import Ticker from './components/Ticker';
import HeroSection from './sections/HeroSection';
import ProblemsSection from './sections/ProblemsSection';
import ServicesSection from './sections/ServicesSection';
import StatsSection from './sections/StatsSection';
import PricingSection from './sections/PricingSection';
import DashboardMockup from './sections/DashboardMockup';
import HowItWorks from './sections/HowItWorks';
import TestimonialsSection from './sections/TestimonialsSection';
import FAQSection from './sections/FAQSection';
import CTASection from './sections/CTASection';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => setShowContent(true), 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <div className="relative min-h-screen bg-[#0A1628] text-[#F0F4FF]">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      <div
        className={`transition-opacity duration-700 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <MatrixBackground active={!loading} />

        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-[rgba(255,255,255,0.05)]">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00D4AA] flex items-center justify-center">
                <span className="font-display font-black text-[#0A1628] text-sm">K</span>
              </div>
              <span className="font-display font-bold text-lg text-[#F0F4FF] hidden sm:inline">
                Krypto
              </span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {[
                { label: 'Serviços',      id: 'servicos'      },
                { label: 'Planos',        id: 'planos'        },
                { label: 'Como Funciona', id: 'como-funciona' },
                { label: 'FAQ',           id: 'faq'           },
              ].map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-sm text-[rgba(240,244,255,0.6)] hover:text-[#00D4AA] transition-colors duration-300"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-[rgba(0,212,170,0.1)] text-[#00D4AA] text-sm font-medium border border-[rgba(0,212,170,0.2)] hover:bg-[rgba(0,212,170,0.2)] transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>
        </nav>

        {/* Ticker below nav */}
        <div className="pt-[72px]">
          <Ticker />
        </div>

        {/* Sections */}
        <main className="relative z-10">
          <HeroSection />
          <ProblemsSection />
          <ServicesSection />
          <StatsSection />
          <PricingSection />
          <DashboardMockup />
          <HowItWorks />
          <TestimonialsSection />
          <FAQSection />
          <CTASection />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
