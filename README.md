# 🛒 PandaShop — AI-Powered Multi-Vendor E-Commerce Platform

[![React](https://img.shields.io/badge/React-18-blue)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-purple)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-blue)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-2-purple)](https://redux-toolkit.js.org/)

## Overview

**PandaShop** is a full-featured multi-vendor e-commerce web application built with React 18, Vite, and Tailwind CSS.
It implements an advanced **AI-powered Shopping Assistant** alongside complete user authentication, product management, order processing, event listings, and role-based dashboards for **Users**, **Shop Owners**, and **Administrators**.

---

## 📺 Live Demo

🔗 [https://panda-shop-webapps.netlify.app/](https://panda-shop-webapps.netlify.app/)

---

## 🔗 Repositories

- **Client (This Repo):** [Frontend Repository](https://github.com/TanvirCou/panda-shop)
- **Server:** [Backend Repository](https://github.com/TanvirCou/panda-shop-server)

---

## 👥 Demo Accounts

For testing the application with different roles:

| Role | Email | Password |
|---|---|---|
| **Standard User** | `kazi.tanvir.cou@gmail.com` | `tanvir1234` |
| **Shop Owner** | `kta516930@gmail.com` | `tanvir1234` |
| **Administrator** | `ahmed.tnvr999@gmail.com` | `tanvir1234` |

---

## 🚀 Features

### 🔐 Authentication & Authorization

- **User Registration & Login**

  - **Secure Authentication:** Implements both **Access Token** and **Refresh Token** for seamless and secure session management.

  - **Email/Password Authentication:** Full registration and login with password reset via email. All transactional emails are handled through a configured SMTP service.

  - **Account Activation:** Newly registered users (both Users and Shop Owners) receive an **activation email** with a verification link before gaining access.

- **User Types**
  - **Normal User** — Browse, purchase, write reviews, manage orders
  - **Shop Owner** — Manage shop, products, events, orders, and withdrawals
  - **Admin** — Oversee all users, shops, products, orders, and withdrawals

---

### 🏪 Shop Owner Features

- **Profile & Shop Management**

  - Update shop details, avatar, and information
  - Customizable shop profile

- **Product Management**

  - **Add New Products** — Create products with images, pricing, stock, and category
  - **Manage Products** — Edit, delete and search products
  - **Stock Management** — Track and update product inventory

- **Event Management**

  - Create and manage **time-limited sale events** with start/end dates and discounted prices
  - List, edit, and delete events from the shop dashboard

- **Order Management**

  - View all incoming orders per shop
  - Update order status: `Processing → Transferred to Delivery Partner → Shipping → Received → On the Way → Delivered`
  - Process and manage **refund requests**

- **Financials**
  - View available balance from completed deliveries
  - Submit **withdrawal requests** to the admin
  - Track withdrawal history

---

### 🛍️ Shopping Experience

- **✨ AI Shopping Assistant (New)**
  - Advanced conversational semantic search powered by Google's **Gemini AI**.
  - Analyzes natural language constraints (e.g. "Gaming laptops under $1000") and identifies user intent.
  - Utilizes backend **In-Memory Cosine Similarity** mathematics against vector embeddings to rank and return the most semantically relevant products.
  - Beautiful, dynamic split-component interface with loading states and intent analysis chips.

- **Home Page**
  - **Product Search** — Search with keyword filtering
  - **Category Navigation** — Filter products by category
  - **Best Selling Products** — Products showcased by sales volume
  - **Events Section** — Active sales events with countdown timers

- **Product & Event Detail Pages**
  - Full product info: images, description, pricing, stock
  - Quantity selector with live stock awareness
  - **Add to Cart / Wishlist** toggle
  - **Review System:** Only purchasers can submit reviews; edit/delete own reviews  

- **FAQ Pages**
  - Common questions answered

- **Shops Directory**
  - Browse all registered shops
  - Visit individual shop pages with product listings

---

### 🛒 Cart & Checkout

- **Shopping Cart**

  - Add, update quantity, remove items
  - Cart persisted via Redux state
  - **Wishlist** — Save products for later

- **Checkout Flow**
  - Order summary with selected items
  - Delivery address management
  - Review and confirm order before submission

---

### 📦 Order Management

- **Order Confirmation**

  - Success page post-checkout

- **Order History**

  - View all past and current orders
  - **Write Reviews** from completed orders
  - **Cancel Orders** (where applicable)
  - **Refund Requests** — Submit refunds for delivered orders

- **Order Status Tracking**

  - Users track status updates in real-time
  - Shop owners update status from their dashboard

---

### 🛡️ Admin Dashboard

- **User Management** — View and manage all registered users
- **Shop Management** — View, approve, or remove shops
- **Product Management** — View all products across vendors
- **Order Management** — View all orders platform-wide
- **Event Management** — Oversee all active events
- **Withdrawal Management** — Approve or reject shop withdrawal requests
- **Dashboard Analytics** — Revenue charts and platform KPIs

---

## 📸 Screenshots

### Home Page

![Home Page Screenshot](https://i.postimg.cc/KvDCp69D/panda-shop-homepage.jpg)

### AI Shopping Assistant

![AI Shopping Assistant Screenshot](https://i.postimg.cc/J0y82GhM/ai-assistant-shopping.jpg)

### Product Details

![Product Details Screenshot](https://i.postimg.cc/KYxPqWHq/panda-shop-product-details.jpg)

### Shop Dashboard

![Shop Dashboard Screenshot](https://i.postimg.cc/QC91KZFt/panda-shop-seller.jpg)

### Admin Dashboard

![Admin Dashboard Screenshot](https://i.postimg.cc/jjxfQ7D4/panda-shop-admin.jpg)

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | React 18.2.0 (Vite 5.0.8) |
| **Styling** | Tailwind CSS 3.4.0 + DaisyUI 4.6.0 |
| **State Management** | React-Redux 9.0.4 |
| **Routing** | React Router DOM v6 6.21.1 |
| **HTTP Client** | Axios 1.6.4 |
| **Animations** | Lottie (react-lottie 1.2.4) |
| **Charts** | Recharts 3.8.0 |
| **Notifications** | React Toastify 9.1.3 |
| **Icons** | React Icons 4.12.0 |

---

## 📁 Project Structure (Important Files)

**index.html** — Main HTML entry file  
**vite.config.js** — Vite configuration  
**src/main.jsx** — React entry point  
**src/App.jsx** — Main app component with routing logic  
**src/index.css** — Global CSS file  
**src/components/** — UI components  
**src/hooks/** — Custom React hooks  
**src/pages/** — Core page-level components corresponding to application routes  
**src/redux/** — Redux Toolkit store configuration and feature-based state management  
**src/Routes/** — Custom route modules for protected and role-based navigation  
**src/static/** — Static configuration data and dummy constants  
**src/assets/** and **public/** — Static assets including images, icons, and Lottie animations

---

## 📦 Installation & Usage

Follow these steps to set up the project locally:

```bash
# 1️⃣ Clone the repository
git clone <repo-url>

# 2️⃣ Navigate into the project directory
cd <project-name>

# 3️⃣ Install dependencies
npm install       # or yarn install / pnpm install

# 4️⃣ Run the application locally
npm run dev       # or yarn dev / pnpm dev
```

> **Note:** The client requires the backend server to be running. See the [Backend Repository](https://github.com/TanvirCou/panda-shop-server) README for setup instructions.

---

## 🔮 Future Enhancements

- **Real Payment Gateway Integration** — Integrate Stripe, SSLCommerz, or PayPal for real transactions
- **AI Vendor Assistant** — Generative AI tool to help sellers auto-generate SEO-optimized product descriptions and titles
- **Product Comparison** — Side-by-side comparison of multiple products
- **Live Chat Support** — Real-time communication between buyers and sellers
- **Multi-language Support (i18n)** — Support for Bangla, English, and other languages
- **Push Notifications** — Order updates and promotional alerts
- **Mobile App** — React Native companion application
- **Light/Dark Mode Theme** — Support for user-controlled theme switching

---

## 📄 License

This project is for educational and portfolio purposes.