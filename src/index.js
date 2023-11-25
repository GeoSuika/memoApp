// src/index.js

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// createRootメソッドを使用してReact 18の新しいAPIを有効化
const root = createRoot(document.getElementById('root'));
console.log('Hello World!');
root.render(
        <App />
);