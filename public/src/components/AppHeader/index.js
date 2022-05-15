import React from 'react';
import { useWallet } from 'use-wallet';
import { Link } from 'react-router-dom';
import { Tooltip } from 'antd';

import Logo from '../../assets/logo.svg';

// import LogoLight from "assets/logo.svg";
import ConnectWallet from 'components/ConnectWallet';
import './style.less';

export default function AppHeader() {
    const wallet = useWallet();
    const { account } = wallet;

    return (
        <div className="container">
            <header className="app-header">
                <Link to="/">
                    <img src={Logo} className="logo" />
                </Link>
                <div className="header-right">
                    <a className="btn-trans" href="#/" target="_blank">
                        Litepaper
                    </a>
                    {wallet.status === 'connected' && account ? (
                        <>
                            <Tooltip title={account}>
                                <a className="btn-trans" href="#/">
                                    {account.slice(0, 4)}...{account.slice(-4)}
                                </a>
                            </Tooltip>
                        </>
                    ) : (
                        <ConnectWallet triggerConnect={true} />
                    )}
                </div>
            </header>
        </div>
    );
}
