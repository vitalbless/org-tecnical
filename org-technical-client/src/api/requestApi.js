import axios from 'axios';

const API_URL = 'http://localhost:5000/api/requests';

export const createRequest = async (requestData, token) => {
  return await axios.post(API_URL, requestData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRequestStatus = async (requestId, statusData, token) => {
  return await axios.patch(`${API_URL}/${requestId}/status`, statusData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateRequest = async (requestId, updateData, token) => {
  return await axios.patch(`${API_URL}/${requestId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const assignMasterToRequest = async (requestId, masterId, token) => {
  return await axios.patch(
    `${API_URL}/assign/${requestId}`,
    { masterId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const generateReport = async (token) => {
  return await axios.get(`${API_URL}/report/completed`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchRequests = async (token) => {
  return await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
