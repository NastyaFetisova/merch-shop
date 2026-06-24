const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs'); // ← добавили для проверки существования папки
dotenv.config();

const app = express();

// Настройки
app.use(cors());
app.use(express.json());

// Универсальный поиск папки frontend
const frontendPaths = [
    path.join(__dirname, 'frontend'),      // локально: backend/frontend
    path.join(__dirname, '../frontend'),   // Render: /src/frontend
    path.join(__dirname, '../../frontend') // запасной вариант
];

// Находим первую существующую папку frontend
let frontendPath = null;
for (const p of frontendPaths) {
    if (fs.existsSync(p)) {
        frontendPath = p;
        break;
    }
}

// Если папка найдена — раздаём статику
if (frontendPath) {
    app.use(express.static(frontendPath));
    console.log(`✅ Frontend найден: ${frontendPath}`);
} else {
    console.warn('⚠️ Папка frontend не найдена!');
}

// СТАТИЧЕСКИЕ ФАЙЛЫ (картинки)
app.use(express.static('public'));

// Подключаем маршруты
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Тестовый маршрут
app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

// ГЛАВНАЯ СТРАНИЦА (универсальная)
app.get('/', (req, res) => {
    if (frontendPath) {
        const indexPath = path.join(frontendPath, 'index.html');
        if (fs.existsSync(indexPath)) {
            res.sendFile(indexPath);
            return;
        }
    }
    res.status(404).send('index.html не найден');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});