import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { ComposedApp } from './composed-app';

import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <StrictMode>
        <ComposedApp />
    </StrictMode>,
);
