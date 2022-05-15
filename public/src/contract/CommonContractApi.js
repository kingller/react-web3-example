import Web3 from 'web3';
import { notification } from 'antd';
import Erc20Abi from './abi/ERC20.json';
import BN from 'bignumber.js';

function CommonContractApi(wallet) {
    const web3 = new Web3(wallet.ethereum);
    const { account } = wallet;

    return {
        async getAllowance(tokenAddress, contractAddress) {
            const tokenContract = new web3.eth.Contract(Erc20Abi, tokenAddress);

            return new Promise((resolve, reject) => {
                tokenContract.methods
                    .allowance(wallet.account, contractAddress)
                    .call()
                    .then((res) => {
                        resolve(res);
                    })
                    .catch((err) => {
                        console.log('Error', err);
                    });
            });
        },

        async balanceOf(token) {
            const tokenContract = new web3.eth.Contract(Erc20Abi, token.address);
            return new Promise((resolve, reject) => {
                tokenContract.methods
                    .balanceOf(wallet.account)
                    .call()
                    .then((res) => {
                        resolve(new BN(res).shiftedBy(-token.decimals).toString());
                    })
                    .catch((err) => {
                        console.log('Error', err);
                        reject(err);
                    });
            });
        },

        async totalSupply(token) {
            const tokenContract = new web3.eth.Contract(Erc20Abi, token.address);
            return new Promise((resolve, reject) => {
                tokenContract.methods
                    .totalSupply()
                    .call()
                    .then((res) => {
                        resolve(new BN(res).shiftedBy(-token.decimals).toFormat());
                    })
                    .catch((err) => {
                        console.log('Error', err);
                        reject(err);
                    });
            });
        },

        async doApprove(tokenAddress, contractAddress) {
            const tokenContract = new web3.eth.Contract(Erc20Abi, tokenAddress);
            return new Promise((resolve, reject) => {
                notification.info({
                    message: 'Approving',
                });
                tokenContract.methods
                    .approve(contractAddress, Web3.utils.toWei('10000000000000', 'ether'))
                    .send({ from: account })
                    .then((res) => {
                        notification.success({
                            message: 'Successfully Approved',
                            description: `Tx Hash: ${res.transactionHash}`,
                        });
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                        console.log(err);
                    })
                    .finally(() => {
                        resolve();
                    });
            });
        },
    };
}

export default CommonContractApi;
