#!/bin/bash
# Script para iniciar el frontend
# Ejecutar desde la raíz del proyecto

echo "🚀 Iniciando frontend..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi
echo "✅ Frontend iniciado en http://localhost:5173"
npm run dev
