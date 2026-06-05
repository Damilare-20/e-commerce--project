// Hamburger toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Cart functionality
const cartItemsContainer = document.getElementById("cart-items");
const cartEmpty = document.getElementById("cart-empty");
const cartSummary = document.getElementById("cart-summary");
const cartActions = document.getElementById("cart-actions");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartUI() {
  if (cart.length === 0) {
    cartEmpty.classList.remove("hidden");
    cartItemsContainer.innerHTML = "";
    cartSummary.classList.add("hidden");
    cartActions.classList.add("hidden");
    cartCount.textContent = 0;
    return;
  }

  cartEmpty.classList.add("hidden");
  cartSummary.classList.remove("hidden");
  cartActions.classList.remove("hidden");

  // Render items
  cartItemsContainer.innerHTML = cart
    .map(
      (item, index) => `
      <div class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <img src="${item.image}" alt="${item.title}" class="w-16 h-16 object-cover rounded-md">
          <div>
            <h3 class="font-semibold text-gray-800">${item.title}</h3>
            <p class="text-gray-600">$${item.price} x ${item.quantity}</p>
          </div>
        </div>
        <button data-index="${index}" class="remove-item text-red-500 hover:text-red-700">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    `
    )
    .join("");

  // Update totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTotal.textContent = `$${subtotal.toFixed(2)}`;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Remove item buttons
  document.querySelectorAll(".remove-item").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.currentTarget.getAttribute("data-index");
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartUI();
    });
  });
}

// Clear cart
clearCartBtn.addEventListener("click", () => {
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
});

// Checkout (placeholder)
checkoutBtn.addEventListener("click", () => {
  alert("Proceeding to checkout...");
});

// Initialize
updateCartUI();
