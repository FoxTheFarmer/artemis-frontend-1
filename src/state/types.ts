import BigNumber from 'bignumber.js'
import { FarmConfig, PoolConfig, Pool2Config } from 'config/constants/types'

export interface Farm extends FarmConfig {
  tokenAmount?: BigNumber
  quoteTokenAmount?: BigNumber
  lpTotalInQuoteToken?: BigNumber
  tokenPriceVsQuote?: BigNumber
  tokenPerLp?: BigNumber
  quoteTokenPerLp?: BigNumber
  poolWeight?: number
  depositFeeBP?: number
  vikingPerBlock?: number
    userData?: {
    allowance: BigNumber
    tokenBalance: BigNumber
    stakedBalance: BigNumber
    earnings: BigNumber
  }
}

export interface Pool extends PoolConfig {
  totalStaked?: BigNumber
  tvl?: BigNumber
  quoteTokenPerLp?: BigNumber
  quoteTokenAmount?: BigNumber
  tokenAmount?: BigNumber
  tokenPriceVsQuote?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface Pool2 extends Pool2Config {
  totalStaked?: BigNumber
  tvl?: BigNumber
  quoteTokenPerLp?: BigNumber
  quoteTokenAmount?: BigNumber
  tokenAmount?: BigNumber
  tokenPriceVsQuote?: BigNumber
  startBlock?: number
  endBlock?: number
  userData?: {
    allowance: BigNumber
    stakingTokenBalance: BigNumber
    stakedBalance: BigNumber
    pendingReward: BigNumber
  }
}

export interface Price{
  value: BigNumber
}

// Slices states

export interface FarmsState {
  data: Farm[],
  price?: BigNumber
}

export interface PoolsState {
  data: Pool[]
}

export interface Pools2State {
  data: Pool2[]
}

export interface PriceState {
  data: Price[]
}

// Global state

export interface State {
  farms: FarmsState
  pools: PoolsState
  pools2: Pools2State
  price: PriceState
}

export interface State2 {
  pools: Pools2State
  price: PriceState
}
