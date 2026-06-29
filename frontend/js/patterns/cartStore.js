'use strict';
class CartStore {
    static #instance = null;

    #items = [];
    #observers = [];

    constructor() {
        if (CartStore.#instance) {
            return CartStore.#instance;
        }
        this.#loadFromStorage();
        CartStore.#instance = this;
        return this;
    }

    // 1. Загрузка из localStorage
    #loadFromStorage() {
        try {
            const cart = localStorage.getItem('cart');
            this.#items = cart ? JSON.parse(cart) : [];
        } catch (error) {
            console.error('Ошибка загрузки корзины:', error);
            this.#items = [];
        }
    }

    // 2. Сохранение в localStorage
    #saveToStorage() {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
            alert('Товар добавлен в корзину!');
        } catch (error) {
            console.error('Ошибка сохранения корзины:', error);
        }
    }

    // 3. Уведомление всех подписчиков
    #notifyObservers() {
        this.#observers.forEach(observer => {
            if (observer.update) {
                observer.update(this.#items);
            }
        });
    }


    // ===== ПУБЛИЧНЫЕ МЕТОДЫ (API для внешнего мира) =====

    // 1. Подписка наблюдателя
    subscribe(observer) {
        if (!this.#observers.includes(observer)) {
            this.#observers.push(observer);
            observer.update(this.#items);
        }
    }

    // 2. Добавление товара
    addItem(item) {
        const existing = this.#items.find(i =>
            i.productId === item.productId &&
            i.productSizeId === item.productSizeId
        );
        if (existing) {
            existing.quantity += item.quantity;
            existing.total = existing.total * item.quantity;
        } else {
            this.#items.push(item);
        }

        this.#saveToStorage();
        this.#notifyObservers();
    }

    // 3. Удаление товара
    removeItem(productId, productSizeId) {
        this.#items = this.#items.filter(i =>
            i.productId === productId && i.productSizeId === productSizeId
        )
        this.#saveToStorage;
        this.#notifyObservers();
    }

    // 4. Очистка корзины
    clear() {
        this.#items = [];
        this.#saveToStorage;
        this.#notifyObservers();
    }

    // 5. Получить все товары
    getItems() {
        return [... this.#items];
    }

    // 6. Получить общую сумму
    getTotal() {
        return this.#items.reduce((sum, item) => sum + item.total, 0);
    }

    // 7. Получить количество товаров
    getCount() {
        return this.#items.reduce((sum, item) => sum + item.quantity, 0);
    }

}

// Создаем и экспортируем ОДИН экземпляр

const cartStore = new CartStore();
export default cartStore;
