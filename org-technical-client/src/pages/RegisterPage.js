import React, { useState } from 'react';
import { registerUser } from '../api/authApi';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    patronymic: '',
    phone: '',
    login: '',
    password: '',
    type: 'Клиент',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Ошибка при регистрации: ' + error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          placeholder='Имя'
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='lastName'
          placeholder='Фамилия'
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='patronymic'
          placeholder='Отчество'
          value={formData.patronymic}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='phone'
          placeholder='Телефон'
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type='text'
          name='login'
          placeholder='Логин'
          value={formData.login}
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='Пароль'
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select name='type' value={formData.type} onChange={handleChange}>
          <option value='Клиент'>Клиент</option>
          <option value='Мастер'>Мастер</option>
          <option value='Менеджер'>Менеджер</option>
        </select>
        <button type='submit'>Зарегистрироваться</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterPage;
