import poolsConfig from 'config/constants/pools'
import sousChefABI from 'config/abi/sousChef.json'
import cakeABI from 'config/abi/cake.json'
import wbnbABI from 'config/abi/weth.json'
import { QuoteToken } from 'config/constants/types'
import multicall from 'utils/multicall'
import { getWbnbAddress } from 'utils/addressHelpers'
import BigNumber from 'bignumber.js'

const CHAIN_ID = process.env.REACT_APP_CHAIN_ID

export const fetchPoolsBlockLimits = async () => {
  const poolsWithEnd = poolsConfig.filter((p) => p.isFinished !== false)
  const callsStartBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'startBlock',
    }
  })
  const callsEndBlock = poolsWithEnd.map((poolConfig) => {
    return {
      address: poolConfig.contractAddress[CHAIN_ID],
      name: 'bonusEndBlock',
    }
  })

  const starts = await multicall(sousChefABI, callsStartBlock)
  const ends = await multicall(sousChefABI, callsEndBlock)

  return poolsWithEnd.map((cakePoolConfig, index) => {
    const startBlock = starts[index]
    const endBlock = ends[index]
    return {
      sousId: cakePoolConfig.sousId,
      startBlock: new BigNumber(startBlock).toJSON(),
      endBlock: new BigNumber(endBlock).toJSON(),
    }
  })
}

export const fetchPoolsQuoteTokenPerLp = async () => {
  const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)

  const quoteTokenAmountCalls = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.quoteTokenPoolAddress,
      name: 'balanceOf',
      params: [poolConfig.stakingTokenAddress],
    }
  })
  const tokenAmountCalls = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.tokenPoolAddress,
      name: 'balanceOf',
      params: [poolConfig.stakingTokenAddress],
    }
  })
  const callsTotalSupply = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'totalSupply',
      params: [],
    }
  })

  const quoteTokenAmounts = await multicall(cakeABI, quoteTokenAmountCalls)
  const tokenAmounts = await multicall(cakeABI, tokenAmountCalls)
  const totalSupplys = await multicall(cakeABI, callsTotalSupply)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      quoteTokenPerLp: new BigNumber(quoteTokenAmounts[index]).div(totalSupplys[index]).toJSON(),
      quoteTokenAmount: new BigNumber(quoteTokenAmounts[index]),
      tokenAmount: new BigNumber(tokenAmounts[index]),
      tokenPriceVsQuote: new BigNumber(quoteTokenAmounts[index]).div(tokenAmounts[index]),
    })),
  ]
}


export const fetchPoolsTotalStatking = async () => {
  const nonBnbPools = poolsConfig.filter((p) => p.stakingTokenName !== QuoteToken.BNB)
  const bnbPool = poolsConfig.filter((p) => p.stakingTokenName === QuoteToken.BNB)

  const callsNonBnbPools = nonBnbPools.map((poolConfig) => {
    return {
      address: poolConfig.stakingTokenAddress,
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const callsBnbPools = bnbPool.map((poolConfig) => {
    return {
      address: getWbnbAddress(),
      name: 'balanceOf',
      params: [poolConfig.contractAddress[CHAIN_ID]],
    }
  })

  const nonBnbPoolsTotalStaked = await multicall(cakeABI, callsNonBnbPools)
  const bnbPoolsTotalStaked = await multicall(wbnbABI, callsBnbPools)

  return [
    ...nonBnbPools.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(nonBnbPoolsTotalStaked[index]).toJSON(),
    })),
    ...bnbPool.map((p, index) => ({
      sousId: p.sousId,
      totalStaked: new BigNumber(bnbPoolsTotalStaked[index]).toJSON(),
    })),
  ]
}
