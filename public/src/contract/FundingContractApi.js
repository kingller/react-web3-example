import Web3 from 'web3';
import config from '../config';
import FundingAbi from './abi/Funding.json';
import mm from 'lib/mm';
import BN from 'bignumber.js';

function FundingContractApi(wallet) {
    const web3 = new Web3(wallet.ethereum);
    const contract = new web3.eth.Contract(FundingAbi, config.contracts.funding);
    const { account } = wallet;

    return {
        async getRate() {
            const result = await contract.methods.rate().call();
            return new BN(result).shiftedBy(-12).toNumber();
        },
        async contribute(amount) {
            const amountInWei = new BN(amount).shiftedBy(config.tokens.usdc.decimals).toString();

            console.log('amount in wei', amountInWei);
            return new Promise((resolve, reject) => {
                return contract.methods
                    .contribute(amountInWei)
                    .send({
                        from: account,
                    })
                    .on('transactionHash', function (transactionHash) {
                        mm.listen(transactionHash, 'Contribute');
                        return transactionHash;
                    })
                    .on('receipt', (receipt) => {
                        resolve(receipt);
                    })
                    .on('error', function (error) {
                        reject(error);
                        console.log('error', error);
                    });
            });
        },
    };
}

export default FundingContractApi;
