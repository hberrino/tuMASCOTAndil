import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getPostsPublicados, getImageUrlThumbnail, getImageUrlFull } from '../services/api';
import './Perdidos.css';

const Encontrados = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postSeleccionado, setPostSeleccionado] = useState(null);
  const [imagenExpandida, setImagenExpandida] = useState(null);
  const [indice, setIndice] = useState(0);
  const [descripcionesExpandidas, setDescripcionesExpandidas] = useState({});

  useEffect(() => {
    const cargarPosts = async () => {
      try {
        setLoading(true);
        const data = await getPostsPublicados();
        const encontrados = data.filter(post => post.tipoPublicacion === 'ENCONTRADO');
        setPosts(encontrados);
        setError(null);
      } catch (err) {
        setError('Error al cargar los posts. Por favor, intenta nuevamente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    cargarPosts();
  }, []);

  useEffect(() => {
    if (posts.length < 2) return undefined;
    const intervalId = window.setInterval(() => {
      setIndice((actual) => (actual + 1) % posts.length);
    }, 6000);
    return () => window.clearInterval(intervalId);
  }, [posts.length]);

  const postsVisibles = posts.length
    ? Array.from({ length: Math.min(3, posts.length) }, (_, offset) => posts[(indice + offset) % posts.length])
    : [];

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatearMonto = (monto) => {
    if (!monto) return null;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(monto);
  };

  const abrirWhatsApp = (telefono, whatsapp, nombreMascota) => {
    const numero = whatsapp || telefono;
    if (!numero) return;
    
    const numeroLimpio = numero.replace(/\D/g, '');
    const mensaje = encodeURIComponent(`Hola, creo que reconozco a ${nombreMascota || 'esta mascota'}. ¿Podemos coordinar?`);
    window.open(`https://wa.me/${numeroLimpio}?text=${mensaje}`, '_blank');
  };

  const abrirDetalles = (post) => {
    setPostSeleccionado(post);
  };

  const cerrarDetalles = () => {
    setPostSeleccionado(null);
  };

  const abrirImagen = (post) => {
    if (post.imagenUrl) {
      setImagenExpandida(getImageUrlFull(post.imagenUrl));
    }
  };

  const cerrarImagen = () => {
    setImagenExpandida(null);
  };

  const toggleDescripcion = (postId) => {
    setDescripcionesExpandidas(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const LIMITE_CARACTERES = 150;

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
          <p className="mt-4">Cargando posts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-red-700 bg-red-50 border border-red-200 rounded-xl p-6 shadow-md">
          <p className="font-semibold">⚠️ {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-pink-600 via-rose-600 to-orange-600 bg-clip-text text-transparent">
            Mascotas Encontradas
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-orange-500 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg">Mascotas que fueron encontradas y buscan a sus dueños</p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🐾</div>
          <p className="text-gray-600 text-lg">No hay mascotas encontradas publicadas en este momento.</p>
        </div>
      ) : (
        <>
          <div className="pet-carousel pet-carousel-found">
            <div className="pet-carousel-head">
              <span>{String(indice + 1).padStart(2, '0')} / {posts.length}</span>
              <div>
                <button type="button" onClick={() => setIndice((indice - 1 + posts.length) % posts.length)} aria-label="Mascotas encontradas anteriores">←</button>
                <button type="button" onClick={() => setIndice((indice + 1) % posts.length)} aria-label="Mascotas encontradas siguientes">→</button>
              </div>
            </div>
            <div className="pet-carousel-track">
            {postsVisibles.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-pink-200 hover:-translate-y-2 group flex flex-col h-full"
            >
              <div className="w-full h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative flex-shrink-0">
                {post.imagenUrl ? (
                  <div 
                    className="w-full h-full cursor-pointer relative group/image"
                    onClick={() => abrirImagen(post)}
                  >
                    <img
                      src={getImageUrlThumbnail(post.imagenUrl)}
                      alt={post.nombreMascota || 'Mascota'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => {
                        if (!e.target.src.startsWith('data:')) {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200"%3E%3Crect fill="%23e5e7eb" width="300" height="200"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%239ca3af" font-family="sans-serif" font-size="14"%3ESin imagen%3C/text%3E%3C/svg%3E';
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover/image:opacity-100">
                      <div className="bg-white/90 rounded-full p-3 transform scale-0 group-hover/image:scale-100 transition-transform duration-300">
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🐾</span>
                  </div>
                )}
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                  {post.nombreMascota || 'Sin nombre'}
                </h3>
                
                {/* Descripción */}
                <div className="mb-4">
                  {post.descripcion ? (
                    <div>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {descripcionesExpandidas[post.id] || post.descripcion.length <= LIMITE_CARACTERES
                          ? post.descripcion
                          : `${post.descripcion.substring(0, LIMITE_CARACTERES)}...`}
                      </p>
                      {post.descripcion.length > LIMITE_CARACTERES && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleDescripcion(post.id);
                          }}
                          className="mt-2 text-pink-600 hover:text-pink-700 text-sm font-medium transition-colors"
                        >
                          {descripcionesExpandidas[post.id] ? 'Ver menos' : 'Ver más'}
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm md:text-base leading-relaxed opacity-0 min-h-[3rem]">
                      &nbsp;
                    </p>
                  )}
                </div>
                
                <div className="space-y-2 mb-4 min-h-[3.5rem]">
                  {post.zona && (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-pink-600">📍</span>
                      <span className="font-medium">Encontrada en:</span> {post.zona}
                    </p>
                  )}
                  {post.fechaEvento && (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-pink-600">📅</span>
                      <span className="font-medium">Fecha:</span> {formatearFecha(post.fechaEvento)}
                    </p>
                  )}
                </div>
                
                <div className="mb-3 min-h-[1.5rem]">
                  {post.montoRecompensa ? (
                    <span className="text-xs text-gray-500">
                      Recompensa: {formatearMonto(post.montoRecompensa)}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500 opacity-0">
                      &nbsp;
                    </span>
                  )}
                </div>
                
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={() => abrirDetalles(post)}
                    className="w-full py-2.5 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-semibold rounded-lg hover:from-pink-700 hover:to-rose-700 transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <img src="/icons/telephoneicon.png" alt="Contacto" className="w-5 h-5" />
                    <span>Ver Contacto</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
            </div>
            <div className="pet-carousel-dots" aria-hidden="true">
              {posts.map((post, dotIndex) => <span key={post.id} className={dotIndex === indice ? 'active' : ''} />)}
            </div>
          </div>

        </>
      )}

      {postSeleccionado && createPortal(
        <div 
          className="pet-contact-overlay fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onClick={cerrarDetalles}
        >
          <div 
            className="pet-contact-modal bg-white max-w-md w-full overflow-hidden max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="pet-contact-header p-4 text-white">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Información de Contacto</h3>
                <button
                  onClick={cerrarDetalles}
                  className="text-white hover:text-gray-200 text-2xl font-light w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="pet-contact-body p-6 space-y-4">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Mascota: {postSeleccionado.nombreMascota || 'Sin nombre'}</h4>
              </div>

              <div className="space-y-3">
                {postSeleccionado.nombreContacto && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👤</span>
                    <div>
                      <p className="text-xs text-gray-500">Contacto</p>
                      <p className="font-medium text-gray-800">{postSeleccionado.nombreContacto}</p>
                    </div>
                  </div>
                )}

                {postSeleccionado.telefono && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📱</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Teléfono</p>
                      <a 
                        href={`tel:${postSeleccionado.telefono}`}
                        className="font-medium text-pink-600 hover:text-pink-700"
                      >
                        {postSeleccionado.telefono}
                      </a>
                    </div>
                  </div>
                )}

                {postSeleccionado.email && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">✉️</span>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">Email</p>
                      <a 
                        href={`mailto:${postSeleccionado.email}`}
                        className="font-medium text-pink-600 hover:text-pink-700 break-all"
                      >
                        {postSeleccionado.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              <div className="pet-contact-actions pt-4 space-y-2">
                {(postSeleccionado.whatsapp || postSeleccionado.telefono) && (
                  <button
                    onClick={() => {
                      abrirWhatsApp(postSeleccionado.telefono, postSeleccionado.whatsapp, postSeleccionado.nombreMascota);
                      cerrarDetalles();
                    }}
                    className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <img src="/icons/wpicon.png" alt="WhatsApp" className="w-5 h-5" />
                    <span>Contactar por WhatsApp</span>
                  </button>
                )}
                
                {postSeleccionado.telefono && (
                  <a
                    href={`tel:${postSeleccionado.telefono}`}
                    className="block w-full py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <img src="/icons/telephoneicon.png" alt="Teléfono" className="w-5 h-5" />
                    <span>Llamar</span>
                  </a>
                )}

                {postSeleccionado.email && (
                  <a
                    href={`mailto:${postSeleccionado.email}?subject=Reconozco a ${postSeleccionado.nombreMascota || 'esta mascota'}`}
                    className="block w-full py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <img src="/icons/gmailicon.png" alt="Email" className="w-5 h-5" />
                    <span>Enviar Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {imagenExpandida && createPortal(
        <div 
          className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={cerrarImagen}
        >
          <div className="relative max-w-7xl max-h-[95vh] w-full h-full flex items-center justify-center">
            <button
              onClick={cerrarImagen}
              className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 text-4xl font-light w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors bg-black/50"
              aria-label="Cerrar imagen"
            >
              ×
            </button>
            
            <img
              src={imagenExpandida}
              alt="Imagen expandida"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Encontrados;
