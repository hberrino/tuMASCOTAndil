import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Inicio from './components/Inicio';
import Perdidos from './components/Perdidos';
import Encontrados from './components/Encontrados';
import BuscaTuMascota from './components/BuscaTuMascota';
import Footer from './components/Footer';
import './App.css';

function App() {
  const sectionsRef = useRef({
    inicio: useRef(null),
    perdidos: useRef(null),
    encontrados: useRef(null),
    buscaTuMascota: useRef(null),
  });

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
    const section = sectionsRef.current[sectionId]?.current;
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Fondo con gradiente y formas decorativas */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        {/* Gradiente base */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
        
        {/* Formas decorativas circulares */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl translate-x-1/2"></div>
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-pink-200/20 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl"></div>
        
        {/* Patrón de puntos sutiles */}
        <div 
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `radial-gradient(circle, #6366f1 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        ></div>
      </div>

      <Navbar onNavigate={scrollToSection} />
      
      <main className="main-content relative z-10">
        {/* Sección Inicio */}
        <section
          ref={sectionsRef.current.inicio}
          id="inicio"
          className="min-h-screen flex items-center justify-center px-4 py-16 fade-in relative"
        >
          <Inicio onNavigate={scrollToSection} />
        </section>

        {/* Sección Perdidos */}
        <section
          ref={sectionsRef.current.perdidos}
          id="perdidos"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <Perdidos />
        </section>

        {/* Sección Encontrados */}
        <section
          ref={sectionsRef.current.encontrados}
          id="encontrados"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <Encontrados />
        </section>

        {/* Sección Busca tu Mascota */}
        <section
          ref={sectionsRef.current.buscaTuMascota}
          id="busca-tu-mascota"
          className="min-h-screen px-4 py-16 fade-in relative"
        >
          <BuscaTuMascota />
        </section>
      </main>

      <Footer onNavigate={scrollToSection} />
    </div>
  );
}

export default App;
