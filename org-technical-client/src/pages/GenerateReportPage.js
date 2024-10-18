import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { generateReport } from '../api/requestApi';

const GenerateReportPage = () => {
  const { user } = useContext(AuthContext);
  const [reportStatus, setReportStatus] = useState('');


  const handleGenerateReport = async () => {
    try {
      await generateReport(user.token);
      setReportStatus('Отчёт успешно сохранен на ваш компьютер.');

    } catch (error) {
      setReportStatus('Ошибка при создании отчёта.');
      console.error('Ошибка при создании отчёта:', error);
    }
  };

  return (
    <div>
      <h2>Создание отчёта по выполненным заявкам</h2>
      <button onClick={handleGenerateReport}>Создать отчёт</button>
      {reportStatus && <p>{reportStatus}</p>}
    </div>
  );
};

export default GenerateReportPage;
