'use strict';

import CartUI from "./patterns/cartUI.js";
import cartStore from "./patterns/cartStore.js";


// 1. Определяем базовый URL для API

//    window.location.hostname содержит адрес сайта в браузере
const hostname = window.location.hostname;
const isLocal = (hostname === 'localhost' || hostname === '127.0.0.1');
const API_BASE = isLocal ? 'http://localhost:5000' : '';

document.addEventListener('DOMContentLoaded', function () {

    const cartUI = new CartUI();
    cartStore.subscribe(cartUI);

    initOrderForm();

});



// валидация формы и сбор заказа
function initOrderForm() {
    const formCart = document.querySelector('.form');
    const formBtn = formCart.querySelector('.form__btn');

    // Удаление сообщений об ошибках при вводе
    formCart.addEventListener('input', (e) => {
        const divError = e.target.nextElementSibling;
        if (divError && divError.classList.contains('error-message')) {
            divError.remove();
        }
    });

    formBtn.addEventListener('click', async (e) => {
        e.preventDefault();

        if (validateError(formBtn, formCart)) {
            return;
        }

        const items = cartStore.getItems();
        if (items.length === 0) {
            alert('Ваша корзина пуста');
            return;
        }

        //собираем данные
        const name = formCart.querySelector('.form__name').value;
        const phone = formCart.querySelector('.form__phone').value;
        const email = formCart.querySelector('.form__email').value;
        const address = formCart.querySelector('.form__address').value;


        const orderData = {
            user: { name, phone, email },
            address: address,
            items: items.map(item => ({
                product_size_id: item.productSizeId,
                count: item.quantity
            }))
        };

        try {
            const response = await fetch(`${API_BASE}/api/orders`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            const result = await response.json();

            if (result.success) {
                alert('Заказ оформлен!');

                cartStore.clear();

                formCart.reset();
            }
        }
        catch (error) {
            console.error('Ошибка:', error);
            alert('Ошибка соединения с сервером');
        }
    });
}




