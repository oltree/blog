import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { login, register } from '../../../store/slices/auth';

import styles from './auth.module.scss';
export const Auth = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      dispatch(login({ email, password }));
      navigate('/');
    } else {
      dispatch(register({ email, password }));
      navigate('/login');
    }
  };

  useEffect(() => {
    if (!isLogin) {
      navigate('/register');
    }
  }, [isLogin, navigate]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={e => e.preventDefault()}>
        <h1 className={styles.title}>{isLogin ? 'login' : 'register'}</h1>

        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email...'
          className={styles.input}
        />

        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password...'
          className={styles.input}
        />

        <div className={styles.buttons}>
          <button type='submit' onClick={handleSubmit}>
            {isLogin ? 'Login' : 'Register'}
          </button>
          <Link to='/register'>{isLogin ? 'Register' : 'Login'}</Link>
        </div>
      </form>
    </div>
  );
};
