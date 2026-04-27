import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Benefits from './sections/Benefits'
import Testimonials from './sections/Testimonials'
import CTA from './sections/CTA'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-base)' }}>
      <Navigation />
      <main>
        <Hero />
        <About />
        <Services />
        <Benefits />
        <Testimonials />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
