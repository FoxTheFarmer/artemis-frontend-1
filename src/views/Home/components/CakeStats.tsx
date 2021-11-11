import React from 'react'
import { Card, CardBody, Heading, LinkExternal, Text } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js/bignumber'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import useI18n from 'hooks/useI18n'
import { getCakeAddress } from 'utils/addressHelpers'
import { FaBroadcastTower, FaChartBar, FaExchangeAlt, FaKickstarter, FaLock, FaNetworkWired, FaScroll, FaUserClock, FaUserShield, FaVoteYea } from 'react-icons/fa'
import { useTotalRewards } from 'hooks/useTickets'
import CardValue from './CardValue'
import { useFarms, usePriceCakeBusd, useTotalValue } from '../../../state/hooks'
import './index.css'



const Divider = styled.div`
background-color: #FAFAFA;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
margin-bottom: 5px;
width: 100%;
`


const StyledCakeStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`
const Sub = styled.p`
  font-size: 0.97em;
  color: #7D7D7D;
`

const Sub2 = styled.p`
  margin-top: 20px;
  font-size: 0.97em;
  color: #7D7D7D;
`


const TVL = styled.div`
margin-top: 20px;

font-weight: 900 !important;
font-size: 18px !important;
color: #555;
`

const Wrapper = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`

  
const CakeStats = () => {
  const TranslateString = useI18n()
  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())
  const farms = useFarms();

  // const data = useGetStats()
  const totalValue = useTotalValue();
  const lotteryPrizeAmount = useTotalRewards()
  
  const cakePriceUsd = usePriceCakeBusd()
  const misPrice = usePriceCakeBusd();
  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const marketCap = ( misPrice.times(circSupply).isNaN() || ! misPrice.times(circSupply).isFinite() ? new BigNumber(0) : misPrice.times(circSupply) );
  let vikingPerBlock = 0;
  // if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
  if(farms && farms[0] && farms[0].vikingPerBlock){
    vikingPerBlock = new BigNumber(farms[0].vikingPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  return (
    <StyledCakeStats style={{"boxShadow":"0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05)"}}>
      <CardBody>
        <Wrapper>
        <Title>
          <span><FaScroll/> Overview</span>
        </Title>

          <Row>
            <Sub>MIS Price</Sub>
            <Sub className="lightColor">
              <CardValue value={cakePriceUsd.toNumber()} decimals={3} prefix="$" />
            </Sub>
          </Row>
          <Row>
            <Sub>Current Supply</Sub>
            <Sub className="lightColor">
              {cakeSupply && <CardValue value={cakeSupply} decimals={0} />}
            </Sub>
          </Row>
          <Row>
            <Sub>Market Cap</Sub>
            <Sub className="lightColor">{ !marketCap.isZero() ? <CardValue value={getBalanceNumber(marketCap)} decimals={0} prefix="$" /> : '...loading' }</Sub>
          </Row>
          <Row>
            <Sub>Total MIS Burnt</Sub>
            <Sub className="lightColor">
              <CardValue value={getBalanceNumber(burnedBalance)} decimals={0} />
            </Sub>
          </Row>
          <Row style={{'marginBottom': '0 !important'}}>
            <Sub>Minted MIS/Block</Sub>
            <Sub className="lightColor">
              {vikingPerBlock}
            </Sub>
          </Row>



          <Divider />

          <Row style={{'marginBottom': '0 !important'}}>
            <Sub2>Total Value Locked</Sub2>
            <Sub2 className="lightColor"><CardValue value={totalValue.toNumber()} prefix="$" decimals={2} /></Sub2>  
          </Row>



        </Wrapper>
      </CardBody>
    </StyledCakeStats>
  )
}

export default CakeStats
