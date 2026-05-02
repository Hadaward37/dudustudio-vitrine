import { useScrollReveal } from './hooks/useScrollReveal';
import Navigation from './components/Navigation';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import Hero from './sections/Hero';
import Sobre from './sections/Sobre';
import Servicos from './sections/Servicos';
import ComoFunciona from './sections/ComoFunciona';
import Depoimentos from './sections/Depoimentos';
import FAQ from './sections/FAQ';
import CTAFinal from './sections/CTAFinal';
import Footer from './sections/Footer';

function App() {
  useScrollReveal(0.15);

  return (
    <div className="min-h-screen bg-beige">
      <Navigation />
      <main>
        <Hero />
        <Sobre />
        <Servicos />
        <ComoFunciona />
        <Depoimentos />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
