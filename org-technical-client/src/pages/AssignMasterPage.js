import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { assignMasterToRequest } from '../api/requestApi';

const AssignMasterPage = ({ requestId }) => {
  const { user } = useContext(AuthContext);
  const [masterId, setMasterId] = useState('');

  const handleAssignMaster = async () => {
    try {
      await assignMasterToRequest(requestId, masterId, user.token);
      alert('Мастер успешно назначен');
    } catch (error) {
      console.error('Ошибка при назначении мастера:', error);
    }
  };

  return (
    <div>
      <h2>Назначение мастера на заявку</h2>
      <input
        type='text'
        placeholder='ID мастера'
        value={masterId}
        onChange={(e) => setMasterId(e.target.value)}
      />
      <button onClick={handleAssignMaster}>Назначить мастера</button>
    </div>
  );
};

export default AssignMasterPage;
