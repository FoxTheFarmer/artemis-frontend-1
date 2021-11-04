import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import { Button, Flex, Heading } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import labo from 'config/constants/labo'
import { useHarvest } from 'hooks/useHarvest'
import { getBalanceNumber } from 'utils/formatBalance'
import styled from 'styled-components'
import { FaTelegramPlane, FaTwitter, FaDiscord, FaChartBar, FaMoneyBillAlt, FaTractor, FaHome, FaPrescriptionBottleAlt, FaTumblrSquare, FaCode, FaFlask, FaBook, FaReddit, FaRocketchat, FaRocket, FaBroadcastTower, FaLayerGroup, FaSeedling, FaExclamationTriangle, FaBootstrap, FaLandmark, FaGamepad, FaCircle, FaParachuteBox, FaVoteYea, FaProjectDiagram, FaShieldAlt, FaFire, FaCloud, FaPlayCircle, FaClipboard, FaUser, FaTwitterSquare, FaEnvelopeOpenText, FaDochub, FaHistory, FaHandHolding, FaHandHoldingUsd, FaQuestion, FaQuestionCircle } from 'react-icons/fa';
import useStake from '../../../../hooks/useStake'
import {usePriceCakeBusd} from "../../../../state/hooks";



interface FarmCardActionsProps {
  earnings?: BigNumber
  pid?: number
}

const Staked = styled.div`
  font-size: 10px;
  align-items: center;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  margin-top: 3px;
  justify-content: flex-end;
`

const USDStaked = styled.text`
  font-size: 15px;
  align-items: center;
  color: #8E8E8E;
  display: flex;
  margin-top: 3px;
  justify-content: flex-start;
`

const BalanceAndCompound = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
`

const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: #2E3543 !important;
  border: 1px;
  border-style: solid !important;
  border-color: #2E3543 !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 120px;
  padding: 20px;
  box-shadow: 0px 0px 10px #ffff, 0 0px 0px 0 #fff;

  `

  const LPStaked = styled.text`
font-size: 12px;
font-weigth: 30;
align-items: center;
color: ${({ theme }) => theme.colors.textSubtle};
margin-top: 3px;
justify-content: flex-start;
`

const HarvestAction: React.FC<FarmCardActionsProps> = ({ earnings, pid }) => {
  const TranslateString = useI18n()
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useHarvest(pid)
  const { onStake } = useStake(pid)
  const cakePrice = usePriceCakeBusd()

  const rawEarningsBalance = getBalanceNumber(earnings)
  const displayBalance = rawEarningsBalance.toLocaleString()
  const rawEarningsUsdBalance = getBalanceNumber(earnings.times(cakePrice), )
  const displayBalanceUsd = rawEarningsUsdBalance.toLocaleString('en-us',{ maximumFractionDigits: 2, minimumFractionDigits: 2 })

  return (
    <Flex mb='10px' justifyContent='space-between' alignItems='center'>
      <Heading color={rawEarningsBalance === 0 ? 'textDisabled' : 'text'}>
          <LPStaked style={{'color': 'white', 'fontSize': '16px'}}>
              {displayBalance}
          </LPStaked>

          {earnings.gt(0) && <USDStaked>~${displayBalanceUsd}</USDStaked>}

      </Heading>



      <BalanceAndCompound>
        {pid === labo.pids.pidLabo ?
          <StyledBtn
            disabled={rawEarningsBalance === 0 || pendingTx}

            onClick={async () => {
              setPendingTx(true)
              await onStake(rawEarningsBalance.toString())
              setPendingTx(false)
            }}
            style={{
              'borderRadius': '5px',
              'height': '40px',
              'width': '103px',
              'marginRight': '1px'
            }}
          >
            {TranslateString(999, 'Compound')}
          </StyledBtn>
          : null}
        <StyledBtn
          disabled={rawEarningsBalance === 0 || pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onReward()
            setPendingTx(false)}}
          style={{'color': 'white'}}>Claim  &nbsp;<FaHandHoldingUsd/>
        </StyledBtn>
      </BalanceAndCompound>
    </Flex>
  )
}

export default HarvestAction
