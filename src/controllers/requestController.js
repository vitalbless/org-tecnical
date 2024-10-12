const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
    const updatedRequest = await prisma.request.update({
      where: { id: Number(id) },
      data: { requestStatus },
    });
    res.json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка обновления статуса заявки' });
  }
};

const assignMasterToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { masterID } = req.body;

    const updatedRequest = await prisma.request.update({
      where: { requestID: parseInt(id) },
      data: { masterID },
    });

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при назначении мастера на заявку' });
  }
};

const generateCompletedRequestsReport = async (req, res) => {
  try {
    const completedRequests = await prisma.request.findMany({
      where: { requestStatus: 'завершена' },
      include: { master: true, client: true },
    });

    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet('Completed Requests Report');

    worksheet.columns = [
      { header: 'ID Заявки', key: 'requestID', width: 10 },
      { header: 'Дата добавления', key: 'startDate', width: 15 },
      { header: 'Тип оргтехники', key: 'orgTechType', width: 20 },
      { header: 'Модель оргтехники', key: 'orgTechModel', width: 25 },
      { header: 'Описание проблемы', key: 'problemDescryption', width: 30 },
      { header: 'Статус заявки', key: 'requestStatus', width: 20 },
      { header: 'Дата завершения', key: 'completionDate', width: 15 },
      { header: 'ФИО мастера', key: 'masterName', width: 25 },
      { header: 'ФИО клиента', key: 'clientName', width: 25 },
    ];

    completedRequests.forEach((request) => {
      worksheet.addRow({
        requestID: request.requestID,
        startDate: request.startDate,
        orgTechType: request.orgTechType,
        orgTechModel: request.orgTechModel,
        problemDescryption: request.problemDescryption,
        requestStatus: request.requestStatus,
        completionDate: request.completionDate,
        masterName: request.master ? request.master.fio : 'Не назначен',
        clientName: request.client ? request.client.fio : 'Неизвестен',
      });
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=CompletedRequestsReport.xlsx'
    );
    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании отчета' });
  }
};
module.exports = {
  createRequest,
  updateRequestStatus,
  assignMasterToRequest,
  generateCompletedRequestsReport,
};
