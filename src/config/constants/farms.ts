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
    pid:labo.pids.pidList[2],
    risk: 5,
    lpSymbol: 'MIS-ONE LP',
    lpAddresses: {
      1666700000: labo.addr.LaboBnbAddrTestnet,
      1666600000: labo.addr.LaboBnbAddr, // ( MIS-ONE LP ) 
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      1666700000: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      1666600000: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },

  {
    pid:labo.pids.pidList[8],
    risk: 5,
    lpSymbol: '1USDC-UST LP',
    lpAddresses: {
      1666700000: '0x7a16b6d01f96fdc5dd085c686806ba20aece99ea',
      1666600000: '0x7a16b6d01f96fdc5dd085c686806ba20aece99ea', // ( MIS-UST LP)
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      1666700000: '0x985458e523db3d53125813ed68c274899e9dfab4',
      1666600000: '0x985458e523db3d53125813ed68c274899e9dfab4',
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  },

  {
    pid:labo.pids.pidList[0],
    risk: 5,
    lpSymbol: 'MIS-UST LP',
    lpAddresses: {
      1666700000: labo.addr.LaboBusdAddrTestnet,
      1666600000: labo.addr.LaboUstAddr, // ( MIS-UST LP)
    },
    tokenSymbol: 'MIS',
    tokenAddresses: {
      1666700000: labo.addr.LaboAddrTestnet,
      1666600000: labo.addr.LaboAddr,
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  },
  /* {
    pid: labo.pids.pidList[2],
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'MIS',
    lpAddresses: {
      1666700000: labo.addr.LaboUstAddrTestnet,
      1666600000: labo.addr.LaboUstAddr, // change (to LABO BUSD LP)
    },
    tokenSymbol: 'MIS',
    tokenAddresses: {
      1666700000: labo.addr.LaboAddrTestnet,
      1666600000: labo.addr.LaboAddr,
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  }, */
  /* {
    pid:labo.pids.pidList[2],
    risk: 3,
    lpSymbol: 'MIS-FOX LP',
    lpAddresses: {
      1666700000: '0x0fd43eb53e9c80eb439dc47da7539d8b6f71dc1e',
      1666600000: '0x61356c852632813f3d71d57559b06cdff70e538b',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      1666700000: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      1666600000: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  }, */
  {
    pid:labo.pids.pidList[3],
    risk: 3,
    lpSymbol: 'MIS-TRANQ LP',
    lpAddresses: {
      1666700000: '0xfA45e64Adf9BF3caDC65b737b2B0151C750f414C',
      1666600000: '0xfA45e64Adf9BF3caDC65b737b2B0151C750f414C',
    },
    tokenSymbol: 'TRANQ',
    tokenAddresses: {
      1666700000: '0xcf1709ad76a79d5a60210f23e81ce2460542a836',
      1666600000: '0xcf1709ad76a79d5a60210f23e81ce2460542a836',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid:labo.pids.pidList[4],
    risk: 5,
    lpSymbol: 'MIS-WBTC LP',
    lpAddresses: {
      1666700000: '0x40e10c0edf8d412ce9d62cfe98cc0958eefaea94',
      1666600000: '0x40e10c0edf8d412ce9d62cfe98cc0958eefaea94', // ( MIS-UST LP)
    },
    tokenSymbol: 'WBTC',
    tokenAddresses: {
      1666700000: '0x3095c7557bcb296ccc6e363de01b760ba031f2d9',
      1666600000: '0x3095c7557bcb296ccc6e363de01b760ba031f2d9',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid:labo.pids.pidList[9],
    risk: 5,
    lpSymbol: 'MIS-LUNA LP',
    lpAddresses: {
      1666700000: '0x5456fd0cfbc4cdd9a08c89da9cf09a6afc73dc28',
      1666600000: '0x5456fd0cfbc4cdd9a08c89da9cf09a6afc73dc28', // ( MIS-UST LP)
    },
    tokenSymbol: 'LUNA',
    tokenAddresses: {
      1666700000: '0x95ce547d730519a90def30d647f37d9e5359b6ae',
      1666600000: '0x95ce547d730519a90def30d647f37d9e5359b6ae',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid:labo.pids.pidList[6],
    risk: 5,
    lpSymbol: 'MIS-XYA LP',
    lpAddresses: {
      1666700000: '0xe22297cc3452aae66cee6ed1cb437e96219c3319',
      1666600000: '0xe22297cc3452aae66cee6ed1cb437e96219c3319', // ( MIS-UST LP)
    },
    tokenSymbol: 'XYA',
    tokenAddresses: {
      1666700000: '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
      1666600000: '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },
  {
    pid:labo.pids.pidList[5],
    risk: 5,
    lpSymbol: 'MIS-JEWEL LP',
    lpAddresses: {
      1666700000: '0x751606585fcaa73bf92cf823b7b6d8a0398a1c99',
      1666600000: '0x751606585fcaa73bf92cf823b7b6d8a0398a1c99', // ( MIS-UST LP)
    },
    tokenSymbol: 'JEWEL',
    tokenAddresses: {
      1666700000: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
      1666600000: '0x72cb10c6bfa5624dd07ef608027e366bd690048f',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },
 
  {
    pid:labo.pids.pidList[7],
    risk: 5,
    lpSymbol: 'MIS-FOX LP',
    lpAddresses: {
      1666700000: '0xe9425769e13d3f928c483726de841999648e9cfd',
      1666600000: '0xe9425769e13d3f928c483726de841999648e9cfd', // ( MIS-UST LP)
    },
    tokenSymbol: 'FOX',
    tokenAddresses: {
      1666700000: '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
      1666600000: '0x0159ed2e06ddcd46a25e74eb8e159ce666b28687',
    },
    quoteTokenSymbol: QuoteToken.MIS,
    quoteTokenAdresses: contracts.cake,
  },
  
  {
    pid:labo.pids.pidList[1],
    risk: 3,
    lpSymbol: 'ONE-UST LP',
    lpAddresses: {
      1666700000: '0x0fd43eb53e9c80eb439dc47da7539d8b6f71dc1e',
      1666600000: '0x61356c852632813f3d71d57559b06cdff70e538b',
    },
    tokenSymbol: 'ONE',
    tokenAddresses: {
      1666700000: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      1666600000: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    },
    quoteTokenSymbol: QuoteToken.UST,
    quoteTokenAdresses: contracts.ust,
  },

  /* {
    pid:labo.pids.pidList[3],
    risk: 3,
    lpSymbol: 'ONE-1ETH LP',
    lpAddresses: {
      1666700000: '0x16d34ea43d76fb55b613748f15cfbe011b36227a',
      1666600000: '0x864fcd9a42a5f6e0f76bc309ee26c8fab473fc3e',
    },
    quoteTokenSymbol: QuoteToken.ONE,
    quoteTokenAdresses: {
      1666700000: '0x7466d7d0c21fa05f32f5a0fa27e12bdc06348ce2',
      1666600000: '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
    },
    tokenSymbol: QuoteToken.ONEETH,
    tokenAddresses: contracts.oneeth,
  },
  /* {
    pid:labo.pids.pidList[3],
    risk: 1,
    lpSymbol: 'USDT-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xc15fa3e22c912a276550f3e5fe3b0deb87b55acd',
    },
    tokenSymbol: 'USDT',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x55d398326f99059ff775485246999027b3197955',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 1
  },
  {
    pid:labo.pids.pidList[4],
    risk: 2,
    lpSymbol: 'BTCB-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x716666000001eee90e24f3b348e1087a005f78b4c8453524',
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 1
  },
  {
    pid:labo.pids.pidList[5],
    risk: 2,
    lpSymbol: 'ETH-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x70d8929d04b60af4fb9b58713ebcf18765ade422',
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x2170ed0880ac9a755fd29b268891666600000bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 1
  },
  {
    pid:labo.pids.pidList[6],
    risk: 1,
    lpSymbol: 'DAI-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc',
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 1
  },
  {
    pid:labo.pids.pidList[7],
    risk: 1,
    lpSymbol: 'USDC-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x680dd100e4b394bda26a59dd5c119a391e747d18',
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 1
  },
  {
    pid:labo.pids.pidList[8],
    risk: 3,
    lpSymbol: 'DOT-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xbcd62661a6b1ded703585d3af7d7649ef4dcdb5c',
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 1
  },
  {
    pid:labo.pids.pidList[9],
    risk: 4,
    lpSymbol: 'CAKE-BUSD LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x0ed8e0a2d99643e1e65cca22ed4424090b8b7458',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
    version: 1
  },
  {
    pid: labo.pids.pidList[10],
    risk: 4,
    lpSymbol: 'CAKE-BNB LP',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xa527a61703d82139f8a06bc30097cc9caa2df5a6',
    },
    tokenSymbol: 'CAKE',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
    version: 1
  },
  {
    pid: labo.pids.pidList[11],
    risk: 5,
    isTokenOnly: true,
    lpSymbol: 'LABO',
    lpAddresses: {
      1666700000: '',
      1666600000: labo.addr.LaboUstAddr, // change (to LABO BUSD LP)
    },
    tokenSymbol: 'LABO',
    tokenAddresses: {
      1666700000: '',
      1666600000: labo.addr.laboAddr,
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[12],
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'BUSD',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // VIKING-BUSD LP (BUSD-BUSD will ignore)
    },
    tokenSymbol: 'BUSD',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0xe9e7cea3dedca5984780bafc599bd69add087d1666600000',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[13],
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'WBNB',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x1b96b92314c44b159149f7e0303511fb2fc4774f', // BNB-BUSD LP
    },
    tokenSymbol: 'WBNB',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[14],
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'EGG',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x19e7cbecdd23a16dfa5573df54d98f7caae03019', // EGG-BUSD LP
    },
    tokenSymbol: 'EGG',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0xf952fc3ca7325cc27d15885d37117676d25bfda6',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[15],
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'BTCB',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xb8875e207ee8096a929d543c9981c9586992eacb', // BTCB-BUSD LP
    },
    tokenSymbol: 'BTCB',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x7130d2a12b9bcbfae4f2634d864a1ee1ce3ead9c',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[16],
    risk: 2,
    isTokenOnly: true,
    lpSymbol: 'ETH',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xd9a0d1f5e02de2403f68bb71a15f8847a854b494', // ETH-BUSD LP
    },
    tokenSymbol: 'ETH',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x2170ed0880ac9a755fd29b268891666600000bd959f933f8',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[17],
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'DAI',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x3ab77e40340ab084c3e23be8e5a6f7afed9d41dc', // DAI-BUSD LP
    },
    tokenSymbol: 'DAI',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[18],
    risk: 1,
    isTokenOnly: true,
    lpSymbol: 'USDC',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x680dd100e4b394bda26a59dd5c119a391e747d18', // USDC-BUSD LP
    },
    tokenSymbol: 'USDC',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[19],
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'DOT',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x54c1ec2f543966953f2f716666000004692606ea7d5a184e', // DOT-BUSD LP
    },
    tokenSymbol: 'DOT',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x7083609fce4d1d8dc0c979aab8c869ea2c873402',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[20],
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'BSCX',
    lpAddresses: {
      1666700000: '',
      1666600000: '0xa32a983a64ce21834221aa0ad1f1533907553136', // BSCX-BUSD LP
    },
    tokenSymbol: 'BSCX',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0x5ac52ee5b2a633895292ff6d8a89bb9190451587',
    },
    quoteTokenSymbol: QuoteToken.BUSD,
    quoteTokenAdresses: contracts.busd,
  },
  {
    pid: labo.pids.pidList[21],
    risk: 3,
    isTokenOnly: true,
    lpSymbol: 'AUTO',
    lpAddresses: {
      1666700000: '',
      1666600000: '0x4d0228ebeb39f6d2f29ba528e2d15fc9121ead1666600000', // AUTO-BNB LP
    },
    tokenSymbol: 'AUTO',
    tokenAddresses: {
      1666700000: '',
      1666600000: '0xa184088a740c695e11666600000f91f5cc086a06bb78b827',
    },
    quoteTokenSymbol: QuoteToken.BNB,
    quoteTokenAdresses: contracts.wbnb,
  }, */
]

export default farms
