'use strict';
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
// валидация формы
const formCart = document.querySelector('.form');
const formBtn = formCart.querySelector('.form__btn');

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    validateError(formBtn, formCart);
});

formCart.addEventListener('input', (e) => {
    const divError = e.target.nextElementSibling;
    if (divError && divError.classList.contains('error-message')) {
        divError.remove();
    }
})
