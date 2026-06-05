let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");
cartCount.textContent = cart.length;

fetch("https://dummyjson.com/products/category/sunglasses?limit=0")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    let products = data.products;

    function renderProducts(items) {
      if (items.length === 0) {
        document.getElementById("products").innerHTML =
          `<p class="text-center text-red-600 font-semibold">No product found.</p>`;
        return;
      }

      let productsArray = items.map(function (item) {
        return `
          <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <img src="${item.images[0]}" alt="${item.title}" class="w-full h-48 object-cover">
            <div class="p-4">
              <h3 class="text-lg font-semibold text-gray-600">${item.title}</h3>
              <p class="text-sm text-gray-500">${item.brand}</p>
              <p class="text-black font-bold">$${item.price}</p>
              <button class="add-to-cart mt-3 w-full bg-orange-500 text-white py-1 rounded-full hover:bg-orange-600">
                Add to Cart
              </button>
            </div>
          </div>
        `;
      });

      document.getElementById("products").innerHTML = productsArray.join("");

      let buttons = document.querySelectorAll(".add-to-cart");

      buttons.forEach(function (button, index) {
        button.addEventListener("click", function () {
          let product = products[index]; 

          cart.push(product);

          localStorage.setItem("cart", JSON.stringify(cart));
          cartCount.textContent = cart.length;
        });
      });
    }

    renderProducts(products);

    const searchInput = document.querySelector("#search");
    searchInput.addEventListener("input", function () {
      let search = searchInput.value.toLowerCase();

      let filteredProducts = products.filter(function (item) {
        return item.title.toLowerCase().includes(search);
      });

      renderProducts(filteredProducts);
    });
  })
  .catch(function (error) {
    console.log(error);
    document.querySelector("#errorUser").innerHTML =
      "Error loading products...";
  })
  .finally(function () {
    console.log("Fetching completed");
  });
