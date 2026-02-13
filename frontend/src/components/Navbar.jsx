import { useState } from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = (e, sectionId) => {
    e.preventDefault();
    onNavigate(sectionId);
    setIsMenuOpen(false); // Cerrar el menú al hacer clic en un enlace
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <a
            href="#inicio"
            onClick={(e) => handleClick(e, 'inicio')}
            className="text-xl md:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center gap-2"
          >
            <img src="/icons/pet2icon.png" alt="Mascota" className="w-6 h-6 md:w-8 md:h-8" />
            <span>Tu Mascota Tandil</span>
          </a>
          
          {/* Menú Desktop - Oculto en móvil */}
          <ul className="hidden md:flex gap-4 md:gap-8 list-none m-0 p-0 items-center">
            <li>
              <a
                href="#inicio"
                onClick={(e) => handleClick(e, 'inicio')}
                className="text-sm md:text-base text-purple-700 hover:text-purple-900 transition-all duration-200 font-bold px-4 py-2.5 border-l-2 border-purple-300/60 hover:border-purple-600 hover:bg-purple-100/70 hover:shadow-sm active:scale-[0.98] active:bg-purple-200"
              >
                Inicio
              </a>
            </li>
            <li>
              <a
                href="#perdidos"
                onClick={(e) => handleClick(e, 'perdidos')}
                className="text-sm md:text-base text-violet-700 hover:text-violet-900 transition-all duration-200 font-bold px-4 py-2.5 border-l-2 border-violet-300/60 hover:border-violet-600 hover:bg-violet-100/70 hover:shadow-sm active:scale-[0.98] active:bg-violet-200"
              >
                Perdidos
              </a>
            </li>
            <li>
              <a
                href="#encontrados"
                onClick={(e) => handleClick(e, 'encontrados')}
                className="text-sm md:text-base text-pink-700 hover:text-pink-900 transition-all duration-200 font-bold px-4 py-2.5 border-l-2 border-pink-300/60 hover:border-pink-600 hover:bg-pink-100/70 hover:shadow-sm active:scale-[0.98] active:bg-pink-200"
              >
                Encontrados
              </a>
            </li>
            <li>
              <a
                href="#busca-tu-mascota"
                onClick={(e) => handleClick(e, 'buscaTuMascota')}
                className="text-sm md:text-base text-indigo-600 hover:text-indigo-900 transition-all duration-200 font-bold px-4 py-2.5 border-l-2 border-indigo-300/60 hover:border-indigo-600 hover:bg-indigo-100/70 hover:shadow-sm active:scale-[0.98] active:bg-indigo-200"
              >
                Busca tu Mascota
              </a>
            </li>
            <li>
              <a
                href="#veterinarias"
                onClick={(e) => handleClick(e, 'veterinarias')}
                className="text-sm md:text-base text-green-700 hover:text-green-900 transition-all duration-200 font-bold px-4 py-2.5 border-l-2 border-green-300/60 hover:border-green-600 hover:bg-green-100/70 hover:shadow-sm active:scale-[0.98] active:bg-green-200"
              >
                Veterinarias
              </a>
            </li>
          </ul>

          {/* Botón Hamburguesa - Solo visible en móvil */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-lg p-2"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            ></span>
          </button>
        </div>

        {/* Menú Móvil Desplegable */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="flex flex-col bg-white border-t border-gray-200 list-none m-0 p-0">
            <li>
              <a
                href="#inicio"
                onClick={(e) => handleClick(e, 'inicio')}
                className="block text-base text-purple-700 hover:text-purple-900 hover:bg-purple-100/70 transition-all duration-200 font-bold px-6 py-4 border-b border-gray-100 border-l-2 border-purple-300/60 hover:border-purple-600 hover:shadow-sm active:bg-purple-200"
              >
                🏠 Inicio
              </a>
            </li>
            <li>
              <a
                href="#perdidos"
                onClick={(e) => handleClick(e, 'perdidos')}
                className="block text-base text-violet-700 hover:text-violet-900 hover:bg-violet-100/70 transition-all duration-200 font-bold px-6 py-4 border-b border-gray-100 border-l-2 border-violet-300/60 hover:border-violet-600 hover:shadow-sm active:bg-violet-200"
              >
                🐕 Perdidos
              </a>
            </li>
            <li>
              <a
                href="#encontrados"
                onClick={(e) => handleClick(e, 'encontrados')}
                className="block text-base text-pink-700 hover:text-pink-900 hover:bg-pink-100/70 transition-all duration-200 font-bold px-6 py-4 border-b border-gray-100 border-l-2 border-pink-300/60 hover:border-pink-600 hover:shadow-sm active:bg-pink-200"
              >
                🐾 Encontrados
              </a>
            </li>
            <li>
              <a
                href="#busca-tu-mascota"
                onClick={(e) => handleClick(e, 'buscaTuMascota')}
                className="block text-base text-indigo-600 hover:text-indigo-900 hover:bg-indigo-100/70 transition-all duration-200 font-bold px-6 py-4 border-b border-gray-100 border-l-2 border-indigo-300/60 hover:border-indigo-600 hover:shadow-sm active:bg-indigo-200 flex items-center gap-2"
              >
                <img src="/icons/findicon.png" alt="Buscar" className="w-5 h-5" />
                <span>Busca tu Mascota</span>
              </a>
            </li>
            <li>
              <a
                href="#veterinarias"
                onClick={(e) => handleClick(e, 'veterinarias')}
                className="block text-base text-green-700 hover:text-green-900 hover:bg-green-100/70 transition-all duration-200 font-bold px-6 py-4 border-b border-gray-100 border-l-2 border-green-300/60 hover:border-green-600 hover:shadow-sm active:bg-green-200"
              >
                🏥 Veterinarias
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
