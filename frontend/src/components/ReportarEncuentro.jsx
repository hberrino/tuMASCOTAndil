import { useState } from 'react';
import { reportarEncuentro } from '../services/api';
import './ReportarEncuentro.css';

const ReportarEncuentro = () => {
  const [nombreMascota, setNombreMascota] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    if (!nombreMascota.trim()) {
      setMensaje({ tipo: 'error', texto: 'Por favor, ingresa el nombre de la mascota' });
      return;
    }

    try {
      setLoading(true);
      await reportarEncuentro(nombreMascota.trim());
      setMensaje({
        tipo: 'success',
        texto: '¡Aviso enviado exitosamente! Gracias por reportar el encuentro.',
      });
      setNombreMascota('');
    } catch (error) {
      console.error('Error al reportar encuentro:', error);
      let errorMessage = 'Error al enviar el aviso. Por favor, intenta nuevamente.';
      
      if (error.response?.data) {
        // Si hay errores de validación del backend
        if (error.response.data.nombreMascota) {
          errorMessage = error.response.data.nombreMascota;
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data.message) {
          errorMessage = error.response.data.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      setMensaje({ tipo: 'error', texto: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8 md:py-12">
      <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
            Reportar Encuentro
          </h2>
          <p className="text-gray-600 text-base md:text-lg">
            ¿Tu mascota ya ha sido encontrada? Ingresa el nombre para dar aviso.
          </p>
        </div>

        {mensaje.texto && (
          <div
            className={`mb-6 p-4 rounded-lg text-center ${
              mensaje.tipo === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="nombreMascota"
              className="block text-sm md:text-base font-medium text-gray-700 mb-2"
            >
              Nombre de la Mascota
            </label>
            <input
              type="text"
              id="nombreMascota"
              value={nombreMascota}
              onChange={(e) => setNombreMascota(e.target.value)}
              placeholder="Ej: Max, Luna, Toby..."
              disabled={loading}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
          >
            {loading ? 'Enviando...' : 'Enviar Aviso'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportarEncuentro;
