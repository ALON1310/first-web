// ✅ register.js (server/routes/register.js)
const express = require('express');

module.exports = (users, activityLog, saveAllData) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    // 🔒 Required fields check
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    const normalizedUsername = username.toLowerCase().trim();
    console.log('Trying to register:', normalizedUsername);
    console.log('Current users:', users.map(u => u.username));

    // ❌ Prevent using "admin"
    if (normalizedUsername === 'admin') {
      return res.status(403).json({ error: 'The username "admin" is reserved' });
    }

    // ❌ Check if user already exists
    if (users.find(u => u.username.toLowerCase().trim() === normalizedUsername)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // ✅ Create new user with email
    const newUser = {
      username: normalizedUsername,
      password,
      email: email.trim()
    };

    users.push(newUser);
    activityLog.push({
      username: normalizedUsername,
      activity: 'register',
      datetime: new Date().toISOString()
    });

    await saveAllData();

    // ✅ Set cookie with username (valid for 7 days)
    res.cookie('skyUser', normalizedUsername, {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'Lax'
    });

    // ✅ Send back user object without password
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  });

  return router;
};
