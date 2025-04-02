# Aplicación de Notas

Esta aplicación web permite crear, editar, eliminar, archivar y categorizar notas. Se desarrolla como una SPA (Single Page Application) utilizando React en el frontend y un backend con Node.js y Express, con una base de datos relacional gestionada mediante Sequelize.

# Características

Crear, editar y eliminar notas.

Archivar y desarchivar notas.

Asignar y eliminar categorías a las notas.

Filtrar notas por categoría.

API REST estructurada en capas (Controlador, Servicio, Repositorio).

Base de datos relacional gestionada con Sequelize.

Autenticación con usuario y contraseña.

# Tecnologías Utilizadas

# Frontend

React.js + Vite

Axios para llamadas a la API

CSS para estilos

# Backend

Node.js + Express

Sequelize + PostgreSQL

# Instalación y Ejecución

# Configurar el Backend

Instalación y Ejecución

cd backend
npm install

# importante

Copiar el archivo .env.example a .env y configurar las variables de entorno.

Inicializar la base de datos:
npx sequelize db:migrate
npx sequelize db:seed:all

Iniciar el backend:

# node server.js

iniciar el frontend
cd frontend
npm install

# npm run dev

# Inicio de Sesión

Usuario: admin

Contraseña: 1234

# Script de Inicio Automático

@Para configurar y ejecutar la aplicación automáticamente en Linux/MacOS:

./start.sh

# API Endpoints Principales

Notas

GET /api/notes → Obtener todas las notas activas.

POST /api/notes → Crear una nueva nota.

PUT /api/notes/:id → Editar una nota.

DELETE /api/notes/:id → Eliminar una nota.

PATCH /api/notes/:id/archive → Archivar/Desarchivar nota.



# Contacto

Para cualquier duda o mejora, contáctame en rafael.920427@gmail.com

GitHub rafael492

celular +57 3117158059