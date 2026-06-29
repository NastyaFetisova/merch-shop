'use strict';

import cartStore from "./cartStore";


class CartUI {
    constructor() {
        this.container = document.querySelector('.cart-items');
        this.totalElement = document.querySelector('.form__btn-wrapper p');
        this.template = document.getElementById('order-card');
    }

    update(items) {
        this.render(items);
        this.updateTotal(items);
    }

    render(items) {
        if (!this.container) return;

        this.container.innerHTML = '';

        if (items.length === 0) {
            const empty = document.createElement('p');
            empty.textContent = 'Корзина пуста';
            empty.classList.add('empty');
            this.container.appendChild(empty);
            return;
        }

        items.forEach(item => {
            const clone = this.template.content.cloneNode(true);
            clone.querySelector('.cart-item__img img').src = item.productPhoto;
            clone.querySelector('.cart-item__name').textContent = item.name;
            clone.querySelector('.cart-item__size').textContent = `Размер: (${item.size})`;
            clone.querySelector('.cart-item__quantity').textContent = `Количество: ${item.quantity} шт`;
            clone.querySelector('.cart-item__price').textContent = item.total + ' ₽';
            clone.querySelector('.cart-item').dataset.price = item.total;
            clone.querySelector('.cart-item').dataset.productId = item.productId;
            clone.querySelector('.cart-item').dataset.productSizeId = item.productSizeId;

            this.container.appendChild(clone);
        });
        this.addRemoveListeners();
    }

    updateTotal(items) {
        if (!this.totalElement) return;

        const total = items.reduce((sum, item) => sum + item.total, 0);
        this.totalElement = `Итого: ${total} ₽`;
    }

    addRemoveListeners() {
        this.container.addEventListener('click', function (e) {
            if (e.target.closest('.cart-item__close')) {

                const product = e.target.closest('.cart-item');

                const productId = Number(product.dataset.productId);
                const productSizeId = Number(product.dataset.productSizeId);

                cartStore.removeItem(productId, productSizeId);
            }
        });
    }

}
export default CartUI;