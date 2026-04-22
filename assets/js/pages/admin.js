// ============================================================
// admin.js — controller for views/restaurant/dashboard.html
// Shows incoming orders for this owner's restaurants.
// Uses Realtime to react to new/changed orders live.
// ============================================================
import { requireAuth, signOut } from '../services/auth.js';
import { listMyRestaurants } from '../services/restaurants.js';
import {
  listIncomingOrders,
  updateOrderStatus,
  subscribeToRestaurantOrders
} from '../services/orders.js';
import { formatMoney } from '../utils/money.js';

// Next-status for each current status. null = no forward action.
const NEXT_STATUS = {
  pending:          { next: 'accepted',         label: 'Accept' },
  accepted:         { next: 'preparing',        label: 'Start preparing' },
  preparing:        { next: 'ready',            label: 'Mark ready' },
  ready:            { next: 'out_for_delivery', label: 'Out for delivery' },
  out_for_delivery: { next: 'delivered',        label: 'Mark delivered' },
  delivered:        { next: null,               label: null },
  cancelled:        { next: null,               label: null }
};

let myRestaurantIds = [];
let orders = [];

async function init() {
  await requireAuth({ role: 'restaurant' });

  document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    await signOut();
    window.location.href = '/auth/login.html';
  });

  try {
    const restaurants = await listMyRestaurants();
    myRestaurantIds = restaurants.map(r => r.id);

    if (myRestaurantIds.length === 0) {
      document.getElementById('ordersGrid').innerHTML =
        '<p>You do not own any restaurants yet.</p>';
      return;
    }

    await refresh();

    // Live updates: subscribe per restaurant
    myRestaurantIds.forEach(id =>
      subscribeToRestaurantOrders(id, () => refresh())
    );
  } catch (err) {
    console.error(err);
    document.getElementById('ordersGrid').innerHTML =
      '<p>Could not load orders.</p>';
  }
}

async function refresh() {
  orders = await listIncomingOrders();
  render();
}

function render() {
  const grid = document.getElementById('ordersGrid');
  if (!orders.length) {
    grid.innerHTML = '<p class="no-results">No orders yet. Waiting for the first one!</p>';
    return;
  }

  grid.innerHTML = orders.map(o => {
    const next = NEXT_STATUS[o.status] || { next: null, label: null };
    const itemsHtml = (o.order_items || []).map(i =>
      `<p>${i.quantity}× ${escapeHtml(i.name_snapshot)}</p>`
    ).join('');

    return `
      <div class="order-card status-${o.status}">
        <div class="order-card-header">
          <h3>Order #${o.order_number}</h3>
          <span class="status ${o.status}">${o.status.replace(/_/g, ' ')}</span>
        </div>
        <p class="order-meta">
          <strong>Customer:</strong> ${escapeHtml(o.customer?.full_name || 'Unknown')}
          · ${new Date(o.created_at).toLocaleTimeString()}
        </p>
        <div class="order-lines">${itemsHtml}</div>
        <div class="order-actions">
          <span class="order-total">Total: ${formatMoney(o.total_cents)}</span>
          ${next.next
            ? `<button class="btn-accept" data-id="${o.id}" data-next="${next.next}">${next.label}</button>`
            : ''}
        </div>
      </div>
    `;
  }).join('');

  grid.querySelectorAll('.btn-accept').forEach(btn => {
    btn.addEventListener('click', async (e) => {
      const id = e.currentTarget.dataset.id;
      const next = e.currentTarget.dataset.next;
      e.currentTarget.disabled = true;
      try {
        await updateOrderStatus(id, next);
        await refresh();
      } catch (err) {
        console.error(err);
        alert('Could not update order: ' + err.message);
        e.currentTarget.disabled = false;
      }
    });
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

init();