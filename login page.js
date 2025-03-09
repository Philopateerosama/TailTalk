const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

// إزالة الـ Active Class عند الضغط على Sign In
loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// التحقق من الإدخالات في Sign In و Sign Up
document.addEventListener("DOMContentLoaded", function () {
    // عناصر تسجيل الدخول (Sign In)
    const signInEmail = document.querySelector(".sign-in input[type='email']");
    const signInPassword = document.querySelector(".sign-in input[type='password']");
    const signInButton = document.querySelector(".sign-in button");

    // عناصر إنشاء الحساب (Sign Up)
    const signUpName = document.querySelector(".sign-up input[type='text']");
    const signUpEmail = document.querySelector(".sign-up input[type='email']");
    const signUpPassword = document.querySelector(".sign-up input[type='password']");
    const signUpButton = document.querySelector(".sign-up button");

    // شرط التحقق من الباسورد: 8 حروف على الأقل بين أرقام وحروف
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    function validateSignIn() {
        const email = signInEmail.value.trim();
        const password = signInPassword.value.trim();

        if (email !== "" && passwordRegex.test(password)) {
            signInButton.removeAttribute("disabled");
        } else {
            signInButton.setAttribute("disabled", "true");
        }
    }

    function validateSignUp() {
        const name = signUpName.value.trim();
        const email = signUpEmail.value.trim();
        const password = signUpPassword.value.trim();

        if (name !== "" && email !== "" && passwordRegex.test(password)) {
            signUpButton.removeAttribute("disabled");
        } else {
            signUpButton.setAttribute("disabled", "true");
        }
    }

    // مراقبة الإدخال في الحقول لتحديث الحالة
    signInEmail.addEventListener("input", validateSignIn);
    signInPassword.addEventListener("input", validateSignIn);
    signUpName.addEventListener("input", validateSignUp);
    signUpEmail.addEventListener("input", validateSignUp);
    signUpPassword.addEventListener("input", validateSignUp);
});
