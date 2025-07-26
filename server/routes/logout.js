const express = require('express');

function logoutRoutes(activityLog) {
  const router = express.Router();

  router.post('/', (req, res) => {
    const { username } = req.body;
    activityLog.push({
      username,
      datetime: new Date().toLocaleString(),
      activity: 'Logged out'
    });
    res.status(200).json({ message: 'Logged out' });
  });

  return router;
}

module.exports = logoutRoutes;
