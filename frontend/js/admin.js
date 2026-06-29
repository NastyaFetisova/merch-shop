'use strict';

import Cache from './patterns/cache.js';

// 1. Определяем базовый URL для API

//    window.location.hostname содержит адрес сайта в браузере
const hostname = window.location.hostname;
const isLocal = (hostname === 'localhost' || hostname === '127.0.0.1');
const API_BASE = isLocal ? 'http://localhost:5000' : '';


const modalPassword = document.querySelector('#wrapper-modal-password');
const modalEnter = modalPassword.querySelector('.modal-enter');
const inputPassword = modalPassword.querySelector('.input-password');

const modalAdd = document.querySelector('#wrapper-modal-add');
const inputs = modalAdd.querySelectorAll('input');
const submitProduct = modalAdd.querySelector('.submit-product');
// const 
document.addEventListener('DOMContentLoaded', () => {


    modalPassword.classList.add('active');


});

modalEnter.addEventListener('click', (e) => {
    if (inputPassword.value === 'admin123') {
        showAddProductForm();
    } else {
        alert('Неверный пароль');
        inputPassword.value = '';
    }
});

function showAddProductForm() {
    modalPassword.classList.remove('active');
    modalAdd.classList.add('active');


}
submitProduct.addEventListener('click', async (e) => {
    e.preventDefault();
    if (!validateAdminForm()) return;

    const name = modalAdd.querySelector('.add-name').value.trim();
    const price = Number(modalAdd.querySelector('.add-price').value);
    const description = modalAdd.querySelector('.add-description').value.trim();
    const image_url = modalAdd.querySelector('.add-image').value.trim();
    const category_id = Number(modalAdd.querySelector('.add-category').value);

    const sizes = [
        { size_id: 1, quantity: Number(modalAdd.querySelector('.size-s').value) || 0 },
        { size_id: 2, quantity: Number(modalAdd.querySelector('.size-m').value) || 0 },
        { size_id: 3, quantity: Number(modalAdd.querySelector('.size-l').value) || 0 },
        { size_id: 4, quantity: Number(modalAdd.querySelector('.size-xl').value) || 0 }
    ];

    const productData = { name, price, description, image_url, category_id, sizes };

    try {
        const response = await fetch(`${API_BASE}/api/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-password': 'admin123'
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (result.success) {

            Cache.clearProducts();

            alert('Товар успешно добавлен!');

            modalAdd.classList.remove('active');
            // Очистить форму
            modalAdd.querySelectorAll('input, textarea').forEach(el => el.value = '');
            modalAdd.querySelector('.size-s').value = 0;
            modalAdd.querySelector('.size-m').value = 0;
            modalAdd.querySelector('.size-l').value = 0;
            modalAdd.querySelector('.size-xl').value = 0;
        } else {
            alert('Ошибка: ' + result.message);
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Ошибка соединения с сервером');
    }
});



inputs.forEach(input => {
    input.addEventListener('input', function () {
        // Ищем ошибку после этого конкретного поля
        const errorDiv = this.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.remove();
        }
    });
});

document.querySelector('.submit-remove').addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('addProductForm').reset();
});

function validateAdminForm() {
    let isValid = true;

    // Очистка  старых ошибок
    const oldErrors = modalAdd.querySelectorAll('.error-message');
    oldErrors.forEach(error => error.remove());

    // Название
    const nameInput = modalAdd.querySelector('.add-name');
    const name = nameInput.value.trim();
    if (!name) {
        showError(nameInput, 'Введите название товара');
        isValid = false;
    }

    // Цена
    const priceInput = modalAdd.querySelector('.add-price');
    const price = priceInput.value.trim();
    if (!price) {
        showError(priceInput, 'Введите цену');
        isValid = false;
    } else if (isNaN(Number(price)) || Number(price) <= 0) {
        showError(priceInput, 'Цена должна быть положительным числом');
        isValid = false;
    }

    // URL
    const imageInput = modalAdd.querySelector('.add-image');
    const image = imageInput.value.trim();
    if (!image) {
        showError(imageInput, 'Введите URL изображения');
        isValid = false;
    } else if (!image.startsWith('http://') && !image.startsWith('https://')) {
        showError(imageInput, 'URL должен начинаться с http:// или https://');
        isValid = false;
    }

    // Категория
    const categorySelect = modalAdd.querySelector('.add-category');
    if (!categorySelect.value) {
        showError(categorySelect, 'Выберите категорию');
        isValid = false;
    }

    return isValid;
}

function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.classList.add('error-message');
    errorDiv.textContent = message;
    input.after(errorDiv);
}