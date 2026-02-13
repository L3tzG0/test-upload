# Multi-stage build for a Vite React SPA

# Build stage
FROM node:20-alpine AS build
WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY . ./
RUN npm run build

# Runtime stage
FROM nginx:1.27-alpine

# Healthcheck for container orchestrators
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost/ || exit 1

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# SPA fallback routing
COPY ./.docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
