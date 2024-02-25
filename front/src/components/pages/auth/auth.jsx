import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { login, register } from '../../../store/slices/auth';

import styles from './auth.module.scss';

export const Auth = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(state => state.auth.isLogin);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    if (isLogin) {
      dispatch(login({ email, password }));
    } else {
      dispatch(register({ email, password }));
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={e => e.preventDefault()}>
        <h1>{isLogin ? 'Login' : 'register'}</h1>

        <input
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder='Email...'
        />

        <input
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder='Password...'
        />

        <div>
          <button type='submit' onClick={handleSubmit}>
            {isLogin ? 'Login' : 'Register'}
          </button>
          <Link to='/register'>{isLogin ? 'Register' : 'Login'}</Link>
        </div>
      </form>
    </div>
  );
};
