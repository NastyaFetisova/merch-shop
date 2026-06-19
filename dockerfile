# Используем официальный образ Node.js (лёгкая версия alpine)
FROM node:22-alpine

# Устанавливаем рабочую папку внутри контейнера
WORKDIR /app

# Копируем файлы с зависимостями (package.json и yarn.lock)
COPY backend/package*.json ./
COPY yarn.lock/ .

# Устанавливаем зависимости (используем yarn)
RUN yarn install

# Копируем весь код бэкенда в контейнер
COPY backend/ .


# Открываем порт, который слушает твой сервер
EXPOSE 5000

# Команда для запуска сервера
CMD ["node", "server.js"]