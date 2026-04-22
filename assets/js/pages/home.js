// ============================================================
// home.js — controller for views/customer/home.html
// Fetches restaurants, renders cards, handles search and filter.
// ============================================================
import { requireAuth, signOut } from '../services/auth.js';
import { listRestaurants } from '../services/restaurants.js';

let allRestaurants = [];
let activeCuisine = 'All';

async function init() {
  const profile = await requireAuth({ role: 'customer' });
  document.getElementById('userGreeting').textContent = 'Hi, ' + profile.full_name.split(' ')[0];

  document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    await signOut();
    window.location.href = '/auth/login.html';
  });

  try {
    allRestaurants = await listRestaurants();
    renderCategories();
    render();
  } catch (err) {
    console.error(err);
    document.getElementById('restaurantGrid').innerHTML =
      '<div class="no-results">Could not load restaurants.</div>';
  }

  document.getElementById('searchInput').addEventListener('input', render);
}

function renderCategories() {
  const cuisines = ['All', ...new Set(allRestaurants.map(r => r.cuisine))].sort((a, b) => {
    if (a === 'All') return -1;
    if (b === 'All') return 1;
    return a.localeCompare(b);
  });
  const nav = document.getElementById('categories');
  nav.innerHTML = cuisines.map((c, i) =>
    `<button class="cat-btn ${c === activeCuisine ? 'active' : ''}" data-cuisine="${c}">${c}</button>`
  ).join('');
  nav.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeCuisine = e.target.dataset.cuisine;
      nav.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      render();
    });
  });
}

function render() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  let list = allRestaurants;

  if (activeCuisine !== 'All') {
    list = list.filter(r => r.cuisine === activeCuisine);
  }
  if (q) {
    list = list.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q)
    );
  }

  const grid = document.getElementById('restaurantGrid');
  if (!list.length) {
    grid.innerHTML = '<div class="no-results">No restaurants found 😔</div>';
    return;
  }

  grid.innerHTML = list.map(r => `
    <div class="restaurant-card" data-id="${r.id}">
      <div class="restaurant-img-wrap">
        <img
          src="${r.image_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80'}"
          alt="${escapeHtml(r.name)}"
          onerror="this.src='https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80'">
      </div>
      <div class="restaurant-info">
        <div class="restaurant-header">
          <h3>${escapeHtml(r.name)}</h3>
          <span class="rating">⭐ ${r.rating}</span>
        </div>
        <p class="restaurant-cuisine">${escapeHtml(r.cuisine)}</p>
        <p class="restaurant-desc">${escapeHtml(r.description || '')}</p>
        <div class="restaurant-meta">
          <span>⏱ ${r.delivery_time_min}-${r.delivery_time_max} min</span>
          <span>🔥 ${r.price_range || ''}</span>
          <span class="status ${r.is_open ? 'open' : 'cancelled'}">${r.is_open ? 'Open' : 'Closed'}</span>
        </div>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.restaurant-card').forEach(card => {
    card.addEventListener('click', () => {
      window.location.href = `menu.html?id=${card.dataset.id}`;
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

init();