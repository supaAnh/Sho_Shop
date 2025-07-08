
// HIỆU ỨNG SLIDER
let list = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .items');
let dots = document.querySelectorAll('.slider .dots li');
let prev = document.getElementById('prev');
let next = document.getElementById('next');

let active = 0;
let lengthItems = items.length - 1;

//button next
next.onclick = function() {
    active = (active + 1 > lengthItems) ? 0 : active + 1;
    reloadSlider();
}
//button prev
prev.onclick = function() {
    active = (active - 1 < 0) ? lengthItems : active - 1;
    reloadSlider();
}

let refreshSlider = setInterval(() => { next.click() }, 4000);
//reload
function reloadSlider() {
    let checkLeft = items[active].offsetLeft;
    list.style.left = -checkLeft + 'px';

    let lastActiveDot = document.querySelector('.slider .dots li.active');
    if (lastActiveDot) lastActiveDot.classList.remove('active');
    dots[active].classList.add('active');
    clearInterval(refreshSlider);
}

dots.forEach((dot, key) => {
    dot.addEventListener('click', function() {
        active = key;
        reloadSlider();
    });
});

//Phần scroll Liên hệ
const contactLink = document.getElementById('contactLink');
const footer = document.getElementById('lienhe');
if (contactLink && footer) {
    contactLink.addEventListener('click', function(event) {
        event.preventDefault();
        footer.scrollIntoView({ behavior: 'smooth' });
        footer.focus({ preventScroll: true });
    });
}

// Banner chuyển trang sản phẩm
function MuaHang() {
    window.location.href = 'details/Products.html';
}

// chuyển trang các hình ảnh

function item1() {
    window.location.href = 'details/item-1.html';
}

function item2() {
    window.location.href = 'details/item-2.html';
}

function item3() {
    window.location.href = 'details/item-3.html';
}

function item4() {
    window.location.href = 'details/item-4.html';
}

function item5() {
    window.location.href = 'details/item-5.html';
}

function item6() {
    window.location.href = 'details/item-6.html';
}

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
            userIcon.href = "signIn.html"; // Link đến trang đăng nhập
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
                window.location.href = 'account/signIn.html'; // Chuyển hướng về trang đăng nhập
            }
        } else {
            // Nếu người dùng chưa đăng nhập (icon là fa-user), chuyển hướng đến trang đăng nhập
            window.location.href = 'account/signIn.html';
        }
    });
}