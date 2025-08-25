// server/routes/reviews.js
// Read + Write reviews persisted in server/data/reviews.json

const express = require('express');

module.exports = function reviewsRoutes(loadJSON, saveJSON) {
  const router = express.Router();

  // GET /api/reviews?source=ask-the-aspects
  router.get('/', async (req, res) => {
    try {
      const source = (req.query.source || '').toLowerCase();
      const all = await loadJSON('reviews.json'); // expects array
      const filtered = source
        ? all.filter(r => (r.source || '').toLowerCase() === source)
        : all;

      filtered.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
      return res.json(filtered);
    } catch (err) {
      console.error('GET /api/reviews error:', err);
      return res.status(500).json({ error: 'Failed to load reviews' });
    }
  });

  // POST /api/reviews
  // Body: { author, rating(1..5), aspect, title, text, source }
  router.post('/', async (req, res) => {
    try {
      const { author, rating, aspect, title, text, source } = req.body || {};
      const clean = {
        author: String(author || 'Anonymous').trim().slice(0, 80),
        rating: Number(rating),
        aspect: String(aspect || 'General').trim().slice(0, 60),
        title: String(title || '').trim().slice(0, 120),
        text: String(text || '').trim().slice(0, 1200),
        source: String(source || 'ask-the-aspects').trim().toLowerCase().slice(0, 80)
      };

      if (!clean.title || !clean.text) {
        return res.status(400).json({ error: 'Title and text are required.' });
      }
      if (!Number.isFinite(clean.rating) || clean.rating < 1 || clean.rating > 5) {
        return res.status(400).json({ error: 'Rating must be 1–5.' });
      }

      const all = await loadJSON('reviews.json');
      const nowISO = new Date().toISOString().slice(0, 10);
      const created = {
        id: 'r' + Date.now(),
        author: clean.author,
        date: nowISO,
        rating: Math.round(clean.rating),
        aspect: clean.aspect,
        title: clean.title,
        text: clean.text,
        source: clean.source
      };

      all.push(created);
      await saveJSON('reviews.json', all);
      console.log('✅ Review saved:', created);
      return res.status(201).json(created);
    } catch (err) {
      console.error('POST /api/reviews error:', err);
      return res.status(500).json({ error: 'Failed to save review' });
    }
  });

  return router;
};
