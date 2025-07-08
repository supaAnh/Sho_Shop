// dùng để tìm kiếm sản phẩm từ ô tìm kiếm bằng cách so sánh với thẻ p đầu của mỗi div 
document.addEventListener('DOMContentLoaded', () => {
    // Lấy tham chiếu đến ô input tìm kiếm
    const searchInput = document.getElementById('searchInput');

    // Lấy tất cả các sản phẩm
    const productListContainer = document.querySelector('main .product_list');
    const productItems = productListContainer.getElementsByClassName('product_items');
    // Sự kiện khi nhập vào ô tìm kiếm
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim(); // Lấy giá trị tìm kiếm và chuyển về chữ thường, loại bỏ khoảng trắng thừa

        Array.from(productItems).forEach(item => {
            // Lấy tên sản phẩm từ thẻ <p> đầu tiên bên trong product_items
            const productNameElement = item.querySelector('p:first-of-type');
            if (productNameElement) {
                const productName = productNameElement.textContent.toLowerCase();

                // So sánh tên sản phẩm với từ khóa tìm kiếm
                if (productName.includes(searchTerm)) {
                    item.style.display = ''; // Hiển thị sản phẩm nếu khớp
                } else {
                    item.style.display = 'none'; // Ẩn sản phẩm nếu không khớp
                }
            }
        });
    });
});