const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const createRequest = async (req, res) => {
  try {
    const { orgTechType, orgTechModel, problemDescryption } = req.body;
    const clientId = req.user.userId;
    const newRequest = await prisma.request.create({
      data: {
        orgTechType,
        orgTechModel,
        problemDescryption,
        requestStatus: 'Новая заявка',
        clientId,
      },
    });
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка создания заявки' });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { requestStatus } = req.body;
    if ((req.user.type !== 'Мастер') & (req.user.type !== 'Менеджер')) {
      return res.status(403).json({
        error: 'Доступ запрещен.',
      });
    }
    const updatedRequest = await prisma.request.update({
      where: { id: Number(id) },
      data: { requestStatus },
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления статуса заявки' });
  }
};
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { orgTechType, orgTechModel, problemDescryption } = req.body;
    if ((req.user.type !== 'Мастер') & (req.user.type !== 'Менеджер')) {
      return res.status(403).json({
        error: 'Доступ запрещен.',
      });
    }
    const updatedRequest = await prisma.request.update({
      where: { id: Number(id) },
      data: { orgTechType, orgTechModel, problemDescryption },
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления статуса заявки' });
  }
};

const assignMasterToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { masterId } = req.body;

    const updatedRequest = await prisma.request.update({
      where: { id: Number(id) },
      data: { masterId },
    });
    console.log(updatedRequest);
    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при назначении мастера на заявку' });
  }
};

const generateReport = async (req, res) => {
  try {
    // Получаем выполненные заявки из базы данных
    const completedRequests = await prisma.request.findMany({
      where: { requestStatus: 'Отложено' },
    });

    if (!completedRequests || completedRequests.length === 0) {
      return res
        .status(404)
        .json({ error: 'Нет выполненных заявок для отчета' });
    }

    // Создаем новый workbook и worksheet с помощью ExcelJS
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Completed Requests');

    // Добавляем заголовки колонок
    worksheet.columns = [
      { header: 'ID заявки', key: 'id', width: 10 },
      { header: 'Дата начала', key: 'startDate', width: 15 },
      { header: 'Тип оргтехники', key: 'orgTechType', width: 20 },
      { header: 'Модель оргтехники', key: 'orgTechModel', width: 20 },
      { header: 'Описание проблемы', key: 'problemDescryption', width: 30 },
      { header: 'Дата завершения', key: 'completionDate', width: 15 },
      { header: 'Статус заявки', key: 'requestStatus', width: 15 },
      { header: 'ID клиента', key: 'clientId', width: 10 },
      { header: 'ID мастера', key: 'masterId', width: 10 },
    ];

    // Заполняем строки данными выполненных заявок
    completedRequests.forEach((request) => {
      worksheet.addRow({
        id: request.id,
        startDate: request.startDate,
        orgTechType: request.orgTechType,
        orgTechModel: request.orgTechModel,
        problemDescryption: request.problemDescryption,
        completionDate: request.completionDate,
        requestStatus: request.requestStatus,
        clientId: request.clientId,
        masterId: request.masterId,
      });
    });

    // Определяем путь для сохранения файла
    const reportsDir = path.join(__dirname, '..', 'reports');

    // Создаем директорию reports, если она не существует
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    const filePath = path.join(reportsDir, 'CompletedRequestsReport.xlsx');

    // Сохраняем отчет в файл
    await workbook.xlsx.writeFile(filePath);

    res.json({ message: 'Отчет успешно создан', filePath: filePath });
  } catch (error) {
    console.error('Ошибка при создании отчета:', error);
    res.status(500).json({ error: 'Ошибка при создании отчета' });
  }
};

module.exports = {
  createRequest,
  updateRequestStatus,
  updateRequest,
  assignMasterToRequest,
  generateReport,
};
