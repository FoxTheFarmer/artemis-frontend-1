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
    projectLink: 'https://www.freyala.com/',
    harvest: true,
    tokenPerBlock: '1',
    sortOrder: 0.16,
    isFinished: false,
    startBlock: 17953943,
    endBlock: 18554800,
    tokenDecimals: 18,
   },
  // {
  //   sousId: 1,
  //   tokenName: 'TWT',
  //   stakingTokenName: QuoteToken.SYRUP,
  //   stakingTokenAddress: '0x009cF7bC57584b7998236eff51b98A168DceA9B0',
  //   contractAddress: {
  //     1666700000: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af166660000033061A',
  //     1666600000: '0xAfd61Dc94f11A70Ae110dC0E0F2061Af166660000033061A',
  //   },
  //   poolCategory: PoolCategory.CORE,
  //   projectLink: 'https://trustwallet.com/',
  //   harvest: true,
  //   tokenPerBlock: '20',
  //   sortOrder: 999,
  //   isFinished: true,
  //   tokenDecimals: 18,
  // },
]

export default pools
