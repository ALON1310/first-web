const express = require('express');
const router = express.Router();
const { loadJSON, saveJSON } = require('../helpers/persist_module');
const path = require('path');

const jetsPath = path.join(__dirname, '../data/jets.json');

// POST /api/products
router.post('/', async (req, res) => {
  const newJet = req.body;
  newJet.id = Date.now();
  const rawUrl = String(newJet.imageUrl || newJet.image || '');
  newJet.imageUrl = rawUrl.startsWith('blob:') ? '' : rawUrl;
  newJet.description = newJet.description || 'Added via admin panel';
  delete newJet.image; // Remove redundant 'image' field if exists


  console.log('📥 Received new product:', newJet); // ← Add this!

  if (!newJet.name || !newJet.price || (!newJet.image && !newJet.imageUrl)) {
    console.log('❌ Invalid product data:', newJet);
    return res.status(400).json({ error: 'Invalid product data' });
  }

  try {
    const jets = await loadJSON(jetsPath);
    jets.push(newJet);
    await saveJSON(jetsPath, jets);
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    console.error('Error saving new product:', err);
    res.status(500).json({ error: 'Failed to save product' });
  }
});

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const jets = await loadJSON(jetsPath);
    res.json(jets);
  } catch (err) {
    console.error('Error loading products:', err);
    res.status(500).json({ error: 'Failed to load products' });
  }
});


module.exports = router;
