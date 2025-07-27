// ✅ cart.js (server/routes/cart.js)
const express = require('express');

module.exports = (carts, activityLog, saveAllData) => {
  const router = express.Router();

  // POST: Save full cart (replace all items)
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

  // GET: Fetch cart items for user
  router.get('/:username', (req, res) => {
    const username = req.params.username?.trim();
    const cart = carts.find(c => c.username === username);
    res.status(200).json(cart?.items || []);
  });

  // DELETE: Remove a single item from user's cart
  router.delete('/:username/:jetId', async (req, res) => {
    const username = req.params.username?.trim();
    const jetId = parseInt(req.params.jetId, 10);

    const cart = carts.find(c => c.username === username);
    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    const index = cart.items.findIndex(item => item.id === jetId);
    if (index === -1) {
      return res.status(404).json({ error: 'Item not found in cart' });
    }

    const removed = cart.items.splice(index, 1)[0];
    if (activityLog && removed) {
      activityLog.push({
        datetime: new Date().toLocaleString(),
        username,
        activity: `Removed from cart: ${removed.name}`
      });
    }

    await saveAllData();
    res.status(200).json({ message: 'Item removed', updatedCart: cart.items });
  });

  return router;
};
