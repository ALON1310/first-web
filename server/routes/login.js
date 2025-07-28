const express = require('express');

function loginRoutes(users, activityLog) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    console.log(`Login attempt: ${username}, password: ${password}`);
    console.log('Loaded users:', users);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    activityLog.push({
      username,
      datetime: new Date().toLocaleString(),
      activity: 'Logged in'
    });

    res.status(200).json({
      username: user.username,
      email: user.email
    });
  });

  return router;
}

module.exports = loginRoutes;
