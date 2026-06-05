// Hamburger toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Login form validation
const form = document.getElementById("login-form");
const errorBox = document.getElementById("login-error");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    // Reset error box
    errorBox.textContent = "";
    errorBox.classList.remove("text-green-600");
    errorBox.classList.add("text-red-600");

    if (!email || !password) {
      errorBox.textContent = "Please fill in both email and password.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      errorBox.textContent = "Please enter a valid email address.";
      return;
    }

    // Success
    errorBox.classList.remove("text-red-600");
    errorBox.classList.add("text-green-600");
    errorBox.textContent = "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "index.html"; // redirect after success
    }, 1500);
  });
}
