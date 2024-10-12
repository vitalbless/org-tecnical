const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();

exports.registerUser = async (req, res) => {
  try {
    const { fio, phone, login, password, type } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { fio, phone, login, password: hashedPassword, type },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка регистрации пользователя' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await prisma.user.findUnique({ where: { login } });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { userId: user.id, type: user.type },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Неверный логин или пароль' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Ошибка авторизации' });
  }
};
