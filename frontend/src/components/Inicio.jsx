import { useState } from 'react';
import './Inicio.css';

const Inicio = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('berrinohernan@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleActionClick = (sectionId) => {
    if (onNavigate) {
      onNavigate(sectionId);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Hero Section con Imagen y Título Integrados - Ancho completo */}
      <div className="relative mb-12 sm:mb-16 md:mb-20 lg:mb-24 w-full overflow-hidden shadow-2xl">
        {/* Imagen de fondo */}
        <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
          <img
            src="/imgs/perritosperdidos.jpg"
            alt="Mascotas de la comunidad"
            className="w-full h-full object-cover"
          />
          {/* Overlay con gradiente suave */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>
          
          {/* Contenido superpuesto - Alineado hacia arriba */}
          <div className="absolute inset-0 flex flex-col items-center justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 md:px-8 text-center">
            {/* Título Principal con fondo para resaltar */}
            <div className="bg-black/40 rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-10 lg:px-12 py-6 sm:py-8 md:py-10 mb-4 sm:mb-6 max-w-5xl mx-auto border border-white/20 shadow-2xl">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight bg-gradient-to-r from-white via-indigo-100 to-purple-100 bg-clip-text text-transparent drop-shadow-2xl">
                Ayudemos a que cada mascota vuelva a su hogar
              </h1>
            </div>
            
            {/* Subtítulo */}
            <div className="bg-black/30 rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 max-w-3xl mx-auto border border-white/10 shadow-xl">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white font-medium drop-shadow-lg">
                Plataforma local de Tandil para reunir mascotas con sus familias
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6">

      {/* Sección COMO FUNCIONA */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        {/* Título de sección */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              ¿Cómo funciona?
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
        
        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
            {/* Card 1 - Publicar */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-100 flex flex-col h-full">
              <div className="flex flex-col items-center text-center flex-grow">
                {/* Icono */}
                <div className="mb-5 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                  <img src="/icons/pet1icon.png" alt="Publicar" className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                
                {/* Título */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-800">
                  Perdí mi mascota o encontré una mascota
                </h3>
                
                {/* Descripción */}
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-7 flex-grow">
                  Publicá la información de tu mascota perdida o encontrada en nuestra plataforma
                </p>
                
                {/* Botón */}
                <button
                  onClick={() => handleActionClick('buscaTuMascota')}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-auto"
                >
                  Publicá en minutos
                </button>
              </div>
            </div>

            {/* Card 2 - Buscar */}
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 shadow-md border border-gray-100 flex flex-col h-full">
              <div className="flex flex-col items-center text-center flex-grow">
                {/* Icono */}
                <div className="mb-5 sm:mb-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-md flex-shrink-0">
                  <img src="/icons/findicon.png" alt="Buscar" className="w-10 h-10 sm:w-12 sm:h-12" />
                </div>
                
                {/* Título */}
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 sm:mb-5 text-gray-800">
                  Quiero encontrar o ayudar
                </h3>
                
                {/* Descripción */}
                <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-7 flex-grow">
                  Explorá las mascotas perdidas y encontradas en nuestra comunidad
                </p>
                
                {/* Botón */}
                <button
                  onClick={() => handleActionClick('perdidos')}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md hover:shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] mt-auto"
                >
                  Ver mascotas activas
                </button>
              </div>
            </div>
          </div>
      </div>

      {/* Sección de Contacto */}
      <div className="mt-12 sm:mt-16 md:mt-20 p-6 sm:p-8 md:p-10 bg-gradient-to-br from-gray-50 to-indigo-50/30 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-gray-200/50 shadow-lg max-w-2xl mx-auto">
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 text-center font-medium">
          ¿Necesitás ayuda o tenés alguna consulta?
        </p>
        <p className="text-xs sm:text-sm text-gray-600 mb-5 sm:mb-6 text-center">
          Contactá con el administrador
        </p>
        <div className="flex flex-col items-center gap-3">
          <button
            onClick={handleCopyEmail}
            className="px-6 sm:px-8 py-3 sm:py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-sm sm:text-base md:text-lg font-semibold flex items-center gap-2 sm:gap-3 shadow-md hover:shadow-xl transform hover:scale-105 active:scale-95"
          >
            {copied ? (
              <>
                <span className="text-lg sm:text-xl">✓</span>
                <span>Email Copiado</span>
              </>
            ) : (
              <>
                <img src="/icons/gmailicon.png" alt="Email" className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>COPIAR EMAIL</span>
              </>
            )}
          </button>
          <p className="text-xs sm:text-sm text-gray-500 italic">
            Click para copiar el correo
          </p>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Inicio;
