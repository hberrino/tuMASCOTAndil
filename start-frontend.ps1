# Script para iniciar el frontend
# Ejecutar desde la raíz del proyecto

Write-Host "🚀 Iniciando frontend..." -ForegroundColor Green
cd frontend
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}
Write-Host "✅ Frontend iniciado en http://localhost:5173" -ForegroundColor Green
npm run dev
