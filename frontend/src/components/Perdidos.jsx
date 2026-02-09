import { useState, useEffect } from 'react';
import { getPostsPublicados, getApiBaseUrl } from '../services/api';
import './Perdidos.css';

const Perdidos = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [postSeleccionado, setPostSeleccionado] = useState(null);

  useEffect(() => {
    const cargarPosts = async () => {
      try {
        setLoading(true);
        const data = await getPostsPublicados();
        setPosts(data);
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
    // Usar WhatsApp si está disponible, sino usar el teléfono
    const numero = whatsapp || telefono;
    if (!numero) return;
    
    // Limpiar el número de teléfono (quitar espacios, guiones, etc.)
    const numeroLimpio = numero.replace(/\D/g, '');
    const mensaje = encodeURIComponent(`Hola, vi la publicación sobre ${nombreMascota || 'tu mascota'}. ¿Sigue perdida?`);
    window.open(`https://wa.me/${numeroLimpio}?text=${mensaje}`, '_blank');
  };

  const abrirDetalles = (post) => {
    setPostSeleccionado(post);
  };

  const cerrarDetalles = () => {
    setPostSeleccionado(null);
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="text-center text-gray-600 py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <img src="/icons/pet1icon.png" alt="Mascota" className="w-10 h-10 md:w-12 md:h-12" />
          <span>Mascotas Perdidas</span>
        </h2>
        <p className="text-gray-600 text-lg">Ayuda a encontrar a estas mascotas</p>
      </div>
      {posts.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">😔</div>
          <p className="text-gray-600 text-lg">No hay mascotas perdidas publicadas en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-indigo-200 hover:-translate-y-2 group flex flex-col h-full"
            >
              <div className="w-full h-56 md:h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 relative flex-shrink-0">
                {post.imagenUrl ? (
                  <img
                    src={`${getApiBaseUrl()}${post.imagenUrl}`}
                    alt={post.nombreMascota || 'Mascota'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <span className="text-4xl">🐾</span>
                  </div>
                )}
              </div>
              <div className="p-5 md:p-6 flex flex-col flex-1">
                {/* Título - siempre presente */}
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                  {post.nombreMascota || 'Sin nombre'}
                </h3>
                
                {/* Descripción - siempre ocupa el mismo espacio */}
                <div className="mb-4 min-h-[4.5rem]">
                  {post.descripcion ? (
                    <p className="text-gray-600 text-sm md:text-base line-clamp-3 leading-relaxed">
                      {post.descripcion}
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm md:text-base line-clamp-3 leading-relaxed opacity-0">
                      &nbsp;
                    </p>
                  )}
                </div>
                
                {/* Zona y Fecha - siempre ocupa el mismo espacio */}
                <div className="space-y-2 mb-4 min-h-[3.5rem]">
                  {post.zona && (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-indigo-600">📍</span>
                      <span className="font-medium">Zona:</span> {post.zona}
                    </p>
                  )}
                  {post.fechaEvento && (
                    <p className="text-sm text-gray-700 flex items-center gap-2">
                      <span className="text-indigo-600">📅</span>
                      <span className="font-medium">Fecha:</span> {formatearFecha(post.fechaEvento)}
                    </p>
                  )}
                </div>
                
                {/* Recompensa - siempre ocupa el mismo espacio */}
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
                
                {/* Botón de Contacto - siempre en la parte inferior */}
                <div className="mt-auto pt-4 border-t border-gray-100">
                  <button
                    onClick={() => abrirDetalles(post)}
                    className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <img src="/icons/telephoneicon.png" alt="Contacto" className="w-5 h-5" />
                    <span>Ver Contacto</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalles y Contacto */}
      {postSeleccionado && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={cerrarDetalles}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-gray-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
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

            {/* Contenido del Modal */}
            <div className="p-6 space-y-4">
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
                        className="font-medium text-indigo-600 hover:text-indigo-700"
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
                        className="font-medium text-indigo-600 hover:text-indigo-700 break-all"
                      >
                        {postSeleccionado.email}
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Botones de Acción */}
              <div className="pt-4 space-y-2">
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
                    href={`mailto:${postSeleccionado.email}?subject=Consulta sobre ${postSeleccionado.nombreMascota || 'mascota perdida'}`}
                    className="block w-full py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors text-center flex items-center justify-center gap-2"
                  >
                    <img src="/icons/gmailicon.png" alt="Email" className="w-5 h-5" />
                    <span>Enviar Email</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Perdidos;
