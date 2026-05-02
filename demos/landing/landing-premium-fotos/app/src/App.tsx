import { useEffect } from 'react';
import './App.css';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Services from './sections/Services';
import Process from './sections/Process';
import Stats from './sections/Stats';
import Gallery from './sections/Gallery';
import Testimonials from './sections/Testimonials';
import Location from './sections/Location';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <Stats />
      <Gallery />
      <Testimonials />
      <Location />
      <CTA />
      <Footer />
    </div>
  );
}
