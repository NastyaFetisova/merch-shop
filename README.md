# 🛍️ Интернет-магазин одежды — Fullstack-приложение

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-blue.svg?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0+-orange.svg?style=for-the-badge&logo=mysql&logoColor=white)

> Интернет-магазин с каталогом, корзиной, фильтрацией, модальным окном товара и админ-панелью.

---

## 📸 Скриншоты

> *Ниже представлен внешний вид интерфейса при настроенной базе данных и запущенном бэкенде.*

| Главная страница | Каталог товаров |
|----------------|----------------|
| <img width="1920" height="905" alt="Главная страница" src="https://github.com/user-attachments/assets/422d40a9-aec6-43bd-b735-f4fcb44a272a"> | <img width="1920" height="920" alt="Каталог товаров" src="https://github.com/user-attachments/assets/94b35aa3-239e-4857-b0e6-ddc3b9d1c206"> |

| Модальное окно | Корзина |
|----------------|---------|
| <img width="1920" height="914" alt="Модальное окно" src="https://github.com/user-attachments/assets/fd9c39b6-9dd4-4e95-b102-b022fda8df37"> | <img width="1920" height="921" alt="Корзина" src="https://github.com/user-attachments/assets/ac75756a-306f-4001-89ab-38d19c0feb79"> |

| Админ-панель | Фильтрация |
|-------------|-------------|
| <img width="1920" height="914" alt="Админ-панель" src="https://github.com/user-attachments/assets/f54aadb8-a5e2-43e8-beb5-c8e419a9d7e6"> | <img width="1920" height="911" alt="Фильтрация" src="https://github.com/user-attachments/assets/d34c7ef4-170c-4e9a-8a02-2c00810b7c88"> |

---

## 🚀 Быстрый старт (локальный запуск)

### Требования

- Node.js (версия 20+)
- Yarn или npm
- MySQL (через XAMPP / MAMP)

### Шаг 1. Клонировать репозиторий

```bash
git clone https://github.com/ВАШ_ЛОГИН/merch-shop.git
cd merch-shop
```

### Шаг 2. Установить зависимости
```bash
cd backend
yarn install
```
### Шаг 3. Настроить базу данных
Запустите MySQL через XAMPP

Создайте базу данных:

```sql
CREATE DATABASE merch_shop CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
```
Импортируйте структуру:

```bash
yarn sequelize-cli db:migrate
```
(Опционально) Заполните тестовыми данными — выполните скрипт backend/seed.sql в phpMyAdmin

### Шаг 4. Настроить переменные окружения
Создайте файл backend/.env:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=merch_shop
JWT_SECRET=my_super_secret_key_123
```
### Шаг 5. Запустить приложение
```bash
cd backend
yarn dev
```
Готово! Откройте сайт в браузере:
## 👉 http://localhost:5000

Никаких дополнительных действий не требуется — фронтенд уже настроен на получение данных с этого же порта.

### 📁 Структура проекта

merch-shop/
├── backend/               # Node.js + Express
│   ├── config/            # Конфигурация БД
│   ├── migrations/        # Миграции Sequelize
│   ├── models/            # Модели данных
│   ├── routes/            # API маршруты
│   ├── public/            # Статические файлы (картинки)
│   └── server.js          # Точка входа (раздаёт и API, и фронтенд)
├── frontend/              # HTML/CSS/JS (раздаётся через Express)
└── README.md

### 🛠️ Технологии
## Фронтенд
HTML5 / CSS3 (SCSS)
JavaScript (ES6+)
Fetch API

## Бэкенд
Node.js
Express.js
MySQL
Sequelize ORM
JWT (аутентификация)

### ✨ Функционал
✅ Просмотр каталога товаров
✅ Фильтрация по категориям и размерам
✅ Сортировка по цене
✅ Модальное окно с подробной информацией о товаре
✅ Корзина и оформление заказа
✅ Админ-панель для управления товарами

### 👥 Команда проекта
Анастасия — фронтенд, бэкенд, дизайн, база данных
Александр — помощь с настройкой БД и миграциями

### 📄 Лицензия
Учебный проект. Все изображения и видео используются в демонстрационных целях.
