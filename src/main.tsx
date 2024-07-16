import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App.tsx'

import '@dberezin10/packages/shared/src/scss/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
