

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CartStore } from '../cartStore.js';

describe('CartStore', () => {
    let cartStore;
    let fakeLocalStorage;

    beforeEach(() => {
        fakeLocalStorage = {
            getItem: vi.fn(() => null),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };

        Object.defineProperty(global, 'localStorage', {
            value: fakeLocalStorage,
            writable: true,
        });

        global.alert = vi.fn();

        cartStore = new CartStore();
        cartStore.reset();
    });

    it('создает только один экземпляр (Singleton)', () => {
        const anotherStore = new CartStore();

        expect(cartStore).toBe(anotherStore);
    });

    it('добавляет товар в корзину', () => {
        cartStore.addItem({
            productId: 1,
            productSizeId: 5,
            name: 'Футболка',
            size: 'M',
            productPhoto: 'photo.jpg',
            quantity: 2,
            price: 1000,
            total: 2000,
        });

        const items = cartStore.getItems();

        expect(items).toHaveLength(1);
        expect(items[0].name).toBe('Футболка');
        expect(items[0].quantity).toBe(2);
        expect(items[0].total).toBe(2000);

        expect(localStorage.setItem).toHaveBeenCalled();
        expect(alert).toHaveBeenCalled();
    });

    it('увеличивает количество существующего товара', () => {
        const item = {
            productId: 1,
            productSizeId: 5,
            name: 'Футболка',
            size: 'M',
            productPhoto: 'photo.jpg',
            quantity: 2,
            price: 1000,
            total: 2000,
        };

        cartStore.addItem(item);

        cartStore.addItem({
            ...item,
            quantity: 3,
        });

        const items = cartStore.getItems();

        expect(items).toHaveLength(1);
        expect(items[0].quantity).toBe(5);
        expect(items[0].total).toBe(5000);
    });

    it('удаляет товар', () => {
        cartStore.addItem({
            productId: 1,
            productSizeId: 5,
            name: 'Футболка',
            size: 'M',
            productPhoto: 'photo.jpg',
            quantity: 2,
            price: 1000,
            total: 2000,
        });

        cartStore.removeItem(1, 5);

        expect(cartStore.getItems()).toHaveLength(0);
    });

    it('правильно считает общую стоимость корзины', () => {
        cartStore.addItem({
            productId: 1,
            productSizeId: 5,
            name: 'Футболка',
            size: 'M',
            productPhoto: 'photo.jpg',
            quantity: 2,
            price: 1000,
            total: 2000,
        });

        cartStore.addItem({
            productId: 2,
            productSizeId: 3,
            name: 'Штаны',
            size: 'L',
            productPhoto: 'photo2.jpg',
            quantity: 1,
            price: 1500,
            total: 1500,
        });

        expect(cartStore.getTotal()).toBe(3500);
    });

    it('очищает корзину', () => {
        cartStore.addItem({
            productId: 1,
            productSizeId: 5,
            name: 'Футболка',
            size: 'M',
            productPhoto: 'photo.jpg',
            quantity: 2,
            price: 1000,
            total: 2000,
        });

        cartStore.clear();

        expect(cartStore.getItems()).toHaveLength(0);
        expect(cartStore.getTotal()).toBe(0);
    });

    it('загружает корзину из localStorage', () => {
        const storedItems = [
            {
                productId: 10,
                productSizeId: 2,
                name: 'Худи',
                size: 'L',
                productPhoto: 'hoodie.jpg',
                quantity: 1,
                price: 3500,
                total: 3500,
            },
        ];

        fakeLocalStorage.getItem.mockReturnValue(JSON.stringify(storedItems));

        cartStore.reloadFromStorage();

        expect(localStorage.getItem).toHaveBeenCalledWith('cart');
        expect(cartStore.getItems()).toEqual(storedItems);
    });

    it('уведомляет Observer при подписке и изменении корзины', () => {
        const observer = {
            update: vi.fn(),
        };

        cartStore.subscribe(observer);

        expect(observer.update).toHaveBeenCalledTimes(1);

        cartStore.addItem({
            productId: 1,
            productSizeId: 5,
            name: 'Футболка',
            size: 'M',
            productPhoto: 'photo.jpg',
            quantity: 1,
            price: 1000,
            total: 1000,
        });

        expect(observer.update).toHaveBeenCalledTimes(2);
    });

    it('не подписывает одного Observer дважды', () => {
        const observer = {
            update: vi.fn(),
        };

        cartStore.subscribe(observer);
        cartStore.subscribe(observer);

        cartStore.addItem({
            productId: 1,
            productSizeId: 1,
            name: 'Футболка',
            size: 'S',
            productPhoto: 'photo.jpg',
            quantity: 1,
            price: 1000,
            total: 1000,
        });

        // 1 вызов при первой подписке + 1 после addItem
        expect(observer.update).toHaveBeenCalledTimes(2);
    });

    it('правильно считает количество товаров', () => {
        cartStore.addItem({
            productId: 1,
            productSizeId: 1,
            name: 'Футболка',
            size: 'S',
            productPhoto: 'photo.jpg',
            quantity: 2,
            price: 1000,
            total: 2000,
        });

        cartStore.addItem({
            productId: 2,
            productSizeId: 2,
            name: 'Худи',
            size: 'M',
            productPhoto: 'hoodie.jpg',
            quantity: 3,
            price: 2000,
            total: 6000,
        });

        expect(cartStore.getCount()).toBe(5);
    });
});