// ============================================================
// checkout.js — controller for views/customer/checkout.html
// Renders summary, handles payment selection, calls place_order.
// ============================================================
import { requireAuth } from '../services/auth.js';
import { getRestaurant } from '../services/restaurants.js';
import { placeOrder, subscribeToOrder } from '../services/orders.js';
import * as cart from '../cart.js';
import { formatMoney } from '../utils/money.js';

let restaurant = null;
let submitting = false;

async function init() {
  await requireAuth({ role: 'customer' });

  const state = cart.getState();
  if (!state.restaurantId || state.items.length === 0) {
    window.location.href = 'home.html';
    return;
  }

  try {
    restaurant = await getRestaurant(state.restaurantId);
  } catch (err) {
    console.error(err);
    window.location.href = 'home.html';
    return;
  }

  document.getElementById('backLink').href = `menu.html?id=${state.restaurantId}`;
  renderSummary();
  wirePaymentMethods();
  wireCardFormatting();

  document.getElementById('placeOrderBtn').addEventListener('click', handlePlaceOrder);
}

function renderSummary() {
  const state = cart.getState();
  const totals = cart.computeTotals();

  document.getElementById('orderItems').innerHTML = state.items.map(i => `
    <div class="order-item">
      <span class="order-item-qty">${i.quantity}×</span>
      <span class="order-item-name">${escapeHtml(i.name)}</span>
      <span class="order-item-price">${formatMoney(i.price_cents * i.quantity)}</span>
    </div>
  `).join('');

  document.getElementById('summarySubtotal').textContent = formatMoney(totals.subtotal);
  document.getElementById('summaryDelivery').textContent = formatMoney(totals.deliveryFee);
  document.getElementById('summaryTax').textContent = formatMoney(totals.tax);
  document.getElementById('summaryTotal').textContent = formatMoney(totals.total);
}

function wirePaymentMethods() {
  document.querySelectorAll('input[name="payment"]').forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.pay-option').forEach(el => el.classList.remove('active-option'));
      radio.parentElement.classList.add('active-option');
      document.getElementById('cardDetails').style.display =
        radio.value === 'credit' ? 'block' : 'none';
    });
  });
}

function wireCardFormatting() {
  const cardNum = document.getElementById('cardNum');
  cardNum.addEventListener('input', (e) => {
    const d = e.target.value.replace(/\D/g, '').substring(0, 16);
    e.target.value = d.replace(/(.{4})/g, '$1 ').trim();
  });
  const expiry = document.getElementById('expiry');
  expiry.addEventListener('input', (e) => {
    const d = e.target.value.replace(/\D/g, '').substring(0, 4);
    e.target.value = d.length > 2 ? d.slice(0, 2) + ' / ' + d.slice(2) : d;
  });
}

async function handlePlaceOrder() {
  if (submitting) return;

  const street = document.getElementById('address').value.trim();
  const city = document.getElementById('city').value.trim();
  const postal = document.getElementById('postal').value.trim();
  if (!street || !city || !postal) {
    alert('Please fill in your full delivery address.');
    return;
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
  const state = cart.getState();
  const totals = cart.computeTotals();

  submitting = true;
  const btn = document.getElementById('placeOrderBtn');
  btn.disabled = true;
  btn.textContent = 'Placing order…';

  try {
    const result = await placeOrder({
      restaurantId: state.restaurantId,
      items: cart.toOrderItems(),
      deliveryAddress: { street, city, postal },
      paymentMethod,
      expectedTotalCents: totals.total
    });

    if (result.status === 'success' || result.status === 'duplicate') {
      showSuccess(result);
      cart.clear();
      // Subscribe to status updates so the user sees the restaurant accept/prepare
      subscribeToOrder(result.order_id, (row) => {
        document.getElementById('statusText').textContent =
          'Status: ' + row.status.replace(/_/g, ' ');
      });
    } else if (result.status === 'price_changed') {
      const newTotal = formatMoney(result.actual_total_cents);
      const oldTotal = formatMoney(result.expected_total_cents);
      const ok = confirm(
        `Prices changed since you started checkout.\n` +
        `Old total: ${oldTotal}\n` +
        `New total: ${newTotal}\n\n` +
        `Continue with the new total?`
      );
      if (ok) {
        // Re-submit with the server's new total
        const retry = await placeOrder({
          restaurantId: state.restaurantId,
          items: cart.toOrderItems(),
          deliveryAddress: { street, city, postal },
          paymentMethod,
          expectedTotalCents: result.actual_total_cents
        });
        if (retry.status === 'success') {
          showSuccess(retry);
          cart.clear();
        } else {
          alert('Something went wrong. Please try again.');
        }
      }
    }
  } catch (err) {
    console.error(err);
    const msg = err.message || 'Unknown error';
    if (msg.includes('restaurant_closed')) {
      alert('This restaurant just closed. Your cart is saved — try again later.');
    } else if (msg.includes('empty_or_invalid_cart')) {
      alert('Some items are no longer available. Please review your cart.');
    } else {
      alert('Could not place order: ' + msg);
    }
  } finally {
    submitting = false;
    btn.disabled = false;
    btn.textContent = 'Place Order 🎉';
  }
}

function showSuccess(result) {
  document.getElementById('orderNum').textContent = result.order_number || '—';
  document.getElementById('etaText').textContent =
    `${restaurant.delivery_time_min}-${restaurant.delivery_time_max} min`;
  document.getElementById('statusText').textContent = 'Status: pending';
  document.getElementById('successModal').classList.remove('hidden');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

init();