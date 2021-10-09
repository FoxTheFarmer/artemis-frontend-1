import { useCallback } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useDispatch } from 'react-redux'
import {
  fetchFarmUserDataAsync,
  updateUserStakedBalance,
  updateUserBalance,
  updateUserPendingReward,
} from 'state/actions'
import { unstake, sousUnstake, sousEmegencyUnstake } from 'utils/callHelpers'
import { useMasterchef, useSousChef, useSousChef2 } from './useContract'

const useUnstake = (pid: number) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const masterChefContract = useMasterchef()

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(masterChefContract, pid, amount, account)
      dispatch(fetchFarmUserDataAsync(account))
      console.info(txHash)
    },
    [account, dispatch, masterChefContract, pid],
  )

  return { onUnstake: handleUnstake }
}

const SYRUPIDS = [5, 6, 3, 1, 22, 23]

export const useSousUnstake = (sousPoolAddress) => {
  const dispatch = useDispatch()
  const { account } = useWallet()
  const sousChefContract = useSousChef(sousPoolAddress)

  const handleUnstake = useCallback(
    async (amount: string) => {
        const txHash = await sousUnstake(sousChefContract, amount, account)
        console.info(txHash)
      dispatch(updateUserStakedBalance(sousPoolAddress, account))
      dispatch(updateUserBalance(sousPoolAddress, account))
      dispatch(updateUserPendingReward(sousPoolAddress, account))
    },
    [account, dispatch, sousChefContract, sousPoolAddress],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake
