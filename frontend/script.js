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
    async function getModal() {
        try {
            await getData();
            const modalOverlay = document.querySelector('.modal-overlay');
            const modal = document.querySelector('.modal');
            const modalClose = document.querySelector('.modal__close');
            const catalogProducts = document.querySelector('.catalog__products');
            catalogProducts.addEventListener('click', function (e) {
                if (e.target.closest('.card__buy')) {
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
                modal.addEventListener('click', function (e) {
                    if (e.target.closest('.modal__close') && modalOverlay.classList.contains('active')) {
                        modalOverlay.classList.remove('active');
                        document.body.style.overflow = '';
                    }
                })

            })

        } catch (error) {
            console.error('Ошибка:', error)
        }
    }

    getModal();
    // console.log("JJJ");
})


