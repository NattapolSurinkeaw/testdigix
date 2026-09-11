# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app

# ---------- Dev ----------
FROM base AS dev
ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ---------- Build (prod) ----------
FROM base AS build
ARG VITE_API_PATH
ENV VITE_API_PATH=${VITE_API_PATH}
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- Prod (nginx) ----------
FROM nginx:1.27-alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
