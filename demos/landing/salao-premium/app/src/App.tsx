import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import LiquidBlobs from './components/LiquidBlobs';
import GlitterParticles from './components/GlitterParticles';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';

import Hero from './sections/Hero';
import Services from './sections/Services';
import Team from './sections/Team';
import BeforeAfter from './sections/BeforeAfter';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Booking from './sections/Booking';
import FAQ from './sections/FAQ';
import CTAFinal from './sections/CTAFinal';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <LiquidBlobs />
      <GlitterParticles />
      <CustomCursor />
      <Navigation />
      <main className="relative">
        <Hero />
        <Services />
        <Team />
        <BeforeAfter />
        <Gallery />
        <Testimonials />
        <Booking />
        <FAQ />
        <CTAFinal />
        <Footer />
      </main>
      <div className="noise-overlay" />
    </>
  );
}
