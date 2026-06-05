const form = document.getElementById("register-form");
const errorBox = document.getElementById("register-error");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  errorBox.textContent = "";
  errorBox.classList.remove("text-green-600");
  errorBox.classList.add("text-red-600");

  if (!username || !email || !password || !confirmPassword) {
    errorBox.textContent = "Please fill in all fields.";
    return;
  }

  if (!email.includes("@")) {
    errorBox.textContent = "Please enter a valid email address.";
    return;
  }

  if (password !== confirmPassword) {
    errorBox.innerText = "Registration successful! Redirecting...";
    return;
  }

  errorBox.classList.remove("text-red-600");
  errorBox.classList.add("text-green-600");
  errorBox.innerText = "Registration successful! Redirecting...";


  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
});
