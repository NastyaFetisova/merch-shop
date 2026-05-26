'use strict';
document.addEventListener('DOMContentLoaded', function () {
    const template = document.getElementById('cardTemplate');



    async function getData() {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            data.products.forEach(element => {
                const clone = template.content.cloneNode(true);
                clone.querySelector('.card__photo img').src = element.image_url;
                clone.querySelector('.card__name').textContent = element.name;
                clone.querySelector('.card__price').textContent = element.price + ' ₽';

                document.querySelector('.catalog__products').appendChild(clone);
            });
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }
    getData();
})


