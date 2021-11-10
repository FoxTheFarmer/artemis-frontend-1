import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Button, IconButton, useModal, AddIcon, Image, Flex, MinusIcon, Link } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import UnlockButton from 'components/UnlockButton'
import { useERC20 } from 'hooks/useContract'
import { useSousApprove, useSousApproveBurn } from 'hooks/useApprove'
import useI18n from 'hooks/useI18n'
import { useSousStake, useSousStakeBurn } from 'hooks/useStake'
import { useSousUnstake, useSousUnstakeBurn } from 'hooks/useUnstake'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import { useSousHarvestBurn } from 'hooks/useHarvest'
import Balance from 'components/Balance'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import { Pool2 } from 'state/types'
import { FaAngleRight } from 'react-icons/fa'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import Container from 'components/layout/Container'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import CompoundModal from './CompoundModal'
import Card from './Card'
import HarvestButton from './HarvestButton'
import CardFooter from './CardFooter'



interface PoolWithApy extends Pool2 {
  apy: BigNumber
}

interface HarvestProps {
  pool2: PoolWithApy
}

const DCard = styled.div`
background-image: linear-gradient(to right, #2E3646, #3B4557 , #2B3344);
  border-radius: 15px;
  flex-direction: column;
  justify-content: space-around;
  padding: 25px;
  position: center;
  text-align: center;

  border:0px solid #fff;
  box-shadow: 0px 0px 0px #ccc;
`

const CCARD = styled.div`
background: #1E2129;
border-radius: 10px;
flex-direction: column;
justify-content: space-around;
padding: 25px;
position: center;
text-align: center;
`

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #2E3543 !important;
  border: 1px;
  border-style: solid !important;
  border-color: #2E3543 !important;
  border-radius: 8px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  margin-top: 18px;
  min-height: 18px;
  max-height: 30px;
  max-width: 128px;
  padding: 20px;
  box-shadow: 1px 1px 10px #ccc;

  `
  const StyledClaim = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #2E3543 !important;
  border: 1px;
  border-style: solid !important;
  border-color: #2E3543 !important;
  border-radius: 8px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  margin-top: 18px;
  min-height: 18px;
  max-height: 30px;
  max-width: 128px;
  padding: 20px;
  `

  const ClaimBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  margin-top: 18px;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 80px;
  padding: 20px;
  `


  const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const Quote = styled.p`
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 0px;
    text-shadow: 1px 1px 5px #ccc;
`

const Quote2 = styled.p`
    font-size: 15px;
    font-weight: 300;
    margin-bottom: 0px;
`

const Quote3 = styled.p`
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 0px;
    text-shadow: 1px 1px 10px #ccc;
    margin-top: 7px;
`

const DashboardPage2 = styled(Container)`
  min-height: calc(1vh - 64px);
  padding-top: 16px;
  padding-bottom: 6px;
  padding: 5px;
  max-width: 770px;

  ${({ theme }) => theme.mediaQueries.sm} {
    padding-top: 24px;
    padding-bottom: 24px;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 21px;
    padding-bottom: 32px;
  }
