import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import * as Sentry from '@sentry/browser';
import { BrowserTracing } from '@sentry/tracing';
import '@arco-design/web-react/es/_util/react-19-adapter';

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: "https://dcc8b6eb106b43fcbe6385fb491871ad@o1071232.ingest.sentry.io/6068046",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
