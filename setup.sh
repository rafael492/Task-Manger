#!/bin/bash

# Definir colores para la salida
GREEN='\033[0;32m'
NC='\033[0m' # No Color

# Directorios
FRONTEND_DIR="frontend"
BACKEND_DIR="backend"

# Función para instalar dependencias y ejecutar backend
setup_backend() {
    echo -e "${GREEN}Configurando el backend...${NC}"
    cd "$BACKEND_DIR" || exit 1
    npm install
    
    # Verificar si existe .env, si no, crearlo
    if [ ! -f .env ]; then
        echo "PORT=5000" > .env
        echo "DATABASE_URL=mongodb://localhost:27017/notas" >> .env
        echo -e "${GREEN}Archivo .env creado en el backend.${NC}"
    fi

    # Ejecutar el backend
    npm start &
    cd ..
}

# Función para instalar dependencias y ejecutar frontend
setup_frontend() {
    echo -e "${GREEN}Configurando el frontend...${NC}"
    cd "$FRONTEND_DIR" || exit 1
    npm install
    npm run dev &
    cd ..
}

# Verificar Node.js y npm
if ! command -v node &> /dev/null || ! command -v npm &> /dev/null; then
    echo "Node.js y npm no están instalados. Por favor, instálalos primero."
    exit 1
fi

# Configurar backend y frontend
setup_backend
setup_frontend

# Esperar para evitar que los procesos se terminen inmediatamente
wait
