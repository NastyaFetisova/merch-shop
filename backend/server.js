const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');  // ← поднял в начало
dotenv.config();

const app = express();

// Настройки
app.use(cors());
app.use(express.json());

// СТАТИЧЕСКИЕ ФАЙЛЫ 
app.use(express.static('public'));                    // для картинок (папка backend/public)
app.use(express.static(path.join(__dirname, '../frontend'))); // для фронтенда

// Подключаем маршруты
app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));



// Тестовый маршрут
app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});