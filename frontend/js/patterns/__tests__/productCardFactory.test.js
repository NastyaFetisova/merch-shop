

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import ProductCardFactory from '../productCardFactory.js';

describe('ProductCardFactory', () => {
    let template;
    let container;

    beforeEach(() => {
        container = document.createElement('div');

        container.innerHTML = `
            <template id="cardTemplate">
                <div class="card" data-id="">
                    <div class="card__photo">
                        <img src="" alt="">
                    </div>
                    <h2 class="card__name"></h2>
                    <p class="card__price"></p>
                    <button class="card__buy">Подробнее</button>
                </div>
            </template>
        `;

        document.body.appendChild(container);
        template = document.getElementById('cardTemplate');
    });

    afterEach(() => {
        container.remove();
    });

    it('создает карточку товара', () => {
        const product = {
            id: 10,
            name: 'Тестовый товар',
            price: 999,
            image_url: 'test.jpg',
        };

        const fragment = ProductCardFactory.create(product, template);

        const card = fragment.querySelector('.card');

        expect(card).not.toBeNull();
        expect(card.dataset.id).toBe('10');
        expect(card.querySelector('.card__name').textContent).toBe('Тестовый товар');
        expect(card.querySelector('.card__price').textContent).toBe('999 ₽');
        expect(card.querySelector('.card__photo img').src).toContain('test.jpg');
    });

    it('заполняет все поля карточки', () => {
        const product = {
            id: 5,
            name: 'Худи',
            price: 4500,
            image_url: 'hoodie.png',
        };

        const fragment = ProductCardFactory.create(product, template);

        const img = fragment.querySelector('img');

        expect(img.src).toContain('hoodie.png');

    });

    it('создает несколько карточек', () => {
        const products = [
            { id: 1, name: 'Товар 1', price: 100, image_url: 'img1.jpg' },
            { id: 2, name: 'Товар 2', price: 200, image_url: 'img2.jpg' },
            { id: 3, name: 'Товар 3', price: 300, image_url: 'img3.jpg' },
        ];

        const fragment = ProductCardFactory.createMany(products, template);

        const cards = fragment.querySelectorAll('.card');

        expect(cards).toHaveLength(3);
        expect(cards[0].dataset.id).toBe('1');
        expect(cards[1].dataset.id).toBe('2');
        expect(cards[2].dataset.id).toBe('3');
    });

    it('возвращает пустой DocumentFragment при пустом массиве', () => {
        const fragment = ProductCardFactory.createMany([], template);

        expect(fragment.childElementCount).toBe(0);
    });

    it('не изменяет исходный объект товара', () => {
        const product = {
            id: 15,
            name: 'Лонгслив',
            price: 2500,
            image_url: 'long.jpg',
        };

        const copy = structuredClone(product);

        ProductCardFactory.create(product, template);

        expect(product).toEqual(copy);
    });
});