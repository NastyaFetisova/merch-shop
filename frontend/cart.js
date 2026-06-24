'use strict';

// 1. Определяем базовый URL для API

//    window.location.hostname содержит адрес сайта в браузере
const hostname = window.location.hostname;
const isLocal = (hostname === 'localhost' || hostname === '127.0.0.1');
const API_BASE = isLocal ? 'http://localhost:5000' : '';

document.addEventListener('DOMContentLoaded', function () {



    allSum();

});


function renderCart() {

    let cart = localStorage.getItem('cart');

    const template = document.getElementById('order-card');
    const container = document.querySelector('.cart-items');

    container.innerHTML = '';

    if (cart === null || cart === "[]") {
        cart = [];
        const empty = document.createElement('p');
        empty.textContent = 'Корзина пуста';
        empty.classList.add('empty');
        document.querySelector('.cart-items').appendChild(empty);

    } else {
        cart = JSON.parse(cart);
        //  console.log(cart);
        cart.forEach(item => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('.cart-item__img img').src = item.productPhoto;
            clone.querySelector('.cart-item__name').textContent = item.name;
            clone.querySelector('.cart-item__size').textContent = `Размер: (${item.size})`;
            clone.querySelector('.cart-item__quantity').textContent = `Количество: ${item.quantity} шт`;
            clone.querySelector('.cart-item__price').textContent = item.total + ' ₽';
            clone.querySelector('.cart-item').dataset.price = item.total;
            clone.querySelector('.cart-item').dataset.productId = item.productId;
            clone.querySelector('.cart-item').dataset.productSizeId = item.productSizeId;

            container.appendChild(clone);
        });



    }
    removeToCard();
}

function removeToCard() {
    const container = document.querySelector('.cart-items');


    container.addEventListener('click', function (e) {
        if (e.target.closest('.cart-item__close')) {

            let cart = localStorage.getItem('cart');
            cart = JSON.parse(cart);

            const product = e.target.closest('.cart-item');
            const existingIndex = cart.findIndex(item =>
                item.productId === Number(product.dataset.productId) &&
                item.productSizeId === Number(product.dataset.productSizeId)
            );

            if (existingIndex !== -1) {
                cart.splice(existingIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));

            allSum();
        }
    });
}


//общая сумма заказа
async function allSum() {
    await renderCart();
    const container = document.querySelector('.cart-items');
    const allcards = container.querySelectorAll('.cart-item');
    const formBtn = document.querySelector('.form__btn-wrapper p');
    if (allcards) {
        let total = 0;
        allcards.forEach(card => {
            total += +(card.dataset.price);

        });

        formBtn.textContent = `Итого: ${total} ₽`;
    }

}
// валидация формы и сбор заказа
const formCart = document.querySelector('.form');
const formBtn = formCart.querySelector('.form__btn');

formBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    if (validateError(formBtn, formCart)) {
        return;
    }

    //собираем данные
    const name = formCart.querySelector('.form__name').value;
    const phone = formCart.querySelector('.form__phone').value;
    const email = formCart.querySelector('.form__email').value;
    const address = formCart.querySelector('.form__address').value;
    let cart = localStorage.getItem('cart');
    if (cart === null || cart === "[]") {
        alert('Ваша корзина пуста');
        return;
    }
    cart = JSON.parse(cart);

    const items = cart.map(item => ({
        product_size_id: item.productSizeId,
        count: item.quantity
    }));

    const orderData = {
        user: { name, phone, email },
        address: address,
        items: items
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
            localStorage.removeItem('cart');
            renderCart();
            formCart.reset();
        }
    }
    catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
});


formCart.addEventListener('input', (e) => {
    const divError = e.target.nextElementSibling;
    if (divError && divError.classList.contains('error-message')) {
        divError.remove();
    }
})
