import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Flex, MinusIcon } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import Label from 'components/Label'
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
import { FaClock, FaCube, FaCubes, FaFire, FaFlask, FaLightbulb, FaLock, FaMountain, FaTractor } from 'react-icons/fa'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import CardTitle from './CardTitle'
import Card from './Card'
import OldSyrupTitle from './OldSyrupTitle'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'


const Quote = styled.p`
    font-size: 15px;
    margin-bottom: 0px;
`

interface PoolWithApy extends Pool {
  apy: BigNumber
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

  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)

  const blocksRemaining = Math.max(endBlock - block, 0)
  
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



  return (
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      {isFinished && sousId !== 0 && <PoolFinishedSash />}

      <div style={{padding: '34px'}}>
        
        <Image src="/images/pools/xya.png" width={300} height={140}>w</Image>

        <Divider2/>

        <Flex justifyContent='space-between'>
          <span><FaFlask/> Earn</span>
          <Quote>{tokenName}</Quote>
        </Flex>
        

        {/*
        <Flex justifyContent='space-between' marginTop='6px'>
          <span><FaLock/> Lockup</span>
          <Quote>{TranslateString(10006, '0 Hours')}</Quote>
        </Flex> 
        */}


        <Flex justifyContent='space-between' marginTop='6px'>
          <span><FaFire/> Deposit Fee</span>
          <Quote>{TranslateString(10006, '0%')}</Quote>
        </Flex>   

        <Divider />

        <Flex justifyContent='space-between' marginTop='25px'>
          <span><FaTractor/> Your Stake</span>
          <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
        </Flex>

        <Flex marginTop='2px' justifyContent='space-between'>
          <span><FaMountain/> Pending {tokenName}</span>
          <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />

          {sousId === 0 && account && harvest && (
              <HarvestButton
                disabled={!earnings.toNumber() || pendingTx}
                text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
                onClick={onPresentCompound}/>)} 
        </Flex>

        <Flex justifyContent='space-between' marginTop='6px'>
          <span><FaCubes/> Blocks Remaining</span>
          <Quote>{blocksRemaining}</Quote>
        </Flex>

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
                <Button disabled={isFinished || requestedApproval} marginTop='12px' onClick={handleApprove} fullWidth >
                  Approve
                </Button>
              </div>
            ) : (
              <>
                <IconButton marginTop='20px'
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
                <IconButton marginTop='20px' disabled={isFinished && sousId !== 0} onClick={onPresentDeposit}>
                  <AddIcon color="background" />
                </IconButton>)}
              </>
            ))}

<div style={{ marginTop: '17px', display: 'flex', alignItems: 'center', marginLeft:'15px' }}>
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
                'height': '42px',
                'width': '103px',
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

      <CardFooter
        projectLink={projectLink}
        totalStaked={totalStaked}
        blocksRemaining={blocksRemaining}
        isFinished={isFinished}
        blocksUntilStart={blocksUntilStart}
        poolCategory={poolCategory}
        tokenPoolAddress={tokenPoolAddress}
        quoteTokenPoolAddress={quoteTokenPoolAddress}
      />
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
  margin: 16px 0;
  width: 100%;
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
