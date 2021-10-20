/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import pools2 from 'config/constants/pools2'
import { pools2Config } from 'config/constants'
import {fetchPoolsBlockLimits, fetchPoolsQuoteTokenPerLp, fetchPoolsTotalStatking} from './fetchPools'
import {
  fetchPoolsAllowance,
  fetchUserBalances,
  fetchUserStakeBalances,
  fetchUserPendingRewards,
} from './fetchPoolsUser'
import { Pools2State, Pool, Pool2 } from '../types'

const initialState: Pools2State = { data: [...pools2Config] }

export const PoolsSlice = createSlice({
  name: 'Pools',
  initialState,
  reducers: {
    setPoolsPublicData: (state, action) => {
      const livePoolsData: Pool2[] = action.payload
      state.data = state.data.map((pool2) => {
        const livePoolData = livePoolsData.find((entry) => entry.sousId === pool2.sousId)
        return { ...pools2, ...livePoolData }
      })
    },
    setPoolsUserData: (state, action) => {
      const userData = action.payload
      state.data = state.data.map((pool2) => {
        const userPoolData = userData.find((entry) => entry.sousId === pool2.sousId)
        return { ...pool2, userData: userPoolData }
      })
    },
    updatePoolsUserData: (state, action) => {
      const { field, value, sousId } = action.payload
      const index = state.data.findIndex((p) => p.sousId === sousId)
      state.data[index] = { ...state.data[index], userData: { ...state.data[index].userData, [field]: value } }
    },
  },
})

// Actions
export const { setPoolsPublicData, setPoolsUserData, updatePoolsUserData } = PoolsSlice.actions

// Thunks
export const fetchPoolsPublicDataAsync = () => async (dispatch) => {
  const blockLimits = await fetchPoolsBlockLimits()
  const totalStakings = await fetchPoolsTotalStatking()
  const quoteTokenPerLps = await fetchPoolsQuoteTokenPerLp()

  const liveData = pools2Config.map((pool) => {
    const blockLimit = blockLimits.find((entry) => entry.sousId === pool.sousId)
    const totalStaking = totalStakings.find((entry) => entry.sousId === pool.sousId)
    const quoteTokenPerLp = quoteTokenPerLps.find((entry) => entry.sousId === pool.sousId)
    return {
      ...blockLimit,
      ...totalStaking,
      ...quoteTokenPerLp
    }
  })

  dispatch(setPoolsPublicData(liveData))
}

export const fetchPools2UserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = pools2Config.map((pool2) => ({
    sousId: pool2.sousId,
    allowance: allowances[pool2.sousId],
    stakingTokenBalance: stakingTokenBalances[pool2.sousId],
    stakedBalance: stakedBalances[pool2.sousId],
    pendingReward: pendingRewards[pool2.sousId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const fetchPoolsUserDataAsync = (account) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  const stakingTokenBalances = await fetchUserBalances(account)
  const stakedBalances = await fetchUserStakeBalances(account)
  const pendingRewards = await fetchUserPendingRewards(account)

  const userData = pools2Config.map((pool) => ({
    sousId: pool.sousId,
    allowance: allowances[pool.sousId],
    stakingTokenBalance: stakingTokenBalances[pool.sousId],
    stakedBalance: stakedBalances[pool.sousId],
    pendingReward: pendingRewards[pool.sousId],
  }))

  dispatch(setPoolsUserData(userData))
}

export const updateUserAllowance = (sousId: string, account: string) => async (dispatch) => {
  const allowances = await fetchPoolsAllowance(account)
  dispatch(updatePoolsUserData({ sousId, field: 'allowance', value: allowances[sousId] }))
}

export const updateUserBalance = (sousId: string, account: string) => async (dispatch) => {
  const tokenBalances = await fetchUserBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakingTokenBalance', value: tokenBalances[sousId] }))
}

export const updateUserStakedBalance = (sousId: string, account: string) => async (dispatch) => {
  const stakedBalances = await fetchUserStakeBalances(account)
  dispatch(updatePoolsUserData({ sousId, field: 'stakedBalance', value: stakedBalances[sousId] }))
}

export const updateUserPendingReward = (sousId: string, account: string) => async (dispatch) => {
  const pendingRewards = await fetchUserPendingRewards(account)
  dispatch(updatePoolsUserData({ sousId, field: 'pendingReward', value: pendingRewards[sousId] }))
}

export default PoolsSlice.reducer