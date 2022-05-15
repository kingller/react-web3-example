import { subscribe } from '@nextcloud/event-bus';
import { watchTransaction } from 'lib/utils';

async function listen(txHash, desc) {
    return new Promise(async (resolve, reject) => {
        let previousActionObj = JSON.parse(localStorage.getItem('actionObj')) || {};
        previousActionObj[txHash] = {
            desc,
        };
        localStorage.setItem('actionObj', JSON.stringify(previousActionObj));

        subscribe(txHash, (val) => {
            resolve(val);
        });

        watchTransaction(txHash);
    });
}

export default {
    listen,
};
