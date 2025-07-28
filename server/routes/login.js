// ✅ login.js (server/routes/login.js)
const express = require('express');

module.exports = (users, activityLog) => {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const normalizedUsername = username.toLowerCase().trim();

    const user = users.find(
      u => u.username.toLowerCase().trim() === normalizedUsername && u.password === password
    );

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // ✅ שמירת עוגייה (cookie) לזיהוי המשתמש בדפדפן
    res.cookie('skyUser', normalizedUsername, {
      httpOnly: false,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ימים
      sameSite: 'Lax'
    });

    // ✅ הוספת רישום לפעילות
    activityLog.push({
      username: normalizedUsername,
      activity: 'login',
      datetime: new Date().toISOString()
    });

    // ✅ שליחת תשובה ללא הסיסמה
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    res.status(200).json(userWithoutPassword);
  });

  return router;
};
