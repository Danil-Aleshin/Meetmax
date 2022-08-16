import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './components/pages/home/Home';
import RoutesList from './components/routes/RoutesList';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './store/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <RoutesList/>
        </Layout>
      </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
