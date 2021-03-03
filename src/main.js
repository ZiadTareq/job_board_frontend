function setFormMessage(formElement, type, message) {
    const messageElement = formElement.querySelector(".form__message");

    messageElement.textContent = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

function setInputError(inputElement, message) {
    inputElement.classList.add("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = message;
}

function clearInputError(inputElement) {
    inputElement.classList.remove("form__input--error");
    inputElement.parentElement.querySelector(".form__input-error-message").textContent = "";
}

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector("#login");
    const createAccountForm = document.querySelector("#createAccount");

    document.querySelector("#linkCreateAccount").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.add("form--hidden");
        createAccountForm.classList.remove("form--hidden");
    });

    document.querySelector("#linkLogin").addEventListener("click", e => {
        e.preventDefault();
        loginForm.classList.remove("form--hidden");
        createAccountForm.classList.add("form--hidden");
    });

    loginForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log($('#login').serialize());
        $.ajax(
            {
                type: 'POST',
                url: "https://zeyad-job-board-api.herokuapp.com/auth/login",
                data: $('#login').serialize(),
                success: function (data) {
                    console.log(data.auth_token);
                    document.cookie = `auth_token=${data.auth_token}`;
                    window.location.href = './jobs.html';
                }
            }
        );
    });

    createAccountForm.addEventListener("submit", e => {
        e.preventDefault();
        console.log($('#createAccount').serialize());
        $.ajax(
            {
                type: 'POST',
                url: "https://zeyad-job-board-api.herokuapp.com/signup",
                data: $('#createAccount').serialize(),
                success: function (data) {
                    console.log(data);
                    window.location.href = './';
                }
            }
        );
    });
});