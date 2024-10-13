import React, { useState, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { loginUser } from '../api/authApi';

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const { login: userLogin } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ login, password });
      userLogin(response.data.token);
    } catch (error) {
      console.error('Ошибка входа:', error);
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Логин'
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type='password'
          placeholder='Пароль'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type='submit'>Войти</button>
      </form>
    </div>
  );
};

export default LoginPage;
