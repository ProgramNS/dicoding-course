import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
// import style
import './styles/style.css';
import './styles/nav.css';
import './styles/form.css';
import './styles/card.css';


const root = createRoot(document.getElementById('root'));
root.render(
    <StrictMode>
        <App />
    </StrictMode>
);