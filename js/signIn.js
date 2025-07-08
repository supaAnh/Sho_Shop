// ẩn / hiện mật khẩu

const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
    
togglePassword.addEventListener("click", () => {
    const type = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", type);

    // Đổi icon
    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");
});

// Đăng nhập
const loginForm = document.querySelector("form");
loginForm.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const userNameInput = document.getElementById("userName"); // Lấy phần tử input username
    // Kiểm tra tài khoản admin
  if (userNameInput.value == "admin") { // Giả sử mật khẩu admin là "admin123"
    localStorage.setItem("isLoggedIn", "true"); // Đặt cờ đã đăng nhập
    window.location.href = 'admin.html'; // Chuyển hướng đến trang admin
  } else {
    // kiểm tra tên/mật khẩu người dùng thông thường
    localStorage.setItem("isLoggedIn", "true");
    alert("Đăng nhập thành công!");
    window.location.href = "../details/Products.html"; // chuyển về trang Products
  }
});
