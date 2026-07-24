# SkyMart 🛍️

A full-stack style e-commerce web app built with React, Tailwind CSS, and Context API — featuring authentication, product browsing, wishlist, and cart, all persisted with localStorage.

## Features

- **Authentication** — Register/Login with form validation (react-hook-form), protected routes
- **Product Catalog** — Products pulled live from [DummyJSON](https://dummyjson.com/) API, mapped across 6 categories: Electronics, Clothings, Furniture, Home, Sports, Accessories
- **Search, Filter & Sort** — Real-time search, category filters, sort by price/rating
- **Product Details** — Dedicated page per product with related products from the same category
- **Wishlist** — Add/remove products, persists per user
- **Cart** — Add/remove items, adjust quantity, subtotal/shipping/total calculation, checkout flow
- **Profile** — Editable user profile (name, bio, phone, location, avatar)
- **Toast Notifications** — Feedback on wishlist/cart actions and checkout (react-toastify)
- **Responsive Design** — Mobile-friendly navbar with hamburger menu
- **Persistent State** — All user data (auth, cart, wishlist, orders) stored in localStorage

## Tech Stack

- **React** (Vite)
- **Tailwind CSS**
- **React Router** — routing & protected layouts
- **Context API** — Auth state, Products state
- **react-hook-form** — form validation
- **react-toastify** — notifications
- **lucide-react** — icons
- **Axios** — API requests

## Project Structure

```
src/
├── assets/          # Images and static assets
├── components/      # Reusable UI components (Navbar, Footer, ProductCard, etc.)
├── context/          # AuthContext, ProductsContext
├── layout/           # PublicLayout, AuthLayout, ProtectedLayout, MainLayout
├── pages/            # Login, Register, Home, Products, ProductDetails, Cart, Wishlist, Profile, About
├── routes/           # AppRoutes.jsx (route definitions)
├── utils/            # Helper functions (generateId, etc.)
├── data/             # Local product data (if used)
└── main.jsx
```

## Getting Started

```bash
# Clone the repo
git clone https://github.com/Blaezy/skymart.git
cd skymart

# Install dependencies
npm install

# Run locally
npm run dev

# Build for production
npm run build
```

## Deployment

Deployed on [Vercel](https://vercel.com). Includes a `vercel.json` rewrite rule to support client-side routing on refresh:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## Notes

- Product data is fetched from DummyJSON's category endpoints and re-mapped into custom categories (see `categoryMap` in `Products.jsx`/`ProductsContext.jsx`).
- Since this is a learning/portfolio project (not production), user data lives in `localStorage` rather than a real backend/database.

## Author

Built by [Blaezy](https://github.com/Blaezy) as part of ongoing full-stack development practice (Sheryians Coding School Cohort 3.0).