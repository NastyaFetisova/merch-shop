'use strict';
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
submitProduct.addEventListener('click', async () => {
    const error = validateError(submitProduct, modalAdd);
    if (error) return;

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
        const response = await fetch('http://localhost:5000/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'admin-password': 'admin123'
            },
            body: JSON.stringify(productData)
        });

        const result = await response.json();

        if (result.success) {
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

document.querySelector('.submit-remove').addEventListener('click', () => {
    document.getElementById('addProductForm').reset();
});