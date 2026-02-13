import './Veterinarias.css';

const Veterinarias = () => {
  const veterinarias = [
    {
      id: 1,
      nombre: 'Veterinaria Tandil',
      telefono: '0249 444-8235',
      direccion: 'Montevideo 562, C7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Veterinaria+Tandil,+Montevideo+562,+C7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.7
    },
    {
      id: 2,
      nombre: 'Medicina Animal Tandil',
      telefono: '0249 448-4800',
      direccion: 'San Lorenzo 380, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Medicina+Animal+Tandil,+San+Lorenzo+380,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.8
    },
    {
      id: 3,
      nombre: 'Clínica Veterinaria Colonial',
      telefono: '0249 452-4806',
      direccion: '11 de Septiembre 1030, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Cl%C3%ADnica+Veterinaria+Colonial,+11+de+Septiembre+1030,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.7
    },
    {
      id: 4,
      nombre: 'Veterinaria Las Heras',
      telefono: '0249 438-8826',
      direccion: 'Gral. Paz 1096, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Veterinaria+Las+Heras,+Gral.+Paz+1096,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.6
    },
    {
      id: 5,
      nombre: 'Veterinaria Serrana',
      telefono: '0249 15-421-6365',
      direccion: 'Av. Perón 1472, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Veterinaria+Serrana,+Av.+Per%C3%B3n+1472,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.9
    },
    {
      id: 6,
      nombre: 'Clínica Veterinaria Sappia',
      telefono: '0249 469-3346',
      direccion: 'Quintana 486, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Cl%C3%ADnica+Veterinaria+Sappia,+Quintana+486,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.7
    },
    {
      id: 7,
      nombre: 'Clínica Veterinaria San Lorenzo',
      telefono: '0249 461-2222',
      direccion: 'San Lorenzo 947, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Cl%C3%ADnica+Veterinaria+San+Lorenzo,+San+Lorenzo+947,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 5.0
    },
    {
      id: 8,
      nombre: 'Veterinario a Domicilio Tandil',
      telefono: '0249 468-2540',
      direccion: 'Servicio a domicilio, Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Veterinario+a+Domicilio+Tandil',
      calificacion: 5.0
    },
    {
      id: 9,
      nombre: 'Consultorio Veterinario Fernandez',
      telefono: '0249 444-4777',
      direccion: 'Gral. Paz 542, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Consultorio+Veterinario+Fernandez,+Gral.+Paz+542,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.9
    },
    {
      id: 10,
      nombre: 'Clínica Veterinaria Paula Ribas',
      telefono: '0249 447-6615',
      direccion: 'Azcuénaga 171, C7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Cl%C3%ADnica+Veterinaria+Paula+Ribas,+Azcu%C3%A9naga+171,+C7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.8
    },
    {
      id: 11,
      nombre: 'Veterinary Clinic Aloyan',
      telefono: '0249 423-4282',
      direccion: 'Av. Perón 1014, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Veterinary+Clinic+Aloyan,+Av.+Per%C3%B3n+1014,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.7
    },
    {
      id: 12,
      nombre: 'VETERINARIA AMAIKE',
      telefono: '0249 447-7295',
      direccion: 'Av. Simón Bolívar 51, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//VETERINARIA+AMAIKE,+Av.+Sim%C3%B3n+Bol%C3%ADvar+51,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.5
    },
    {
      id: 13,
      nombre: 'Veterinary My Pets',
      telefono: '0249 447-8457',
      direccion: 'San Lorenzo 1382, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Veterinary+My+Pets,+San+Lorenzo+1382,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.8
    },
    {
      id: 14,
      nombre: 'Centro médico veterinario Villa Italia',
      telefono: '0249 453-6418',
      direccion: 'Ameghino 412, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Centro+médico+veterinario+Villa+Italia,+Ameghino+412,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.5
    },
    {
      id: 15,
      nombre: 'VETERINARIA CIVET',
      telefono: '0249 462-6767',
      direccion: 'Av. Rivadavia 669, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//VETERINARIA+CIVET,+Av.+Rivadavia+669,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.7
    },
    {
      id: 16,
      nombre: 'Sanatorio Veterinario del Tandil',
      telefono: '0249 442-2818',
      direccion: 'Gral. Rodríguez 45, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//Sanatorio+Veterinario+del+Tandil,+Gral.+Rodr%C3%ADguez+45,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.7
    },
    {
      id: 17,
      nombre: 'MILLA CURA',
      telefono: '0249 464-4677',
      direccion: 'Antártida Argentina 1011, B7000 Tandil, Provincia de Buenos Aires, Argentina',
      linkMap: 'https://www.google.com/maps/dir//MILLA+CURA,+Ant%C3%A1rtida+Argentina+1011,+B7000+Tandil,+Provincia+de+Buenos+Aires',
      calificacion: 4.6
    }
  ];

  const clinicasAdicionales = [
    { nombre: 'Centro Rural Tandil', direccion: 'Av España 909, Tandil' },
    { nombre: 'Laboratorio Diagnóstico Veterinario', direccion: 'Caseros 736/738, Tandil' },
    { nombre: 'Centro Canino', direccion: 'Mayor M. Novoa 809 PB, B7000 Tandil' }
  ];

  const abrirTelefono = (telefono) => {
    const numeroLimpio = telefono.replace(/\D/g, '');
    window.location.href = `tel:${numeroLimpio}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 sm:mb-10 md:mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 sm:mb-4">
          <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Veterinarias en Tandil
          </span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-teal-500 mx-auto rounded-full mb-4"></div>
        <p className="text-gray-600 text-lg sm:text-xl">Encuentra atención veterinaria para tu mascota</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
        {veterinarias.map((veterinaria) => (
          <div
            key={veterinaria.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200 hover:-translate-y-2 group flex flex-col h-full"
          >
            <div className="p-5 md:p-6 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors flex-1">
                  {veterinaria.nombre}
                </h3>
                {veterinaria.calificacion && (
                  <div className="flex items-center gap-1 ml-2 flex-shrink-0">
                    <span className="text-yellow-500 text-lg">⭐</span>
                    <span className="text-sm font-semibold text-gray-700">{veterinaria.calificacion}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-4 flex-grow">
                <div className="flex items-start gap-2">
                  <span className="text-green-600 text-lg flex-shrink-0 mt-0.5">📍</span>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {veterinaria.direccion}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-lg">📞</span>
                  <a
                    href={`tel:${veterinaria.telefono.replace(/\D/g, '')}`}
                    onClick={(e) => {
                      e.preventDefault();
                      abrirTelefono(veterinaria.telefono);
                    }}
                    className="text-gray-700 hover:text-green-600 font-medium text-sm md:text-base transition-colors"
                  >
                    {veterinaria.telefono}
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-4 border-t border-gray-100">
                <a
                  href={veterinaria.linkMap}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 text-sm md:text-base shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Ver Mapa</span>
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Clínicas Adicionales */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4 text-center">
            <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              Centros Adicionales
            </span>
          </h3>
          <p className="text-gray-600 text-sm md:text-base mb-6 text-center">
            Centros relacionados con atención veterinaria y servicios para mascotas
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {clinicasAdicionales.map((clinica, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-gray-200 p-5 md:p-6 text-center"
              >
                <div className="mb-3">
                  <span className="text-3xl">🏥</span>
                </div>
                <h4 className="font-bold text-gray-800 text-base md:text-lg mb-2">
                  {clinica.nombre}
                </h4>
                <p className="text-gray-600 text-sm md:text-base flex items-center justify-center gap-2">
                  <span className="text-gray-400">📍</span>
                  <span>{clinica.direccion}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Veterinarias;
