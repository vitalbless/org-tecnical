const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.addComment = async (req, res) => {
  try {
    const { message, masterId, requestId } = req.body;
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

exports.getCommentsByRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const comments = await prisma.comment.findMany({
      where: { requestId: Number(requestId) },
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка получения комментариев' });
  }
};
