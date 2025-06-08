document.addEventListener('DOMContentLoaded', function () {
	// --- Filter Produk ---
	const searchInput = document.querySelector('.search-produk');
	const selectFilter = document.querySelector('.select-filter');
	const productCards = document.querySelectorAll('.product-grid .card');

	function filterProducts() {
		const searchValue = searchInput.value.toLowerCase();
		const selectedCategory = selectFilter.value;

		productCards.forEach((card) => {
			const title = card.querySelector('h3').textContent.toLowerCase();
			const matchesSearch = title.includes(searchValue);
			const matchesCategory =
				selectedCategory === '' || card.classList.contains(selectedCategory);

			if (matchesSearch && matchesCategory) {
				card.style.display = 'block';
			} else {
				card.style.display = 'none';
			}
		});
	}

	// Event listeners
	searchInput.addEventListener('input', filterProducts);
	selectFilter.addEventListener('change', filterProducts);

	// Initially hide the About section
	aboutSection.style.display = 'none';

	// --- Dropdown Shop ---
	const dropdownToggle = document.querySelector('.dropdown-toggle');
	const dropdownMenu = document.querySelector('.dropdown-menu');

	dropdownToggle.addEventListener('click', function (e) {
		e.stopPropagation();
		dropdownMenu.style.display =
			dropdownMenu.style.display === 'block' ? 'none' : 'block';
	});

	document.addEventListener('click', function () {
		dropdownMenu.style.display = 'none';
	});

	// --- Cart Logic ---
	let totalCart = 0;
	const cartDisplay = document.querySelector('.cart');

	function updateCart() {
		cartDisplay.textContent = `🛒 Cart (${totalCart})`;
	}
	updateCart();

	document.querySelectorAll('.card').forEach((card) => {
		const increaseBtn = card.querySelector('.increase');
		const decreaseBtn = card.querySelector('.decrease');
		const quantityDisplay = card.querySelector('.quantity');
		const preorderBtn = card.querySelector('.preorder-btn');

		let quantity = 0;

		function updatePreorderBtn() {
			if (preorderBtn) {
				preorderBtn.style.display = quantity > 0 ? 'inline-block' : 'none';
			}
		}

		if (increaseBtn && decreaseBtn && quantityDisplay) {
			increaseBtn.addEventListener('click', () => {
				quantity++;
				quantityDisplay.textContent = quantity;
				updatePreorderBtn();
			});

			decreaseBtn.addEventListener('click', () => {
				if (quantity > 0) {
					quantity--;
					quantityDisplay.textContent = quantity;
					updatePreorderBtn();
				}
			});
		}

		if (preorderBtn) {
			preorderBtn.addEventListener('click', () => {
				if (quantity > 0) {
					totalCart += quantity;
					updateCart();

					alert(
						`Pre Order berhasil: ${quantity} item dari ${
							card.querySelector('h3').textContent
						} ditambahkan ke cart`,
					);

					// Reset quantity
					quantity = 0;
					quantityDisplay.textContent = quantity;
					updatePreorderBtn();
				}
			});
		}

		updatePreorderBtn(); // Inisialisasi saat load
	});
});
