const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addComment = async (req, res) => {
  try {
    if (req.user.type !== 'Мастер') {
      return res.status(403).json({
        error: 'Доступ запрещен. Только мастера могут добавлять комментарии.',
      });
    }

    const { message, requestId } = req.body;
    const masterId = req.user.userId;

    const newComment = await prisma.comment.create({
      data: {
        message,
        masterId,
        requestId,
      },
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка добавления комментария' });
  }
};

const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { message } = req.body;

    const comment = await prisma.comment.findUnique({
      where: { id: Number(id) },
    });

    if (!comment || comment.masterId !== req.user.userId) {
      return res.status(403).json({
        error:
          'Доступ запрещен. Вы можете редактировать только свои комментарии.',
      });
    }

    const updatedComment = await prisma.comment.update({
      where: { id: Number(id) },
      data: { message },
    });

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления комментария' });
  }
};
module.exports = {
  addComment,
  updateComment,
};
