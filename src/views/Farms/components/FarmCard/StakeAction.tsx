import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading, IconButton, AddIcon, MinusIcon, useModal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import useStake from 'hooks/useStake'
import useUnstake from 'hooks/useUnstake'
import { getBalanceNumber } from 'utils/formatBalance'
import { FaArrowDown, FaArrowUp, FaClock, FaFire, FaFlask, FaGhost, FaInfinity, FaLock, FaMountain, FaRegHandPointDown, FaRegWindowRestore, FaSeedling, FaTractor, FaTruck, } from 'react-icons/fa'
import StyledBTN from 'components/layout/StyledBTN'
import DepositModal from '../DepositModal'
import WithdrawModal from '../WithdrawModal'
import './index.css'


interface FarmCardActionsProps {
  stakedBalance?: BigNumber
  tokenBalance?: BigNumber
  stakedBalanceUsd?: BigNumber
  tokenBalanceUsd?: BigNumber
  tokenName?: string
  pid?: number
  depositFeeBP?: number
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`

const Staked = styled.div`
  font-size: 8px;
  color: ${({ theme }) => theme.colors.textSubtle};
`

  const SumMinus = styled.button`
  -webkit-box-align: center;
  align-items: center;
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
  max-width: 50px;
  padding: 20px;
  box-shadow: 10px #fff;
  `

const StakeAction: React.FC<FarmCardActionsProps> = (
    { stakedBalance,
      tokenBalance,
      stakedBalanceUsd,
      tokenBalanceUsd,
      tokenName,
      pid,
      depositFeeBP
    }) => {
  const TranslateString = useI18n()
  const { onStake } = useStake(pid)
  const { onUnstake } = useUnstake(pid)

  const rawStakedBalance = getBalanceNumber(stakedBalance, 18)
  const displayBalance = rawStakedBalance.toLocaleString()
  const rawStakedBalanceUsd = getBalanceNumber(stakedBalanceUsd, 0)
  const displayBalanceUsd = rawStakedBalanceUsd.toLocaleString('en-us', { maximumFractionDigits: 2, minimumFractionDigits: 2 })

  const tokenBalanceUsdNum = getBalanceNumber(tokenBalanceUsd)

  const [onPresentDeposit] = useModal(<DepositModal
      max={tokenBalance}
      valueUsd={tokenBalanceUsdNum}
      onConfirm={onStake}
      tokenName={tokenName}
      depositFeeBP={depositFeeBP} />)
  const [onPresentWithdraw] = useModal(
    <WithdrawModal
        max={stakedBalance}
        valueUsd={rawStakedBalanceUsd}
        onConfirm={onUnstake}
        tokenName={tokenName} />,
  )

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <StyledBTN onClick={onPresentDeposit} > {TranslateString(999, 'Stake ')}</StyledBTN>
    ) : (
      <IconButtonWrapper>
        
        <SumMinus 
        onClick={onPresentWithdraw} 
        style={{
          marginRight: '5px',
          marginTop: '0px',
          marginLeft: '5px',
        }}><FaArrowUp/>
        </SumMinus>

        <SumMinus style={{
          marginRight: '0px',
          marginTop: '0px',
          marginLeft: '0px',
        }} onClick={onPresentDeposit}><FaArrowDown/>        
        </SumMinus>
      </IconButtonWrapper>
    )
  }

  const USDStaked = styled.text`
  font-size: 15px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const LPStaked = styled.text`
font-size: 12px;
font-weigth: 30;
align-items: center;
color: ${({ theme }) => theme.colors.textSubtle};
margin-top: 3px;
justify-content: flex-start;
`

  return (
    <Flex justifyContent="space-between" alignItems="center">
      
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>

        <LPStaked style={{'color': 'white', 'fontSize': '16px'}}  >
          {displayBalance}
        </LPStaked>

        {stakedBalance.gt(0) && <USDStaked>~${displayBalanceUsd}</USDStaked>}

      </Heading>
      {renderStakingButtons()}
    </Flex>
  )
}

export default StakeAction

