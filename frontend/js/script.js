'use strict';

// 1. Определяем базовый URL для API

//    window.location.hostname содержит адрес сайта в браузере
const hostname = window.location.hostname;
const isLocal = (hostname === 'localhost' || hostname === '127.0.0.1');
const API_BASE = isLocal ? 'http://localhost:5000' : '';


document.addEventListener('DOMContentLoaded', function () {
    const template = document.getElementById('cardTemplate');



    let allProducts = [];

    async function getData(url) {
        // console.log('getData вызвана, url:', url);
        try {
            const response = await fetch(url);
            const data = await response.json();
            document.querySelector('.catalog__products').innerHTML = '';
            allProducts = data.products;
            data.products.forEach(element => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.card__photo img').src = element.image_url;
                clone.querySelector('.card__name').textContent = element.name;
                clone.querySelector('.card__price').textContent = element.price + ' ₽';
                clone.querySelector('.card').dataset.id = element.id;

                document.querySelector('.catalog__products').appendChild(clone);
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }


    async function getModal() {
        try {
            await getData(`${API_BASE}/api/products`);
            const modalOverlay = document.querySelector('.modal-overlay');
            const modal = document.querySelector('.modal');
            const modalClose = document.querySelector('.modal__close');
            const catalogProducts = document.querySelector('.catalog__products');
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
            })
            modal.addEventListener('click', function (e) {
                if (e.target.closest('.modal__close') && modalOverlay.classList.contains('active')) {
                    modalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });

            //Добавить в заказ
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

                        addTocard(cartItem);
                    }



                }
            })
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    function addTocard(newItem) {

        // let cart = localStorage.getItem('cart');

        // if (cart === null) {
        //     cart = [];
        // } else {
        //     // превращает строку обратно в массив объектов
        //     cart = JSON.parse(cart);
        // }

        // const existingIndex = cart.findIndex(item =>
        //     item.productId === newItem.productId &&
        //     item.productSizeId === newItem.productSizeId
        // );
        // if (existingIndex !== -1) {
        //     cart[existingIndex].quantity += newItem.quantity;
        //     cart[existingIndex].total = cart[existingIndex].price * cart[existingIndex].quantity;
        // } else {
        //     cart.push(newItem);
        // }

        // в JSON формат обратно превращаем
        // localStorage.setItem('cart', JSON.stringify(cart));
        // alert('Товар добавлен в корзину!');

    }

    async function getCardAndSize(id, modal) {
        try {
            const productRes = await fetch(`${API_BASE}/api/products/${id}`);
            const product = await productRes.json();

            const sizesQuantRes = await fetch(`${API_BASE}/api/products/${id}/sizes`);
            const sizesQuant = await sizesQuantRes.json();

            // добавление единичной цены
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


    const inputCount = document.querySelector('.input__count');
    const priceTotalElem = document.querySelector('.modal__price-total');

    inputCount.addEventListener('input', function (e) {
        //считать цену товаров
        const onePrice = +priceTotalElem.getAttribute('data-price');
        const totalPrice = +e.target.value;
        if (onePrice && totalPrice > 0 && Number.isInteger(totalPrice) && totalPrice <= 15) {
            priceTotalElem.textContent = totalPrice * onePrice + ' ₽';
        } else {
            priceTotalElem.textContent = "-"
        }
        // убрать див с ошибкой при инпуте
        const divError = inputCount.nextElementSibling;
        if (divError && divError.classList.contains('error-message')) {
            divError.remove();
        }
    });

    getModal();

    //фильтрация формы

    const filterForm = document.querySelector('.filters');
    // отрисовка карточек после фильтрации
    filterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const category = filterForm.querySelector('select[name = "category"]').value;
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

    //кнопка Сбросить 
    filterForm.addEventListener('click', async (e) => {
        if (e.target.closest('.filters__reset')) {
            const catalogProducts = document.querySelector('.catalog__products');
            filterForm.reset();
            catalogProducts.innerHTML = '';
            await getData(`${API_BASE}/api/products`);
        }

    })

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
})