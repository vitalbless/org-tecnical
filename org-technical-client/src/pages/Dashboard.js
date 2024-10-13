import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../contexts/AuthContext';
import { fetchRequests } from '../api/requestApi';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const getRequests = async () => {
      const response = await fetchRequests();
      setRequests(response.data);
    };
    getRequests();
  }, []);

  return (
    <div>
      <h2>Панель управления - Добро пожаловать, {user?.type}</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>{request.problemDescryption}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
