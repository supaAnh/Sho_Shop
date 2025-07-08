// scroll đến phần liên hệ
const contactLink = document.getElementById('contactLink');
const footer = document.getElementById('lienhe');

if (contactLink && footer) {
  contactLink.addEventListener('click', function(event) {
    event.preventDefault();
    footer.scrollIntoView({ behavior: 'smooth' });
    footer.focus({ preventScroll: true });
  });
}

// Hàm trợ giúp để lấy giá từ văn bản
function getPriceFromText(text) {
    const match = text.replace(/\./g, '').match(/([\d,]+)(?=\s*₫|\s*VNĐ|\s*&#8363;)/);
    if (match) {
        return parseInt(match[1].replace(/,/g, ''), 10);
    }
    return 0;
}

// lấy sp từ localStorage admin
const productListFromAdmin = JSON.parse(localStorage.getItem('productList') || '[]');
const productContainer = document.querySelector('.product_list');

// Lưu sản phẩm HTML ban đầu (dùng HTML thay vì Node)
const existingProductsHTML = productContainer.innerHTML;

// Xóa sạch
while (productContainer.firstChild) {
  productContainer.removeChild(productContainer.firstChild);
}

// Tạo sản phẩm admin và thêm vào ĐẦU
productListFromAdmin.forEach(product => {
  const div = document.createElement('div');
  div.className = 'product_items';
  div.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <p>${product.name}</p>
    <p>${product.price.toLocaleString()}₫</p>
    <button><a href="${product.detailLink}"><b>Xem chi tiết</b></a></button>
    <button onclick="addToCart('${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.id}')"><b>Thêm vào giỏ</b></button>
  `;
  productContainer.appendChild(div);
});

// Thêm lại HTML bên dưới
productContainer.insertAdjacentHTML('beforeend', existingProductsHTML);

// pagination
const productsPerPage = 12;
let currentPage = 1;

// Dùng mảng allProducts & filteredProducts
const allProducts = Array.from(document.querySelectorAll('.product_items'));
let filteredProducts = [...allProducts];

let totalProducts = filteredProducts.length;
let totalPages = Math.ceil(totalProducts / productsPerPage);
const pagination = document.querySelector('.pagination');

function renderPagination() {
  // Xóa nút trang cũ
  const oldPages = pagination.querySelectorAll('.pagination-item:not(.prev-button):not(.next-button)');
  oldPages.forEach(item => item.remove());

  totalPages = Math.max(1, Math.ceil(filteredProducts.length / productsPerPage));

  // tạo nút trang mới
  for (let i = 1; i <= totalPages; i++) {
    const paginationItem = document.createElement('li');
    paginationItem.classList.add('pagination-item');
    if (i === currentPage) paginationItem.classList.add('active');
    paginationItem.innerHTML = `<a href="#" class="pagination-item-link">${i}</a>`;
    pagination.insertBefore(paginationItem, pagination.querySelector('.next-button'));
  }
}

function paginate() {
  // làm mới danh sách sp mỗi lần gọi
  allProducts.forEach(product => product.style.display = 'none');

  totalProducts = filteredProducts.length;
  totalPages = Math.max(1, Math.ceil(totalProducts / productsPerPage));

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  filteredProducts.forEach((product, index) => {
    if (index >= startIndex && index < endIndex) {
      product.style.display = 'block';
    }
  });

  renderPagination();
}

paginate();

// các nút số trang khi phân trang
pagination.addEventListener('click', (e) => {
  if (e.target.classList.contains('pagination-item-link')) {
    e.preventDefault();
    const page = parseInt(e.target.textContent);
    if (!isNaN(page)) {
      currentPage = page;
      paginate();
    }
  }
});

// nút prev và next
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

if (prevButton) {
  prevButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      paginate();
    }
  });
}

if (nextButton) {
  nextButton.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage < totalPages) {
      currentPage++;
      paginate();
    }
  });
}

// Bộ lọc giá
const priceFilters = document.querySelectorAll('.price-filter');

priceFilters.forEach(filter => {
  filter.addEventListener('change', () => {
    filterByPrice();
  });
});

function filterByPrice() {
  const selected = document.querySelector('.price-filter:checked').value;
  const [min, max] = selected === 'all' ? [0, Infinity] : selected.split('-').map(Number);

  filteredProducts = allProducts.filter(item => {
    const priceText = item.innerText;
    const price = getPriceFromText(priceText);
    return price >= min && price <= max;
  });

  currentPage = 1;
  paginate();
}
