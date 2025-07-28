# ✈️ Jet Store

A full-stack React + Node.js web app for browsing, selecting, and purchasing private jets.  
Includes user registration, login, shopping cart, purchase history, and an admin panel with image upload and product management.  
Stripe checkout coming soon!

---

## 🧱 Tech Stack

- **Frontend:** React, CSS, localStorage
- **Backend:** Node.js, Express, file-based JSON persistence
- **Image Handling:** Base64-encoded image uploads from Admin panel
- **User State:** Cookie-based session tracking
- **Admin Features:** Add/remove products, filter activity logs
- **Upcoming:** Stripe-based secure payments

---

## 🛠️ Installation & Running Locally

### 📦 Frontend Setup
```bash
cd client
npm install
npm install @stripe/react-stripe-js @stripe/stripe-js
npm start


### 📦 backend Setup
cd server
npm install express cors cookie-parser express-rate-limit
