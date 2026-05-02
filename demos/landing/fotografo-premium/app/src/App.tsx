import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ShutterLoader from '@/components/ShutterLoader';
import CustomCursor from '@/components/CustomCursor';
import Navigation from '@/components/Navigation';
import Hero from '@/sections/Hero';
import Portfolio from '@/sections/Portfolio';
import About from '@/sections/About';
import Packages from '@/sections/Packages';
import Process from '@/sections/Process';
import Testimonials from '@/sections/Testimonials';
import Instagram from '@/sections/Instagram';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-[#0D0D0D] min-h-screen">
      <ShutterLoader />
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <Portfolio />
        <About />
        <Packages />
        <Process />
        <Testimonials />
        <Instagram />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
