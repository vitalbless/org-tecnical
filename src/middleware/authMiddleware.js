const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(401)
      .json({ error: 'Нет токена авторизации, доступ запрещен' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Недействительный токен, доступ запрещен' });
  }
};

const masterRoleMiddleware = (req, res, next) => {
  if (req.user.type !== 'Мастер') {
    return res.status(403).json({
      error: 'Доступ запрещен. Только мастера могут выполнять это действие.',
    });
  }
  next();
};

module.exports = { authMiddleware, masterRoleMiddleware };
