import './Footer.css';

const Footer = ({ onNavigate }) => {
  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-8">
          {/* Sección Proyecto */}
          <div className="text-center">
            <div className="mb-3">
              <h3 className="text-xl font-bold">Proyecto</h3>
            </div>
            <div className="flex items-center justify-center gap-3 mb-3">
              <h4 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
                Tu Mascota Tandil
              </h4>
              <a
                href="/admin"
                className="w-6 h-6 bg-gray-800/60 hover:bg-gray-700/80 text-white rounded-full flex items-center justify-center text-[10px] transition-all duration-200 hover:scale-110 shadow-md border border-gray-600/40"
                aria-label="Panel de administración"
                title="Panel de administración"
              >
                🔐
              </a>
            </div>
            <p className="text-gray-300 text-sm sm:text-base italic mb-4">
              "Proyecto comunitario para reunir mascotas con sus familias"
            </p>
            <p className="text-gray-400 text-xs sm:text-sm">
              © Derechos reservados 2026
            </p>
          </div>

          {/* Sección Navegación rápida */}
          <div className="text-center">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Navegación rápida</h3>
            </div>
            <nav className="flex flex-col gap-2 items-center">
              <button
                onClick={() => handleNavClick('inicio')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center text-sm sm:text-base hover:underline"
              >
                Inicio
              </button>
              <button
                onClick={() => handleNavClick('perdidos')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center text-sm sm:text-base hover:underline"
              >
                Perdidos
              </button>
              <button
                onClick={() => handleNavClick('encontrados')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center text-sm sm:text-base hover:underline"
              >
                Encontrados
              </button>
              <button
                onClick={() => handleNavClick('buscaTuMascota')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center text-sm sm:text-base hover:underline"
              >
                Busca tu Mascota
              </button>
              <button
                onClick={() => handleNavClick('veterinarias')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center text-sm sm:text-base hover:underline"
              >
                Veterinarias
              </button>
            </nav>
          </div>
        </div>

        {/* Sección Desarrollo - Pequeña y discreta */}
        <div className="border-t border-gray-700/30 pt-3 mt-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-2.5 text-gray-500">
            <span className="text-[10px]">Desarrollo:</span>
            <span className="text-[10px]">Hernán Berrino</span>
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/hernanberrino/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200 opacity-60 hover:opacity-100"
                aria-label="LinkedIn"
              >
                <img
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  className="w-3 h-3"
                />
              </a>
              <a
                href="https://github.com/hberrino"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform duration-200 opacity-60 hover:opacity-100"
                aria-label="GitHub"
              >
                <img
                  src="/icons/github.svg"
                  alt="GitHub"
                  className="w-3 h-3"
                />
              </a>
              <a
                href="https://hbdeveloper.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] hover:text-gray-400 transition-colors duration-200 opacity-60 hover:opacity-100"
                aria-label="Portfolio dev"
              >
                Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
