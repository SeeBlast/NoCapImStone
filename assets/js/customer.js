// 1. Initialize Database Client
// You must include the Supabase CDN in your home.html <head> for this to work:
// <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hogvdijktcdrhzjoscyt.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

// Store the fetched data locally so filtering and searching is instant
let allRestaurants = [];

// 2. Fetch Data from External Database
async function fetchRestaurants() {
  try {
    // Fetch all restaurants from your table
    const { data: restaurants, error } = await supabase
      .from('restaurants')
      .select('*');

    if (error) throw error;

    // Save to local variable and render
    allRestaurants = restaurants;
    displayRestaurants(allRestaurants);

  } catch (error) {
    console.error("Error fetching database:", error.message);
    document.getElementById("restaurantGrid").innerHTML = "<p>Failed to load restaurants.</p>";
  }
}

// 3. Render the HTML cards dynamically
function displayRestaurants(items) {
  const grid = document.getElementById("restaurantGrid");
  if (!grid) return;

  grid.innerHTML = items.map(rest => `
    <article class="restaurant-card" onclick="window.location.href='restaurants.html?id=${rest.id}'">
      <div class="card-image">
        <img src="${rest.image_url || 'https://via.placeholder.com/300x150?text=Restaurant'}" alt="${rest.name}">
      </div>
      <div class="card-content">
        <h3>${rest.name}</h3>
        <p class="meta">⭐ 4.5 • ${rest.category.charAt(0).toUpperCase() + rest.category.slice(1)}</p>
        <span class="status ${rest.is_open ? 'open' : 'closed'}">
          ${rest.is_open ? 'Open Now' : 'Closed'}
        </span>
      </div>
    </article>
  `).join('');
}

// 4. Initialize page and attach Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  
  // Call the database as soon as the page loads
  fetchRestaurants();

  // Category Filters
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');

      const category = e.target.getAttribute('data-category');
      if (category === 'all') {
        displayRestaurants(allRestaurants);
      } else {
        const filtered = allRestaurants.filter(r => r.category.toLowerCase() === category.toLowerCase());
        displayRestaurants(filtered);
      }
    });
  });

  // Search Bar
  const searchInput = document.getElementById('restaurantSearch');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const value = e.target.value.toLowerCase();
      
      const filtered = allRestaurants.filter(r => 
        r.name.toLowerCase().includes(value) || 
        r.category.toLowerCase().includes(value)
      );
      
      // Visually reset filter buttons
      filterButtons.forEach(b => b.classList.remove('active'));
      document.querySelector('[data-category="all"]').classList.add('active');
      
      displayRestaurants(filtered);
    });
  }
});