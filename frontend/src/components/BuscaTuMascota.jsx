import { useState } from 'react';
import { crearPost } from '../services/api';
import './BuscaTuMascota.css';

const BuscaTuMascota = () => {
  const [formData, setFormData] = useState({
    nombreMascota: '',
    descripcion: '',
    zona: '',
    fechaEvento: '',
    montoRecompensa: '',
    tipoPublicacion: 'PERDIDO',
    nombreContacto: '',
    telefono: '',
    email: '',
    whatsapp: '',
  });
  const [imagen, setImagen] = useState(null);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ tipo: '', texto: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setMensaje({
          tipo: 'error',
          texto: 'La imagen no puede superar los 5MB',
        });
        return;
      }
      if (!file.type.startsWith('image/')) {
        setMensaje({
          tipo: 'error',
          texto: 'El archivo debe ser una imagen válida',
        });
        return;
      }
      setImagen(file);
      setMensaje({ tipo: '', texto: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje({ tipo: '', texto: '' });

    // Validaciones básicas
    if (!formData.nombreMascota.trim()) {
      setMensaje({ tipo: 'error', texto: 'El nombre de la mascota es obligatorio' });
      return;
    }
    if (!formData.zona.trim()) {
      setMensaje({ tipo: 'error', texto: 'La zona es obligatoria' });
      return;
    }
    if (!formData.fechaEvento) {
      setMensaje({ tipo: 'error', texto: 'La fecha del evento es obligatoria' });
      return;
    }
    if (!formData.nombreContacto.trim()) {
      setMensaje({ tipo: 'error', texto: 'El nombre de contacto es obligatorio' });
      return;
    }
    if (!formData.telefono.trim()) {
      setMensaje({ tipo: 'error', texto: 'El teléfono es obligatorio' });
      return;
    }
    if (!imagen) {
      setMensaje({ tipo: 'error', texto: 'La imagen es obligatoria' });
      return;
    }

    try {
      setLoading(true);

      // Convertir fecha de datetime-local a formato ISO para el backend
      const fechaISO = formData.fechaEvento
        ? new Date(formData.fechaEvento).toISOString()
        : null;

      // Preparar los datos para enviar
      const dataToSend = {
        nombreMascota: formData.nombreMascota.trim(),
        descripcion: formData.descripcion.trim() || null,
        zona: formData.zona.trim(),
        fechaEvento: fechaISO,
        montoRecompensa: formData.montoRecompensa
          ? parseFloat(formData.montoRecompensa)
          : null,
        tipoPublicacion: formData.tipoPublicacion,
        nombreContacto: formData.nombreContacto.trim(),
        telefono: formData.telefono.trim(),
        email: formData.email.trim() || null,
        whatsapp: formData.whatsapp.trim() || null,
      };

      // Crear FormData para multipart/form-data
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify(dataToSend));
      formDataToSend.append('imagen', imagen);

      const response = await crearPost(formDataToSend);

      setMensaje({
        tipo: 'success',
        texto: '¡Post creado exitosamente! Estará pendiente de aprobación.',
      });

      // Limpiar formulario
      setFormData({
        nombreMascota: '',
        descripcion: '',
        zona: '',
        fechaEvento: '',
        montoRecompensa: '',
        tipoPublicacion: 'PERDIDO',
        nombreContacto: '',
        telefono: '',
        email: '',
        whatsapp: '',
      });
      setImagen(null);
      e.target.reset();
    } catch (error) {
      console.error('Error al crear post:', error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear el post. Por favor, intenta nuevamente.';
      setMensaje({ tipo: 'error', texto: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 flex items-center justify-center gap-3">
          <img src="/icons/findicon.png" alt="Buscar" className="w-10 h-10 md:w-12 md:h-12" />
          <span>Busca tu Mascota</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Completa el formulario para publicar tu mascota perdida
        </p>
      </div>

      {mensaje.texto && (
        <div
          className={`mb-6 p-5 rounded-xl text-center shadow-md border-2 ${
            mensaje.tipo === 'success'
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-800 border-green-300'
              : 'bg-gradient-to-r from-red-50 to-rose-50 text-red-800 border-red-300'
          }`}
        >
          <p className="font-semibold">{mensaje.texto}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 md:p-10 space-y-8"
      >
        {/* Información de la Mascota */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-indigo-200">
            <span className="text-3xl">🐾</span>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Información de la Mascota
            </h3>
          </div>

          <div className="space-y-2">
            <label htmlFor="nombreMascota" className="block text-sm md:text-base font-semibold text-gray-700">
              <span className="flex items-center gap-2">
                Nombre de la Mascota <span className="text-red-500">*</span>
                <div className="group relative">
                  <span className="text-indigo-600 cursor-help">ℹ️</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                      Ejemplo: Max, Luna, Toby
                      <br />
                      (Nombre de tu mascota)
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <input
              type="text"
              id="nombreMascota"
              name="nombreMascota"
              value={formData.nombreMascota}
              onChange={handleChange}
              required
              placeholder="Ej: Max, Luna, etc."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
            />
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <div>
                <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                <p>Ingresa el <strong>nombre</strong> de tu mascota. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">Max</span> o <span className="font-mono bg-blue-100 px-1 rounded">Luna</span></p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="descripcion" className="block text-sm md:text-base font-semibold text-gray-700">
              <span className="flex items-center gap-2">
                Descripción
                <div className="group relative">
                  <span className="text-indigo-600 cursor-help">ℹ️</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                      Ejemplo: Perro mediano, color marrón
                      <br />
                      (Características físicas)
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="4"
              placeholder="Describe características físicas, comportamiento, etc."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base resize-y hover:border-gray-400"
            />
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <div>
                <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                <p>Describe las <strong>características físicas</strong> de tu mascota (tamaño, color, raza, etc.) y su comportamiento. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">Perro mediano, color marrón, collar rojo</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="zona" className="block text-sm md:text-base font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  Zona <span className="text-red-500">*</span>
                  <div className="group relative">
                    <span className="text-indigo-600 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                        Ejemplo: Centro, Villa Italia
                        <br />
                        (Zona donde se perdió)
                      </div>
                    </div>
                  </div>
                </span>
              </label>
              <input
                type="text"
                id="zona"
                name="zona"
                value={formData.zona}
                onChange={handleChange}
                required
                placeholder="Ej: Centro, Villa Italia"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              />
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                  <p>Indica la <strong>zona o barrio</strong> de Tandil donde se perdió tu mascota. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">Centro</span> o <span className="font-mono bg-blue-100 px-1 rounded">Villa Italia</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="fechaEvento" className="block text-sm md:text-base font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  Fecha y Hora del Evento <span className="text-red-500">*</span>
                  <div className="group relative">
                    <span className="text-indigo-600 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                        Ejemplo: 15/01/2024 14:30
                        <br />
                        (Fecha y hora cuando se perdió)
                      </div>
                    </div>
                  </div>
                </span>
              </label>
              <input
                type="datetime-local"
                id="fechaEvento"
                name="fechaEvento"
                value={formData.fechaEvento}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              />
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                  <p>Selecciona la <strong>fecha y hora</strong> cuando tu mascota se perdió. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">15/01/2024 14:30</span></p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="tipoPublicacion" className="block text-sm md:text-base font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  Tipo de Publicación <span className="text-red-500">*</span>
                  <div className="group relative">
                    <span className="text-indigo-600 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                        Perdido: Buscas tu mascota
                        <br />
                        Encontrado: Encontraste una
                      </div>
                    </div>
                  </div>
                </span>
              </label>
              <select
                id="tipoPublicacion"
                name="tipoPublicacion"
                value={formData.tipoPublicacion}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              >
                <option value="PERDIDO">Perdido</option>
                <option value="ENCONTRADO">Encontrado</option>
              </select>
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                  <p>Selecciona <strong>"Perdido"</strong> si buscas tu mascota, o <strong>"Encontrado"</strong> si encontraste una mascota perdida.</p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="montoRecompensa" className="block text-sm md:text-base font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  Monto de Recompensa (opcional)
                  <div className="group relative">
                    <span className="text-indigo-600 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                        Ejemplo: 5000.00
                        <br />
                        (Monto en pesos argentinos)
                      </div>
                    </div>
                  </div>
                </span>
              </label>
              <input
                type="number"
                id="montoRecompensa"
                name="montoRecompensa"
                value={formData.montoRecompensa}
                onChange={handleChange}
                min="0"
                step="0.01"
                placeholder="0.00"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              />
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                  <p>Si ofreces una <strong>recompensa</strong> por encontrar tu mascota, ingresa el monto en pesos argentinos. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">5000.00</span>. Este campo es opcional.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="imagen" className="block text-sm md:text-base font-medium text-gray-700">
              <span className="flex items-center gap-2">
                Imagen <span className="text-red-500">*</span>
                <div className="group relative">
                  <span className="text-indigo-600 cursor-help">ℹ️</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                      Formatos: JPG, PNG
                      <br />
                      Máximo: 5MB
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <input
              type="file"
              id="imagen"
              name="imagen"
              accept="image/*"
              onChange={handleImageChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
            />
            {imagen && (
              <div className="mt-4 flex flex-col items-center gap-3 p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <img
                  src={URL.createObjectURL(imagen)}
                  alt="Preview"
                  className="max-w-full max-h-48 md:max-h-64 object-cover rounded-lg border-2 border-gray-200 shadow-md"
                />
                <span className="text-xs md:text-sm text-gray-600 font-medium">{imagen.name}</span>
              </div>
            )}
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <div>
                <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                <p>Sube una <strong>foto clara</strong> de tu mascota. Formatos aceptados: JPG, PNG. Tamaño máximo: <span className="font-mono bg-blue-100 px-1 rounded">5MB</span>. La imagen ayuda mucho a identificarla.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Información de Contacto */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 pb-4 border-b-2 border-indigo-200">
            <img src="/icons/telephoneicon.png" alt="Contacto" className="w-8 h-8 md:w-10 md:h-10" />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">
              Información de Contacto
            </h3>
          </div>

          <div className="space-y-2">
            <label htmlFor="nombreContacto" className="block text-sm md:text-base font-medium text-gray-700">
              <span className="flex items-center gap-2">
                Nombre de Contacto <span className="text-red-500">*</span>
                <div className="group relative">
                  <span className="text-indigo-600 cursor-help">ℹ️</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                      Ejemplo: Juan Pérez
                      <br />
                      (Tu nombre completo)
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <input
              type="text"
              id="nombreContacto"
              name="nombreContacto"
              value={formData.nombreContacto}
              onChange={handleChange}
              required
              placeholder="Tu nombre"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
            />
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <div>
                <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                <p>Ingresa tu <strong>nombre completo</strong> para que puedan contactarte. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">Juan Pérez</span></p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="telefono" className="block text-sm md:text-base font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  Teléfono <span className="text-red-500">*</span>
                  <div className="group relative">
                    <span className="text-indigo-600 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                        Ejemplo: 2494123456
                        <br />
                        (Sin espacios ni guiones)
                      </div>
                    </div>
                  </div>
                </span>
              </label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                required
                placeholder="Ej: 2494123456"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              />
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                  <p>Ingresa tu <strong>número de teléfono</strong> sin espacios ni guiones. Incluye el código de área. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">2494123456</span></p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700">
                <span className="flex items-center gap-2">
                  Email
                  <div className="group relative">
                    <span className="text-indigo-600 cursor-help">ℹ️</span>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                      <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                          <div className="border-4 border-transparent border-t-gray-800"></div>
                        </div>
                        Ejemplo: juan@email.com
                        <br />
                        (Campo opcional)
                      </div>
                    </div>
                  </div>
                </span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
              />
              <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                  <p>Ingresa tu <strong>correo electrónico</strong> si quieres que te contacten por email. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">juan@email.com</span>. Este campo es opcional.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="whatsapp" className="block text-sm md:text-base font-medium text-gray-700">
              <span className="flex items-center gap-2">
                WhatsApp (opcional)
                <div className="group relative">
                  <span className="text-indigo-600 cursor-help">ℹ️</span>
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                    <div className="bg-gray-800 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-800"></div>
                      </div>
                      Ejemplo: 2494123456
                      <br />
                      (Sin espacios ni guiones)
                    </div>
                  </div>
                </div>
              </span>
            </label>
            <input
              type="text"
              id="whatsapp"
              name="whatsapp"
              value={formData.whatsapp}
              onChange={handleChange}
              placeholder="Ej: 2494123456"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 text-sm md:text-base hover:border-gray-400"
            />
            <div className="flex items-start gap-2 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded-lg p-2">
              <span className="text-blue-600 mt-0.5">💡</span>
              <div>
                <p className="font-medium text-blue-800 mb-1">¿Qué poner aquí?</p>
                <p>Si quieres que te contacten por <strong>WhatsApp</strong>, ingresa tu número sin espacios ni guiones. Por ejemplo: <span className="font-mono bg-blue-100 px-1 rounded">2494123456</span>. Este campo es opcional.</p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed text-base md:text-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <img src="/icons/pet2icon.png" alt="Mascota" className="w-5 h-5 md:w-6 md:h-6" />
              Publicar Mascota
              <img src="/icons/pet2icon.png" alt="Mascota" className="w-5 h-5 md:w-6 md:h-6" />
            </span>
          )}
        </button>
      </form>
    </div>
  );
};

export default BuscaTuMascota;
