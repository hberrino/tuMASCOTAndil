import axios from 'axios';

const rawUrl = (import.meta.env.VITE_API_URL || 'http://localhost:8080').trim();
const API_BASE_URL = rawUrl.replace(/\/+$/, '');

export const getApiBaseUrl = () => API_BASE_URL;

export const getImageUrl = (imagenUrl) => {
  if (!imagenUrl) return null;
  
  if (imagenUrl.startsWith('http://') || imagenUrl.startsWith('https://')) {
    return imagenUrl;
  }
  
  const path = imagenUrl.startsWith('/') ? imagenUrl : `/${imagenUrl}`;
  return `${API_BASE_URL}${path}`;
};

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 100000,
});

export const verificarBackend = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/posts`, {
      timeout: 5000,
      validateStatus: () => true,
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

export const getPostsPublicados = async () => {
  try {
    const response = await api.get('/posts');
    return response.data;
  } catch (error) {
    console.error('Error al obtener posts:', error);
    throw error;
  }
};

export const getPostById = async (id) => {
  try {
    const response = await api.get(`/posts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener post:', error);
    throw error;
  }
};

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

export const getPostsPendientes = async (username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
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

export const aprobarPost = async (id, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
    const credentials = btoa(`${username}:${password}`);
    const url = `${API_BASE_URL}/posts/${id}/aprobar`;
    
    console.log('Intentando aprobar post:', { id, url, username });
    
    const response = await axios.patch(
      url,
      null,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
        validateStatus: function (status) {
          return status < 500;
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
      console.error('Respuesta del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      console.error('Error al configurar la petición:', error.message);
      throw error;
    }
  }
};

export const rechazarPost = async (id, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
    const credentials = btoa(`${username}:${password}`);
    const url = `${API_BASE_URL}/posts/${id}/rechazar`;
    
    console.log('Intentando rechazar post:', { id, url, username });
    
    const response = await axios.patch(
      url,
      null,
      {
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/json',
        },
        withCredentials: false,
        validateStatus: function (status) {
          return status < 500;
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
      console.error('Respuesta del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      console.error('Error al configurar la petición:', error.message);
      throw error;
    }
  }
};

export const eliminarPost = async (id, username, password) => {
  try {
    if (!username || !password) {
      throw new Error('Credenciales no proporcionadas');
    }
    
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
          return status < 500;
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
      console.error('Respuesta del servidor:', {
        status: error.response.status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
      });
      throw new Error(`Error del servidor (${error.response.status}): ${error.response.statusText || 'Error desconocido'}`);
    } else if (error.request) {
      console.error('No hubo respuesta del servidor:', error.request);
      throw new Error('No se pudo conectar con el servidor. Verifica que el backend esté corriendo.');
    } else {
      console.error('Error al configurar la petición:', error.message);
      throw error;
    }
  }
};

export default api;
