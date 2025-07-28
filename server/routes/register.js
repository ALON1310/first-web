// ✅ register.js (server/routes/register.js)
const express = require('express');

module.exports = (users, activityLog, saveAllData) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    // 🔒 בדיקת שדות חובה
    if (!username || !password || !email) {
      return res.status(400).json({ error: 'Username, password, and email are required' });
    }

    const normalizedUsername = username.toLowerCase().trim();
    console.log('Trying to register:', normalizedUsername);
    console.log('Current users:', users.map(u => u.username));

    // ❌ מניעת שימוש בשם Admin
    if (normalizedUsername === 'admin') {
      return res.status(403).json({ error: 'The username "admin" is reserved' });
    }

    // ❌ בדיקה אם המשתמש כבר קיים
    if (users.find(u => u.username.toLowerCase().trim() === normalizedUsername)) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // ✅ יצירת משתמש חדש עם אימייל
    const newUser = {
      username: normalizedUsername,
      password,
      email: email.trim()
    };

    console.log('New user to save:', newUser);

    users.push(newUser);
    activityLog.push({
      username: normalizedUsername,
      activity: 'register',
      datetime: new Date().toISOString()
    });

    await saveAllData();

    // ✅ שליחת המשתמש ללא סיסמה
    const userWithoutPassword = { ...newUser };
    delete userWithoutPassword.password;
    res.status(201).json(userWithoutPassword);
  });

  return router;
};
