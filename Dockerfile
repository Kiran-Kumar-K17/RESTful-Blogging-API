# ---- Stage 1: Build the React frontend ----
FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ---- Stage 2: Production backend ----
FROM node:22-alpine

# Update npm to latest version to get security patches
RUN npm install -g npm@latest

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Install backend dependencies
COPY backend/package.json backend/package-lock.json* ./
RUN npm ci --omit=dev

# Copy backend source
COPY backend/ ./

# Copy built frontend
COPY --from=frontend-build /app/frontend/dist ./public

# Fix permissions
RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 8000
CMD ["node", "server.js"]