// Sample product data
const products = [
  { id: 1, name: "Smartphone X", price: 24999, img: "https://via.placeholder.com/150?text=Phone" },
  { id: 2, name: "Laptop Pro", price: 74999, img: "https://via.placeholder.com/150?text=Laptop" },
  { id: 3, name: "Wireless Headphones", price: 2999, img: "https://via.placeholder.com/150?text=Headphones" },
  { id: 4, name: "Smart Watch", price: 4999, img: "https://via.placeholder.com/150?text=Watch" },
  { id: 5, name: "Bluetooth Speaker", price: 1999, img: "https://via.placeholder.com/150?text=Speaker" },
  { id: 6, name: "Gaming Mouse", price: 999, img: "https://via.placeholder.com/150?text=Mouse" }
];

let cart = [];

// Render products
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = products.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
}

// Add to cart
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCart();
}

// Update cart UI
function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");
  const countEl = document.getElementById("cart-count");

  let total = 0;
  cartItems.innerHTML = "";

  cart.forEach(item => {
    total += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="cart-item">
        <img src="${item.img}">
        <p>${item.name} (x${item.qty})</p>
        <button onclick="removeFromCart(${item.id})">❌</button>
      </div>
    `;
  });

  totalEl.textContent = total.toLocaleString();
  countEl.textContent = cart.reduce((a, c) => a + c.qty, 0);
}

// Remove from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCart();
}

// Toggle cart sidebar
function toggleCart() {
  document.getElementById("cart").classList.toggle("open");
}

// Checkout
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Checkout successful! 🎉");
  cart = [];
  updateCart();
  toggleCart();
}

// Search
document.getElementById("search").addEventListener("input", e => {
  const term = e.target.value.toLowerCase();
  const filtered = products.filter(p => p.name.toLowerCase().includes(term));
  const list = document.getElementById("product-list");
  list.innerHTML = filtered.map(p => `
    <div class="product">
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    </div>
  `).join("");
});

// Init
document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
updateCart();
