import { useState, useEffect } from 'react';
import { getPostsPendientes, aprobarPost, rechazarPost, verificarBackend } from '../services/api';

const Admin = ({ onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setMensaje({ tipo: '', texto: '' });

    if (!username.trim() || !password.trim()) {
      setError('Por favor, ingresa usuario y contraseña');
      return;
    }

    try {
      setLoading(true);
      
      // Primero verificar que el backend esté disponible
      const backendStatus = await verificarBackend();
      if (!backendStatus.disponible) {
        setError('El backend no está disponible. Verifica que esté corriendo en http://localhost:8080');
        return;
      }
      
      const data = await getPostsPendientes(username.trim(), password);
      setPosts(data);
      setIsAuthenticated(true);
      setError(null);
      sessionStorage.setItem('admin_username', username.trim());
      sessionStorage.setItem('admin_password', password);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Credenciales incorrectas. Verifica usuario y contraseña.');
      } else if (err.message?.includes('No se pudo conectar')) {
        setError('No se pudo conectar con el backend. Verifica que esté corriendo en http://localhost:8080');
      } else {
        setError(`Error al autenticar: ${err.message || 'Error desconocido'}`);
      }
      console.error('Error en login:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
    setPosts([]);
    sessionStorage.removeItem('admin_username');
    sessionStorage.removeItem('admin_password');
  };

  const cargarPostsPendientes = async () => {
    const savedUsername = sessionStorage.getItem('admin_username');
    const savedPassword = sessionStorage.getItem('admin_password');
    
    if (!savedUsername || !savedPassword) {
      setIsAuthenticated(false);
      return;
    }

    try {
      setLoading(true);
      const data = await getPostsPendientes(savedUsername, savedPassword);
      setPosts(data);
      setIsAuthenticated(true);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        setError('Sesión expirada. Por favor, inicia sesión nuevamente.');
      } else {
        setError('Error al cargar posts pendientes.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUsername = sessionStorage.getItem('admin_username');
    const savedPassword = sessionStorage.getItem('admin_password');
    
    if (savedUsername && savedPassword) {
      cargarPostsPendientes();
    }
  }, []);

  const handleAprobar = async (id) => {
    const savedUsername = sessionStorage.getItem('admin_username');
    const savedPassword = sessionStorage.getItem('admin_password');

    if (!savedUsername || !savedPassword) {
      setMensaje({
        tipo: 'error',
        texto: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
      });
      handleLogout();
      return;
    }

    try {
      setLoading(true);
      setMensaje({ tipo: '', texto: '' });
      await aprobarPost(id, savedUsername, savedPassword);
      setMensaje({
        tipo: 'success',
        texto: 'Post aprobado exitosamente. Ahora será visible en la sección "Perdidos".',
      });
      setTimeout(async () => {
        await cargarPostsPendientes();
      }, 500);
    } catch (err) {
      let errorMessage = 'Error al aprobar el post. Intenta nuevamente.';
      
      if (err.response?.status === 401) {
        errorMessage = 'No autorizado. Verifica tus credenciales.';
        handleLogout();
      } else if (err.response?.status === 404) {
        errorMessage = 'Post no encontrado.';
      } else if (err.response?.status === 403) {
        errorMessage = 'No tienes permisos para realizar esta acción.';
      } else if (err.response?.status) {
        errorMessage = `Error del servidor (${err.response.status}): ${err.response.statusText || 'Error desconocido'}`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setMensaje({
        tipo: 'error',
        texto: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRechazar = async (id) => {
    const savedUsername = sessionStorage.getItem('admin_username');
    const savedPassword = sessionStorage.getItem('admin_password');

    if (!savedUsername || !savedPassword) {
      setMensaje({
        tipo: 'error',
        texto: 'Sesión expirada. Por favor, inicia sesión nuevamente.',
      });
      handleLogout();
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas rechazar este post?')) {
      return;
    }

    try {
      setLoading(true);
      setMensaje({ tipo: '', texto: '' });
      await rechazarPost(id, savedUsername, savedPassword);
      setMensaje({
        tipo: 'success',
        texto: 'Post rechazado exitosamente.',
      });
      setTimeout(async () => {
        await cargarPostsPendientes();
      }, 500);
    } catch (err) {
      let errorMessage = 'Error al rechazar el post. Intenta nuevamente.';
      
      if (err.response?.status === 401) {
        errorMessage = 'No autorizado. Verifica tus credenciales.';
        handleLogout();
      } else if (err.response?.status === 404) {
        errorMessage = 'Post no encontrado.';
      } else if (err.response?.status === 403) {
        errorMessage = 'No tienes permisos para realizar esta acción.';
      } else if (err.response?.status) {
        errorMessage = `Error del servidor (${err.response.status}): ${err.response.statusText || 'Error desconocido'}`;
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setMensaje({
        tipo: 'error',
        texto: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const formatearFecha = (fecha) => {
    if (!fecha) return '';
    const date = new Date(fecha);
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatearMonto = (monto) => {
    if (!monto) return null;
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(monto);
  };

  // Verificar backend al montar el componente
  useEffect(() => {
    const verificar = async () => {
      const status = await verificarBackend();
      if (!status.disponible) {
        setError(`⚠️ Backend no disponible. Verifica que esté corriendo en http://localhost:8080\n\nError: ${status.error || 'No se pudo conectar'}`);
      }
    };
    verificar();
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="p-4 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2 text-center">
          Panel de Administración
        </h2>
        <p className="text-center text-gray-600 mb-6">Ingresa tus credenciales para acceder</p>

        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-800 border-2 border-red-300 rounded-xl text-center whitespace-pre-line">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="max-w-md mx-auto space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-sm md:text-base font-medium text-gray-700">
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="admin"
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm md:text-base font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Tu contraseña"
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm md:text-base"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 md:py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="flex-1 sm:flex-initial sm:min-w-[120px] py-2.5 md:py-3 bg-gray-600 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
              >
                Cerrar
              </button>
            )}
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 max-h-[90vh] overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Panel de Administración</h2>
        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm md:text-base"
          >
            Cerrar Sesión
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>

      {mensaje.texto && (
        <div
          className={`mb-4 p-4 rounded-lg text-center ${
            mensaje.tipo === 'success'
              ? 'bg-green-50 text-green-800 border border-green-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          {mensaje.texto}
        </div>
      )}

      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-base md:text-lg">
          Posts pendientes: <strong>{posts.length}</strong>
        </p>
      </div>

      {loading && posts.length === 0 ? (
        <div className="text-center text-gray-600 py-12">Cargando posts pendientes...</div>
      ) : posts.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p>No hay posts pendientes de aprobación.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-col md:flex-row gap-4"
            >
              <div className="w-full md:w-64 h-48 md:h-64 flex-shrink-0 overflow-hidden bg-gray-200 rounded-lg">
                {post.imagenUrl ? (
                  <img
                    src={`http://localhost:8080${post.imagenUrl}`}
                    alt={post.nombreMascota || 'Mascota'}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>

              <div className="flex-1 space-y-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800">
                  {post.nombreMascota || 'Sin nombre'}
                </h3>
                
                {post.descripcion && (
                  <p className="text-gray-600 text-sm md:text-base">{post.descripcion}</p>
                )}

                <div className="space-y-1 text-sm md:text-base text-gray-700">
                  {post.zona && <p><strong>Zona:</strong> {post.zona}</p>}
                  {post.fechaEvento && (
                    <p><strong>Fecha del evento:</strong> {formatearFecha(post.fechaEvento)}</p>
                  )}
                  {post.fechaCreacion && (
                    <p><strong>Fecha de creación:</strong> {formatearFecha(post.fechaCreacion)}</p>
                  )}
                  {post.montoRecompensa && (
                    <p><strong>Recompensa:</strong> {formatearMonto(post.montoRecompensa)}</p>
                  )}
                  {post.tipoPublicacion && (
                    <p><strong>Tipo:</strong> {post.tipoPublicacion}</p>
                  )}
                </div>

                {post.nombreContacto && (
                  <div className="p-3 bg-gray-50 rounded-lg text-sm md:text-base">
                    <p><strong>Contacto:</strong> {post.nombreContacto}</p>
                    {post.telefono && <p><strong>Teléfono:</strong> {post.telefono}</p>}
                    {post.email && <p><strong>Email:</strong> {post.email}</p>}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 pt-2">
                  <button
                    onClick={() => handleAprobar(post.id)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    ✓ Aprobar
                  </button>
                  <button
                    onClick={() => handleRechazar(post.id)}
                    disabled={loading}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed text-sm md:text-base"
                  >
                    ✗ Rechazar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
