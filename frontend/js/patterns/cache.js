'use strict';

class Cache {

    static save(key, data) {
        sessionStorage.setItem(key, JSON.stringify({
            time: Date.now(),
            data
        }));
    }

    static load(key, maxAge = 300000) {
        try {
            const raw = sessionStorage.getItem(key);

            if (!raw) return null;

            const cache = JSON.parse(raw);

            if (Date.now() - cache.time > maxAge) {
                sessionStorage.removeItem(key);
                return null;
            }

            return cache.data;

        } catch (error) {
            console.error('Ошибка чтения кэша:', error);
            sessionStorage.removeItem(key);
            return null;
        }
    }

    static clear(key) {
        sessionStorage.removeItem(key);
    }

    static clearProducts() {
        Object.keys(sessionStorage).forEach(key => {
            if (key.includes('/api/products')) {
                sessionStorage.removeItem(key);
            }
        });
    }

}

export default Cache;