// Lấy phần tử biểu tượng người dùng
const userIcon = document.getElementById("userIcon");

// Hàm để cập nhật biểu tượng người dùng dựa trên trạng thái đăng nhập
function updateUserIcon() {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"; // Lấy trạng thái đăng nhập

    if (userIcon) { // Đảm bảo phần tử userIcon tồn tại
        if (isLoggedIn) {
            // Nếu đã đăng nhập, đổi icon thành fa-user-check
            userIcon.classList.remove("fa-user");
            userIcon.classList.add("fa-user-check");
            userIcon.href = "#"; // đến trang profile/tài khoản
            userIcon.title = "Đăng xuất";
        } else {
            // Nếu chưa đăng nhập, đảm bảo icon là fa-user
            userIcon.classList.remove("fa-user-check");
            userIcon.classList.add("fa-user");
            userIcon.href = "../signIn.html"; // Link đến trang đăng nhập
            userIcon.title = "Đăng nhập";
        }
    }
}

// Gọi hàm này khi trang được tải để thiết lập trạng thái ban đầu của icon
updateUserIcon();

// Thêm sự kiện click cho biểu tượng người dùng
if (userIcon) {
    userIcon.addEventListener('click', function(event) {
        event.preventDefault();

        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

        if (isLoggedIn) {
            // Nếu người dùng đã đăng nhập (icon là fa-user-check) sẽ hiển thị popup xác nhận đăng xuất
            const confirmLogout = confirm('Bạn có muốn đăng xuất không?');

            if (confirmLogout) {
                // Nếu người dùng xác nhận đăng xuất
                localStorage.removeItem('isLoggedIn'); // Xóa cờ đăng nhập khỏi localStorage

                alert('Đã đăng xuất thành công!'); // Thông báo đã đăng xuất

                // Cập nhật lại biểu tượng ngay lập tức và chuyển hướng
                updateUserIcon(); // Cập nhật icon về trạng thái chưa đăng nhập
                window.location.href = '../account/signIn.html'; // Chuyển hướng về trang đăng nhập
            }
        } else {
            // Nếu người dùng chưa đăng nhập (icon là fa-user), chuyển hướng đến trang đăng nhập
            window.location.href = '../account/signIn.html';
        }
    });
}