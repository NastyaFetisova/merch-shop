'use strict';

// 1. Определяем базовый URL для API
const hostname = window.location.hostname;
const isLocal = (hostname === 'localhost' || hostname === '127.0.0.1');
const API_BASE = isLocal ? 'http://localhost:5000' : '';

// 2. Импортируем Store для добавления товаров
import cartStore from './patterns/cartStore.js';
import ProductCardFactory from './patterns/productCardFactory.js';
import Cache from "./patterns/cache.js";


document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.catalog__products');
    const template = document.getElementById('cardTemplate');

    let allProducts = [];

    // 3. Функция получения и отрисовки товаров
    async function getData(url) {
        try {

            let data = Cache.load(url);

            if (data) {
                console.log('Каталог загружен из кэша');
            } else {
                console.log('Каталог загружен с сервера');

                const response = await fetch(url);
                data = await response.json();

                Cache.save(url, data);
            }

            container.innerHTML = '';

            allProducts = [...data.products];

            const fragment = ProductCardFactory.createMany(allProducts, template);

            container.appendChild(fragment);

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // 4. Работа с модальным окном
    async function getModal() {
        try {
            await getData(`${API_BASE}/api/products`);

            const modalOverlay = document.querySelector('.modal-overlay');
            const modal = document.querySelector('.modal');
            const modalClose = document.querySelector('.modal__close');
            const catalogProducts = document.querySelector('.catalog__products');

            // 4.1 Открытие модалки
            catalogProducts.addEventListener('click', async function (e) {
                if (e.target.closest('.card__buy')) {
                    const card = e.target.closest('.card');
                    const cardId = card.dataset.id;

                    if (cardId) {
                        modal.dataset.productId = cardId;
                        await getCardAndSize(cardId, modal);
                    }

                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });

            // 4.2 Закрытие модалки
            modal.addEventListener('click', function (e) {
                if (e.target.closest('.modal__close') && modalOverlay.classList.contains('active')) {
                    modalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            // 4.3 Добавление в корзину (через Store)
            modal.addEventListener('click', function (e) {
                if (e.target.closest('.modal__add')) {
                    const modalBtn = modal.querySelector('.modal__add');

                    if (!validateError(modalBtn, modal)) {
                        const productId = modal.dataset.productId;
                        const productSizeId = modal.querySelector('.modal__select option:checked').dataset.productSizeId;
                        const sizeName = modal.querySelector('.modal__select option:checked').textContent;
                        const productName = modal.querySelector('.modal__name p').textContent;
                        const productPhoto = modal.querySelector('.modal__photo img').src;
                        const productCount = modal.querySelector('.input__count').value;
                        const priceOne = modal.querySelector('.modal__price-total').dataset.price;
                        const priceTotal = Number(productCount) * Number(priceOne);

                        // ✅ Создаем товар для корзины
                        const cartItem = {
                            productId: Number(productId),
                            productSizeId: Number(productSizeId),
                            name: productName,
                            size: sizeName,
                            productPhoto: productPhoto,
                            quantity: Number(productCount),
                            price: Number(priceOne),
                            total: priceTotal,
                        };

                        // ✅ Добавляем через Store
                        cartStore.addItem(cartItem);
                    }
                }
            });

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // 5. Функция получения данных товара и размеров
    async function getCardAndSize(id, modal) {
        try {
            const productRes = await fetch(`${API_BASE}/api/products/${id}`);
            const product = await productRes.json();

            const sizesQuantRes = await fetch(`${API_BASE}/api/products/${id}/sizes`);
            const sizesQuant = await sizesQuantRes.json();

            // Заполняем модалку данными
            const priceTotalElem = modal.querySelector('.modal__price-total');
            priceTotalElem.setAttribute('data-price', product.price);
            priceTotalElem.textContent = product.price + ' ₽';

            modal.querySelector('.modal__photo img').src = product.image_url;
            modal.querySelector('.modal__name p').textContent = product.name;
            modal.querySelector('.modal__description p').textContent = product.description;
            modal.querySelector('.input__count').value = 1;

            const select = modal.querySelector('.modal__select');
            select.innerHTML = '';

            sizesQuant.sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size.size_id;
                option.textContent = size.size_name;
                option.dataset.productSizeId = size.product_size_id;
                if (size.quantity == 0) {
                    option.disabled = true;
                }
                select.appendChild(option);
            });

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    // 6. Обновление цены при изменении количества
    const inputCount = document.querySelector('.input__count');
    const priceTotalElem = document.querySelector('.modal__price-total');

    inputCount.addEventListener('input', function (e) {
        const onePrice = +priceTotalElem.getAttribute('data-price');
        const totalPrice = +e.target.value;

        if (onePrice && totalPrice > 0 && Number.isInteger(totalPrice) && totalPrice <= 15) {
            priceTotalElem.textContent = totalPrice * onePrice + ' ₽';
        } else {
            priceTotalElem.textContent = "-";
        }

        const divError = inputCount.nextElementSibling;
        if (divError && divError.classList.contains('error-message')) {
            divError.remove();
        }
    });

    // 7. Фильтрация товаров
    const filterForm = document.querySelector('.filters');

    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const category = filterForm.querySelector('select[name="category"]').value;
        const sizeRadio = filterForm.querySelector('input[name="size"]:checked');
        const sizeValue = sizeRadio ? sizeRadio.value : null;
        const priceForm = filterForm.querySelector('input[name="price_from"]').value;
        const priceTo = filterForm.querySelector('input[name="price_to"]').value;
        const sort = filterForm.querySelector('select[name="sort"]').value;

        const params = {};
        if (category) params.category = category;
        if (sizeValue && sizeValue !== '') params.size_id = sizeValue;
        if (priceForm) params.price_from = priceForm;
        if (priceTo) params.price_to = priceTo;
        if (sort) params.sort = sort;

        const searchParams = new URLSearchParams(params).toString();
        const urlSort = `${API_BASE}/api/products/filter?${searchParams}`;

        await getData(urlSort);
    });

    // 8. Сброс фильтров
    filterForm.addEventListener('click', async (e) => {
        if (e.target.closest('.filters__reset')) {
            filterForm.reset();
            await getData(`${API_BASE}/api/products`);
        }
    });

    // 9. Прокрутка к каталогу
    const scrollBtn = document.querySelector('.main__btn-outline');

    scrollBtn.addEventListener('click', () => {
        const catalog = document.querySelector('.catalog');
        const header = document.querySelector('header');
        const headerHeight = header.offsetHeight;
        const catalogPosition = catalog.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
            top: catalogPosition,
            behavior: 'smooth'
        });
    });

    // 10. Запуск модалки
    getModal();
});