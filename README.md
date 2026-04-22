# DeliveryApp Architecture

A high-performance, real-time delivery application built with a modern decoupled architecture.

## 🚀 Tech Stack
- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **Backend:** Supabase (PostgreSQL, Auth, Real-time)
- **Deployment:** Vercel
- **Design:** Figma

## 🌟 Key Features
- **Unified Multi-Restaurant Cart:** Aggregate items from different restaurants.
- **Single-Checkout:** One transaction, one fee, one ETA.
- **Smart Discovery:** Filter by cuisine and search to avoid decision paralysis.
- **Role-Based Access:** Unique views for Customers and Restaurant Partners.

## 📁 Architecture
The project uses a **Service-Oriented** structure:
- `assets/js/services/`: Pure logic for communicating with Supabase.
- `assets/js/pages/`: DOM manipulation and event listeners.
- `assets/js/cart.js`: Centralized state for the shopping cart.

## ⚙️ Installation
1. Clone the repo.
2. Update `assets/js/config.js` with your Supabase keys.
3. Serve locally or deploy via Vercel.
