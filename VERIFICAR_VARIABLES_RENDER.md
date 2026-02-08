# 🔍 Verificación de Variables en Render - Paso a Paso

## ❌ Problema Actual

El error `Failed to configure a DataSource: 'url' attribute is not specified` indica que las variables `DB_URL`, `DB_USERNAME` o `DB_PASSWORD` **NO están configuradas** o están **vacías** en Render.

## ✅ Solución: Verificar y Configurar Variables

### Paso 1: Acceder a las Variables de Entorno en Render

1. Ve a https://dashboard.render.com
2. Selecciona tu servicio web (ej: `tumascotandil-backend`)
3. En el menú lateral izquierdo, haz clic en **"Environment"**
4. Verás una tabla con todas las variables de entorno

### Paso 2: Verificar que Existan estas 3 Variables

Busca estas variables en la tabla:

- ✅ `DB_URL`
- ✅ `DB_USERNAME`
- ✅ `DB_PASSWORD`

**Si NO existen**, debes crearlas (ver Paso 3).

**Si existen pero están vacías**, edítalas (ver Paso 4).

### Paso 3: Crear Variables (si no existen)

1. Haz clic en el botón **"Add Environment Variable"** (arriba a la derecha)
2. Para cada variable, ingresa:

#### Variable 1: DB_URL
- **Key**: `DB_URL`
- **Value**: `jdbc:postgresql://TU_HOST_POOLER_SUPABASE:5432/postgres?sslmode=require`
- **⚠️ IMPORTANTE**: 
  - Reemplaza `TU_HOST_POOLER_SUPABASE` con tu host del pooler de Supabase (ej: `aws-0-us-west-2.pooler.supabase.com`)
  - Copia EXACTAMENTE el valor (sin espacios al inicio/final)
  - Verifica que diga `sslmode` (con 'm'), NO `sslnode`
  - NO uses comillas alrededor del valor

#### Variable 2: DB_USERNAME
- **Key**: `DB_USERNAME`
- **Value**: `postgres.TU_PROJECT_REF_SUPABASE`
- **⚠️ IMPORTANTE**: 
  - Reemplaza `TU_PROJECT_REF_SUPABASE` con tu project reference de Supabase
  - Este es el formato para Session Pooler (ej: `postgres.xxxxx`)
  - NO uses solo `postgres`

#### Variable 3: DB_PASSWORD
- **Key**: `DB_PASSWORD`
- **Value**: `TU_PASSWORD_SUPABASE`
- **⚠️ IMPORTANTE**: 
  - Reemplaza `TU_PASSWORD_SUPABASE` con tu contraseña real de Supabase
  - NO uses comillas

### Paso 4: Editar Variables Existentes (si están vacías o incorrectas)

1. En la tabla de variables, encuentra la variable que quieres editar
2. Haz clic en el **ícono de lápiz** (editar) a la derecha de la variable
3. Verifica/Corrige el valor:
   - **NO debe tener espacios** al inicio o final
   - **NO debe tener comillas** alrededor del valor
   - **DB_URL debe tener** `sslmode=require` (con 'm')
4. Haz clic en **"Save"**

### Paso 5: Verificar el Formato Correcto

Después de configurar, tus variables deben verse así en Render (reemplaza los placeholders con tus valores reales):

```
DB_URL = jdbc:postgresql://TU_HOST_POOLER_SUPABASE:5432/postgres?sslmode=require
DB_USERNAME = postgres.TU_PROJECT_REF_SUPABASE
DB_PASSWORD = TU_PASSWORD_SUPABASE
```

**❌ INCORRECTO:**
```
DB_URL = "jdbc:postgresql://..."  ← Con comillas
DB_URL = jdbc:postgresql://...?sslnode=require  ← Error de tipeo (sslnode)
DB_URL = jdbc:postgresql://db.hqblwtmxrlnqbigjtmta.supabase.co:5432/...  ← Conexión directa (no IPv4)
DB_USERNAME = postgres  ← Usuario incorrecto para pooler
```

**✅ CORRECTO:**
```
DB_URL = jdbc:postgresql://TU_HOST_POOLER_SUPABASE:5432/postgres?sslmode=require
DB_USERNAME = postgres.TU_PROJECT_REF_SUPABASE
DB_PASSWORD = TU_PASSWORD_SUPABASE
```

### Paso 6: Guardar y Esperar el Redeploy

1. Después de crear/editar las variables, Render **automáticamente** iniciará un nuevo deploy
2. Espera 2-3 minutos
3. Ve a la pestaña **"Logs"** para ver el progreso

### Paso 7: Verificar en los Logs

En los logs deberías ver:

**✅ Si está bien configurado:**
```
✅ Variables de base de datos configuradas correctamente
DB_URL: jdbc:postgresql://[HOST]@[HOST]
DB_USERNAME: postgres.TU_PROJECT_REF_SUPABASE
```

**❌ Si sigue mal:**
```
ERROR: Variables de base de datos no configuradas
DB_URL: [FALTANTE]
DB_USERNAME: [FALTANTE]
DB_PASSWORD: [FALTANTE]
```

## 🔧 Troubleshooting Adicional

### Problema: Las variables no se guardan

- Verifica que no tengas espacios extra
- Verifica que no uses caracteres especiales problemáticos
- Intenta eliminar y recrear la variable

### Problema: El deploy sigue fallando

1. Verifica que las 3 variables estén presentes
2. Verifica que los valores sean correctos (copia exacta de arriba)
3. Verifica que no haya espacios al inicio/final
4. Revisa los logs completos para ver si hay otro error

### Problema: No veo el validador en los logs

Si no ves el mensaje del validador, significa que:
- El código nuevo no se desplegó aún (haz commit y push)
- O las variables realmente no están configuradas

## 📋 Checklist Final

Antes de considerar que está configurado, verifica:

- [ ] `DB_URL` existe y tiene el valor correcto (Session Pooler con tu host)
- [ ] `DB_USERNAME` existe y tiene el formato `postgres.TU_PROJECT_REF`
- [ ] `DB_PASSWORD` existe y tiene tu contraseña de Supabase
- [ ] No hay espacios al inicio/final de los valores
- [ ] No hay comillas alrededor de los valores
- [ ] `DB_URL` tiene `sslmode=require` (con 'm')
- [ ] Render inició un nuevo deploy después de guardar
