FROM node:20-alpine

WORKDIR /app

# Ставим зависимости
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Копируем только нужные файлы проекта (без секретов)
# Сюда не клади .env, ключи, SSH-ключи и т.п.
COPY agent.js ./

# Важно: никаких монтирований секретов внутрь образа
ENTRYPOINT ["node", "agent.js"]
