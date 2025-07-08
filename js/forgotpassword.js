// Checkbox ẩn/hiện mật khẩu
document.getElementById("togglePassword").addEventListener("change", function () {
        const pw1 = document.getElementById("password");
        const pw2 = document.getElementById("re-password");
        const type = this.checked ? "text" : "password";
        pw1.type = type;
        pw2.type = type;
});