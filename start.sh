#!/bin/bash

# Script para compilar y arrancar la aplicación
set -e

echo "📦 Compilando proyecto..."
pnpm run build

echo "🗄️ Aplicando migraciones de Prisma..."
npx prisma migrate deploy

echo "✅ Preparación completada"

# Ejecutar la aplicación compilada
exec node dist/main.js
