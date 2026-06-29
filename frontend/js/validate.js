

function validateError(btn, form) {



    let isValid = true;

    let allInput = form.querySelectorAll('input');
    allInput.forEach(input => {

        let hasError = false;
        let errorText = '';

        const oldError = input.nextElementSibling;
        if (oldError && oldError.classList.contains('error-message')) {
            oldError.remove();
        }

        if (!input.value.trim()) {
            errorText = "Обязательное поле для заполения";
            hasError = true;
            isValid = false;
        }
        if (input.type === "tel") {
            const phoneRegex = /^(\+7|8)?[\s-]?\(?[0-9]{3}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/;
            if (!phoneRegex.test(input.value.trim())) {
                errorText = "Введите корректный номер телефона";
                hasError = true;
                isValid = false;
            }
        }
        if (input.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value.trim())) {
                errorText = "Введите корректную электронную почту";
                hasError = true;
                isValid = false;
            }
        }
        if (input.type === "number") {
            inputNumber = +input.value;
            if (!(inputNumber > 0 && Number.isInteger(inputNumber))) {
                errorText = "Число должно быть целым положительным";
                hasError = true;
                isValid = false;
            }
        }
        if (input.type === "number" && input.name === "count") {
            if (Number(input.value) >= 15) {
                errorText = "Можно заказать не более 15 единиц товара";
                hasError = true;
                isValid = false;
            }
        }

        if (hasError === true) {
            const errorDiv = document.createElement('div');
            errorDiv.classList.add('error-message');
            errorDiv.textContent = errorText;
            input.after(errorDiv);
        }
    });
    
    return !isValid;
}