// Hamburger toggle
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (menuBtn && mobileMenu) {
  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });
}

// Contact form validation
const form = document.getElementById("contact-form");
const errorBox = document.getElementById("contact-error");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contact-name").value.trim();
    const email = document.getElementById("contact-email").value.trim();
    const subject = document.getElementById("contact-subject").value.trim();
    const message = document.getElementById("contact-message").value.trim();

    errorBox.innerText = "";
    errorBox.classList.remove("text-green-600");
    errorBox.classList.add("text-red-600");

    if (!name || !email || !subject || !message) {
      errorBox.innerText = "Please fill in all fields.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      errorBox.innerText = "Please enter a valid email address.";
      return;
    }

    errorBox.classList.remove("text-red-600");
    errorBox.classList.add("text-green-600");
    errorBox.innerText = "Message sent successfully!";

    setTimeout(() => {
      form.reset();
      errorBox.innerText = "";
    }, 2000);
  });
}
