// ============================================================
// orderService — all order-related operations. Mutations go
// through RPCs (place_order, update_order_status) so server
// logic is authoritative.
// ============================================================
import { supabase } from '../config.js';

/**
 * Place an order. Server validates the cart, recomputes totals
 * from current menu prices, enforces idempotency, and inserts
 * orders + order_items + audit event in one transaction.
 *
 * Returns one of:
 *   { status: 'success', order_id, order_number, total_cents }
 *   { status: 'duplicate', order_id }  -- retry of same key
 *   { status: 'price_changed', ... }  -- client must re-confirm
 */
export async function placeOrder({
  restaurantId,
  items,              // [{ menu_item_id, quantity }]
  deliveryAddress,    // { street, city, postal }
  paymentMethod,      // 'credit' | 'paypal' | 'cash'
  expectedTotalCents
}) {
  const { data, error } = await supabase.rpc('place_order', {
    p_restaurant_id: restaurantId,
    p_items: items,
    p_delivery_address: deliveryAddress,
    p_payment_method: paymentMethod,
    p_expected_total_cents: expectedTotalCents,
    p_idempotency_key: crypto.randomUUID()
  });
  if (error) throw error;
  return data;
}

/** Orders placed by the current customer. */
export async function listMyOrders() {
  const { data, error } = await supabase
    .from('orders')
    .select(`
      id, order_number, status, total_cents, created_at, estimated_ready_at,
      restaurants(name, image_url),
      order_items(name_snapshot, quantity, price_cents_snapshot, line_total_cents)
    `)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/** Orders for restaurants owned by the current user. */
export async function listIncomingOrders(restaurantId = null) {
  let query = supabase
    .from('orders')
    .select(`
      id, order_number, status, total_cents, created_at,
      customer:profiles!customer_id(full_name),
      order_items(name_snapshot, quantity)
    `)
    .order('created_at', { ascending: false });

  if (restaurantId) query = query.eq('restaurant_id', restaurantId);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

/** Move an order to a new status (owner-only, enforced server-side). */
export async function updateOrderStatus(orderId, newStatus, note = null) {
  const { data, error } = await supabase.rpc('update_order_status', {
    p_order_id: orderId,
    p_new_status: newStatus,
    p_note: note
  });
  if (error) throw error;
  return data;
}

/** Subscribe to a single order's updates. Returns the channel for unsubscribe. */
export function subscribeToOrder(orderId, onChange) {
  return supabase
    .channel(`order:${orderId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'orders',
      filter: `id=eq.${orderId}`
    }, (payload) => onChange(payload.new))
    .subscribe();
}

/** Subscribe to all order events for a restaurant (owner dashboard). */
export function subscribeToRestaurantOrders(restaurantId, onEvent) {
  return supabase
    .channel(`restaurant:${restaurantId}:orders`)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'orders',
      filter: `restaurant_id=eq.${restaurantId}`
    }, onEvent)
    .subscribe();
}