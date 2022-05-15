const { REACT_APP_CHAIN_ENV } = process.env;

console.log('process', REACT_APP_CHAIN_ENV)

let envConf = require(`./${REACT_APP_CHAIN_ENV}`).default


export const coingeckoURL = 'https://api.coingecko.com/api/v3'

export const chainIdMapping = {
  1: "ETH Mainnet",
  42: "KOVAN",
  56: "BSC Mainnet",
  128: "HECO Mainnet",
  97: "BSC Testnet",
};

// if (CHAIN_ENV === "kovan") {
//   envConf = require("./kovan").default;
// } else if (CHAIN_ENV === "mainnet") {
//   envConf = require("./mainnet").default;
// }

export default {
  chainIdMapping,
  ...envConf
}








// export default {
//   // 默认要连接的network，测试环境默认用 test，生产环境默认用 ethereum
//   defaultNetwork: "binance",
//   //test(binance)
//   test: {
//     provider: "https://data-seed-prebsc-1-s1.binance.org:8545",
//     scanUrl: "https://testnet.bscscan.com/address",
//   },

//   // binance
//   binance: {
//     provider: "https://bsc-dataseed.binance.org",
//     scanUrl: "https://bscscan.com/address",
//   },
// };
