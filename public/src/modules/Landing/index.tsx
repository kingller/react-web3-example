import React, { useState, useEffect } from 'react';
import AppHeader from 'components/AppHeader';
import { Input, message } from 'antd';
import USDCIcon from '../../assets/tokens/usdc.svg';
import MOSIcon from '../../assets/tokens/mos.svg';
import SwapIcon from '../../assets/swap-icon.svg';
import TopCircle from '../../assets/top-circle.svg';
import BottomCircle from '../../assets/bottom-circle.svg';
import config from 'config';
import { useWallet } from 'use-wallet';
import BN from 'bignumber.js';

import CommonContractApi from 'contract/CommonContractApi';
import FundingContractApi from 'contract/FundingContractApi';
// import Web3 from "web3";

import './style.less';
import ActionButton from 'components/ActionButton';

export default function LandingPage() {
    const [percent, setPercent] = useState(0);
    const [raised, setRaised] = useState(0);
    const [fromToken, setFromToken] = useState({});
    const [fromAmount, setFromAmount] = useState(0);
    const [toToken, setToToken] = useState({});
    const [toAmount, setToAmount] = useState(0);
    const [rate, setRate] = useState(0);
    const wallet = useWallet();
    const { account } = wallet;

    const fundingContractApi = FundingContractApi(wallet);
    const commonContractApi = CommonContractApi(wallet);

    return (
        <div className="swap-page">
            <img src={TopCircle} className="top-circle" />
            <img src={BottomCircle} className="bottom-circle" />
            <AppHeader />
            <div className="container">
                <div className="page-title">Cornerstone Round</div>
                <ul className="round-desc">
                    <li>The hard cap of this round is 5 million USDC for a total of 100,000,000 MOS tokens.</li>
                    <li>
                        Each investment tranche is <span className="green">100,000 USDC</span> and there is no limit on
                        the number of investment tranches each investor can purchase.
                    </li>
                </ul>

                <div className="separate-line" />

                <div className="desc">
                    <div className="desc1">
                        MetaOasis is starting a new paradigm of virtual real estate investment and development in the
                        age of the metaverse
                    </div>
                    <div className="desc2">
                        Why just be a visitor of the metaverse? <br />
                        We can build the metaverse together too!
                    </div>
                    <div className="desc3">
                        The MetaOasis aims to be a gateway for ownership and participation in the metaverse real estate
                        investment and development. The goal is to provide a more accessible means to invest, develop
                        and collaborate on metaverse lands and real estate together, <br />
                        <br />
                        so everyone, even people with limited capital resources, can have the opportunity to participate
                        and contribute to the evolution of the metaverse and to share the returns from this rapidly
                        growing sector.
                    </div>
                </div>
            </div>
        </div>
    );
}
