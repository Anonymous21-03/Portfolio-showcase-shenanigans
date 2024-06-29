import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';


library.add(fab);

const root = createRoot(document.getElementById('root'));
root.render(<App />);