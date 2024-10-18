import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <nav>
        <ul>
          {user ? (
            <>
              <li>
                <Link to='/requests'>Заявки</Link>
              </li>
              <li>
                <Link to='/report'>Создать отчет</Link>
              </li>
              <li>
              <Link to='/create-request'>Создать заявку</Link>
              </li>
              <li>
                <span>
                  {user.type}
                </span>
              </li>
              <li>
                <button onClick={logout}>Выйти</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to='/login'>Войти</Link>
              </li>
              <li>
                <Link to='/register'>Регистрация</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
