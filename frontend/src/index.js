import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import RouterApp from './Router';
import { AppCtxProvider } from './hooks/context'

ReactDOM.render(
  <React.StrictMode>  
    <AppCtxProvider>
        <RouterApp />
    </AppCtxProvider>    
  </React.StrictMode>,
  document.getElementById('root')
);
