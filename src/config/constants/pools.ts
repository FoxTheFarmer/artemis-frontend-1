import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 1,
    tokenName: 'RVRS',
    earnToken: 'RVRS',
    quoteTokenSymbol: QuoteToken.RVRS,
    stakingTokenName: QuoteToken.RVRS,
    stakingTokenAddress: '0xAe0E6F11f0decc8a59B51bc56e52421970B552dF',
    // this is MIS
    quoteTokenPoolAddress: '0xAe0E6F11f0decc8a59B51bc56e52421970B552dF',
    // this is TRANQ
    tokenPoolAddress: '0xAe0E6F11f0decc8a59B51bc56e52421970B552dF',
    contractAddress: {
      1666700000: '0xA4dD0836B276fE3Fe38B8EDf81A863FA8acd68BB',
      1666600000: '0xA4dD0836B276fE3Fe38B8EDf81A863FA8acd68BB',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.tranquil.finance/',
    harvest: false,
    tokenPerBlock: '0.21',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 190000000,
    tokenDecimals: 18,
   },
]

export default pools
