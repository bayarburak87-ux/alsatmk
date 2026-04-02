# Repo kökünden build — Railway'de sadece backend klasörü imaja kopyalanır
FROM node:20-bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends python3 make g++ \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY backend/package*.json ./
RUN npm install --omit=dev

COPY backend/ .

ENV NODE_ENV=production

CMD ["node", "server.js"]
