const form = document.getElementById("login-form");
const errorBox = document.getElementById("login-error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("login-email").value.trim();
  const password = document.getElementById("login-password").value.trim();

  // Clear previous error
  errorBox.textContent = "";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both email and password.";
    return;
  }

  if (!email.includes("@")) {
    errorBox.textContent = "Please enter a valid email address.";
    return;
  }
  errorBox.classList.remove("text-red-600");
  errorBox.classList.add("text-green-600");
  errorBox.innerText = "Login successful! Redirecting...";

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1500);
});
