import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { updateRequest, fetchRequests } from '../api/requestApi';

const UpdateRequestPage = ({ requestId }) => {
  const { user } = useContext(AuthContext);
  const [orgTechType, setOrgTechType] = useState('');
  const [orgTechModel, setOrgTechModel] = useState('');
  const [problemDescryption, setProblemDescryption] = useState('');

  useEffect(() => {
    const fetchRequestData = async () => {
      try {
        const response = await fetchRequests(user.token);
        const request = response.data.find((r) => r.id === requestId);
        if (request) {
          setOrgTechType(request.orgTechType);
          setOrgTechModel(request.orgTechModel);
          setProblemDescryption(request.problemDescryption);
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных заявки:', error);
      }
    };
    fetchRequestData();
  }, [requestId, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateRequest(
        requestId,
        { orgTechType, orgTechModel, problemDescryption },
        user.token
      );
      alert('Заявка успешно обновлена');
    } catch (error) {
      console.error('Ошибка при обновлении заявки:', error);
    }
  };

  return (
    <div>
      <h2>Обновление заявки</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Тип оргтехники'
          value={orgTechType}
          onChange={(e) => setOrgTechType(e.target.value)}
        />
        <input
          type='text'
          placeholder='Модель оргтехники'
          value={orgTechModel}
          onChange={(e) => setOrgTechModel(e.target.value)}
        />
        <textarea
          placeholder='Описание проблемы'
          value={problemDescryption}
          onChange={(e) => setProblemDescryption(e.target.value)}
        ></textarea>
        <button type='submit'>Обновить заявку</button>
      </form>
    </div>
  );
};

export default UpdateRequestPage;
