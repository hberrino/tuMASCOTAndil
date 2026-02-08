# 🔧 Solución de Problemas - Render Deployment

## ❌ Error: "Failed to configure a DataSource: 'url' attribute is not specified"

Este error indica que las variables de entorno de la base de datos **NO están configuradas** en el dashboard de Render.

### ✅ Solución Paso a Paso

#### 1. Verifica que las variables estén configuradas en Render

1. Ve a tu servicio en Render: https://dashboard.render.com
2. Selecciona tu servicio web (ej: `tumascotandil-backend`)
3. Ve a la pestaña **"Environment"**
4. Verifica que estas variables estén presentes y tengan valores:

```
DB_URL=jdbc:postgresql://TU_HOST_POOLER_SUPABASE:5432/postgres?sslmode=require
DB_USERNAME=postgres.TU_PROJECT_REF_SUPABASE
DB_PASSWORD=TU_PASSWORD_SUPABASE
```

**⚠️ IMPORTANTE**: Render requiere IPv4, y la conexión directa de Supabase NO es compatible con IPv4. Por eso debes usar **Session Pooler**.

#### 2. Errores Comunes

##### ❌ Error de Tipeo en DB_URL
- **Incorrecto**: `sslnode=require` (falta la 'm')
- **Correcto**: `sslmode=require`

##### ❌ Variables Vacías
- Asegúrate de que las variables **NO estén vacías**
- Verifica que no tengan espacios al inicio o al final
- No uses comillas alrededor de los valores

##### ❌ Formato Incorrecto
- **Correcto**: `DB_URL=jdbc:postgresql://host:5432/postgres?sslmode=require`
- **Incorrecto**: `DB_URL="jdbc:postgresql://host:5432/postgres?sslmode=require"` (sin comillas)

#### 3. Configuración Correcta para Render (Session Pooler - IPv4 Compatible)

**⚠️ IMPORTANTE**: Render usa IPv4, y la conexión directa de Supabase NO es compatible con IPv4. **DEBES usar Session Pooler**.

```
DB_URL=jdbc:postgresql://TU_HOST_POOLER_SUPABASE:5432/postgres?sslmode=require
DB_USERNAME=postgres.TU_PROJECT_REF_SUPABASE
DB_PASSWORD=TU_PASSWORD_SUPABASE
```

**Configuración Session Pooler:**
- Host: Reemplaza `TU_HOST_POOLER_SUPABASE` con tu host del pooler (ej: `aws-0-us-west-2.pooler.supabase.com`)
- Puerto: `5432`
- Usuario: Reemplaza `TU_PROJECT_REF_SUPABASE` con tu project reference (formato: `postgres.[PROJECT_REF]`)
- Password: Reemplaza `TU_PASSWORD_SUPABASE` con tu contraseña de Supabase
- Pool mode: `session`

#### 4. Lista Completa de Variables Requeridas

Copia y pega estas variables en Render (reemplaza los valores):

```bash
SPRING_PROFILES_ACTIVE=prod

# BASE DE DATOS (OBLIGATORIAS) - Session Pooler para IPv4
# Reemplaza TU_HOST_POOLER_SUPABASE, TU_PROJECT_REF_SUPABASE y TU_PASSWORD_SUPABASE con tus valores reales
DB_URL=jdbc:postgresql://TU_HOST_POOLER_SUPABASE:5432/postgres?sslmode=require
DB_USERNAME=postgres.TU_PROJECT_REF_SUPABASE
DB_PASSWORD=TU_PASSWORD_SUPABASE

# CONFIGURACIÓN JPA (Opcionales, tienen valores por defecto)
DB_DDL_AUTO=update
DB_SHOW_SQL=false
DB_FORMAT_SQL=false

# ADMIN (Opcionales)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=TU_PASSWORD_SEGURO
ADMIN_CREATE_ON_STARTUP=true

# CORS (Opcional, configurar cuando tengas frontend)
CORS_ALLOWED_ORIGINS=

# LOGGING (Opcional)
LOG_LEVEL=INFO

# CLOUDINARY (Opcional)
CLOUDINARY_ENABLED=true
CLOUDINARY_CLOUD_NAME=TU_CLOUD_NAME
CLOUDINARY_API_KEY=TU_API_KEY
CLOUDINARY_API_SECRET=TU_API_SECRET
```

#### 5. Después de Configurar las Variables

1. **Guarda** los cambios en Render
2. Render **redeployará automáticamente** tu servicio
3. Espera 2-3 minutos para que se complete el deploy
4. Revisa los logs en Render para verificar que la aplicación inició correctamente

#### 6. Verificar que Funcionó

En los logs de Render deberías ver:
```
✅ Variables de base de datos configuradas correctamente
DB_URL: jdbc:postgresql://[HOST]@[HOST]
DB_USERNAME: postgres.TU_PROJECT_REF
```

Y **NO** deberías ver:
```
ERROR: Variables de base de datos no configuradas
DB_URL: [FALTANTE]
```

## 🔍 Otros Problemas Comunes

### Error: "Port scan timeout reached"
- **Causa**: La aplicación no está escuchando en el puerto correcto
- **Solución**: Verifica que `server.port=${PORT:8080}` esté en `application.properties`

### Error: "Build failed"
- **Causa**: Error en la compilación de Maven
- **Solución**: Revisa los logs de build en Render para ver el error específico

### Error: "Connection refused" o "Connection timeout"
- **Causa**: Problema de conectividad con Supabase
- **Solución**: 
  - Verifica que el host y puerto sean correctos
  - Verifica que `sslmode=require` esté en la URL
  - Verifica que la contraseña sea correcta

## 📞 ¿Necesitas Más Ayuda?

Si después de seguir estos pasos el problema persiste:

1. Revisa los logs completos en Render
2. Verifica que todas las variables estén configuradas
3. Asegúrate de que no haya espacios o caracteres especiales en los valores
4. Verifica que la conexión a Supabase funcione desde tu máquina local
