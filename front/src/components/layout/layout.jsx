import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

import { logout } from '../../store/slices/auth';

import styles from './layout.module.scss';

export const Layout = ({ children }) => {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStyles = {
    color: 'white',
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={styles.wrapper}>
      {isAuth ? (
        <div className={styles.header}>
          <NavLink
            to='/'
            href='/'
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Blog
          </NavLink>

          <NavLink
            to='/new'
            href='/'
            style={({ isActive }) => (isActive ? activeStyles : undefined)}
          >
            Add post
          </NavLink>

          <NavLink to='/login' href='/' onClick={handleLogout}>
            Login
          </NavLink>
        </div>
      ) : null}

      {children}
    </div>
  );
};
