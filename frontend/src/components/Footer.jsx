import './Footer.css';

const Footer = ({ onNavigate }) => {
  const handleNavClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 text-white mt-20">
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
                onClick={() => handleNavClick('buscaTuMascota')}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-center md:text-left text-sm sm:text-base hover:underline"
              >
                Buscar tu mascota
              </button>
            </nav>
          </div>

          {/* Sección Desarrollo */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Desarrollo</h3>
            </div>
            <p className="text-gray-300 mb-4 text-sm sm:text-base">
              Hernán Berrino
            </p>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://www.linkedin.com/in/hernan-berrino/"
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
                href="https://github.com/hernanberrino"
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
    </footer>
  );
};

export default Footer;
