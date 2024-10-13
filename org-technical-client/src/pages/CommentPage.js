import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { addComment, updateComment } from '../api/commentApi';

const CommentPage = ({ requestId, existingCommentId, existingComment }) => {
  const { user } = useContext(AuthContext);
  const [commentText, setCommentText] = useState(existingComment || '');

  const handleAddComment = async () => {
    try {
      await addComment({ message: commentText, requestId }, user.token);
      alert('Комментарий успешно добавлен');
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  const handleUpdateComment = async () => {
    try {
      await updateComment(
        existingCommentId,
        { message: commentText },
        user.token
      );
      alert('Комментарий успешно обновлен');
    } catch (error) {
      console.error('Ошибка при обновлении комментария:', error);
    }
  };

  return (
    <div>
      <h2>Работа с комментариями</h2>
      <textarea
        placeholder='Комментарий'
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
      ></textarea>
      {existingComment ? (
        <button onClick={handleUpdateComment}>Обновить комментарий</button>
      ) : (
        <button onClick={handleAddComment}>Добавить комментарий</button>
      )}
    </div>
  );
};

export default CommentPage;
