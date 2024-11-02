# syntax=docker/dockerfile:1.4
FROM oven/bun AS build 

WORKDIR /app

# Copiar archivos de configuración y código fuente
COPY bun.lockb ./
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY frontend ./frontend

# Instalar dependencias de backend
RUN bun install --frozen-lockfile

# Instalar dependencias de frontend
WORKDIR /app/frontend
RUN bun install --ci

# Construir el backend
ENV NODE_ENV=production
WORKDIR /app
RUN bun build ./src/server.ts --compile --outfile cli

# Construir el frontend
WORKDIR /app/frontend
RUN bun run build

# Etapa de producción
FROM ubuntu:latest

WORKDIR /app

# Copiar el binario del backend y los assets del frontend
COPY --from=build /app/cli /app/cli
COPY --from=build /app/frontend/dist /app/frontend/dist

# Exponer el puerto adecuado
EXPOSE 8080

# Comando de inicio
ENTRYPOINT ["/app/cli"]
