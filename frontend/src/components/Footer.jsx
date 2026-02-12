import { useState } from 'react';
import { createPortal } from 'react-dom';
import Admin from './Admin';
import './Footer.css';

const Footer = ({ onNavigate }) => {
  const [showAdmin, setShowAdmin] = useState(false);

  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  const handleAdminClick = (e) => {
    e.preventDefault();
    setShowAdmin(!showAdmin);
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
          {/* Sección Proyecto */}
          <div className="text-center md:text-left">
            <div className="mb-3">
              <h3 className="text-xl font-bold">Proyecto</h3>
            </div>
            <h4 className="text-2xl sm:text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
              Tu Mascota Tandil
            </h4>
            <p className="text-gray-300 text-sm sm:text-base italic mb-4">
              "Proyecto comunitario para reunir mascotas con sus familias"
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              © Derechos reservados 2026
            </p>
          </div>

          {/* Sección Navegación rápida */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Navegación rápida</h3>
            </div>
            <nav className="flex flex-col gap-2 items-center md:items-start">
              <button
                onClick={() => handleNavClick('inicio')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center md:text-left text-sm sm:text-base hover:underline"
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavClick('perdidos')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center md:text-left text-sm sm:text-base hover:underline"
              >
                Perdidos
              </button>
              <button
                onClick={() => handleNavClick('encontrados')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center md:text-left text-sm sm:text-base hover:underline"
              >
                Encontrados
              </button>
              <button
                onClick={() => handleNavClick('buscaTuMascota')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center md:text-left text-sm sm:text-base hover:underline"
              >
                Busca tu Mascota
              </button>
            </nav>
          </div>

          {/* Sección Desarrollo */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Desarrollo</h3>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2 mb-4">
              <p className="text-gray-300 text-sm sm:text-base">
                Hernán Berrino
              </p>
              <button
                onClick={handleAdminClick}
                className="w-6 h-6 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full flex items-center justify-center text-[10px] transition-all duration-200 hover:scale-110 shadow-md border border-gray-600/40"
                aria-label="Panel de administración"
                title="Panel de administración"
              >
                🔐
              </button>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/hernanberrino/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="LinkedIn"
              >
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                />
              </a>
              <a
                href="https://github.com/hberrino"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="GitHub"
              >
                <img
                  src="/icons/github.svg"
                  alt="GitHub"
                  className="w-6 h-6 sm:w-7 sm:h-7"
                />
              </a>
              <a
                href="https://hbdeveloper.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200"
                aria-label="Portfolio dev"
              >
                <span className="text-gray-300 hover:text-white text-xs sm:text-sm font-medium">Portfolio dev</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Admin */}
      {showAdmin && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowAdmin(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl border border-gray-200"
            onClick={(e) => e.stopPropagation()}
          >
            <Admin onClose={() => setShowAdmin(false)} />
          </div>
        </div>,
        document.body
      )}
    </footer>
  );
};

export default Footer;
