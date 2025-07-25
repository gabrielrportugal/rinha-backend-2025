FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --ci

COPY . .

RUN npm run build

FROM node:20 AS production

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    python3 \
    git \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /app/dist ./dist
COPY package.json ./

RUN npm install --omit=dev --ci

RUN apt-get purge -y --auto-remove \
    build-essential \
    python3 \
    git \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
