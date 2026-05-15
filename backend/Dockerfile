# FIT TRACER - Backend Dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Kopiraj package.json i package-lock.json
COPY package*.json ./

# Instaliraj zavisnosti
RUN npm ci --only=production

# Runtime stage
FROM node:18-alpine

WORKDIR /app

# Instaliraj curl za health check
RUN apk add --no-cache curl

# Kopiraj node_modules iz builder stage-a
COPY --from=builder /app/node_modules ./node_modules

# Kopiraj package.json
COPY package*.json ./

# Kopiraj db.json (baza podataka)
COPY db.json ./

# Izloži port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/users || exit 1

# Pokreni json-server
CMD ["npm", "start"]
