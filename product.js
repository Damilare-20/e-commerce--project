// Load products and render them
async function loadProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=20");
    const data = await response.json();
    const products = data.products;

    function renderProducts(items) {
      if (items.length === 0) {
        document.getElementById("products").innerHTML =
          `<p class="text-center text-red-600 font-semibold">No product found.</p>`;
        return;
      }

      const productCards = items
        .map(
          (product) => `
        <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
          <img src="${product.images[0]}" alt="${product.title}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-600">${product.title}</h3>
            <p class="text-sm text-gray-600 mb-2">${product.brand || ""}</p>
            <p class="text-black font-bold">$${product.price}</p>
            <button class="add-to-cart w-full bg-orange-500 text-white py-1 rounded-full mt-2 hover:bg-orange-600">
              Add to Cart
            </button>
          </div>
        </div>
      `
        )
        .join("");

      document.getElementById("products").innerHTML = productCards;

      const buttons = document.querySelectorAll(".add-to-cart");

      buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
          let cart = JSON.parse(localStorage.getItem("cart")) || [];

          const product = {
            id: products[index].id,
            title: products[index].title,
            price: products[index].price,
            image: products[index].images[0],
            quantity: 1,
          };

          const existing = cart.find((item) => item.id == product.id);
          if (existing) {
            existing.quantity += 1;
          } else {
            cart.push(product);
          }

          localStorage.setItem("cart", JSON.stringify(cart));

          const cartCount = document.getElementById("cart-count");
          if (cartCount) {
            cartCount.textContent = cart.reduce(
              (sum, item) => sum + item.quantity,
              0
            );
          }

          Toastify({
            text: "Added to cart",
            duration: 3000,
            className: "success",
          }).showToast();
        });
      });
    }

    renderProducts(products);

    // Search filter
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", () => {
      const query = searchInput.value.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          (product.brand && product.brand.toLowerCase().includes(query))
      );
      renderProducts(filtered);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("products").innerHTML =
      "<p class='text-red-600'>Failed to load products.</p>";
  }
}

loadProducts();

// ✅ Mobile menu toggle for responsiveness
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}
