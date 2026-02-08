# Script para ejecutar la aplicación localmente cargando variables del .env
# Uso: .\run-local.ps1

Write-Host "🔧 Cargando variables de entorno desde .env..." -ForegroundColor Cyan

# Cargar variables del archivo .env
if (Test-Path ".env") {
    Get-Content ".env" | ForEach-Object {
        if ($_ -match '^\s*([^#][^=]+)=(.*)$') {
            $name = $matches[1].Trim()
            $value = $matches[2].Trim()
            # Remover comillas si las tiene
            if ($value -match '^["''](.*)["'']$') {
                $value = $matches[1]
            }
            [Environment]::SetEnvironmentVariable($name, $value, "Process")
            Write-Host "  ✓ $name" -ForegroundColor Green
        }
    }
    Write-Host "✅ Variables cargadas" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivo .env no encontrado, usando valores por defecto" -ForegroundColor Yellow
}

Write-Host "`n🚀 Iniciando aplicación Spring Boot...`n" -ForegroundColor Cyan
mvn spring-boot:run
