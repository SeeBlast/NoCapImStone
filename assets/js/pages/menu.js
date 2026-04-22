// ============================================================
// menu.js — controller for views/customer/menu.html
// Fetches one restaurant + its menu, manages cart interactions.
// ============================================================
import { requireAuth } from '../services/auth.js';
import { getRestaurant, getMenu } from '../services/restaurants.js';
import * as cart from '../cart.js';
import { formatMoney } from '../utils/money.js';

const params = new URLSearchParams(window.location.search);
const restaurantId = params.get('id');

let restaurant = null;
let menuItems = [];
let activeCategory = 'All';

async function init() {
  await requireAuth({ role: 'customer' });

  if (!restaurantId) {
    window.location.href = 'home.html';
    return;
  }

  try {
    [restaurant, menuItems] = await Promise.all([
      getRestaurant(restaurantId),
      getMenu(restaurantId)
    ]);
  } catch (err) {
    console.error(err);
    window.location.href = 'home.html';
    return;
  }

  renderBanner();
  renderCategories();
  renderMenu();

  // Subscribe to cart updates to re-render menu (so qty steppers update)
  // and the sidebar. subscribe() fires immediately with current state.
  cart.subscribe(() => {
    renderMenu();
    renderCartSidebar();
  });

  document.getElementById('menuSearch').addEventListener('input', renderMenu);
  document.getElementById('cartFloatBtn').addEventListener('click', toggleCart);
  document.getElementById('cartOverlay').addEventListener('click', toggleCart);
  document.getElementById('checkoutBtn').addEventListener('click', () => {
    window.location.href = 'checkout.html';
  });
}

function renderBanner() {
  document.title = restaurant.name + ' – FeedMe';
  document.getElementById('restName').textContent = restaurant.name;
  document.getElementById('restDesc').textContent = restaurant.description || '';
  document.getElementById('restRating').textContent = '⭐ ' + restaurant.rating;
  document.getElementById('restTime').textContent =
    `⏱ ${restaurant.delivery_time_min}-${restaurant.delivery_time_max} min`;
  document.getElementById('restPrice').textContent = '🔥 ' + (restaurant.price_range || '');
}

function renderCategories() {
  const cats = ['All', ...new Set(menuItems.map(m => m.category))];
  const section = document.getElementById('menuCategories');
  section.innerHTML = cats.map(c =>
    `<button class="cat-btn ${c === activeCategory ? 'active' : ''}" data-cat="${escapeAttr(c)}">${escapeHtml(c)}</button>`
  ).join('');
  section.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeCategory = e.target.dataset.cat;
      section.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderMenu();
    });
  });
}

function renderMenu() {
  const q = (document.getElementById('menuSearch').value || '').toLowerCase();
  let list = menuItems;
  if (activeCategory !== 'All') list = list.filter(m => m.category === activeCategory);
  if (q) list = list.filter(m => m.name.toLowerCase().includes(q));

  const cartState = cart.getState();
  const grid = document.getElementById('foodGrid');
  grid.innerHTML = list.map(item => {
    const entry = cartState.items.find(i => i.menu_item_id === item.id);
    const qty = entry ? entry.quantity : 0;
    const control = qty > 0
      ? `<div class="qty-control">
           <button data-action="dec" data-id="${item.id}">−</button>
           <span>${qty}</span>
           <button data-action="inc" data-id="${item.id}">+</button>
         </div>`
      : `<button class="add-btn" data-action="add" data-id="${item.id}">+</button>`;

    return `
      <div class="food-card">
        <div class="food-card-content">
          <div class="food-category">${escapeHtml(item.category)}</div>
          <h4>${escapeHtml(item.name)}</h4>
          <p class="food-desc">${escapeHtml(item.description || '')}</p>
          <div class="price-add">
            <span class="food-price">${formatMoney(item.price_cents)}</span>
            ${control}
          </div>
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const action = e.currentTarget.dataset.action;
      if (action === 'add') {
        const item = menuItems.find(m => m.id === id);
        cart.addItem(restaurantId, item);
      } else if (action === 'inc') {
        cart.changeQuantity(id, 1);
      } else if (action === 'dec') {
        cart.changeQuantity(id, -1);
      }
    });
  });
}

function renderCartSidebar() {
  const state = cart.getState();
  const totals = cart.computeTotals();
  const count = cart.itemCount();

  document.getElementById('cartCount').textContent = count;
  const badge = document.getElementById('cartBadge');
  if (count > 0) {
    badge.textContent = count;
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }

  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');

  if (state.items.length === 0) {
    items.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🍕</div>
        <p>Nothing here yet</p>
        <small>Add some yummy food!</small>
      </div>`;
    footer.classList.add('hidden');
    return;
  }

  items.innerHTML = state.items.map(i => `
    <div class="cart-item">
      <div class="cart-item-info">
        <span class="cart-item-name">${escapeHtml(i.name)}</span>
        <span class="cart-item-price">${formatMoney(i.price_cents * i.quantity)}</span>
      </div>
      <div class="qty-control small">
        <button data-cart-action="dec" data-id="${i.menu_item_id}">−</button>
        <span>${i.quantity}</span>
        <button data-cart-action="inc" data-id="${i.menu_item_id}">+</button>
      </div>
    </div>
  `).join('');

  items.querySelectorAll('[data-cart-action]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.currentTarget.dataset.id;
      const delta = e.currentTarget.dataset.cartAction === 'inc' ? 1 : -1;
      cart.changeQuantity(id, delta);
    });
  });

  document.getElementById('cartSubtotal').textContent = formatMoney(totals.subtotal);
  document.getElementById('cartTotal').textContent = formatMoney(totals.total);
  footer.classList.remove('hidden');
}

function toggleCart() {
  document.getElementById('cartSidebar').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('hidden');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}
function escapeAttr(s) { return escapeHtml(s); }

init();