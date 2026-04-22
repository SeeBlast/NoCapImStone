// ============================================================
// restaurantService — queries against restaurants and menu_items.
// No DOM code here. Pages call these and render the results.
// ============================================================
import { supabase } from '../config.js';

/** List all restaurants (public-read RLS means this works without auth). */
export async function listRestaurants() {
  const { data, error } = await supabase
    .from('restaurants')
    .select('id, name, cuisine, description, image_url, rating, delivery_time_min, delivery_time_max, price_range, is_open')
    .order('name');
  if (error) throw error;
  return data;
}

/** Get a single restaurant by id. */
export async function getRestaurant(id) {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/** Get available menu items for a restaurant. */
export async function getMenu(restaurantId) {
  const { data, error } = await supabase
    .from('menu_items')
    .select('id, name, category, description, price_cents, image_url, is_available')
    .eq('restaurant_id', restaurantId)
    .eq('is_available', true)
    .order('category')
    .order('name');
  if (error) throw error;
  return data;
}

/** List restaurants owned by the currently-logged-in owner. */
export async function listMyRestaurants() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('not_authenticated');
  const { data, error } = await supabase
    .from('restaurants')
    .select('*')
    .eq('owner_id', user.id)
    .order('name');
  if (error) throw error;
  return data;
}