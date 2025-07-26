// ✅ me.js (server/routes/me.js)
const express = require('express');

module.exports = (users) => {
  const router = express.Router();

  router.get('/', (req, res) => {
    const { username } = req.cookies || {};
    const user = users.find(u => u.username === username);

    if (!user) return res.status(401).json({ error: 'Not logged in' });

    const { password, ...userWithoutPassword } = user;
    res.status(200).json(userWithoutPassword);
  });

  return router;
};
