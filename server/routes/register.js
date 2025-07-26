// ✅ register.js (server/routes/register.js)
const express = require('express');

module.exports = (users, activityLog, saveAllData) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    if (users.find(u => u.username === username)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    const newUser = { username, password };
    users.push(newUser);
    activityLog.push({ username, activity: 'register', datetime: new Date().toISOString() });
    await saveAllData();

    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  });

  return router;
};
