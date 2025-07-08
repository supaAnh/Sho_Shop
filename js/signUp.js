// Xử lý hiện / ẩn mật khẩu
document.addEventListener("DOMContentLoaded", function () {
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
            passwordInput.setAttribute("type", type);

            // Đổi icon
            togglePassword.classList.toggle("fa-eye");
            togglePassword.classList.toggle("fa-eye-slash");
        });
    }

    // thông báo thành công
    const signUpForm = document.querySelector("form");

    if (signUpForm) {
        signUpForm.addEventListener("submit", function (e) {
        e.preventDefault(); // Ngăn reload

        alert("Đăng ký thành công!");

        // Chuyển hướng nếu cần
        window.location.href = "signIn.html";
        });
    }
});


