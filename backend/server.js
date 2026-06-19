const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();

const app = express();

// Настройки
app.use(cors());
app.use(express.json());

// СТАТИЧЕСКИЕ ФАЙЛЫ
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'frontend'))); // ← исправлено

// Подключаем маршруты
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

// Тестовый маршрут
app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

// ГЛАВНАЯ СТРАНИЦА (можно убрать, express.static отдаст index.html)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend', 'index.html')); // ← исправлено
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});