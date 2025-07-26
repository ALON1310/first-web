// ✅ products.js (server/routes/products.js)
const express = require('express');

module.exports = (storeItems) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    res.status(200).json(storeItems);
  });

  return router;
};