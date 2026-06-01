const router = require('express').Router();
const db = require('../config/db');

// ========== НОВЫЙ МАРШРУТ: ФИЛЬТРАЦИЯ И СОРТИРОВКА (ДОЛЖЕН БЫТЬ ПЕРВЫМ!) ==========

// GET /api/products/filter?category=1&size_id=2&price_from=1000&price_to=5000&sort=price_asc
router.get('/filter', async (req, res) => {
    try {
        const { category, size_id, price_from, price_to, sort } = req.query;

        let sql = `
            SELECT DISTINCT p.*
            FROM products p
            LEFT JOIN product_categories pc ON p.id = pc.product_id
            LEFT JOIN product_sizes ps ON p.id = ps.product_id
        `;

        const conditions = [];
        const params = [];

        // Фильтр по категории
        if (category && category !== '') {
            conditions.push('pc.category_id = ?');
            params.push(category);
        }

        // Фильтр по размеру
        if (size_id && size_id !== '') {
            conditions.push('ps.size_id = ?');
            params.push(size_id);
        }

        // Фильтр по цене (от)
        if (price_from && price_from !== '') {
            conditions.push('p.price >= ?');
            params.push(price_from);
        }

        // Фильтр по цене (до)
        if (price_to && price_to !== '') {
            conditions.push('p.price <= ?');
            params.push(price_to);
        }

        // Добавляем условия WHERE
        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' AND ');
        }

        // Сортировка
        if (sort === 'price_asc') {
            sql += ' ORDER BY p.price ASC';
        } else if (sort === 'price_desc') {
            sql += ' ORDER BY p.price DESC';
        }

        const [rows] = await db.query(sql, params);

        res.json({ success: true, products: rows });
    } catch (error) {
        console.error('Ошибка БД:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// ========== СТАРЫЕ МАРШРУТЫ ==========

// Получить все товары (без фильтров)
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json({ success: true, products: rows });
    } catch (error) {
        console.error('Ошибка БД:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Получить один товар по ID (ДОЛЖЕН БЫТЬ ПОСЛЕ /filter)
router.get('/:id', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [req.params.id]);
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Товар не найден' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/products/:id/sizes
router.get('/:id/sizes', async (req, res) => {
    try {
        const productId = req.params.id;

        const [rows] = await db.query(
            `SELECT ps.id as product_size_id, s.id as size_id, s.name as size_name, ps.quantity 
             FROM sizes s
             JOIN product_sizes ps ON s.id = ps.size_id
             WHERE ps.product_id = ?`,
            [productId]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: 'Размеры для этого товара не найдены' });
        }

        res.json({ success: true, sizes: rows });
    } catch (error) {
        console.error('Ошибка БД:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;