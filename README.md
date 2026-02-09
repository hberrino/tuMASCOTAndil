# Tu Mascota Tandil 🐾

Sistema web completo para reportar y buscar mascotas perdidas en la ciudad de Tandil. Esta plataforma permite a los ciudadanos reportar mascotas extraviadas y visualizar los reportes publicados, facilitando la reunificación de mascotas con sus dueños.

## 📋 Descripción del Proyecto

**Tu Mascota Tandil** es una aplicación web desarrollada para ayudar a los habitantes de Tandil a encontrar sus mascotas perdidas. El sistema funciona como un tablón de anuncios digital donde:

- Los usuarios pueden reportar mascotas perdidas con fotos y detalles
- La comunidad puede visualizar todos los reportes publicados
- Los administradores moderan y aprueban los reportes antes de su publicación
- Se facilita el contacto entre quienes encontraron una mascota y sus dueños

### Propósito

Este proyecto fue creado para:
- **Centralizar** los reportes de mascotas perdidas en un solo lugar
- **Facilitar** la búsqueda y visualización de mascotas extraviadas
- **Moderar** el contenido mediante un sistema de aprobación administrativa
- **Proporcionar** una plataforma accesible y fácil de usar para toda la comunidad

## 🚀 Tecnologías Utilizadas

### Backend
- **Java 17** - Lenguaje de programación
- **Spring Boot 4.0.2** - Framework para aplicaciones Java
- **Spring Security** - Autenticación y autorización
- **Spring Data JPA** - Persistencia de datos
- **Hibernate** - ORM (Object-Relational Mapping)
- **PostgreSQL** - Base de datos relacional (Supabase)
- **Maven** - Gestión de dependencias y construcción
- **Docker** - Contenedorización (Dockerfile)
- **BCrypt** - Encriptación de contraseñas
- **Lombok** - Reducción de código boilerplate

### Frontend
- **React 19.2.0** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 7.2.4** - Herramienta de construcción y desarrollo
- **React Router DOM 7.13.0** - Enrutamiento de la aplicación
- **Axios 1.13.4** - Cliente HTTP para comunicación con la API
- **Tailwind CSS** - Framework de CSS utility-first
- **ESLint** - Linter para mantener calidad de código

### Servicios Externos
- **Supabase** - Base de datos PostgreSQL en la nube
- **Cloudinary** - Almacenamiento y gestión de imágenes
- **Render** - Hosting del backend (Spring Boot)
- **Vercel** - Hosting del frontend (React)

## 📁 Estructura del Proyecto

```
proyectotumascotandil/
├── backend/                    # Aplicación Spring Boot
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/buscatumascotandil/find/
│   │   │   │       ├── config/         # Configuraciones (Security, CORS)
│   │   │   │       ├── controller/     # Controladores REST
│   │   │   │       ├── dto/            # Data Transfer Objects
│   │   │   │       ├── exception/      # Manejo de excepciones
│   │   │   │       ├── mapper/         # Mappers de entidades
│   │   │   │       ├── model/          # Entidades JPA
│   │   │   │       ├── repository/     # Repositorios de datos
│   │   │   │       └── service/        # Lógica de negocio
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/                       # Tests unitarios
│   ├── Dockerfile                      # Imagen Docker del backend
│   └── pom.xml                         # Configuración Maven
│
├── frontend/                    # Aplicación React
│   ├── src/
│   │   ├── components/         # Componentes React
│   │   │   ├── Admin.jsx       # Panel de administración
│   │   │   ├── BuscaTuMascota.jsx
│   │   │   ├── Inicio.jsx
│   │   │   └── Perdidos.jsx    # Lista de mascotas perdidas
│   │   ├── services/
│   │   │   └── api.js          # Servicios de API
│   │   ├── App.jsx             # Componente principal
│   │   └── main.jsx            # Punto de entrada
│   ├── public/                 # Archivos estáticos
│   ├── package.json            # Dependencias npm
│   └── vite.config.js          # Configuración Vite
│
└── README.md                   # Este archivo
```

## 🎨 Funcionalidades del Frontend

### Secciones Disponibles

