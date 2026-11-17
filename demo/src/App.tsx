import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Page from '@demo/components/Page';
import store from '@demo/store';
import '@demo/styles/common.scss';

const Home = React.lazy(() => import('@demo/pages/Home'));
const Editor = React.lazy(() => import('@demo/pages/Editor'));

function App() {
  return (
    <Provider store={store}>
      <Page>
        <Suspense
          fallback={
            <div
              style={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                width='200px'
                src='/loading'
                alt=''
              />
              <p
                style={{
                  fontSize: 24,
                  color: 'rgba(0, 0, 0, 0.65)',
                }}
              >
                Please wait a moment.
              </p>
            </div>
          }
        >
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={<Home />}
              />
              <Route
                path='/editor'
                element={<Editor />}
              />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </Page>
    </Provider>
  );
}

export default App;
