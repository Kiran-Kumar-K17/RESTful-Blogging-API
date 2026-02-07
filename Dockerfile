# ---- Stage 1: Build the React frontend ----
FROM node:22-alpine AS frontend-build

WORKDIR /app/frontend

COPY frontend/package.json frontend/package-lock.json* ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# ---- Stage 2: Production backend ----
FROM node:22-alpine

WORKDIR /app

# Install backend dependencies
COPY backend/package.json backend/package-lock.json* ./
RUN npm install --omit=dev

# Copy backend source code
COPY backend/ ./

# Copy built frontend into backend's public directory so Express can serve it
COPY --from=frontend-build /app/frontend/dist ./public

# Default port the backend listens on
EXPOSE 8000

CMD ["node", "server.js"]
#
