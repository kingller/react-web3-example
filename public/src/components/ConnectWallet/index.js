import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';

import NetworkModal from 'components/NetworkModal';
import config, { chainIdMapping } from 'config';
import './style.less';

export default function ConnectWallet(props) {
    const { triggerConnect } = props;
    const [networkError, setNetworkError] = useState('');
    const wallet = useWallet();

    const connectWallet = () => {
        if (window.ethereum) {
            const configChainId = config.chainId;
            const walletChainId = parseInt(window.ethereum ? window.ethereum.chainId : '');

            if (walletChainId && !isNaN(walletChainId) && configChainId !== walletChainId) {
                setNetworkError(`${chainIdMapping[configChainId]}, your wallet id is ${walletChainId}`);
            } else {
                setNetworkError('');
            }

            if (wallet && wallet.status !== 'connected') {
                wallet.connect();
            }
        } else {
            alert('Wallet not found on your device');
        }
    };

    useEffect(() => {
        window.addEventListener('ethereum#initialized', connectWallet, {
            once: true,
        });

        if (window.ethereum) {
            window.ethereum.on('accountsChanged', (accounts) => {
                connectWallet();
            });

            window.ethereum.on('chainChanged', (chainId) => {
                connectWallet();
                window.location.reload();
            });
        }
    }, []);

    useEffect(() => {
        if (triggerConnect) {
            connectWallet();
        }
    }, []);

    return (
        <>
            <a
                href="#/"
                className="btn-trans"
                onClick={() => {
                    connectWallet();
                }}>
                Wallet
            </a>

            {networkError && (
                <NetworkModal
                    networkError={networkError}
                    onCancel={() => {
                        setNetworkError('');
                    }}
                />
            )}
        </>
    );
}
