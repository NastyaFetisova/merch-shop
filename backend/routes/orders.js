const router = require('express').Router();
const db = require('../config/db');

// POST /api/orders — создать заказ
router.post('/', async (req, res) => {
    const { user, address, items } = req.body;

    if (!user || !address || !items || items.length === 0) {
        return res.status(400).json({ success: false, message: 'Не все данные переданы' });
    }

    try {
        // 1. Найти или создать пользователя
        let userId;
        const [existingUser] = await db.query(
            'SELECT id FROM users WHERE email = ?',
            [user.email]
        );

        if (existingUser.length > 0) {
            userId = existingUser[0].id;
        } else {
            const [result] = await db.query(
                'INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)',
                [user.name, user.email, user.phone, '']
            );
            userId = result.insertId;
        }

        // 2. Создать заказ
        const orderNumber = `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
        const [orderResult] = await db.query(
            'INSERT INTO orders (user_id, order_number, address, time) VALUES (?, ?, ?, NOW())',
            [userId, orderNumber, address]
        );
        const orderId = orderResult.insertId;

        // 3. Добавить товары в order_items и уменьшить количество
        for (const item of items) {
            await db.query(
                'INSERT INTO order_items (order_id, product_size, count) VALUES (?, ?, ?)',
                [orderId, item.product_size_id, item.count]
            );

            // Уменьшаем количество на складе
            await db.query(
                'UPDATE product_sizes SET quantity = quantity - ? WHERE id = ?',
                [item.count, item.product_size_id]
            );
        }

        // 4. Добавить статус заказа (статус 1 = "Новый" или "Оплачен")
        await db.query(
            'INSERT INTO order_statuses (order_id, status_id, status_time) VALUES (?, 1, NOW())',
            [orderId]
        );

        res.json({
            success: true,
            orderId,
            orderNumber,
            message: 'Заказ успешно создан'
        });

    } catch (error) {
        console.error('Ошибка при создании заказа:', error);
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;