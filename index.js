// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
const cartCount = document.getElementById("cart-count");
cartCount.textContent = cart.length;

// Fetch products from API
fetch("https://dummyjson.com/products/category/sunglasses?limit=0")
  .then(response => response.json())
  .then(data => {
    let products = data.products;

    // Render products
    function renderProducts(items) {
      if (items.length === 0) {
        document.getElementById("products").innerHTML =
          `<p class="text-center text-red-600 font-semibold">No product found.</p>`;
        return;
      }

      let productsArray = items.map(item => `
        <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
          <img src="${item.images[0]}" alt="${item.title}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-600">${item.title}</h3>
            <p class="text-sm text-gray-500">${item.brand}</p>
            <p class="text-black font-bold">$${item.price}</p>
            <button class="add-to-cart mt-3 w-full bg-orange-500 text-white py-1 rounded-full hover:bg-orange-600 transition">
              Add to Cart
            </button>
          </div>
        </div>
      `);

      document.getElementById("products").innerHTML = productsArray.join("");

      // Add to cart buttons
      document.querySelectorAll(".add-to-cart").forEach((button, index) => {
        button.addEventListener("click", () => {
          let product = items[index];
          cart.push(product);
          localStorage.setItem("cart", JSON.stringify(cart));
          cartCount.textContent = cart.length;
        });
      });
    }

    // Initial render
    renderProducts(products);

    // Search filter
    const searchInput = document.querySelector("#search");
    searchInput.addEventListener("input", () => {
      let search = searchInput.value.toLowerCase();
      let filteredProducts = products.filter(item =>
        item.title.toLowerCase().includes(search)
      );
      renderProducts(filteredProducts);
    });
  })
  .catch(error => {
    console.error(error);
    document.querySelector("#errorUser").innerHTML =
      "Error loading products...";
  })
  .finally(() => {
    console.log("Fetching completed");
  });

// Mobile menu toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});
