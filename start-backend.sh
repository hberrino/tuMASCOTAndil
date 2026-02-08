#!/bin/bash
# Script para iniciar el backend con Docker Compose
# Ejecutar desde la raíz del proyecto

echo "🚀 Iniciando backend con Docker Compose..."
cd backend
docker-compose up -d --build
echo "✅ Backend iniciado en http://localhost:8080"
echo "📋 Para ver los logs: docker-compose logs -f backend"
echo "🛑 Para detener: docker-compose down"
