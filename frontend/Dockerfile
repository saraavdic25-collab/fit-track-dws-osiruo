# 1. FAZA: Build (Izgradnja aplikacije)
FROM node:20-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2. FAZA: Production (Serviranje preko Nginxa)
FROM nginx:stable-alpine
# Kopiramo izgrađenu aplikaciju u Nginx folder
COPY --from=build-stage /app/dist /usr/share/nginx/html
# Kopiramo našu Nginx konfiguraciju
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
