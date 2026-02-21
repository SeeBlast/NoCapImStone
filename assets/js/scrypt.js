// 1. Initialize Database Client (Supabase example)
// Note: You must include the Supabase CDN script in your HTML <head> for this to work.
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hogvdijktcdrhzjoscyt.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Application State
let cart = [];
let currentMenuItems = []; // Stores the database items locally after fetching

// 2. Fetch Data from External Database
async function loadMenu(restaurantId) {
  try {
    // Query the 'menu_items' table where the restaurant matches
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('*')
      .eq('restaurant_id', restaurantId);

    if (error) throw error;

    // Save locally and render
    currentMenuItems = menuItems;
    displayFood(currentMenuItems);
  } catch (error) {
    console.error("Error fetching database:", error.message);
    document.getElementById("foodGrid").innerHTML = "<p>Failed to load menu.</p>";
  }
}

// 3. Render Food Grid
function displayFood(items) {
  const grid = document.getElementById("foodGrid");
  if (!grid) return;

  grid.innerHTML = items.map(item => `
    <div class="food-card">
      <div class="food-card-content">
        <h4>${item.name}</h4>
        <div class="price-add">
          <span>$${Number(item.price).toFixed(2)}</span>
          <button class="add-btn" onclick="addToCart('${item.id}')">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

// 4. Cart Logic
function addToCart(itemId) {
  const existingItem = cart.find(cartItem => cartItem.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Find the full item object from our fetched database array
    const item = currentMenuItems.find(f => f.id === itemId);
    if (item) cart.push({ ...item, quantity: 1 });
  }

  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartItems) return;

  let total = 0;

  cartItems.innerHTML = cart.map(item => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    return `
      <div style="display:flex; justify-content:space-between; margin-bottom:12px; font-size: 14px;">
        <span>${item.quantity}x ${item.name}</span>
        <span style="font-weight: 600;">$${itemTotal.toFixed(2)}</span>
      </div>
    `;
  }).join('');

  if (cartTotal) cartTotal.innerText = total.toFixed(2);
}

// 5. Send Order back to Database
async function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  try {
    // Insert a new row into your 'orders' table
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          // Assuming user authentication is handled separately
          customer_id: 'CURRENT_USER_ID_HERE', 
          restaurant_id: currentMenuItems[0].restaurant_id, 
          status: 'pending',
          total_amount: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        }
      ]);

    if (error) throw error;

    alert("Order placed successfully!");
    cart = []; // Clear cart
    updateCart(); // Reset UI

  } catch (error) {
    console.error("Error placing order:", error.message);
    alert("There was an issue processing your order.");
  }
}

// Initialize the page by calling the database fetch
// (In a real app, you would pass the dynamic ID of the restaurant clicked)
loadMenu('RESTAURANT_ID_HERE');