const express = require('express');

function loginRoutes(users, activityLog) {
  const router = express.Router();

  router.post('/', (req, res) => {
  const { username } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });

  activityLog.push({
    username,
    datetime: new Date().toLocaleString(),
    activity: 'Logged in'
  });

  // 🛠️ Send exactly what the frontend expects:
  res.status(200).json({
    username: user.username,
    email: user.email
  });
});


  return router;
}

module.exports = loginRoutes;
