import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../contexts/AuthContext';
import { updateRequest, updateRequestStatus, assignMasterToRequest } from '../api/requestApi';

const EditRequestModal = ({ request, onClose, onUpdate }) => {
  const { user } = useContext(AuthContext);
  const [orgTechType, setOrgTechType] = useState(request.orgTechType || '');
  const [orgTechModel, setOrgTechModel] = useState(request.orgTechModel || '');
  const [problemDescryption, setProblemDescryption] = useState(request.problemDescryption || '');
  const [requestStatus, setRequestStatus] = useState(request.requestStatus || '');
  const [master, setMaster] = useState(request.master || '');

  useEffect(() => {
    if (request) {
      setOrgTechType(request.orgTechType);
      setOrgTechModel(request.orgTechModel);
      setProblemDescryption(request.problemDescryption);
      setRequestStatus(request.requestStatus);
      setMaster(request.master);
    }
  }, [request]);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updateData = { orgTechType, orgTechModel, problemDescryption };

      if (user.type === 'Менеджер') {
        const masterId = parseInt(master, 10);
        await updateRequestStatus(request.id, { requestStatus }, user.token);
        await assignMasterToRequest(request.id, masterId, user.token);
      }

      await updateRequest(request.id, updateData, user.token);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Ошибка при обновлении заявки:', error);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Редактировать заявку</h2>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Тип оргтехники"
            value={orgTechType}
            onChange={(e) => setOrgTechType(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Модель оргтехники"
            value={orgTechModel}
            onChange={(e) => setOrgTechModel(e.target.value)}
            required
          />
          <input
            placeholder="Описание проблемы"
            value={problemDescryption}
            onChange={(e) => setProblemDescryption(e.target.value)}
            required
          ></input>
  
          {user.type === 'Менеджер' && (
            <>
              <select
                value={requestStatus}
                onChange={(e) => setRequestStatus(e.target.value)}
              >
                <option value="Новая">Новая</option>
                <option value="В процессе">В процессе</option>
                <option value="Выполнено">Выполнено</option>
              </select>
              <input
                type="number"
                placeholder="Мастер"
                value={master}
                onChange={(e) => setMaster(e.target.value)}
              />
            </>
          )}

          <button type="submit">Сохранить изменения</button>
          <button type="button" onClick={onClose}>
            Отмена
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRequestModal;
