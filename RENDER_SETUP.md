# 🚀 Guía de Despliegue en Render

Esta guía te ayudará a desplegar el backend de TuMascotAndil en Render.

## 📋 Prerequisitos

1. Cuenta en [Render](https://render.com)
2. Base de datos PostgreSQL en Supabase configurada
3. Repositorio Git (GitHub, GitLab, o Bitbucket)

## 🔧 Configuración en Render

### Paso 1: Crear un nuevo Web Service

1. Ve a tu dashboard de Render
2. Click en **"New +"** → **"Web Service"**
3. Conecta tu repositorio Git
4. Configura:
   - **Name**: `tumascotandil-backend`
   - **Environment**: `Docker`
   - **Region**: `Oregon` (o la más cercana a ti)
   - **Branch**: `main` (o tu rama principal)
   - **Root Directory**: `backend`
   - **Dockerfile Path**: `Dockerfile`
   - **Docker Context**: `.` (punto)

### Paso 2: Configurar Variables de Entorno

En la sección **"Environment"** de tu servicio, agrega las siguientes variables:

#### 🔐 Variables de Base de Datos (Supabase)

```bash
DB_URL=jdbc:postgresql://aws-0-us-west-2.pooler.supabase.com:6543/postgres?sslmode=require
DB_USERNAME=postgres.hqblwtmxrlnqbigjtmta
DB_PASSWORD=Hberrinorpv1998.
```

**Nota**: Si prefieres conexión directa (sin pooler), usa:
```bash
DB_URL=jdbc:postgresql://aws-0-us-west-2.pooler.supabase.com:5432/postgres?sslmode=require
```

#### ⚙️ Variables de Configuración JPA/Hibernate

```bash
DB_DDL_AUTO=update
DB_SHOW_SQL=false
DB_FORMAT_SQL=false
```

#### 👤 Variables de Administrador

```bash
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro_aqui
ADMIN_CREATE_ON_STARTUP=true
```

**⚠️ IMPORTANTE**: Cambia `ADMIN_PASSWORD` por una contraseña segura. Esta será la contraseña del usuario administrador.

#### 🌐 Variables de CORS (Frontend)

```bash
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app,https://tu-dominio.com
```

Si tienes múltiples orígenes, sepáralos por comas.

#### 📊 Variables de Logging (Opcional)

```bash
LOG_LEVEL=INFO
```

Para debugging, puedes usar `DEBUG`, pero en producción usa `INFO` o `WARN`.

#### ☁️ Variables de Cloudinary (Gestión de Imágenes)

```bash
CLOUDINARY_ENABLED=true
CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME_AQUI
CLOUDINARY_API_KEY=TU_API_KEY_AQUI
CLOUDINARY_API_SECRET=TU_API_SECRET_AQUI
```

**Nota**: 
- Reemplaza `TU_CLOUD_NAME_AQUI`, `TU_API_KEY_AQUI` y `TU_API_SECRET_AQUI` con tus credenciales reales de Cloudinary
- Si no configuras Cloudinary o estableces `CLOUDINARY_ENABLED=false`, las imágenes se guardarán localmente en el servidor

### Paso 3: Configuración Adicional

1. **Health Check Path**: Deja vacío o usa `/actuator/health` si tienes Spring Boot Actuator
2. **Auto-Deploy**: Actívalo para que se despliegue automáticamente en cada push

### Paso 4: Desplegar

1. Click en **"Create Web Service"**
2. Render comenzará a construir y desplegar tu aplicación
3. El proceso puede tardar 5-10 minutos la primera vez

## 📝 Lista Completa de Variables de Entorno

Copia y pega estas variables en Render (reemplaza los valores según corresponda):

```bash
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:postgresql://aws-0-us-west-2.pooler.supabase.com:6543/postgres?sslmode=require
DB_USERNAME=postgres.hqblwtmxrlnqbigjtmta
DB_PASSWORD=Hberrinorpv1998.
DB_DDL_AUTO=update
DB_SHOW_SQL=false
DB_FORMAT_SQL=false
ADMIN_USERNAME=admin
ADMIN_PASSWORD=tu_password_seguro_aqui
ADMIN_CREATE_ON_STARTUP=true
CORS_ALLOWED_ORIGINS=https://tu-frontend.vercel.app
LOG_LEVEL=INFO
CLOUDINARY_ENABLED=true
CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME_AQUI
CLOUDINARY_API_KEY=TU_API_KEY_AQUI
CLOUDINARY_API_SECRET=TU_API_SECRET_AQUI
```

## 🔍 Verificación

Una vez desplegado:

1. Verifica que el servicio esté **"Live"** (verde)
2. Accede a la URL proporcionada por Render (ej: `https://tumascotandil-backend.onrender.com`)
3. Prueba el endpoint de salud si lo tienes configurado
4. Verifica los logs en Render para asegurarte de que no hay errores

## 🐛 Solución de Problemas

### Error: "Cannot connect to database"
- Verifica que las credenciales de Supabase sean correctas
- Asegúrate de que el pooler de Supabase esté activo
- Verifica que la IP de Render esté permitida en Supabase (si aplica)

### Error: "Port already in use"
- Render asigna el puerto automáticamente, no necesitas configurarlo
- El puerto se lee de la variable `PORT` que Render proporciona automáticamente

### La aplicación no inicia
- Revisa los logs en Render
- Verifica que todas las variables de entorno estén configuradas
- Asegúrate de que el Dockerfile esté correcto

## 📚 Recursos Adicionales

- [Documentación de Render](https://render.com/docs)
- [Supabase Connection Pooling](https://supabase.com/docs/guides/database/connecting-to-postgres#connection-pooler)

## 🔒 Seguridad

- ✅ Nunca commitees credenciales en el código
- ✅ Usa variables de entorno para todas las configuraciones sensibles
- ✅ Cambia las contraseñas por defecto
- ✅ Usa HTTPS (Render lo proporciona automáticamente)
- ✅ Configura CORS correctamente para producción
