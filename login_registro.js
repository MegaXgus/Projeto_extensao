const container = document.getElementById("container");
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");

registerBtn.addEventListener("click", () => {
  container.classList.add("active");
});

loginBtn.addEventListener("click", () => {
  container.classList.remove("active");
});

document.getElementById("loginBtn").addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector('.sign-in input[type="email"]').value;
  const password = document.querySelector(
    '.sign-in input[type="password"]'
  ).value;

  if (email && password) {
    window.location.href = "index.html";
  } else {
    alert("Por favor, preencha todos os campos!");
  }
});
