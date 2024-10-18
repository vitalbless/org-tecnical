import React, { useEffect, useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { fetchRequests } from '../api/requestApi';
import { addComment, updateComment } from '../api/commentApi';
import EditRequestModal from './EditRequestModal';

const RequestsPage = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});

  useEffect(() => {
    const loadRequests = async () => {
      try {
        const response = await fetchRequests(user.token);
        setRequests(response.data);
        setLoading(false);
      } catch (err) {
        setError('Ошибка при загрузке заявок');
        setLoading(false);
      }
    };

    loadRequests();
  }, [user.token]);

  const handleAddComment = async (requestId) => {
    try {
      const newComment = commentInputs[requestId] || '';
      if (!newComment.trim()) return; 
      const response = await addComment({ message: newComment, requestId }, user.token);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId
            ? { ...request, comments: [...request.comments, response.data] }
            : request
        )
      );
      setCommentInputs({ ...commentInputs, [requestId]: '' }); 
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  const handleEditComment = async (commentId) => {
    try {
      const newComment = commentInputs[commentId] || '';
      if (!newComment.trim()) return; 
      const response = await updateComment(commentId, { message: newComment }, user.token);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.comments.some((comment) => comment.id === commentId)
            ? {
                ...request,
                comments: request.comments.map((comment) =>
                  comment.id === commentId ? response.data : comment
                ),
              }
            : request
        )
      );
      setEditingCommentId(null); 
      setCommentInputs({ ...commentInputs, [commentId]: '' });
    } catch (error) {
      console.error('Ошибка при обновлении комментария:', error);
    }
  };

  const handleInputChange = (id, value) => {
    setCommentInputs((prev) => ({ ...prev, [id]: value }));
  };

  if (loading) {
    return <p>Загрузка заявок...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleEditClick = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  const handleUpdate = () => {
    setIsModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div>
      <h2>Список заявок</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <p><strong>Тип оргтехники:</strong> {request.orgTechType}</p>
            <p><strong>Модель:</strong> {request.orgTechModel}</p>
            <p><strong>Описание проблемы:</strong> {request.problemDescryption}</p>
            <p><strong>Статус:</strong> {request.requestStatus}</p>
            <p><strong>Id мастера:</strong> {request.masterId}</p>

            {request.comments && request.comments.length > 0 ? (
              <div>
                <strong>Комментарии:</strong>
                <ul>
                  {request.comments.map((comment) => (
                    <li key={comment.id}>
                      {editingCommentId === comment.id ? (
                        <input
                          type="text"
                          value={commentInputs[comment.id] || ''}
                          onChange={(e) => handleInputChange(comment.id, e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleEditComment(comment.id)}
                        />
                      ) : (
                        <>
                          {comment.message}
                          {comment.masterId === user.userId && (
                            <button
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setCommentInputs({ ...commentInputs, [comment.id]: comment.message });
                              }}
                            >
                              Редактировать комментарий
                            </button>
                          )}
                        </>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>Комментариев нет</p>
            )}
            {user.type === 'Мастер' && (
              <div>
                <input
                  type="text"
                  placeholder="Напишите комментарий"
                  value={commentInputs[request.id] || ''}
                  onChange={(e) => handleInputChange(request.id, e.target.value)}
                />
                <button onClick={() => handleAddComment(request.id)}>Добавить комментарий</button>
              </div>
            )}

            <button onClick={() => handleEditClick(request)}>Редактировать заявку</button>
          </li>
        ))}
      </ul>
      {isModalOpen && selectedRequest && (
        <EditRequestModal
          request={selectedRequest}
          onClose={handleModalClose}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  );
};

export default RequestsPage;
