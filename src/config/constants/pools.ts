import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    tokenName: 'XYA',
    stakingTokenName: QuoteToken.MISXYA,
    stakingTokenAddress: '0xe22297cc3452aae66cee6ed1cb437e96219c3319',
     // tokenPoolAddress is MIS
    tokenPoolAddress: '0xD74433B187Cf0ba998Ad9Be3486B929c76815215',
     // quoteTokenPoolAddress is XYA
    quoteTokenPoolAddress: '0x9b68bf4bf89c115c721105eaf6bd5164afcc51e4',
    contractAddress: {
      1666700000: '0x5aaf4bbECFf610186aeA98218f697029D5a77597',
      1666600000: '0x5aaf4bbECFf610186aeA98218f697029D5a77597',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https:www.freyala.com/',
    harvest: true,
    tokenPerBlock: '0.16',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17953943,
    endBlock: 18554800,
    tokenDecimals: 18,
   },
   {
    tokenName: 'RAIN',
    stakingTokenName: QuoteToken.MISUST,
    stakingTokenAddress: '0xfc417a0368263140c59b7aab646d4a270c37d8cb',
     // tokenPoolAddress is MIS
    tokenPoolAddress: '0xD74433B187Cf0ba998Ad9Be3486B929c76815215',
     // quoteTokenPoolAddress is UST
    quoteTokenPoolAddress: '0x224e64ec1bdce3870a6a6c777edd450454068fec',
    contractAddress: {
      1666700000: '0x57e211444a35223649Fa988e80A9E5d594D05250',
      1666600000: '0x57e211444a35223649Fa988e80A9E5d594D05250',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https:www.freyala.com/',
    harvest: true,
    tokenPerBlock: '0.01',
    sortOrder: 2,
    isFinished: false,
    startBlock: 17971626,
    endBlock: 18971226,
    tokenDecimals: 18,
   },
]

export default pools
