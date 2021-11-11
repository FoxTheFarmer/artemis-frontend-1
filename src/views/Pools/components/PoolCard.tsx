import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Flex, MinusIcon, LinkExternal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake } from 'hooks/useStake'
import { useSousUnstake } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvest } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool } from 'state/types'
import { FaArrowAltCircleDown, FaBook, FaBox, FaClock, FaCube, FaCubes, FaFire, FaFlask, FaLightbulb, FaLock, FaMountain, FaScroll, FaSeedling, FaTractor } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import {usePriceCakeBusd} from "../../../state/hooks";
import useWithdrawFeeTimer from "./useWithdrawFeeTimer";
import WithdrawalFeeTimer from "./withdrawFeeTimer";

const Quote = styled.p`
    font-size: 15px;
    margin-bottom: 0px;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
  apr: BigNumber
}

interface HarvestProps {
  pool: PoolWithApy
}

const Divider = styled.div`
background-color: #4c68ef;
height: 2px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 5px;
width: 100%;
`

const Divider2 = styled.div`
background-color: #4c68ef;
height: 2px;
margin-left: auto;
margin-right: auto;
margin-top: 20px;
margin-bottom: 5px;
width: 0%;
`

const PoolCard: React.FC<HarvestProps> = ({ pool }) => {
  const {
    sousId,
    image,
    tokenName,
    stakingTokenName,
    stakingTokenAddress,
    projectLink,
    harvest,
    apr,
    apy,
    tokenDecimals,
    poolCategory,
    totalStaked,
    startBlock,
    endBlock,
    isFinished,
    userData,
    stakingLimit,
    tokenPoolAddress,
    quoteTokenPoolAddress,
    earnToken,
  } = pool
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApprove(stakingTokenContract, sousId)
  const { onStake } = useSousStake(sousId, isBnbPool)
  const { onUnstake } = useSousUnstake(sousId)
  const { onReward } = useSousHarvest(sousId, isBnbPool)
  const rvrsPrice = usePriceCakeBusd()

  const { secondsRemaining, hasUnstakingFee } = useWithdrawFeeTimer(
      userData.lastDepositedTime.toNumber(),
      parseInt('259200', 10)
  );

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)
  const stakedBalanceUsd = stakedBalance.times(rvrsPrice)

  const blocksUntilStart = Math.max(startBlock - block, 0)

  const blocksRemaining = Math.max(endBlock - block, 0)

  const hsRemaining = Math.ceil((endBlock - block)*2*0.000277778*0.0416667)

  const isOldSyrup = stakingTokenName === QuoteToken.SYRUP
  const accountHasStakedBalance = stakedBalance?.toNumber() > 0
  const needsApproval = !accountHasStakedBalance && !allowance.toNumber() && !isBnbPool
  const isCardActive = isFinished && accountHasStakedBalance

  const convertedLimit = new BigNumber(stakingLimit).multipliedBy(new BigNumber(10).pow(tokenDecimals))
  const [onPresentDeposit] = useModal(
    <DepositModal
      max={stakingLimit && stakingTokenBalance.isGreaterThan(convertedLimit) ? convertedLimit : stakingTokenBalance}
      onConfirm={onStake}
      tokenName={stakingLimit ? `${stakingTokenName} (${stakingLimit} max)` : stakingTokenName}
    />,
  )

  const [onPresentCompound] = useModal(
    <CompoundModal earnings={earnings} onConfirm={onStake} tokenName={stakingTokenName} />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={stakingTokenName} />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.error(e)
    }
  }, [onApprove, setRequestedApproval])

  const TVL = pool.tvl && pool.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })
  const APY = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })
  const APY_DAILY = apr && apr.div(365).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      {sousId === 0 && <PoolFinishedSash />}

      <div style={{padding: '34px'}}>


        <Flex justifyContent='space-between' marginTop='6px'>
          <span>APY</span>
          <Quote>{APY}%</Quote>
        </Flex>
        <Flex justifyContent='space-between' marginTop='6px'>
          <span>Daily APY</span>
          <Quote>{APY_DAILY}%</Quote>
        </Flex>

      <Flex justifyContent='space-between' marginTop='6px'>
        <span> TVL</span>
        <Quote>${TVL}</Quote>
      </Flex>



        <Flex justifyContent='space-between' marginTop='6px'>
          <span>Your Deposits</span>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </Flex>
      <Flex justifyContent='space-between' marginTop='6px'>
        <span>Your Deposits USD</span>
        <Quote>${getBalanceNumber(stakedBalanceUsd).toLocaleString('en-us',{ maximumFractionDigits: 0 })}</Quote>
      </Flex>
      <Flex justifyContent='space-between' marginTop='6px'>
        <span> Withdraw fee first 72h</span>
        <Quote>0.2%</Quote>
      </Flex>

        <Flex justifyContent='space-between' marginTop='6px'>
          <span> Time left for withdraw fee</span>
          <WithdrawalFeeTimer secondsRemaining={secondsRemaining} />
        </Flex>


        {/* <Flex marginTop='2px' justifyContent='space-between'>
          <span>{tokenName} Earned</span>
          <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />

          {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                onClick={onPresentCompound}/>)} 
          </Flex> */ }



        {/* {!isOldSyrup ? (
          <BalanceAndCompound>
            <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />
            {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                onClick={onPresentCompound}
              />
              
            )}
          </BalanceAndCompound>
        ) : (
          <OldSyrupTitle hasBalance={accountHasStakedBalance} />
        )}
        <Label isFinished={isFinished && sousId !== 0} text={TranslateString(330, `${tokenName} earned`)} />
        */}

        <StyledCardActions  >
          
          {!account && <UnlockButton />}
          {account &&
            (needsApproval && !isOldSyrup ? (
              <div style={{ flex: 1 }}>
                <Button disabled={isFinished || requestedApproval} marginTop='20px' onClick={handleApprove} fullWidth >
                  Approve
                </Button>
              </div>
            ) : (
              <>
                <IconButton marginTop='20px' marginLeft='0px'
                  disabled={stakedBalance.eq(new BigNumber(0)) || pendingTx}
                  onClick={
                    isOldSyrup
                      ? async () => {
                          setPendingTx(true)
                          await onUnstake('0')
                          setPendingTx(false)
                        }
                      : onPresentWithdraw
                  }>
                <MinusIcon color="background" />
                </IconButton>

                <StyledActionSpacer />

                {!isOldSyrup && (
                <IconButton marginTop='20px' marginRight='0px' disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>

                  <AddIcon color="background" />
                </IconButton>)}
              </>
            ))}

<div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', marginLeft:'15px' }}>
          {account && harvest && !isOldSyrup && (
            <Button
              disabled={!earnings.toNumber() || pendingTx}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
              style={{
                'borderRadius': '5px',
                'height': '47px',
                'width': '120px',
                'color': 'white'
              }}
            >
              {TranslateString(9929, 'Settle')}
            </Button>
          )}
        </div>
        </StyledCardActions>
        {/* <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APY')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails> */}

        


      </div>

      {/*
      <CardFooter
        tokenName={tokenName}
        projectLink={projectLink}
        totalStaked={totalStaked}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
        tokenPoolAddress={tokenPoolAddress}
        quoteTokenPoolAddress={quoteTokenPoolAddress}
      /> */}
    </Card>
  )
}


const PoolFinishedSash = styled.div`
  background-image: url('/images/pool-finished-sash.svg');
  background-position: top right;
  background-repeat: not-repeat;
  height: 135px;
  position: absolute;
  right: -24px;
  top: -24px;
  width: 135px;
`

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  width: 100%;
  margin-bottom: 15px;
  box-sizing: border-box;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  display: flex;
  font-size: 14px;
`

export default PoolCard
