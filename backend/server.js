const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
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

let frontendPath = null;
for (const p of frontendPaths) {
    if (fs.existsSync(p)) {
        frontendPath = p;
        break;
    }
}

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

// === ВРЕМЕННЫЙ ЭНДПОИНТ ДЛЯ ЗАГРУЗКИ ТОВАРОВ ===
app.get('/seed', async (req, res) => {
    try {
        const db = require('./config/db');

        // Очистка таблиц (чтобы не было дублей)
        await db.query('SET FOREIGN_KEY_CHECKS = 0');
        await db.query('TRUNCATE TABLE product_categories');
        await db.query('TRUNCATE TABLE product_sizes');
        await db.query('TRUNCATE TABLE products');
        await db.query('TRUNCATE TABLE categories');
        await db.query('TRUNCATE TABLE sizes');
        await db.query('SET FOREIGN_KEY_CHECKS = 1');

        // Базовые справочники
        await db.query(`
            INSERT INTO categories (name) VALUES
            ('Футболки и лонгсливы'),
            ('Худи и толстовки'),
            ('Штаны'),
            ('Аксессуары');
        `);

        await db.query(`
            INSERT INTO sizes (name) VALUES
            ('S'), ('M'), ('L'), ('XL');
        `);

        // Товары (категория 1)
        await db.query(`
            INSERT INTO products (name, price, description, image_url) VALUES
            ('ЛОНГСЛИВ С НАШИВКАМИ', 3990, 'Хлопок 100%', '/images/long_2.jpeg'),
            ('Ф. ДИКИЙ ЗАПАД', 2490, 'Хлопок 100%', '/images/t_shirt_1.jpeg'),
            ('ЛОНГСЛИВ 13', 3990, 'Хлопок 100%', '/images/hoodi_1.jpeg'),
            ('Ф. ЧЁРНЫЙ ВОРОН', 2990, 'Хлопок 100%', '/images/t_shirt_2.jpeg'),
            ('ФУТБОЛКА НА РАЙОНЕ', 2990, 'Хлопок 100%', '/images/t_shirt_3.jpeg'),
            ('ЛОНГСЛИВ СУЕТА', 3990, 'Хлопок 100%', '/images/long_1.jpeg');
        `);

        // Связи категорий (1-6)
        await db.query(`
            INSERT INTO product_categories (product_id, category_id) VALUES
            (1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1);
        `);

        // Размеры и остатки (1-6)
        await db.query(`
            INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
            (1, 1, 50), (1, 2, 50), (1, 3, 50), (1, 4, 50),
            (2, 1, 50), (2, 2, 50), (2, 3, 50), (2, 4, 50),
            (3, 1, 50), (3, 2, 50), (3, 3, 50), (3, 4, 50),
            (4, 1, 50), (4, 2, 50), (4, 3, 50), (4, 4, 50),
            (5, 1, 50), (5, 2, 50), (5, 3, 50), (5, 4, 50),
            (6, 1, 50), (6, 2, 50), (6, 3, 50), (6, 4, 50);
        `);

        // Товары (категория 2)
        await db.query(`
            INSERT INTO products (name, price, description, image_url) VALUES
            ('ХУДИ ВНЕ ЗОНЫ ДОСТУПА', 7990, '100% хлопок и 80% п/э 20% хлопок', '/images/hoodi_2.jpeg'),
            ('ХУДИ КОВБОИ ПУСТЫНИ', 7490, 'Хлопок 100%', '/images/hoodi_3.jpeg'),
            ('ПОТЕРЯЛИ СВИТЕР', 6990, 'Хлопок 100%', '/images/sweater.jpeg'),
            ('ХУДИ НОЧЬ', 6990, 'Хлопок 100%', '/images/long_3.jpeg');
        `);

        await db.query(`
            INSERT INTO product_categories (product_id, category_id) VALUES
            (7, 2), (8, 2), (9, 2), (10, 2);
        `);

        await db.query(`
            INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
            (7, 1, 50), (7, 2, 40), (7, 3, 40), (7, 4, 50),
            (8, 1, 50), (8, 2, 40), (8, 3, 40), (8, 4, 50),
            (9, 1, 50), (9, 2, 40), (9, 3, 40), (9, 4, 50),
            (10, 1, 50), (10, 2, 40), (10, 3, 40), (10, 4, 50);
        `);

        // Товары (категория 3)
        await db.query(`
            INSERT INTO products (name, price, description, image_url) VALUES
            ('КРЕЙЗИ ДЖИНСЫ', 6990, 'Хлопок 100%', '/images/jeans.jpeg'),
            ('СПОРТИВНЫЕ ШТАНЫ', 4490, 'Хлопок 90%, ПЭ 10%, костюмная ткань (ПЭ 100%)', '/images/pants.jpeg'),
            ('БРЮКИ ШКОЛЬНЫЕ', 6490, 'Хлопок 60%, ПЭ 37%, спандекс 3%', '/images/trousers.jpeg');
        `);

        await db.query(`
            INSERT INTO product_categories (product_id, category_id) VALUES
            (11, 3), (12, 3), (13, 3);
        `);

        await db.query(`
            INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
            (11, 1, 50), (11, 2, 50), (11, 3, 50), (11, 4, 50),
            (12, 1, 50), (12, 2, 50), (12, 3, 50), (12, 4, 50),
            (13, 1, 50), (13, 2, 50), (13, 3, 50), (13, 4, 50);
        `);

        // Товары (категория 4)
        await db.query(`
            INSERT INTO products (name, price, description, image_url) VALUES
            ('КЕПКА ГРАНЖ', 2490, 'Хлопок 100% (хлопковый твил)', '/images/cap_2.jpeg'),
            ('НОСКИ ТЕНЬ ЧЁРНЫЕ', 1490, 'Хлопок 85%, полиамид 10%, лайкра 5%', '/images/socks_2.jpeg'),
            ('КЕПКА АРМИЯ', 2490, 'Хлопок 100% (хлопковый твил)', '/images/cap_1.jpeg'),
            ('НОСКИ ТЕНЬ БЕЛЫЕ', 1490, 'Хлопок 85%, полиамид 10%, лайкра 5%', '/images/socks_1.jpeg');
        `);

        await db.query(`
            INSERT INTO product_categories (product_id, category_id) VALUES
            (14, 4), (15, 4), (16, 4), (17, 4);
        `);

        // Размеры для кепок
        await db.query(`
            INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
            (14, 1, 50), (14, 2, 50), (14, 3, 50),
            (16, 1, 50), (16, 2, 50), (16, 3, 50);
        `);

        // Размеры для носков
        await db.query(`
            INSERT INTO product_sizes (product_id, size_id, quantity) VALUES
            (15, 2, 150),
            (17, 2, 150);
        `);

        res.json({ success: true, message: 'Товары успешно загружены!' });
    } catch (error) {
        console.error('Ошибка при загрузке товаров:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ГЛАВНАЯ СТРАНИЦА
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