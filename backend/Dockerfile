# FIT TRACER - Backend Dockerfile

FROM node:18-alpine

WORKDIR /app

# Instaliraj curl za health check
RUN apk add --no-cache curl

# Kopiraj package fajlove
COPY package*.json ./

# Instaliraj sve zavisnosti
RUN npm install

# Kopiraj ostatak projekta
COPY . .

# Izloži port
EXPOSE 3000

# Health Check
HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=5 \
  CMD curl -f http://localhost:3000/users || exit 1

# Pokreni backend
CMD ["npm", "start"]
