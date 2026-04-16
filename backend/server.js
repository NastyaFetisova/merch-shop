const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Подключаем маршруты
app.use('/api/products', require('./routes/products'));

// Корневой маршрут
app.get('/', (req, res) => {
    res.json({
        message: 'Сервер интернет-магазина мерча работает!',
        endpoints: {
            'GET /api/products': 'Список всех товаров',
            'GET /api/products/:id': 'Товар по ID',
            'GET /api/test': 'Проверка работы сервера'
        }
    });
});

// Тестовый маршрут
app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Сервер запущен на http://localhost:${PORT}`);
});