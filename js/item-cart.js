let selectedSize = null;

// Bắt sự kiện click chọn size
const sizeButtons = document.querySelectorAll('.size-giay');
sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Xóa active ở tất cả
        sizeButtons.forEach(b => b.style.border = '1px solid #ccc');
        // Gán size được chọn
        selectedSize = btn.value;
        // Highlight nút size đã chọn
        btn.style.border = '2px solid black';
    });
});

// Sự kiện mua ngay
document.querySelector('.buy-now').addEventListener('click', () => {
    if (!selectedSize) {
        alert('Vui lòng chọn size trước khi thêm vào giỏ hàng!');
        return;
    }
    else {
        confirm("Bạn có chắc chắn muốn thanh toán?")
        if(confirm.apply){
        alert("Bạn đã thanh toán thành công!")
        }
        else {
            alert("Thanh toán không thành công!")
        }
    }
});


// Bắt sự kiện thêm vào giỏ
document.querySelector('.add-to-cart').addEventListener('click', () => {
    if (!selectedSize) {
        alert('Vui lòng chọn size trước khi thêm vào giỏ hàng!');
        return;
    }

    const product = {
        name: document.querySelector('.product-info h2').innerText,
        price: document.querySelector('.price').innerText,
        size: selectedSize,
        image: document.querySelector('.product-image img').src,
        quantity: 1
    };

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm + size đã tồn tại chưa
    const existing = cart.find(item => item.name === product.name && item.size === product.size);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push(product);
    }

    // Lưu lại vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Đã thêm vào giỏ hàng!');
});