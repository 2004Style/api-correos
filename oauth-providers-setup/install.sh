#!/bin/bash

# ============================================================================
# OAuth Multi-Proveedor - Script de Instalación Automática
# ============================================================================
# Este script instala todas las dependencias necesarias y copia los archivos
# a sus ubicaciones correspondientes en el proyecto NestJS.
# ============================================================================

set -e # Detener si hay algún error

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Funciones de utilidad
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

# Detectar gestor de paquetes
detect_package_manager() {
    if [ -f "pnpm-lock.yaml" ]; then
        echo "pnpm"
    elif [ -f "yarn.lock" ]; then
        echo "yarn"
    else
        echo "npm"
    fi
}

# ============================================================================
# INICIO DEL SCRIPT
# ============================================================================

print_header "🔐 OAuth Multi-Proveedor - Setup Automático"

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "package.json no encontrado. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

print_success "Proyecto NestJS detectado"

# Detectar gestor de paquetes
PM=$(detect_package_manager)
print_success "Gestor de paquetes detectado: $PM"

# ============================================================================
# PASO 1: Instalar Dependencias
# ============================================================================

print_header "📦 Paso 1: Instalando Dependencias"

DEPS="passport-google-oauth20 passport-discord @types/passport-google-oauth20"

case $PM in
    pnpm)
        print_warning "Ejecutando: pnpm add $DEPS"
        pnpm add $DEPS
        ;;
    yarn)
        print_warning "Ejecutando: yarn add $DEPS"
        yarn add $DEPS
        ;;
    *)
        print_warning "Ejecutando: npm install $DEPS"
        npm install $DEPS
        ;;
esac

print_success "Dependencias instaladas correctamente"

# ============================================================================
# PASO 2: Crear Directorios si no existen
# ============================================================================

print_header "📁 Paso 2: Verificando Estructura de Directorios"

mkdir -p "src/auth/strategies"
mkdir -p "src/guard"

print_success "Directorios verificados/creados"

# ============================================================================
# PASO 3: Copiar Estrategias
# ============================================================================

print_header "🔧 Paso 3: Copiando Estrategias"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ -f "$SCRIPT_DIR/strategies/google.strategy.txt" ]; then
    cp "$SCRIPT_DIR/strategies/google.strategy.txt" "src/auth/strategies/google.strategy.ts"
    print_success "Estrategia de Google copiada"
else
    print_error "No se encontró google.strategy.txt"
fi

if [ -f "$SCRIPT_DIR/strategies/discord.strategy.txt" ]; then
    cp "$SCRIPT_DIR/strategies/discord.strategy.txt" "src/auth/strategies/discord.strategy.ts"
    print_success "Estrategia de Discord copiada"
else
    print_error "No se encontró discord.strategy.txt"
fi

# ============================================================================
# PASO 4: Copiar Guards
# ============================================================================

print_header "🛡️  Paso 4: Copiando Guards"

if [ -f "$SCRIPT_DIR/guards/google.guard.txt" ]; then
    cp "$SCRIPT_DIR/guards/google.guard.txt" "src/guard/google.guard.ts"
    print_success "Guard de Google copiado"
else
    print_error "No se encontró google.guard.txt"
fi

if [ -f "$SCRIPT_DIR/guards/discord.guard.txt" ]; then
    cp "$SCRIPT_DIR/guards/discord.guard.txt" "src/guard/discord.guard.ts"
    print_success "Guard de Discord copiado"
else
    print_error "No se encontró discord.guard.txt"
fi

# ============================================================================
# PASO 5: Copiar archivo .env.example
# ============================================================================

print_header "🔐 Paso 5: Configurando Variables de Entorno"

if [ ! -f ".env" ] && [ -f "$SCRIPT_DIR/.env.example" ]; then
    cp "$SCRIPT_DIR/.env.example" ".env"
    print_success "Archivo .env creado desde .env.example"
    print_warning "⚠️  IMPORTANTE: Actualiza los valores en .env con tus credenciales OAuth"
elif [ -f ".env" ]; then
    print_warning "Archivo .env ya existe, no se sobrescribió"
    print_warning "Revisa el archivo .env.example para asegurarte de tener todas las variables"
else
    print_error "No se encontró .env.example"
fi

# ============================================================================
# PASO 6: Información de Archivos para Copiar Manualmente
# ============================================================================

print_header "📝 Paso 6: Archivos para Copiar Manualmente"

echo -e "${YELLOW}Los siguientes archivos deben ser actualizados MANUALMENTE:${NC}\n"

echo -e "${BLUE}1. src/auth/auth.service.ts${NC}"
echo "   - Abre: $SCRIPT_DIR/auth.service-methods.txt"
echo "   - Copia los métodos googleLogin() y discordLogin()"
echo "   - Pégalos después del método githubLogin()"
echo ""

echo -e "${BLUE}2. src/auth/auth.controller.ts${NC}"
echo "   - Abre: $SCRIPT_DIR/auth.controller-methods.txt"
echo "   - Actualiza los IMPORTS (GoogleAuthGuard, DiscordAuthGuard)"
echo "   - Agrega las rutas Google y Discord"
echo ""

echo -e "${BLUE}3. src/auth/auth.module.ts${NC}"
echo "   - Abre: $SCRIPT_DIR/auth.module-update.txt"
echo "   - Actualiza los IMPORTS (GoogleStrategy, DiscordStrategy)"
echo "   - Agrega GoogleStrategy y DiscordStrategy al array providers"
echo ""

# ============================================================================
# PASO 7: Resumen Final
# ============================================================================

print_header "✅ Instalación Completada"

echo -e "${GREEN}La instalación automática ha terminado exitosamente!${NC}\n"

echo -e "${YELLOW}PRÓXIMOS PASOS:${NC}"
echo "1. Actualiza los 3 archivos manualmente (ver arriba)"
echo "2. Ejecuta: npm run build (o pnpm build / yarn build)"
echo "3. Verifica que no hay errores de compilación"
echo "4. Agrega tus credenciales OAuth en el archivo .env"
echo "5. Reinicia tu servidor"
echo ""

echo -e "${BLUE}Para más detalles, consulta: ${SCRIPT_DIR}/INTEGRATION.md${NC}\n"

# Verificar compilación
echo -e "${YELLOW}¿Deseas compilar el proyecto ahora? (s/n)${NC}"
read -r response

if [[ "$response" == "s" || "$response" == "S" ]]; then
    print_header "🔨 Compilando Proyecto"
    case $PM in
        pnpm)
            pnpm build
            ;;
        yarn)
            yarn build
            ;;
        *)
            npm run build
            ;;
    esac
    
    if [ $? -eq 0 ]; then
        print_success "¡Compilación exitosa!"
    else
        print_error "Hubo errores en la compilación"
        echo -e "${YELLOW}Revisa los errores anteriores y actualiza los archivos según sea necesario${NC}"
    fi
fi

echo ""
print_header "¡Listo para Usar!"
echo -e "${GREEN}Tu aplicación está lista con autenticación OAuth multi-proveedor${NC}"
