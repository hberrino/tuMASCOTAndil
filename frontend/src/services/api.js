import axios from 'axios';

// Usar variable de entorno para la URL del backend
// En desarrollo: VITE_API_URL=http://localhost:8080
// En producción (Vercel): VITE_API_URL=https://tu-backend-en-render.onrender.com
// Normalizar la URL para evitar dobles barras
const rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8080').trim();
const API_BASE_URL = rawUrl.replace(/\/+$/, ''); // Eliminar todas las barras finales

// Exportar la URL base para usar en otros componentes (ej: para imágenes)
export const getApiBaseUrl = () => API_BASE_URL;

// Función helper para construir la URL de imagen correcta
// Si la URL ya es completa (Cloudinary), la usa directamente
// Si es relativa (imagen local), la concatena con la URL base del backend
export const getImageUrl = (imagenUrl) => {
  if (!imagenUrl) return null;
  
  // Si la URL ya es completa (empieza con http:// o https://), usarla directamente
  if (imagenUrl.startsWith('http://') || imagenUrl.startsWith('https://')) {
    return imagenUrl;
  }
  
  // Si es una ruta relativa, concatenar con la URL base del backend
  // Asegurar que la ruta relativa empiece con /
  const path = imagenUrl.startsWith('/') ? imagenUrl : `/${imagenUrl}`;
  return `${API_BASE_URL}${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos de timeout
});

// Función para verificar si el backend está disponible
export const verificarBackend = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      timeout: 5000,
      validateStatus: () => true, // No lanzar error para ningún status
    });
    return {
      disponible: true,
      status: response.status,
    };
  } catch (error) {
    console.error('Backend no disponible:', error.message);
    return {
      disponible: false,
      error: error.message,
    };
  }
};

// Obtener todos los posts publicados
export const getPostsPublicados = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error al obtener posts:', error);
    throw error;
  }
};

// Obtener un post por ID
export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener post:', error);
    throw error;
  }
};

// Crear un nuevo post
export const crearPost = async (formData) => {
  try {
    const response = await api.post('/posts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear post:', error);
    throw error;
  }
};

// ============ ADMIN ENDPOINTS ============

// Obtener posts pendientes (requiere autenticación)
export const getPostsPendientes = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
    // Crear el header de autenticación HTTP Basic manualmente
    const credentials = btoa(`${username}:${password}`);
    
    const response = await axios.get(
      `${API_BASE_URL}/posts/pendientes`,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error al obtener posts pendientes:', error);
    throw error;
  }
};

// Aprobar un post (requiere autenticación)
export const aprobarPost = async (id, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
    // Crear el header de autenticación HTTP Basic manualmente
    const credentials = btoa(`${username}:${password}`);
    const url = `${API_BASE_URL}/posts/${id}/aprobar`;
    
    console.log('Intentando aprobar post:', { id, url, username });
    
    const response = await axios.patch(
      url,
      null, // body null para PATCH
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
        validateStatus: function (status) {
          return status < 500; // No lanzar error para códigos 4xx
        },
      }
    );
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText || 'Error desconocido'}`);
    }
  } catch (error) {
    console.error('Error al aprobar post:', error);
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Respuesta del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      // Algo más causó el error
      console.error('Error al configurar la petición:', error.message);
      throw error;
    }
  }
};

// Rechazar un post (requiere autenticación)
export const rechazarPost = async (id, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
    // Crear el header de autenticación HTTP Basic manualmente
    const credentials = btoa(`${username}:${password}`);
    const url = `${API_BASE_URL}/posts/${id}/rechazar`;
    
    console.log('Intentando rechazar post:', { id, url, username });
    
    const response = await axios.patch(
      url,
      null, // body null para PATCH
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
        validateStatus: function (status) {
          return status < 500; // No lanzar error para códigos 4xx
        },
      }
    );
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText || 'Error desconocido'}`);
    }
  } catch (error) {
    console.error('Error al rechazar post:', error);
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Respuesta del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      // Algo más causó el error
      console.error('Error al configurar la petición:', error.message);
      throw error;
    }
  }
};

// Eliminar un post (requiere autenticación)
export const eliminarPost = async (id, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
    // Crear el header de autenticación HTTP Basic manualmente
    const credentials = btoa(`${username}:${password}`);
    const url = `${API_BASE_URL}/posts/${id}`;
    
    console.log('Intentando eliminar post:', { id, url, username });
    
    const response = await axios.delete(
      url,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
        validateStatus: function (status) {
          return status < 500; // No lanzar error para códigos 4xx
        },
      }
    );
    
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      throw new Error(`Error ${response.status}: ${response.statusText || 'Error desconocido'}`);
    }
  } catch (error) {
    console.error('Error al eliminar post:', error);
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Respuesta del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`);
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      // Algo más causó el error
      console.error('Error al configurar la petición:', error.message);
      throw error;
    }
  }
};

export default api;
