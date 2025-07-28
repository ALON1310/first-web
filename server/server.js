// Load core libraries
const express = require('express'); // Web framework to handle HTTP requests and routing
const cors = require('cors'); // Middleware to allow Cross-Origin requests (e.g., from frontend)
const cookieParser = require('cookie-parser'); // Middleware to parse cookies from client
const rateLimit = require('express-rate-limit'); // Middleware to limit number of requests (for security)

// Custom helper functions to persist data to disk
const { loadJSON, saveJSON } = require('./helpers/persist_module');

// Import modular routes — each returns an Express Router
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const cartRoutes = require('./routes/cart');
const purchaseRoutes = require('./routes/purchase');
const productsRoutes = require('./routes/products');
const meRoutes = require('./routes/me');
const logoutRoutes = require('./routes/logout');

const app = express(); // Create an Express app instance

// ======================
// 🛡️ MIDDLEWARE SETUP
// ======================

// Allow frontend to make requests to backend with cookies
app.use(cors({
  origin: 'http://localhost:3000', // The client address allowed to connect
  credentials: true // Required to allow cookies to be sent with requests
}));

// 🛡️ Rate Limiting to prevent abuse and DoS attacks
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Time window = 15 minutes
  max: 100, // Max 100 requests per IP in this window
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter); // Register the limiter as middleware

// 🧠 JSON parsing for POST/PUT body
app.use(express.json({ limit: '5mb' })); // or even '10mb' if needed
app.use(cookieParser()); // Enables parsing cookies from requests

// ======================
// 📦 IN-MEMORY DATA STORE
// (Used like a "fake database")
// ======================
let users = [];
let carts = [];
let purchases = [];
let activityLog = [];

// ======================
// 💾 LOAD DATA FROM DISK
// ======================
const loadAllData = async () => {
  try {
    const loadedUsers = await loadJSON('users.json');
    users.splice(0, users.length, ...loadedUsers); // 💡 keep reference

    const loadedCarts = await loadJSON('carts.json');
    carts.splice(0, carts.length, ...loadedCarts);

    const loadedPurchases = await loadJSON('purchases.json');
    purchases.splice(0, purchases.length, ...loadedPurchases);

    const loadedActivity = await loadJSON('activity.json');
    activityLog.splice(0, activityLog.length, ...loadedActivity);

    console.log('✅ Loaded all data!');
  } catch (err) {
    console.error('Error loading data from disk:', err);
    process.exit(1);
  }
};

// ======================
// 💾 SAVE DATA TO DISK
// ======================
const saveAllData = async () => {
  try {
    await saveJSON('users.json', users);
    await saveJSON('carts.json', carts);
    await saveJSON('purchases.json', purchases);
    await saveJSON('activity.json', activityLog);
  } catch (err) {
    console.error('Error saving data to disk:', err);
  }
};
console.log('activityLog is:', typeof activityLog);
// ======================
// 🛣️ ATTACH ROUTES
// ======================
try {
  // Each route module is passed data it needs and returns an Express Router
  app.use('/api/login', loginRoutes(users, activityLog ));
  app.use('/api/register', registerRoutes(users, activityLog, saveAllData));
  app.use('/api/cart', cartRoutes(carts, activityLog));
  app.use('/api/purchase', purchaseRoutes(purchases, carts, activityLog, saveAllData));
  app.use('/api/products', productsRoutes); // No state needed
  app.use('/api/me', meRoutes(users));
  app.use('/api/logout', logoutRoutes());
} catch (err) {
  console.error('Error attaching routes:', err); // Just in case a route import or setup fails
}

// ======================
// ⚠️ GLOBAL ERROR HANDLER
// ======================
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err); // Log to backend console
  res.status(500).json({ error: 'Internal server error' }); // Generic response
});

app.post('/api/register', (req, res) => {
  console.log('⚠️ Fallback register route hit');
  res.status(500).json({ error: 'Fallback route used. Real route failed to load.' });
});


// ======================
// 🚀 START SERVER
// ======================
loadAllData().then(() => {
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}).catch(err => {
  console.error('Failed to start server:', err);
});
