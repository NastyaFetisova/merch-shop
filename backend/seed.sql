INSERT INTO categories (name) VALUES ('Футболки и лонгсливы'), ('Худи и толстовки'), ('Штаны'), ('Аксессуары');

INSERT INTO sizes (name) VALUES ('S'), ('M'), ('L'), ('XL');

INSERT INTO status (name) VALUES ('Оплачен'), ('Отправлен'), ('Доставлен');

INSERT INTO products (name, price, description, image_url) VALUES 
('ВИДАВШИЙ ВИДЫ ЛОНГСЛИВ', 3990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/6753/2846300769/04_03_2026_Carnival25254.jpg'),
('Ф. КОВБОИ СЕВЕРА МЕЛАНЖ', 2490, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/7625/2846244297/04_03_2026_Carnival25244.jpg'),
('ЛОНГСЛИВ 32', 3990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/1777/2846303985/04_03_2026_Carnival24976_2.jpg'),
('Ф. КОВБОИ С. ЧЕРНАЯ', 2990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/3521/2846248385/04_03_2026_Carnival25239_2.jpg'),
('ФУТБОЛКА АСТМАБОЙС', 2990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/6641/2571966961/обтравки-2.jpg'),
('ЛОНГСЛИВ БОЛЬШИЕ КУРТКИ', 3990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/865/2831360865/кр-01.jpg');

INSERT INTO product_categories (product_id, category_id) VALUES 
(1, 1), (2, 1), (3, 1), (4, 1), (5, 1), (6, 1);

INSERT INTO product_sizes (product_id, size_id, quantity) VALUES 
(1, 1, 50), (1, 2, 50), (1, 3, 50), (1, 4, 50),
(2, 1, 50), (2, 2, 50), (2, 3, 50), (2, 4, 50),
(3, 1, 50), (3, 2, 50), (3, 3, 50), (3, 4, 50),
(4, 1, 50), (4, 2, 50), (4, 3, 50), (4, 4, 50),
(5, 1, 50), (5, 2, 50), (5, 3, 50), (5, 4, 50),
(6, 1, 50), (6, 2, 50), (6, 3, 50), (6, 4, 50);


INSERT INTO products (name, price, description, image_url) VALUES 
('ХУДИ ЭКС-ТРЕНЕР', 7990, '100% хлопок и 80% п/э 20% хлопок', 'https://static.insales-cdn.com/images/products/1/2937/2846313337/04_03_2026_Carnival25219.jpg'),
('ХУДИ КОВБОИ СЕВЕРА', 7490, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/6345/2846308553/04_03_2026_Carnival24990.jpg'),
('НАЙДЕН СВИТЕР', 6990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/4569/2496983513/3__7_.jpg'),
('ХУДИ КОВБОИ СЕВЕРА ЧЕРНЫЙ', 6990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/4281/2846322873/04_03_2026_Carnival25267.jpg');

INSERT INTO product_categories (product_id, category_id) VALUES 
(7, 2),  -- ХУДИ ЭКС-ТРЕНЕР
(8, 2),  -- ХУДИ КОВБОИ СЕВЕРА
(9, 2),  -- НАЙДЕН СВИТЕР
(10, 2); -- ХУДИ КОВБОИ СЕВЕРА ЧЕРНЫЙ

-- Добавление всех размеров (S=1, M=2, L=3, XL=4) к каждому товару
INSERT INTO product_sizes (product_id, size_id, quantity) VALUES 
(7, 1, 50), (7, 2, 40), (7, 3, 40), (7, 4, 50),
(8, 1, 50), (8, 2, 40), (8, 3, 40), (8, 4, 50),
(9, 1, 50), (9, 2, 40), (9, 3, 40), (9, 4, 50),
(10, 1, 50), (10, 2, 40), (10, 3, 40), (10, 4, 50);


INSERT INTO products (name, price, description, image_url) VALUES 
('ДЖИНСЫ НОМЕР ОДИН', 6990, 'Хлопок 100%', 'https://static.insales-cdn.com/images/products/1/2993/2846329777/04_03_2026_Carnival25454_2.jpg'),
('СПОРТИВНЫЕ ШТАНЫ ЭКС-ЧЕМПИОН', 4490, 'Хлопок 90%, ПЭ 10%, костюмная ткань (ПЭ 100%)', 'https://static.insales-cdn.com/images/products/1/8041/2493914985/19.jpg'),
('ШКОЛЬНЫЕ БРЮКИ', 6490, 'Хлопок 60%, ПЭ 37%, спандекс 3%', 'https://static.insales-cdn.com/images/products/1/4009/2493910953/10.jpg');

INSERT INTO product_categories (product_id, category_id) VALUES 
(11, 3),  -- ДЖИНСЫ НОМЕР ОДИН
(12, 3),  -- СПОРТИВНЫЕ ШТАНЫ ЭКС-ЧЕМПИОН
(13, 3);  -- ШКОЛЬНЫЕ БРЮКИ

-- Добавление всех размеров (S=1, M=2, L=3, XL=4) к каждому товару
INSERT INTO product_sizes (product_id, size_id, quantity) VALUES 
(11, 1, 50), (11, 2, 50), (11, 3, 50), (11, 4, 50),
(12, 1, 50), (12, 2, 50), (12, 3, 50), (12, 4, 50),
(13, 1, 50), (13, 2, 50), (13, 3, 50), (13, 4, 50);


INSERT INTO products (name, price, description, image_url) VALUES 
('КЕПКА КАРНАВАЛ РЕКОРДС', 2490, 'Хлопок 100% (хлопковый твил)', 'https://static.insales-cdn.com/images/products/1/385/1557258625/DSC00556_копия.jpg'),
('НОСКИ НИЧТО НЕ ВЕЧНО ЧЁРНЫЕ 5 ПАР', 1490, 'Хлопок 85%, полиамид 10%, лайкра 5%', 'https://static.insales-cdn.com/images/products/1/961/2493916097/1__9_.jpg'),
('КЕПКА ТАРТАРИЯ', 2490, 'Хлопок 100% (хлопковый твил)', 'https://static.insales-cdn.com/images/products/1/3841/1557221121/DSC00389.jpg'),
('НОСКИ НИЧТО НЕ ВЕЧНО БЕЛЫЕ 5 ПАР', 1490, 'Хлопок 85%, полиамид 10%, лайкра 5%', 'https://static.insales-cdn.com/images/products/1/2353/2493917489/1-1__1_.jpg');

INSERT INTO product_categories (product_id, category_id) VALUES 
(14, 4),  -- КЕПКА КАРНАВАЛ РЕКОРДС
(15, 4),  -- НОСКИ НИЧТО НЕ ВЕЧНО ЧЁРНЫЕ 5 ПАР
(16, 4),  -- КЕПКА ТАРТАРИЯ
(17, 4);  -- НОСКИ НИЧТО НЕ ВЕЧНО БЕЛЫЕ 5 ПАР

-- Добавление размеров для аксессуаров
-- Для кепок (размеры: S=1, M=2, L=3, XL=4) - обычно один размер или S/M/L
INSERT INTO product_sizes (product_id, size_id, quantity) VALUES 
(14, 1, 50), (14, 2, 50), (14, 3, 50),  -- Кепки: S, M, L
(16, 1, 50), (16, 2, 50), (16, 3, 50);  -- Кепки: S, M, L

-- Для носков (обычно один размер - универсальный)
INSERT INTO product_sizes (product_id, size_id, quantity) VALUES 
(15, 2, 150),  -- Носки черные: M (универсальный)
(17, 2, 150);  -- Носки белые: M (универсальный)