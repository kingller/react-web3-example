import React, { useEffect, useState } from 'react';
import { useWallet } from 'use-wallet';
import CommonContractApi from 'contract/CommonContractApi';

export default function ActionButton(props) {
    const { tokenAddress, contractAddress, children } = props;
    const [allowance, setAllowance] = useState(0);
    const [approving, setApproving] = useState(false);
    const wallet = useWallet();
    const currentAccount = wallet.account;
    const commonContractApi = new CommonContractApi(wallet);

    const checkAllowance = async () => {
        const result = await commonContractApi.getAllowance(tokenAddress, contractAddress);
        setAllowance(result);
    };

    useEffect(() => {
        if (currentAccount && tokenAddress && contractAddress) {
            checkAllowance();
        }
    }, [tokenAddress, contractAddress, currentAccount]);

    const doApprove = async () => {
        setApproving(true);
        try {
            await commonContractApi.doApprove(tokenAddress, contractAddress);
            setApproving(false);
            checkAllowance();
        } catch (err) {
            setApproving(false);
        }
    };

    return allowance > 0 || !tokenAddress ? (
        <>{children}</>
    ) : (
        <a href="#/" className={`${approving ? 'btn-grey' : 'btn-blue'}`} onClick={doApprove} disabled={approving}>
            {approving && <span>APPROVING</span>}
            {!approving && <span>APPROVE</span>}
        </a>
    );
}
