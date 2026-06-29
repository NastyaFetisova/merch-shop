import { describe, it, expect, beforeEach, vi } from 'vitest';

vi.mock('../cartStore.js', () => ({
    default: {
        removeItem: vi.fn()
    }
}));

import CartUI from '../cartUI.js';
import cartStore from '../cartStore.js';

describe('CartUI', () => {

    let cartUI;

    beforeEach(() => {

        document.body.innerHTML = `
            <div class="cart-items"></div>

            <div class="form__btn-wrapper">
                <p>Итого: 0 ₽</p>
            </div>

            <template id="order-card">
                <div class="cart-item">
                    <div class="cart-item__img">
                        <img src="" alt="">
                    </div>

                    <div class="cart-item__wrapper">

                        <p class="cart-item__name"></p>

                        <p class="cart-item__size"></p>

                        <p class="cart-item__quantity"></p>

                        <div class="cart-item__close"></div>

                        <p class="cart-item__price"></p>

                    </div>
                </div>
            </template>
        `;

        cartUI = new CartUI();

        vi.clearAllMocks();
    });

    it('показывает сообщение о пустой корзине', () => {

        cartUI.update([]);

        const empty = document.querySelector('.empty');

        expect(empty).not.toBeNull();
        expect(empty.textContent).toBe('Корзина пуста');

    });

    it('рисует товары', () => {

        cartUI.update([
            {
                productId: 1,
                productSizeId: 2,
                name: 'Футболка',
                size: 'M',
                quantity: 2,
                total: 2000,
                productPhoto: 'photo.jpg'
            }
        ]);

        const item = document.querySelector('.cart-item');

        expect(item).not.toBeNull();

        expect(
            item.querySelector('.cart-item__name').textContent
        ).toBe('Футболка');

        expect(
            item.querySelector('.cart-item__quantity').textContent
        ).toContain('2');

    });

    it('обновляет итоговую сумму', () => {

        cartUI.update([
            {
                productId: 1,
                productSizeId: 2,
                name: 'Футболка',
                size: 'M',
                quantity: 2,
                total: 2000,
                productPhoto: 'photo.jpg'
            }
        ]);

        expect(
            document.querySelector('.form__btn-wrapper p').textContent
        ).toBe('Итого: 2000 ₽');

    });

    it('вызывает removeItem при клике по крестику', () => {

        cartUI.update([
            {
                productId: 5,
                productSizeId: 10,
                name: 'Худи',
                size: 'L',
                quantity: 1,
                total: 3500,
                productPhoto: 'photo.jpg'
            }
        ]);

        const cartItem = document.querySelector('.cart-item');

        cartItem.dataset.productId = '5';
        cartItem.dataset.productSizeId = '10';

        document
            .querySelector('.cart-item__close')
            .dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(cartStore.removeItem).toHaveBeenCalledWith(5, 10);

    });

});