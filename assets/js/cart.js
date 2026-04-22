// ============================================================
// Cart — single source of truth on the client. Persists across
// page reloads via sessionStorage. Subscribe with subscribe(fn)
// to re-render when it changes.
//
// Enforces one-restaurant-at-a-time: adding from a different
// restaurant prompts to clear the current cart.
// ============================================================
const STORAGE_KEY = 'feedme_cart_v2';

function load() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { restaurantId: null, items: [] };
  } catch {
    return { restaurantId: null, items: [] };
  }
}

let state = load();
const listeners = new Set();

function save() {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function emit() {
  const snapshot = getState();
  listeners.forEach(fn => fn(snapshot));
}

export function subscribe(fn) {
  listeners.add(fn);
  fn(getState()); // fire immediately with current state
  return () => listeners.delete(fn);
}

export function getState() {
  return structuredClone(state);
}

/**
 * Add a menu item to the cart. If the cart has items from a
 * different restaurant, prompt the user to clear it first.
 * Returns true if added, false if user cancelled.
 */
export function addItem(restaurantId, menuItem) {
  if (state.restaurantId && state.restaurantId !== restaurantId) {
    const ok = confirm(
      'Your cart has items from another restaurant. Start a new order here?'
    );
    if (!ok) return false;
    state = { restaurantId, items: [] };
  }
  if (!state.restaurantId) state.restaurantId = restaurantId;

  const existing = state.items.find(i => i.menu_item_id === menuItem.id);
  if (existing) {
    existing.quantity++;
  } else {
    state.items.push({
      menu_item_id: menuItem.id,
      name: menuItem.name,
      price_cents: menuItem.price_cents,
      quantity: 1
    });
  }
  save();
  emit();
  return true;
}

export function changeQuantity(menuItemId, delta) {
  const idx = state.items.findIndex(i => i.menu_item_id === menuItemId);
  if (idx === -1) return;
  state.items[idx].quantity += delta;
  if (state.items[idx].quantity <= 0) {
    state.items.splice(idx, 1);
  }
  if (state.items.length === 0) {
    state.restaurantId = null;
  }
  save();
  emit();
}

export function clear() {
  state = { restaurantId: null, items: [] };
  save();
  emit();
}

export function subtotalCents() {
  return state.items.reduce((s, i) => s + (i.price_cents * i.quantity), 0);
}

export function itemCount() {
  return state.items.reduce((s, i) => s + i.quantity, 0);
}

/** Shape required by the place_order RPC. */
export function toOrderItems() {
  return state.items.map(i => ({
    menu_item_id: i.menu_item_id,
    quantity: i.quantity
  }));
}

/** Client-side totals for display. Server recomputes on submit. */
export function computeTotals() {
  const subtotal = subtotalCents();
  const deliveryFee = 299; // $2.99 — must match server RPC default
  const tax = Math.round(subtotal * 0.13);
  const total = subtotal + deliveryFee + tax;
  return { subtotal, deliveryFee, tax, total };
}