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
- **MySQL 8.0** - Base de datos relacional
- **Maven** - Gestión de dependencias y construcción
- **Docker & Docker Compose** - Contenedorización y orquestación
- **BCrypt** - Encriptación de contraseñas
- **Lombok** - Reducción de código boilerplate

### Frontend
- **React 19.2.0** - Biblioteca de JavaScript para interfaces de usuario
- **Vite 7.2.4** - Herramienta de construcción y desarrollo
- **React Router DOM 7.13.0** - Enrutamiento de la aplicación
- **Axios 1.13.4** - Cliente HTTP para comunicación con la API
- **ESLint** - Linter para mantener calidad de código

### Infraestructura
- **Docker** - Contenedorización de servicios
- **Docker Compose** - Orquestación de contenedores
- **MySQL** - Base de datos en contenedor

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
│   ├── uploads/                        # Imágenes subidas (volumen Docker)
│   ├── docker-compose.yml              # Configuración Docker Compose
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
├── start-backend.ps1           # Script de inicio backend (Windows)
├── start-backend.sh            # Script de inicio backend (Linux/Mac)
├── start-frontend.ps1          # Script de inicio frontend (Windows)
├── start-frontend.sh           # Script de inicio frontend (Linux/Mac)
└── README.md                   # Este archivo
```

## 🛠️ Instalación y Configuración

### Prerrequisitos

- **Docker** y **Docker Compose** instalados
- **Node.js** (v18 o superior) y **npm** instalados
- **Git** para clonar el repositorio

### Pasos de Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd proyectotumascotandil
   ```

2. **Instalar dependencias del frontend:**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

## ▶️ Ejecución del Proyecto

### Opción 1: Usando Scripts (Recomendado)

**Windows (PowerShell):**
```powershell
# Terminal 1 - Backend
.\start-backend.ps1

# Terminal 2 - Frontend
.\start-frontend.ps1
```

**Linux/Mac:**
```bash
# Terminal 1 - Backend
chmod +x start-backend.sh
./start-backend.sh

# Terminal 2 - Frontend
chmod +x start-frontend.sh
./start-frontend.sh
```

### Opción 2: Manual

**1. Iniciar el Backend:**
```bash
cd backend
docker-compose up -d --build
```

Esto iniciará:
- MySQL en el puerto **3307**
- Backend Spring Boot en el puerto **8080**

**2. Iniciar el Frontend:**
```bash
cd frontend
npm run dev
```

El frontend estará disponible en `http://localhost:5173`

### Verificar que todo funcione

```bash
# Ver logs del backend
cd backend
docker-compose logs -f backend

# Verificar que el backend responda
curl http://localhost:8080/posts
```

## 🛑 Detener los Servicios

**Backend:**
```bash
cd backend
docker-compose down
```

**Frontend:**
Presiona `Ctrl + C` en la terminal donde está corriendo.

## 📡 API y Endpoints

### Endpoints Públicos (sin autenticación)

- `GET /posts` - Listar todos los posts publicados y aprobados
- `GET /posts/{id}` - Obtener un post específico por ID
- `POST /posts` - Crear un nuevo reporte de mascota perdida
  - Requiere: nombre, descripción, foto, contacto, etc.

### Endpoints de Administración (requieren autenticación HTTP Basic)

- `GET /posts/pendientes` - Listar todos los posts pendientes de aprobación
- `PATCH /posts/{id}/aprobar` - Aprobar un post (cambia estado a PUBLICADO)
- `PATCH /posts/{id}/rechazar` - Rechazar un post (cambia estado a RECHAZADO)

## 🎨 Funcionalidades del Frontend

### Secciones Disponibles

1. **Inicio** (`/`) - Página de bienvenida con información sobre el proyecto
2. **Perdidos** (`/perdidos`) - Galería de mascotas perdidas aprobadas y publicadas
3. **Busca tu Mascota** (`/busca-tu-mascota`) - Formulario para reportar una mascota perdida
4. **Admin** (`/admin`) - Panel de administración para moderar reportes

### Características

- **Diseño responsive** - Adaptable a dispositivos móviles y desktop
- **Navegación intuitiva** - Menú de navegación entre secciones
- **Carga de imágenes** - Los usuarios pueden subir fotos de las mascotas
- **Búsqueda y filtrado** - Visualización de reportes con detalles completos
- **Autenticación** - Sistema de login para administradores

## 🔐 Panel de Administración

El panel de administración permite moderar el contenido antes de su publicación pública.

### Acceso

1. Navegar a la sección **Admin** en el menú
2. Ingresar credenciales:
   - **Usuario:** `admin` (por defecto)
   - **Contraseña:** Se genera automáticamente en desarrollo (ver logs del backend)

### Funcionalidades del Admin

