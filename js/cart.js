// Lấy dữ liệu từ LocalStorage
function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// Lưu vào LocalStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Hàm hiển thị thông báo
function showCartNotification(productName) {
    // Tạo một phần tử div cho thông báo
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Đã thêm <strong>${productName}</strong> vào giỏ hàng thành công!
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Tự động ẩn sau 2.5 giây
    setTimeout(() => {
        notification.classList.remove('show');
        // Chờ hiệu ứng ẩn kết thúc rồi mới xóa phần tử
        notification.addEventListener('transitionend', () => {
            notification.remove();
        }, { once: true });
    }, 2500);
}

// Hàm cập nhật số lượng
function updateCartCounter() {
    const cart = getCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

    const counter = document.querySelector('.cart-counter');
    if (counter) {
        counter.textContent = totalItems;
        counter.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Lấy tham chiếu đến các phần tử trên trang cart.html
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

// Hàm định dạng tiền
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + '₫';
}

// Cập nhật tổng giá
function updateTotal(cart) {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (totalPriceElement) {
        totalPriceElement.textContent = formatCurrency(total);
    }
}

// Xóa sản phẩm khỏi giỏ hàng
function removeItem(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCart();
    updateCartCounter();
}

// Thay đổi số lượng
function updateQuantity(index, newQuantity) {
    const cart = getCart();
    cart[index].quantity = parseInt(newQuantity);
    if (cart[index].quantity < 1 || isNaN(cart[index].quantity)) {
        cart[index].quantity = 1;
    }
    saveCart(cart);
    renderCart();
    updateCartCounter();
}

// Hiển thị giỏ hàng
function renderCart() {
    if (!cartItemsContainer) return;

    const cart = getCart();
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        const noItemRow = document.createElement('tr');
        noItemRow.innerHTML = `<td colspan="5">Giỏ hàng của bạn đang trống.</td>`;
        cartItemsContainer.appendChild(noItemRow);
    } else {
        cart.forEach((item, index) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${item.name}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <input type="number" value="${item.quantity}" min="1"
                           onchange="updateQuantity(${index}, this.value)">
                </td>
                <td>${formatCurrency(item.price * item.quantity)}</td>
                <td><button onclick="removeItem(${index})">Xóa</button></td>
            `;

            cartItemsContainer.appendChild(row);
        });
    }

    updateTotal(cart);
    updateCartCounter();
}

// Xử lý khi nhấn nút Thanh toán và đưa sp lên localStorage
function saveOrderToLocalStorage(orderDetails) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orderDetails.time = new Date().toLocaleString('vi-VN');
    orders.unshift(orderDetails);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function checkout() {
    const cart = getCart();

    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }

    if (confirm("Bạn có chắc chắn muốn thanh toán?")) {
        const orderDetails = {
            items: cart.map(item => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            })),
            totalAmount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };

        // lưu vào localStorage
        saveOrderToLocalStorage(orderDetails);

        alert("Bạn đã thanh toán thành công!");
        localStorage.removeItem('cart');
        renderCart();
        updateCartCounter();
    } else {
        alert("Thanh toán không thành công!");
    }
}

// tạo khi trang load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCounter();
    renderCart();

    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }

    const checkoutButton = document.querySelector('.cart-total button');
    if (checkoutButton) {
        checkoutButton.onclick = checkout;
    }
});

// hàm thêm sản phẩm vào giỏ hàng
function addToCart(productName, productPrice, productId) {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

    // check đăng nhập
    if (!isLoggedIn) {
        alert("Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng!");
        window.location.href = "../account/signIn.html";
        return;
    }

    const size = prompt("Vui lòng chọn size (37, 38, 39, 40, 41, 42):");

    // Nếu không nhập hoặc bỏ trống
    if (!size || size.trim() === "") {
        alert("Bạn phải chọn size trước khi thêm vào giỏ hàng!");
        return;
    }

    // Danh sách size cho phép
    const allowedSizes = ["37", "38", "39", "40", "41", "42"];

    // Kiểm tra size nhập có hợp lệ không
    if (!allowedSizes.includes(size.trim())) {
        alert("Size bạn nhập không hợp lệ! Vui lòng chọn đúng các size (37 - 42).");
        return;
    }

    // nếu ok tiếp tục xử lý giỏ hàng
    console.log("Size đã chọn:", size);

    // lấy giỏ hàng từ localStorage
    let cart = getCart();

    // kiểm tra xem sản phẩm với cùng ID và size đã có trong giỏ chưa
    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: 1,
            size: size
        });
    }

    // lưu và cập nhật
    saveCart(cart);
    showCartNotification(`${productName} (Size ${size})`);
    updateCartCounter();
}
