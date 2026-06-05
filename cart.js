let cart = JSON.parse(localStorage.getItem("cart")) || [];

async function renderCart() {
  try {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartEmpty = document.getElementById("cart-empty");
    const cartCount = document.getElementById("cart-count");
    const cartActions = document.getElementById("cart-actions");
    const clearCartBtn = document.getElementById("clear-cart");
    const checkoutBtn = document.getElementById("checkout");

    const cartSummary = document.getElementById("cart-summary");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartTotalEl = document.getElementById("cart-total");

    cartCount.textContent = cart.length;

    if (cart.length === 0) {
      cartEmpty.classList.remove("hidden");
      cartActions.classList.add("hidden");
      cartSummary.classList.add("hidden");
      return;
    }

    cartEmpty.classList.add("hidden");
    cartActions.classList.remove("hidden");

    let cartItemsHTML = cart.map((item, i) => `
      <div class="bg-white shadow-md rounded-lg p-4 flex justify-between items-center">
        <div>
          <img src="${item.image}" alt="product" class="h-25 w-25">
          <h4 class="text-lg font-semibold">${item.title}</h4>
          <p class="text-gray-600" id="price-${i}">$${(item.price * (item.quantity || 1)).toFixed(2)}</p>
        </div>
        <div class="flex items-center space-x-2">
          <button class="px-2 py-1 bg-gray-200 rounded decrease" data-index="${i}">-</button>
          <span class="px-3" id="qty-${i}">${item.quantity || 1}</span>
          <button class="px-2 py-1 bg-gray-200 rounded increase" data-index="${i}">+</button>
          <button class="text-red-500 hover:text-red-700 remove-item" data-index="${i}">Remove</button>
        </div>
      </div>
    `).join("");

    cartItemsContainer.innerHTML = cartItemsHTML;

    await updateTotal();

    document.querySelectorAll(".increase").forEach(btn => {
      btn.addEventListener("click", async () => {
        let index = btn.getAttribute("data-index");
        cart[index].quantity = (cart[index].quantity || 1) + 1;
        await saveCart();
        document.getElementById("qty-" + index).textContent = cart[index].quantity;
        document.getElementById("price-" + index).textContent =
          "$" + (cart[index].price * cart[index].quantity).toFixed(2);
        await updateTotal();
      });
    });

    document.querySelectorAll(".decrease").forEach(btn => {
      btn.addEventListener("click", async () => {
        let index = btn.getAttribute("data-index");
        if ((cart[index].quantity || 1) > 1) {
          cart[index].quantity -= 1;
          await saveCart();
          document.getElementById("qty-" + index).textContent = cart[index].quantity;
          document.getElementById("price-" + index).textContent =
            "$" + (cart[index].price * cart[index].quantity).toFixed(2);
          await updateTotal();
        }
      });
    });

    document.querySelectorAll(".remove-item").forEach(btn => {
      btn.addEventListener("click", async () => {
        let index = btn.getAttribute("data-index");
        cart.splice(index, 1);
        await saveCart();
        location.reload();
      });
    });

    clearCartBtn.addEventListener("click", async () => {
      localStorage.removeItem("cart");
      location.reload();
    });

    checkoutBtn.addEventListener("click", async () => {
      alert("Proceeding to checkout...");
    });

  } catch (error) {
    console.error(error);
    document.querySelector('#errorCart').innerHTML = "Error loading cart...";
  } finally {
    console.log("Cart rendering completed");
  }
}

async function updateTotal() {
  let total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
  document.getElementById("cart-subtotal").textContent = "$" + total.toFixed(2);
  document.getElementById("cart-total").textContent = "$" + total.toFixed(2);
  document.getElementById("cart-summary").classList.remove("hidden");
}

async function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

renderCart();

let cartLength = JSON.parse(localStorage.getItem('cart')) || [];
document.querySelector('#cart-count').innerHTML = cartLength.length;
