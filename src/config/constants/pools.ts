import { PoolConfig, QuoteToken, PoolCategory } from './types'

const pools: PoolConfig[] = [
  {
    sousId: 0,
    tokenName: 'RVRS',
    earnToken: 'RVRS',
    quoteTokenSymbol: QuoteToken.RVRS,
    stakingTokenName: QuoteToken.RVRS,
    stakingTokenAddress: '0x5A24E33c1F3AC55B96F818D40d0ad97F71b42658',
    // this is RVRS
    quoteTokenPoolAddress: '0x5A24E33c1F3AC55B96F818D40d0ad97F71b42658',
    // this is RVRS
    tokenPoolAddress: '0x5A24E33c1F3AC55B96F818D40d0ad97F71b42658',
    contractAddress: {
      1666700000: '0x9a50FBc4914D920Dc54aF3B4AD4Ee38F7F72b9Ae',
      1666600000: '0x9a50FBc4914D920Dc54aF3B4AD4Ee38F7F72b9Ae',
    },
    poolCategory: PoolCategory.COMMUNITY,
    projectLink: 'https://www.tranquil.finance/',
    // TODO - fix below
    harvest: false,
    tokenPerBlock: '0.21',
    sortOrder: 1,
    isFinished: false,
    startBlock: 17996500,
    endBlock: 920000000,
    tokenDecimals: 18,
   },
]

export default pools
