# ✈️ Jet Store

A React web app for browsing, selecting, and purchasing private jets. Includes user registration, cart system, cart preview, and (soon) Stripe-based checkout.

---

## 🛠️ Installation

### 📦 Frontend
```bash
cd client
npm install
npm install @stripe/react-stripe-js @stripe/stripe-js
npm start
```

### 🔧 Backend
```bash
cd server
npm install express cors cookie-parser express-rate-limit
```
Make sure your `server.js` file is set up properly, and then run:
```bash
node server.js
```

---

## ✅ TIP: Keep Data Mutable and Shared

When working with Express and saving to disk, make sure that the arrays you update (like `users`) are the **same ones** you passed into the route modules. If you do something like:

```js
users = [...users, newUser]; // ❌ Don't do this
```

You will replace the original array reference, and the route won’t see the update.

Instead, push directly to the existing array:

```js
users.push(newUser); // ✅ Do this
```

This ensures changes stay visible across the app and get saved correctly.

---