- **Ver posts pendientes** - Lista de reportes esperando aprobación
- **Aprobar posts** - Publicar reportes en la sección "Perdidos"
- **Rechazar posts** - Eliminar reportes que no cumplan los criterios

### Configuración de Credenciales

Para producción, configura las siguientes variables de entorno:

```bash
export ADMIN_USERNAME=admin
export ADMIN_PASSWORD=tu_password_seguro
export ADMIN_CREATE_ON_STARTUP=true
```

## 🔧 Configuración

### Backend

- **Puerto:** 8080
- **Base de datos:** MySQL (puerto 3307)
- **CORS:** Configurado para `http://localhost:5173` y `http://localhost:3000`
- **Uploads:** Las imágenes se guardan en `backend/uploads/`

### Frontend

- **Puerto:** 5173 (Vite por defecto)
- **API URL:** `http://localhost:8080`
- **Hot Module Replacement (HMR):** Habilitado para desarrollo rápido

### Base de Datos

- **Motor:** MySQL 8.0
- **Puerto:** 3307 (externo) / 3306 (interno del contenedor)
- **Persistencia:** Los datos se guardan en el volumen Docker `mysql_data`
- **Creación automática:** La base de datos se crea automáticamente al iniciar

## 🔒 Seguridad

- **Autenticación HTTP Basic** para endpoints de administración
- **Encriptación BCrypt** para contraseñas de usuarios
- **CORS configurado** para permitir solo orígenes específicos
- **Validación de datos** en DTOs antes de procesar
- **Moderación de contenido** mediante sistema de aprobación

## 🐛 Solución de Problemas

### Error: "No se pudo conectar con el servidor" en el panel Admin

Este es un error común que indica que el frontend no puede comunicarse con el backend.

**1. Verificar que el backend esté corriendo:**

```bash
cd backend
docker-compose ps
```

Deberías ver el contenedor `tumascotandil-backend` con estado "Up". Si no está corriendo:

```bash
cd backend
docker-compose up -d --build
```

**2. Verificar manualmente que el backend responda:**

Abre tu navegador y ve a: `http://localhost:8080/posts`

Deberías ver una respuesta (aunque sea un array vacío `[]`). Si ves un error, el backend no está corriendo.

**3. Reiniciar el backend (IMPORTANTE):**

Los cambios de configuración requieren que el backend se reinicie:

```bash
cd backend
docker-compose restart backend
```

O si prefieres reconstruir completamente:

```bash
cd backend
docker-compose down
docker-compose up -d --build
```

**4. Verificar los logs del backend:**

```bash
cd backend
docker-compose logs -f backend
```

Busca mensajes como:
- "Started TumascotandilApplication"
- "Usuario ADMIN creado"
- Cualquier error de compilación

**5. Verificar credenciales del admin:**

Cuando el backend inicia, debería mostrar en los logs las credenciales del admin. Busca un mensaje como:

```
========================================
Usuario ADMIN creado:
Username: admin
Password: [password generado]
========================================
```

**6. Probar la conexión desde el navegador:**

Abre la consola del navegador (F12) y ejecuta:

```javascript
fetch('http://localhost:8080/posts')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

Si esto funciona, el backend está corriendo correctamente.

**Si el problema persiste:**
- Verifica que no haya otro proceso usando el puerto 8080
- Verifica que Docker esté corriendo
- Revisa los logs del backend para ver errores de compilación
- Asegúrate de que el frontend esté en `http://localhost:5173` (puerto por defecto de Vite)

### El backend no inicia

```bash
cd backend
docker-compose logs backend
```

Verifica que:
- Docker esté corriendo
- El puerto 3307 y 8080 no estén en uso
- Tengas permisos para ejecutar Docker

### El frontend no se conecta al backend

- Verifica que el backend esté corriendo: `curl http://localhost:8080/posts`
- Revisa la consola del navegador para errores de CORS
- Asegúrate de que ambos servicios estén en los puertos correctos

### Error de CORS

El backend está configurado para permitir `http://localhost:5173`. Si usas otro puerto, ajusta la configuración en `backend/src/main/java/com/buscatumascotandil/find/config/SecurityConfig.java`

**Nota:** Los cambios de CORS requieren reiniciar el backend para que surtan efecto.

### Problemas con la base de datos

```bash
# Reiniciar la base de datos (elimina todos los datos)
cd backend
docker-compose down -v
docker-compose up -d --build
```

## 📝 Notas Importantes

- Los posts nuevos se crean en estado `PENDIENTE` y requieren aprobación del admin
- Las imágenes se guardan en `backend/uploads/` (volumen de Docker)
- La base de datos persiste en el volumen Docker `mysql_data`
- Para producción, configura todas las credenciales mediante variables de entorno
- El archivo `application.properties` contiene valores por defecto para desarrollo

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso comunitario.

---

**Desarrollado con ❤️ para la comunidad de Tandil**
