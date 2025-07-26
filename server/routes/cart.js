// ✅ cart.js (server/routes/cart.js)
const express = require('express');

module.exports = (carts, saveAllData) => {
  const router = express.Router();

  router.post('/:username', async (req, res) => {
    const username = req.params.username?.trim();
    const items = req.body.items;

    if (!username || !Array.isArray(items)) {
      return res.status(400).json({ error: 'Invalid input' });
    }

    const index = carts.findIndex(c => c.username === username);
    if (index !== -1) {
      carts[index].items = items;
    } else {
      carts.push({ username, items });
    }

    await saveAllData();
    res.status(200).json({ message: 'Cart saved' });
  });

  router.get('/:username', (req, res) => {
    const username = req.params.username?.trim();
    const cart = carts.find(c => c.username === username);
    res.status(200).json(cart?.items || []);
  });

  return router;
};