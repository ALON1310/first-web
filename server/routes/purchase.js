const express = require('express');

function purchaseRoutes(purchases, carts, activityLog, saveAllData) {
  const router = express.Router();

  // POST /api/purchase/:username
  router.post('/:username', async (req, res, next) => {
    try {
      const username = req.params.username?.trim();
      const items = req.body.items;

      if (!username || !Array.isArray(items)) {
        return res.status(400).json({ error: 'Invalid username or items' });
      }
      console.log('🧾 Recording purchase for user:', username);

      const cleanedItems = items.map(item => {
        const rawUrl = String(item.imageUrl || item.image || '');
        const validUrl = rawUrl.startsWith('blob:') ? '' : rawUrl;
        const { image, ...rest } = item;
        return { ...rest, imageUrl: validUrl };
      });

      purchases.push({
        username,
        items: cleanedItems,
        timestamp: new Date().toISOString()
      });

      const userCartIndex = carts.findIndex(c => c.username === username);
      if (userCartIndex !== -1) carts.splice(userCartIndex, 1);

      activityLog.push({
        username,
        datetime: new Date().toLocaleString(),
        activity: `Completed purchase of ${cleanedItems.length} items`
      });

      await saveAllData();
      res.status(201).json({ message: 'Purchase recorded successfully' });
    } catch (err) {
      console.error('❌ Failed to record purchase:', err);
      next(err);
    }
  });

  // GET /api/purchase/:username — fetch all purchases for a user
  router.get('/:username', (req, res) => {
    const username = req.params.username?.trim();
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const userPurchases = purchases.filter(p => p.username === username);
    res.status(200).json(userPurchases);
  });

  return router;
}

module.exports = purchaseRoutes;
