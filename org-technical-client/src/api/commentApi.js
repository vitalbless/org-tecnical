import axios from 'axios';

const API_URL = 'http://localhost:5000/api/comments';

export const addComment = async (commentData, token) => {
  return await axios.post(`${API_URL}/add`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateComment = async (commentId, commentData, token) => {
  return await axios.put(`${API_URL}/update/${commentId}`, commentData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
