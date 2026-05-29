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
                clone.querySelector('.card').dataset.id = element.id;

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
            catalogProducts.addEventListener('click', async function (e) {
                if (e.target.closest('.card__buy')) {
                    const card = e.target.closest('.card');
                    const cardId = card.dataset.id;


                    if (cardId) {
                        await getCardAndSize(cardId, modal);
                    }


                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            })
            modal.addEventListener('click', function (e) {
                if (e.target.closest('.modal__close') && modalOverlay.classList.contains('active')) {
                    modalOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            })
        } catch (error) {
            console.error('Ошибка:', error)
        }
    }


    async function getCardAndSize(id, modal) {
        try {
            const productRes = await fetch(`http://localhost:5000/api/products/${id}`);
            const product = await productRes.json();

            const sizesQuantRes = await fetch(`http://localhost:5000/api/products/${id}/sizes`);
            const sizesQuant = await sizesQuantRes.json();

            // добавление единичной цены
            const priceTotalElem = modal.querySelector('.modal__price-total');
            priceTotalElem.setAttribute('data-price', product.price);
            priceTotalElem.textContent = product.price + ' ₽';

            modal.querySelector('.modal__photo img').src = product.image_url;
            modal.querySelector('.modal__name p').textContent = product.name;
            modal.querySelector('.modal__description p').textContent = product.description;
            modal.querySelector('.input__count').value = 1;

            const select = modal.querySelector('.modal__select');
            select.innerHTML = '';
            sizesQuant.sizes.forEach(size => {
                const option = document.createElement('option');
                option.value = size.size_id;
                option.textContent = size.size_name;
                if (size.quantity == 0) {
                    option.disabled = true;
                }
                select.appendChild(option);
            });

        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    const inputCount = document.querySelector('.input__count');
    const priceTotalElem = document.querySelector('.modal__price-total');

    inputCount.addEventListener('input', function (e) {
        const onePrice = priceTotalElem.getAttribute('data-price');
        if (onePrice) {
            priceTotalElem.textContent = Number(e.target.value) * Number(onePrice) + ' ₽';
        }

    })


    getModal();


})


