// tìm kiếm + bộ lọc giá

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const priceFilters = document.querySelectorAll('.price-filter');

  // khi nhập tìm kiếm
  searchInput.addEventListener('input', applyFilters);

  // khi đổi filter giá
  priceFilters.forEach(filter => {
    filter.addEventListener('change', applyFilters);
  });

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const selected = document.querySelector('.price-filter:checked').value;
    const [min, max] = selected === 'all' ? [0, Infinity] : selected.split('-').map(Number);

    filteredProducts = allProducts.filter(item => {
      const productName = item.querySelector('p:first-of-type').textContent.toLowerCase();
      const price = getPriceFromText(item.innerText);

      return (
        productName.includes(searchTerm) &&
        price >= min && price <= max
      );
    });

    currentPage = 1;
    paginate();
  }
});
