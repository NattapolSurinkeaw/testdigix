# ---------- Base ----------
FROM node:20-alpine AS base
WORKDIR /app

# ---------- Dev ----------
FROM base AS dev
ENV NODE_ENV=development
RUN apk add --no-cache python3 make g++ \
    && npm install -g nodemon ts-node
COPY package*.json ./
RUN npm install
COPY . .
RUN mkdir -p /app/uploads
EXPOSE 8000
CMD ["nodemon", "--exec", "ts-node", "src/app.ts"]

# ---------- Build (prod) ----------
FROM base AS build
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --include=dev
COPY . .
RUN npm run build

# ---------- Prod ----------
FROM node:20-alpine AS prod
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev && npm cache clean --force
COPY --from=build /app/dist ./dist
RUN mkdir -p /app/uploads && chown -R node:node /app
USER node
EXPOSE 8000
CMD ["node", "dist/app.js"]
