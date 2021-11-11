import contracts from './contracts'
import { FarmConfig, QuoteToken } from './types'
import labo  from './labo'


const farms: FarmConfig[] = [
  /* {
    pid:labo.pids.pidList[24],
    risk: 5,
    lpSymbol: 'LABO-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: labo.addr.LaboUstAddrV2, // (to LABO BUSD LP)
    },
    tokenSymbol: 'LABO',
    tokenAddresses: {
      1666700000: '',
      1666600000: labo.addr.laboAddr,
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 2
  },
  {
    pid:labo.pids.pidList[25],
    risk: 5,
    lpSymbol: 'LABO-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: labo.addr.laboBnbAddrV2, // (to LABO BNB LP ) 
    },
    tokenSymbol: 'LABO',
    tokenAddresses: {
      1666700000: '',
      1666600000: labo.addr.laboAddr,
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  },
  {
    pid: 26,
    risk: 5,
    lpSymbol: 'BUSD-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x58F876857a02D6762E0101bb5C46A8c1ED44Dc16', 
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0xe9e7cea3dedca5984780bafc599bd69add087d1666600000',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  },
  {
    pid: 27,
    risk: 5,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x7EFaEf62fDdCCa950418312c6C91Aef321375A00', 
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 2
  },
  {
    pid: 28,
    risk: 5,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x61EB789d75A95CAa3fF50ed7E47b96c132fEc082', // (to LABO BUSD LP)
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  },
  {
    pid: 29,
    risk: 5,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x74E4716E431f45807DCF19f284c7aA99F18a4fbc', 
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x2170ed0880ac9a755fd29b268891666600000bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  },
  {
    pid: 30,
    risk: 5,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x66FDB2eCCfB58cF098eaa419e5EfDe841368e489', // (to LABO BUSD LP)
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 2
  },
  // {
  //   pid:labo.pids.pidList[31],
  //   risk: 5,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddresses: {
  //     1666700000: '',
  //     1666600000: '0x2354ef4DF11afacb85a5C7f98B624072ECcddbB1', // (to LABO BUSD LP)
  //   },
  //   tokenSymbol: 'USDC',
  //   tokenAddresses: {
  //     1666700000: '',
  //     1666600000: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  //   },
  //   quoteTokenSymbol: QuoteToken.BUSD,
  //   quoteTokenAdresses: contracts.busd,
  //   version: 2
  // },
  {
    pid:31,
    risk: 5,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xDd5bAd8f8b360d76d12FdA230F8BAF42fe0022CF', 
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  },
  {
    pid:32,
    risk: 5,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x0eD7e52944161450477ee417DE9Cd3a859b14fD0', 
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  },
  {
    pid:33,
    risk: 5,
    lpSymbol: 'ADA-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x28415ff2C35b65B9E5c7de82126b4015ab9d031F', 
    },
    tokenSymbol: 'ADA',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 2
  }, */
  {
    pid: 1,
    risk: 5,
    lpSymbol: 'RVRS-ONE LP',
    lpAddresses: {
      1666700000: '0x006d392b015d154f6580f68d659f803f0d22bcee',
      1666600000: '0x006d392b015d154f6580f68d659f803f0d22bcee',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.RVRS,
    quoteTokenAdresses: contracts.rvrs,
  },
  {
    pid: 2,
    risk: 5,
    lpSymbol: 'ONE-UST LP',
    lpAddresses: {
      1666700000: '0x61356C852632813f3d71D57559B06cdFf70E538B',
      1666600000: '0x61356C852632813f3d71D57559B06cdFf70E538B',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: contracts.one,
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  },
  {
    pid: 3,
    risk: 5,
    lpSymbol: 'UST-RVRS LP',
    lpAddresses: {
      1666700000: '0x513568f49e384811d7cf7e6de4daa4ddc3c4a779',
      1666600000: '0x513568f49e384811d7cf7e6de4daa4ddc3c4a779',
    },
    tokenSymbol: 'RVRS',
    tokenAddresses: contracts.rvrs,
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  }
]

export default farms
