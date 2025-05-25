// cart.js

// ————————————————
// 1) Load / Save Helpers
// ————————————————
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = cart.length;
}

// ————————————————
// 2) Cart Actions
// ————————————————
function addToCart(name, price, image = "") {
  if (!name || isNaN(price)) {
    return alert("Error adding to cart: missing name or invalid price.");
  }
  cart.push({ name, price: Number(price), image });
  saveCart();
  updateCartCount();
  alert(`${name} added to cart!`);
}

function removeItem(idx) {
  cart.splice(idx, 1);
  saveCart();
  updateCartCount();
  displayCart();
}

function checkout() {
  if (cart.length === 0) {
    return alert("Your cart is empty!");
  }
  // 👉 swap this alert for your real 2Checkout redirect / form
  alert("Proceeding to 2Checkout payment gateway…");
}

// ————————————————
// 3) Render Cart Page
// ————————————————
function displayCart() {
  const container = document.getElementById("cart-items");
  if (!container) return; // only on cart.html

  container.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is currently empty.</p>";
    document.getElementById("cart-total").textContent = "0.00";
    return;
  }

  cart.forEach((item, i) => {
    total += item.price;
    container.innerHTML += `
      <div class="cart-item">
        ${
          item.image
            ? `<img src="${item.image}" alt="${item.name}" class="cart-img">`
            : ""
        }
        <div class="cart-info">
          <h4>${item.name}</h4>
          <p>₱${item.price.toFixed(2)}</p>
        </div>
        <button onclick="removeItem(${i})">Remove</button>
      </div>
    `;
  });

  document.getElementById("cart-total").textContent = total.toFixed(2);
}

// ————————————————
// 4) Wire Everything On Load
// ————————————————
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  displayCart();

  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    const name = btn.dataset.name;
    const price = parseFloat(btn.dataset.price);
    // if you want images, add data-image="running.jpg" on your buttons:
    const image = btn.dataset.image || "";
    btn.addEventListener("click", () => addToCart(name, price, image));
  });
});
