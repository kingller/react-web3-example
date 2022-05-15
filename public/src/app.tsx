import '@babel/polyfill';
import './style.less';
import './app.less';
import React from 'react';
import ReactDOM from 'react-dom';
import { UseWalletProvider } from 'use-wallet';
// import config from 'config';
import reportWebVitals from './reportWebVitals';

import router from './router';

const App = (
    <UseWalletProvider
    // chainId={config.chainId}
    >
        {router}
    </UseWalletProvider>
);
ReactDOM.render(App, document.getElementById('app'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
