'use strict';

import cartStore from "./cartStore.js";
import ProductItemFactory from "./productItemFactory.js";


class CartUI {
    constructor() {
        this.container = document.querySelector('.cart-items');
        this.totalElement = document.querySelector('.form__btn-wrapper p');
        this.template = document.getElementById('order-card');

        this.addRemoveListeners();
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

        const fragment = ProductItemFactory.createMany(items, this.template);
        this.container.appendChild(fragment);

    }

    updateTotal(items) {
        if (!this.totalElement) return;

        const total = items.reduce((sum, item) => sum + item.total, 0);
        this.totalElement.textContent = `Итого: ${total} ₽`;
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