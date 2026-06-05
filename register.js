// Hamburger toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Register form validation
const form = document.getElementById("register-form");
const errorBox = document.getElementById("register-error");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("confirm-password").value.trim();

    // Reset error box
    errorBox.textContent = "";
    errorBox.classList.remove("text-green-600");
    errorBox.classList.add("text-red-600");

    // Validation checks
    if (!username || !email || !password || !confirmPassword) {
      errorBox.textContent = "Please fill in all fields.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      errorBox.textContent = "Please enter a valid email address.";
      return;
    }

    if (password.length < 6) {
      errorBox.textContent = "Password must be at least 6 characters.";
      return;
    }

    if (password !== confirmPassword) {
      errorBox.textContent = "Passwords do not match.";
      return;
    }

    // Success
    errorBox.classList.remove("text-red-600");
    errorBox.classList.add("text-green-600");
    errorBox.textContent = "Registration successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "login.html"; // redirect to login page
    }, 1500);
  });
}
