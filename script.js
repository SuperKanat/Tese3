document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registration-form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');
    const birthDay = document.getElementById('birth-day');
    const submitButton = document.getElementById('form-button');

    const showError = (input, message) => {
        const parent = input.parentElement;
        let errorMessage = parent.querySelector('.error-message');
        if (!errorMessage) {
            errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            parent.appendChild(errorMessage);
        }
        errorMessage.textContent = message;
        input.classList.remove('valid');
        input.classList.add('invalid');
    };

    const showSuccess = (input) => {
        const parent = input.parentElement;
        const errorMessage = parent.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
        input.classList.remove('invalid');
        input.classList.add('valid');
    };

    const checkRequired = (inputs) => {
        let isValid = true;
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                showError(input, `${input.name} обязательное поле`);
                isValid = false;
            } else {
                showSuccess(input);
            }
        });
        return isValid;
    };

    const checkLength = (input, min, max) => {
        if (input.value.length < min || input.value.length > max) {
            showError(input, `${input.name} должен быть от ${min} до ${max} символов`);
            return false;
        }
        showSuccess(input);
        return true;
    };

    const checkEmail = (input) => {
        const re = /\S+@\S+\.\S+/;
        if (!re.test(input.value.trim())) {
            showError(input, 'Введите корректный email');
            return false;
        }
        showSuccess(input);
        return true;
    };

    const checkPasswordsMatch = (password, passwordConfirm) => {
        if (password.value !== passwordConfirm.value) {
            showError(passwordConfirm, 'Пароли не совпадают');
            return false;
        }
        showSuccess(passwordConfirm);
        return true;
    };

    const checkPasswordComplexity = (password) => {
        const reDigit = /\d/;
        const reUpperCase = /[A-Z]/;
        const reLowerCase = /[a-z]/;
        const reSpecial = /[!@#$%^&*(),.?":{}|<>]/;
        if (password.value.length < 8 || !reDigit.test(password.value) || !reUpperCase.test(password.value) || !reLowerCase.test(password.value) || !reSpecial.test(password.value)) {
            showError(password, 'Пароль должен содержать минимум 8 символов, одну цифру, одну заглавную, одну строчную букву и один специальный символ');
            return false;
        }
        showSuccess(password);
        return true;
    };

    const checkAge = (input) => {
        const today = new Date();
        const birthDate = new Date(input.value);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            showError(input, 'Вы должны быть старше 18 лет');
            return false;
        }
        showSuccess(input);
        return true;
    };

    const checkFormValidity = () => {
        const requiredInputs = [firstName, lastName, email, password, passwordConfirm, birthDay];
        const isValid = checkRequired(requiredInputs) &&
                        checkLength(firstName, 2, 20) &&
                        checkLength(lastName, 2, 30) &&
                        checkEmail(email) &&
                        checkPasswordsMatch(password, passwordConfirm) &&
                        checkPasswordComplexity(password) &&
                        checkAge(birthDay);
        
        submitButton.disabled = !isValid;
        console.log(`Form is valid: ${isValid}`);
        return isValid;
    };

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        if (checkFormValidity()) {
            console.log("Form submitted");
        }
    });

    firstName.addEventListener('blur', () => { checkLength(firstName, 2, 20); checkFormValidity(); });
    lastName.addEventListener('blur', () => { checkLength(lastName, 2, 30); checkFormValidity(); });
    email.addEventListener('blur', () => { checkEmail(email); checkFormValidity(); });
    password.addEventListener('blur', () => { checkPasswordComplexity(password); checkPasswordsMatch(password, passwordConfirm); checkFormValidity(); });
    passwordConfirm.addEventListener('blur', () => { checkPasswordsMatch(password, passwordConfirm); checkFormValidity(); });
    birthDay.addEventListener('blur', () => { checkAge(birthDay); checkFormValidity(); });

    checkFormValidity();
});
