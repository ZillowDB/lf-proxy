import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './components/App.js';

const imageRender = () => renderToString(<App />);
export default imageRender;
