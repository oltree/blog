import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';

import { logout } from '../../store/slices/auth';

import styles from './layout.module.scss';

export const Layout = ({ children }) => {
  const isAuth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate('/login');
    }
  }, [navigate, isAuth]);

  const activeStyles = {
    color: 'white',
  };

  const handleLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast.success;
  };

  return (
    <div className={styles.wrapper}>
      {isAuth ? (
        <div>
          <div>Blog</div>

          <ul>
            <li>
              <NavLink
                to='/'
                href='/'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/posts'
                href='/'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Posts
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/new'
                href='/'
                style={({ isActive }) => (isActive ? activeStyles : undefined)}
              >
                Add post
              </NavLink>
            </li>
          </ul>

          <div>
            {isAuth ? (
              <button onClick={handleLogout}>Logout</button>
            ) : (
              <Link to='/login'>Login</Link>
            )}
          </div>
        </div>
      ) : null}

      {children}
    </div>
  );
};
