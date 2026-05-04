import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import Home from './pages/Home'
import Servicos from './pages/Servicos'
import AntesDepois from './pages/AntesDepois'
import Galeria from './pages/Galeria'
import Sobre from './pages/Sobre'
import Localizacao from './pages/Localizacao'
import Contato from './pages/Contato'

function App() {
  return (
    <div className="min-h-screen bg-[#0B0B0B] text-white">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/antes-e-depois" element={<AntesDepois />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/localizacao" element={<Localizacao />} />
          <Route path="/contato" element={<Contato />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}

export default App
