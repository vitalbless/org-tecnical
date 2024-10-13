import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { createRequest } from '../api/requestApi';

const CreateRequestPage = () => {
  const { user } = useContext(AuthContext);
  const [orgTechType, setOrgTechType] = useState('');
  const [orgTechModel, setOrgTechModel] = useState('');
  const [problemDescryption, setProblemDescryption] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRequest(
        { orgTechType, orgTechModel, problemDescryption },
        user.token
      );
      alert('Заявка успешно создана');
    } catch (error) {
      console.error('Ошибка при создании заявки:', error);
    }
  };

  return (
    <div>
      <h2>Создание новой заявки</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Тип оргтехники'
          value={orgTechType}
          onChange={(e) => setOrgTechType(e.target.value)}
          required
        />
        <input
          type='text'
          placeholder='Модель оргтехники'
          value={orgTechModel}
          onChange={(e) => setOrgTechModel(e.target.value)}
          required
        />
        <textarea
          placeholder='Описание проблемы'
          value={problemDescryption}
          onChange={(e) => setProblemDescryption(e.target.value)}
          required
        ></textarea>
        <button type='submit'>Создать заявку</button>
      </form>
    </div>
  );
};

export default CreateRequestPage;
