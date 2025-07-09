// Thêm sản phẩm mới
const addForm = document.getElementById('addProductForm');
const productsContainer = document.getElementById('productsContainer'); 
const ordersContainer = document.getElementById('ordersContainer');

// Hàm để hiển thị danh sách sản phẩm trên trang admin
function renderProducts() {
    // Lấy danh sách sản phẩm từ localStorage (sử dụng productList làm nguồn chính)
    const currentProductList = JSON.parse(localStorage.getItem('productList') || '[]');
    productsContainer.innerHTML = ''; // Xóa nội dung hiện tại trước khi render

    if (currentProductList.length === 0) {
        productsContainer.innerHTML = '<p>Chưa có sản phẩm nào.</p>';
        return;
    }

    currentProductList.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-item';
        div.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <p><strong>${product.name}</strong></p>
        <p>Giá: ${product.price.toLocaleString()}₫</p>
        <button onclick="removeProduct('${product.name}')">Xóa</button>
        `;
        // Thêm sản phẩm vào đầu danh sách hiển thị trên trang admin
        productsContainer.insertBefore(div, productsContainer.firstChild);
    });
}

// Hàm xóa sản phẩm
function removeProduct(name) {
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');
    productList = productList.filter(p => p.name !== name);
    localStorage.setItem('productList', JSON.stringify(productList));
    alert('Đã xóa sản phẩm.');
    renderProducts(); // Render lại danh sách sau khi xóa
}

// Lắng nghe sự kiện submit của form thêm sản phẩm
addForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('productName').value.trim();
    const price = parseInt(document.getElementById('productPrice').value.trim(), 10);
    const image = document.getElementById('productImage').value.trim();

    if (!name || isNaN(price) || !image) {
        alert('Vui lòng điền đầy đủ và đúng định dạng thông tin!');
        return;
    }

    const newProduct = { name, price, image };
    let productList = JSON.parse(localStorage.getItem('productList') || '[]');
    productList.unshift(newProduct); // Thêm sản phẩm mới vào đầu danh sách
    localStorage.setItem('productList', JSON.stringify(productList)); // Lưu lại vào localStorage

    alert('Đã thêm sản phẩm thành công!');
    addForm.reset(); // Xóa dữ liệu trong form sau khi thêm
    renderProducts(); // Cập nhật lại danh sách sản phẩm trên trang admin ngay lập tức
});

// Lắng nghe sự kiện click nút "Xem đơn hàng"
const viewOrdersBtn = document.getElementById('viewOrdersBtn');
if (viewOrdersBtn) {
    viewOrdersBtn.addEventListener('click', function() {
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        ordersContainer.innerHTML = '';

        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p>Chưa có đơn hàng nào.</p>';
            return;
        }

        orders.forEach((order, index) => {
            const div = document.createElement('div');
            div.className = 'order-item';
            div.innerHTML = `
            <p><strong>Đơn hàng ${index + 1}</strong></p>
            <p>Thời gian: ${order.time}</p>
            <p>Sản phẩm: ${order.items.map(item => `${item.name} (x${item.quantity})`).join(', ')}</p>
            <hr>
            `;
            ordersContainer.appendChild(div);
        });
    });
}

// Chạy renderProducts khi trang admin tải để hiển thị danh sách sản phẩm ban đầu
renderProducts();

// Hàm xử lý nút trở về
function Products_Back() {
    window.location.href = '../details/Products.html';
}