1. **Inicio** (`/`) - Página de bienvenida con información sobre el proyecto
2. **Perdidos** (`/perdidos`) - Galería de mascotas perdidas aprobadas y publicadas con paginación
3. **Busca tu Mascota** (`/busca-tu-mascota`) - Formulario para reportar una mascota perdida
4. **Admin** (`/admin`) - Panel de administración para moderar reportes

### Características

- **Diseño responsive** - Adaptable a dispositivos móviles y desktop
- **Navegación intuitiva** - Menú de navegación entre secciones
- **Carga de imágenes** - Los usuarios pueden subir fotos de las mascotas (Cloudinary)
- **Paginación** - Sistema de "Ver más" para cargar posts adicionales
- **Autenticación** - Sistema de login para administradores

## 📡 API y Endpoints

### Endpoints Públicos (sin autenticación)

- `GET /posts` - Listar todos los posts publicados y aprobados
- `GET /posts/{id}` - Obtener un post específico por ID
- `POST /posts` - Crear un nuevo reporte de mascota perdida
  - Requiere: nombre, descripción, foto, contacto, etc.

### Endpoints de Administración (requieren autenticación HTTP Basic)

- `GET /posts/pendientes` - Listar todos los posts pendientes de aprobación
- `PATCH /posts/{id}/aprobar` - Aprobar un post (cambia estado a PUBLICADO)
- `PATCH /posts/{id}/rechazar` - Rechazar un post (cambia estado a RECHAZADO y elimina imagen)
- `DELETE /posts/{id}` - Eliminar un post (soft delete y elimina imagen)

## 🔐 Panel de Administración

El panel de administración permite moderar el contenido antes de su publicación pública.

### Funcionalidades del Admin

- **Ver posts pendientes** - Lista de reportes esperando aprobación
- **Aprobar posts** - Publicar reportes en la sección "Perdidos"
- **Rechazar posts** - Eliminar reportes que no cumplan los criterios (elimina imagen de Cloudinary)
- **Eliminar posts** - Eliminar posts publicados (elimina imagen de Cloudinary)
- **Ver posts publicados** - Lista de todos los posts aprobados

## 🚀 Despliegue

### Backend (Render)

El backend está desplegado en **Render** como un servicio web:

- **Plataforma:** Render (Free Tier)
- **Build:** Maven build automático desde Dockerfile
- **Base de datos:** Supabase (PostgreSQL)
- **Variables de entorno requeridas:**
  - `DB_URL` - URL de conexión a Supabase
  - `DB_USERNAME` - Usuario de Supabase
  - `DB_PASSWORD` - Contraseña de Supabase
  - `CLOUDINARY_ENABLED` - Habilitar Cloudinary (true/false)
  - `CLOUDINARY_CLOUD_NAME` - Nombre de la nube en Cloudinary
  - `CLOUDINARY_API_KEY` - API Key de Cloudinary
  - `CLOUDINARY_API_SECRET` - API Secret de Cloudinary
  - `ADMIN_USERNAME` - Usuario del administrador
  - `ADMIN_PASSWORD` - Contraseña del administrador
  - `CORS_ALLOWED_ORIGINS` - Orígenes permitidos (ej: https://tumascotandil.vercel.app)

### Frontend (Vercel)

El frontend está desplegado en **Vercel**:

- **Plataforma:** Vercel 
- **Build:** Vite build automático
- **Variables de entorno requeridas:**

## 🔒 Seguridad

- **Autenticación HTTP Basic** para endpoints de administración
- **Encriptación BCrypt** para contraseñas de usuarios
- **CORS configurado** para permitir solo orígenes específicos
- **Validación de datos** en DTOs antes de procesar
- **Moderación de contenido** mediante sistema de aprobación
- **Eliminación automática de imágenes** al rechazar o eliminar posts (Cloudinary)

## 📝 Notas Importantes

- Los posts nuevos se crean en estado `PENDIENTE` y requieren aprobación del admin
- Las imágenes se almacenan en **Cloudinary** (no localmente)
- La base de datos está en **Supabase** (PostgreSQL en la nube)
- Para producción, todas las credenciales se configuran mediante variables de entorno
- El sistema elimina automáticamente las imágenes de Cloudinary al rechazar o eliminar posts para optimizar el uso del plan

---

**Desarrollado con ❤️ para ayudar a los animalitos de Tandil**