`


const PoolCard: React.FC<HarvestProps> = ({ pool2 }) => {
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
    isDepositFinished,
    userData,
    stakingLimit,
    tokenPoolAddress,
    quoteTokenPoolAddress,
    lockBlock,
  } = pool2
  // Pools using native BNB behave differently than pools using a token
  const isBnbPool = poolCategory === PoolCategory.BINANCE
  const TranslateString = useI18n()
  const stakingTokenContract = useERC20(stakingTokenAddress)
  const { account } = useWallet()
  const block = useBlock()
  const { onApprove } = useSousApproveBurn(stakingTokenContract, sousId)
  const { onStake } = useSousStakeBurn(sousId, isBnbPool)
  const { onUnstake } = useSousUnstakeBurn(sousId)
  const { onReward } = useSousHarvestBurn(sousId, isBnbPool)

  console.log("PoolCard", pool2)
  const [requestedApproval, setRequestedApproval] = useState(false)
  const [pendingTx, setPendingTx] = useState(false)

  const allowance = new BigNumber(userData?.allowance || 0)
  const stakingTokenBalance = new BigNumber(userData?.stakingTokenBalance || 0)
  const stakedBalance = new BigNumber(userData?.stakedBalance || 0)
  const earnings = new BigNumber(userData?.pendingReward || 0)

  const blocksUntilStart = Math.max(startBlock - block, 0)

  const blocksRemaining = Math.max(endBlock - block, 0)

  const daysRemaining = Math.ceil((endBlock - block)*2*0.000277778*0.0416667)

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const blocksDepositFinished = Math.max(lockBlock - block, 0)
  
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

  const APR = apy && apy.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  const ROI = apy && apy.div(6).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  const DailyROI = apy && apy.div(6).div(60).toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })


  const TVL = pool2.tvl && pool2.tvl.toNumber().toLocaleString('en-us',{ maximumFractionDigits: 0 })

  return (

    <DashboardPage2>
    <Card isActive={isCardActive} isFinished={isFinished && sousId !== 0}>
      {sousId === 0 && <PoolFinishedSash />}

      <Wrapper justifyContent="space-between" alignItems="center" mb="0px" padding='15px' >

      <Flex flexDirection="column" alignItems="flex-end">
          <Quote>{tokenName} Bonding Pool</Quote>

        </Flex>


     

      </Wrapper>

      <DCard>

      <Wrapper justifyContent="space-between" alignItems="center" mb="0px">





        <Flex  flexDirection="column" alignItems='start' >
            <Quote>Returns</Quote>
            <Quote3>{APR}%</Quote3>
          </Flex>

          <Flex  flexDirection="column" alignItems='start' >
            <Quote>Incentives End</Quote>
            <Quote3>{daysRemaining} Days</Quote3>
          </Flex>

          <Flex flexDirection="column" alignItems='start' >
            <Quote>TVL</Quote>
            <Quote3>${TVL}</Quote3>
          </Flex>

        <Flex justifyContent='right'>
          <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)}/>
        </Flex>

        </Wrapper>
      </DCard>


        <ExpandingWrapper expanded={showExpandableSection}>
          <CCARD>

          <Flex justifyContent='space-between' marginTop='20px'>
              <Quote> Total Value Bonded</Quote>
              <Quote> ${TVL}</Quote>
            </Flex>

            <Flex justifyContent='space-between' marginTop='10px'>
              <Quote> Estimated ROI ({daysRemaining} Days)</Quote>
              <Quote> ${TVL}</Quote>
            </Flex>

            <Flex justifyContent='space-between' marginTop='10px'>
              <Quote> Estimated ROI (5 Days)</Quote>
              <Quote>TODO</Quote>
            </Flex>


            <Flex justifyContent='space-between' marginTop='25px'>
              <Quote> Your Bonded Assets</Quote>
              <Balance fontSize="14px" isDisabled={isFinished} value={getBalanceNumber(stakedBalance)} />
            </Flex>

            <Flex marginTop='0px' justifyContent='space-between'>
              <Quote> Claimable Rewards</Quote>
              <Balance value={getBalanceNumber(earnings, tokenDecimals)} isDisabled={isFinished} />

              {sousId === 0 && account && harvest && (
              <HarvestButton
              disabled={!earnings.toNumber() || pendingTx}
              text={pendingTx ? TranslateString(999, 'Compounding') : TranslateString(999, 'Compound')}
              onClick={onPresentCompound}/>)} 
            </Flex>


            <Flex justifyContent='space-between' marginTop='10px'>
              <Quote2><FaAngleRight/> Once Bonded, assets cannnot be recovered</Quote2>
            </Flex>



            <StyledCardActions >
                
              {!account && <UnlockButton />}
              {account && (needsApproval && !isOldSyrup ? (

                <div style={{ flex: 1 }}>
                  <StyledBtn 
                  disabled={isFinished || isDepositFinished} 
                  onClick={handleApprove}
                  style={{maxWidth:'150px'}}  >
                    Enable Bonding
                  </StyledBtn>
                </div>

                ) : ( <>

                <StyledActionSpacer/>

                {!isOldSyrup && (
                <StyledBtn disabled={isFinished || isDepositFinished}  onClick={onPresentDeposit}>
                  Bond Assets
                </StyledBtn>)}</>))}

                <div style={{ marginRight:'30px', marginLeft:'10px'}}>
                  {account && harvest && !isOldSyrup && (
                  <ClaimBtn
                    disabled={!earnings.toNumber() || pendingTx}
                    onClick={async () => {
                      setPendingTx(true)
                      await onReward()
                      setPendingTx(false)
                    }}>Claim
                  </ClaimBtn>)}
                </div>
              </StyledCardActions>
            </CCARD>
        </ExpandingWrapper>


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

        
        {/* <StyledDetails>
          <div style={{ flex: 1 }}>{TranslateString(736, 'APY')}:</div>
          {isFinished || isOldSyrup || !apy || apy?.isNaN() || !apy?.isFinite() ? (
            '-'
          ) : (
            <Balance fontSize="14px" isDisabled={isFinished} value={apy?.toNumber()} decimals={2} unit="%" />
          )}
        </StyledDetails> */}

        


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
    </Card>  </DashboardPage2>

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


