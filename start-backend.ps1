# Script para iniciar el backend con Docker Compose
# Ejecutar desde la raíz del proyecto

Write-Host "🚀 Iniciando backend con Docker Compose..." -ForegroundColor Green
cd backend
docker-compose up -d --build
Write-Host "✅ Backend iniciado en http://localhost:8080" -ForegroundColor Green
Write-Host "📋 Para ver los logs: docker-compose logs -f backend" -ForegroundColor Yellow
Write-Host "🛑 Para detener: docker-compose down" -ForegroundColor Yellow
