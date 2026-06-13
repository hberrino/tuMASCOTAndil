import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Perdidos from './components/Perdidos';
import Encontrados from './components/Encontrados';
import BuscaTuMascota from './components/BuscaTuMascota';
import ReportarEncuentro from './components/ReportarEncuentro';
import Veterinarias from './components/Veterinarias';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Scroll reveal effect
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const scrollToSection = (sectionId) => {
    const sectionIds = {
      inicio: 'inicio',
      perdidos: 'perdidos',
      encontrados: 'encontrados',
      buscaTuMascota: 'busca-tu-mascota',
      reportarEncuentro: 'reportar-encuentro',
      veterinarias: 'veterinarias',
    };
    const section = document.getElementById(sectionIds[sectionId]);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="app">
      <div className="app-loader"><div className="loader-brand">Tu Mascota<span>.</span></div></div>
      <div className="site-background" />

      <Navbar onNavigate={scrollToSection} />
      
      <main className="main-content relative z-10">
        {/* Sección Inicio */}
        <section
          id="inicio"
          className="min-h-screen flex items-center justify-center px-4 py-16 fade-in relative"
        >
          <Inicio onNavigate={scrollToSection} />
        </section>

        {/* Sección Perdidos */}
        <section
          id="perdidos"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <Perdidos />
        </section>

        {/* Sección Encontrados */}
        <section
          id="encontrados"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <Encontrados />
        </section>

        {/* Sección Busca tu Mascota */}
        <section
          id="busca-tu-mascota"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <BuscaTuMascota />
        </section>

        {/* Sección Reportar Encuentro */}
        <section
          id="reportar-encuentro"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <ReportarEncuentro />
        </section>

        {/* Sección Veterinarias */}
        <section
          id="veterinarias"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <Veterinarias />
        </section>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
