# 🍽️ Canteen Pre-Order System

A real-time canteen pre-ordering and queue management system that eliminates physical waiting lines. Students order ahead, pick a convenient time slot, and get a token — while merchants manage the entire order pipeline from a live dashboard.

Built for SOCF 2.0 by Obnoxious - Chaitanya Agarwal (24BAI10341).

---

## 🚀 The Problem

Canteen queues during breaks are chaotic — students wait in long lines with no visibility into order status, and merchants juggle walk-in orders with no structured way to manage load. This project fixes that by moving ordering online and giving both sides a real-time view of the queue.

---

## ✨ Key Features

### For Students
- Browse the menu and add items to an order
- Select a pickup time slot from the **next 6 available slots**, calculated dynamically based on item prep time
- Get a **sequential token number** on order confirmation
- Track order status (Placed → Preparing → Ready → Collected) live, with **zero manual refresh**

### For Merchants
- Live dashboard showing order counts by status: **Preparing**, **Ready**, **Collected**
- Full list of incoming orders with token numbers and item details
- One-click order status updates that instantly reflect on the student's screen

---

## 🎯 How It Works

### 1. Smart Slot Allocation
- Each hour is divided into **10-minute slots**
- Each slot has a **capacity of 10 orders**
- When a student starts an order, the app calculates the earliest slot they could realistically be served in (current time + item prep time), then shows the **next 6 valid slots** with availability
- This prevents overloading the kitchen at any single point in time

### 2. Race-Condition-Free Token Generation
- Tokens are generated using a **counter document** in Firestore
- Token creation runs inside a **Firestore Transaction**, so if two students hit "place order" at the exact same millisecond, Firestore guarantees they still get two distinct, sequential token numbers — no duplicates, no lost updates

### 3. Real-Time Sync (No Polling, No Refresh)
- Both the Student and Merchant portals subscribe to Firestore documents using **`onSnapshot`**
- When a merchant updates an order's status, that change is pushed live to the exact student tracking that token
- The merchant's dashboard counts (preparing/ready/collected) update live as orders move through the pipeline

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Database | Firebase Firestore |
| Auth | Firebase Authentication |
| Real-time sync | Firestore `onSnapshot` listeners |
| Concurrency control | Firestore Transactions |
| Version control | Git |

### React Concepts Used
- Component-based architecture (Student Portal, Merchant Dashboard, Menu, OrderCard, etc.)
- Props for passing order/menu data between components
- State management with `useState`
- Side effects & real-time subscriptions with `useEffect`
- Conditional rendering (order status views, slot availability, dashboard states)

---

## 🗂️ Firestore Data Structure (Overview)

```
menu/
  {itemId} → { name, price, prepTime, ... }

orders/
  {tokenId} → { items, status, slot, studentId, createdAt, ... }

counters/
  tokenCounter → { current: <number> }
```

- `orders/{tokenId}` is the single source of truth both portals listen to
- `counters/tokenCounter` is only ever updated inside a transaction to guarantee sequential, unique token numbers

---

## 📸 Screenshots / Demo
*(Add screenshots or a demo GIF/link here)*

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- A Firebase project with **Firestore** and **Authentication** enabled

### Installation

```bash
# Clone the repo
git clone <your-repo-url>
cd canteen-pre-order-system

# Install dependencies
npm install

# Add your Firebase config
# Create a .env file with your Firebase project credentials
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...

# Run the dev server
npm run dev
```

---

## 🔮 Future Improvements
- Payment gateway integration
- Order history & analytics for merchants
- Push notifications when order is ready
- Multi-canteen / multi-vendor support

---
