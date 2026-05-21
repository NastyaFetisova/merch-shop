const router = require('express').Router();
const db = require('../config/db');

// Получить все товары
router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM products');
        res.json({ success: true, products: rows });
    } catch (error) {
        console.error('Ошибка БД:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// Получить один товар по ID
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

module.exports = router;