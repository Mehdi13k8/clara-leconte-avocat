# ---- Build ----
FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Run ----
FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
# 3003: Azure sitecontainers share one localhost namespace with
# novagentic (3000), palier (3001) and palier-preprod (3002).
ENV NITRO_PORT=3003
ENV NITRO_HOST=0.0.0.0
COPY --from=build --chown=node:node /app/.output ./.output
EXPOSE 3003
USER node
CMD ["node", ".output/server/index.mjs"]
