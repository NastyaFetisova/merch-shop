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
    path.join(__dirname, 'frontend'),
    path.join(__dirname, '../frontend'),
    path.join(__dirname, '../../frontend')
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

const imagesPath = path.join(__dirname, 'public', 'images');
app.use('/images', express.static(imagesPath));
app.use(express.static('public'));

app.use('/api/products', require('./routes/products'));
app.use('/api/orders', require('./routes/orders'));

app.get('/api/test', (req, res) => {
    res.json({ message: 'Сервер работает!' });
});

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