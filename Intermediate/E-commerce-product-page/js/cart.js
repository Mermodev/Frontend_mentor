// =========================================================
// CART — quantity, add to cart, dropdown, remove
// =========================================================

let quantity = 0;
let cartQuantity = 0;

// Elements
const qtyValue = document.getElementById('qty-value');
const qtyDec = document.getElementById('qty-dec');
const qtyInc = document.getElementById('qty-inc');
const addToCartBtn = document.getElementById('add-to-cart');

const cartBtn = document.getElementById('cart-btn');
const cartBadge = document.getElementById('cart-badge');
const cartDropdown = document.getElementById('cart-dropdown');
const cartBody = document.getElementById('cart-body');

// -------------------------
// Quantity controls
// -------------------------
qtyDec.addEventListener('click', () => {
  if (quantity > 0) {
    quantity--;
    qtyValue.textContent = quantity;
  }
});

qtyInc.addEventListener('click', () => {
  quantity++;
  qtyValue.textContent = quantity;
});

// -------------------------
// Add to cart
// -------------------------
addToCartBtn.addEventListener('click', () => {
  if (quantity === 0) return;
  cartQuantity += quantity;
  quantity = 0;
  qtyValue.textContent = 0;
  updateCartBadge();
  renderCart();
});

function updateCartBadge() {
  if (cartQuantity > 0) {
    cartBadge.textContent = cartQuantity;
    cartBadge.removeAttribute('hidden');
  } else {
    cartBadge.setAttribute('hidden', '');
  }
}

// -------------------------
// Cart dropdown
// -------------------------
cartBtn.addEventListener('click', () => {
  const isOpen = !cartDropdown.hasAttribute('hidden');
  if (isOpen) {
    closeCart();
  } else {
    openCart();
  }
});

// Close when clicking outside
document.addEventListener('click', (e) => {
  if (
    !cartDropdown.hasAttribute('hidden') &&
    !cartDropdown.contains(e.target) &&
    !cartBtn.contains(e.target)
  ) {
    closeCart();
  }
});

function openCart() {
  cartDropdown.removeAttribute('hidden');
  cartBtn.setAttribute('aria-expanded', 'true');
}

function closeCart() {
  cartDropdown.setAttribute('hidden', '');
  cartBtn.setAttribute('aria-expanded', 'false');
}

// -------------------------
// Render cart contents
// -------------------------
function renderCart() {
  cartBody.innerHTML = '';

  if (cartQuantity === 0) {
    const empty = document.createElement('p');
    empty.classList.add('cart-dropdown__empty');
    empty.textContent = 'Your cart is empty.';
    cartBody.appendChild(empty);
    return;
  }

  const total = (PRODUCT.price * cartQuantity).toFixed(2);

  // Cart item
  const item = document.createElement('div');
  item.classList.add('cart-item');

  const thumb = document.createElement('img');
  thumb.src = PRODUCT.thumb;
  thumb.alt = PRODUCT.name;
  thumb.classList.add('cart-item__thumb');

  const info = document.createElement('div');
  info.classList.add('cart-item__info');

  const name = document.createElement('p');
  name.classList.add('cart-item__name');
  name.textContent = PRODUCT.name;

  const priceCalc = document.createElement('p');
  priceCalc.classList.add('cart-item__price-calc');
  priceCalc.innerHTML = `$${PRODUCT.price.toFixed(2)} x ${cartQuantity} <strong class="cart-item__total">$${total}</strong>`;

  info.appendChild(name);
  info.appendChild(priceCalc);

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.classList.add('cart-item__remove');
  removeBtn.setAttribute('aria-label', 'Remove item from cart');

  const removeIcon = document.createElement('img');
  removeIcon.src = './assets/images/icon-delete.svg';
  removeIcon.alt = '';
  removeIcon.setAttribute('aria-hidden', 'true');
  removeBtn.appendChild(removeIcon);

  removeBtn.addEventListener('click', () => {
    cartQuantity = 0;
    updateCartBadge();
    renderCart();
  });

  item.appendChild(thumb);
  item.appendChild(info);
  item.appendChild(removeBtn);

  // Checkout button
  const checkoutBtn = document.createElement('button');
  checkoutBtn.type = 'button';
  checkoutBtn.classList.add('checkout-btn');
  checkoutBtn.textContent = 'Checkout';
  checkoutBtn.addEventListener('click', () => {
    alert('Checkout not implemented in this challenge.');
  });

  cartBody.appendChild(item);
  cartBody.appendChild(checkoutBtn);
}
