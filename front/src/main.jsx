import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import { store } from './store/store';

import { Layout } from './components/layout';
import { Auth } from './components/pages/auth';
import { Home } from './components/pages/home';
import { Post } from './components/pages/post';

import './assets/index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path=':id' element={<Post />} />
            <Route path=':id/edit' element={<Post />} />
            <Route path='new' element={<Post />} />
            <Route path='register' element={<Auth />} />
            <Route path='login' element={<Auth />} />
          </Routes>
        </Layout>

        <ToastContainer position='bottom-right' />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
