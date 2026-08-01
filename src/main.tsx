import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './index.css';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }
}, { once: true });

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
