import React, {useCallback, useState} from 'react'
import styled from 'styled-components'
import { BaseLayout, Button, Card, Flex,  } from '@pancakeswap-libs/uikit'
import BigNumber from 'bignumber.js'
import { usePriceCakeBusd } from 'state/hooks'
import { useAllHarvest } from 'hooks/useHarvest'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import CakeHarvestBalance from 'views/Home/components/CakeHarvestBalance'
import UnlockButton from 'components/UnlockButton'
import CakeWalletBalance from 'views/Home/components/CakeWalletBalance'
import CardValue from 'views/Home/components/CardValue'
import DashboardPage from 'components/layout/DashboardPage'
import farms from 'state/farms'

import { useTotalRewards } from 'hooks/useTickets'

import useTokenBalance, { useTotalSupply, useBurnedBalance } from 'hooks/useTokenBalance'
import { Link } from 'react-router-dom'
import { FaArrowDown, FaArrowRight } from 'react-icons/fa'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { getCakeAddress } from '../../utils/addressHelpers'

const Price = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #405fb4 !important;
  border-radius: 16px;
  color: #405fb4;
  font-size: 15px;
  font-weight: 800;
  width: 100%;
  display: inline-flex;
  min-height: 21px;
  max-height: 37px;
  letter-spacing: 0.03em;
  padding: 15px;
`

const Test = styled.text`
  background-color: rgba(0, 0, 0,0) !important;
  background: rgba(0, 0, 0,0) !important;
  font-size: 18px;
  font-weight: 700;
  text-shadow: 0px 0px 10px #ccc;

`

const Stat = styled.text`

  font-size: 15px;
  font-weight: 700;
  text-shadow: 0px 0px 10px #ccc;
`



const DCard = styled.div`
  background: #2E3543;
  border-radius: 20px;
  padding: 30px;



  position: center;
  text-align: center;
`

const Sub = styled.p`
  font-size: 0.97em;
  color: #7D7D7D;
`


const DashboardCard = styled.div`
  align-self: baseline;
  background: #1E2129;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;
  

  border:2px solid #fff;
  box-shadow: 1px 1px 7px #ccc;
`

const DashCard = styled.div`
  align-self: baseline;
  background: #1E2129;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;

`

  
const MoneyWheel: React.FC = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()

  const totalSupply = useTotalSupply()
  const burnedBalance = useBurnedBalance(getCakeAddress())

  const [showExpandableSection, setShowExpandableSection] = useState(false)



  const earningsSum = farmsWithBalance.reduce((accum, farm) => {
    return accum + new BigNumber(farm.balance).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const cakePriceUsd = usePriceCakeBusd()
  const misPrice = usePriceCakeBusd();
  const tokenPrice = cakePriceUsd.toNumber().toFixed(2);

  const circSupply = totalSupply ? totalSupply.minus(burnedBalance) : new BigNumber(0);
  const cakeSupply = getBalanceNumber(circSupply);
  const circulatingMath = new BigNumber(cakeSupply).minus(5000000);
  const circulatingRVRS = circulatingMath.toNumber().toFixed(0);

  const mCap = misPrice.times(circulatingRVRS).toNumber().toFixed(0);

  const marketCap = ( misPrice.times(circSupply).isNaN() || ! misPrice.times(circSupply).isFinite() 
  ? new BigNumber(0) : misPrice.times(circSupply) );

  let vikingPerBlock = 0;
  if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
  if(farms && farms[0] && farms[0].vikingPerBlock){
    vikingPerBlock = new BigNumber(farms[0].vikingPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])


  return (
    <DashboardPage style={{justifyContent: 'space-between'}}>



      <DashboardCard>
        <div>

          {/* <DCard>
            
               <FlowCol>
                <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 
                'marginBottom': '5px', 'marginTop': '20px'}}>
                    <Block>
                      <CakeHarvestBalance earningsSum={earningsSum}/>
                      {account ? (
                        <div>
                          <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
                          <Sub>MIS to Settle</Sub>
                        </div>
                      ):(<Sub>MIS to Settle</Sub>)
                      }
                      
                    </Block>
                </div>

                <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 'marginBottom': '5px'}}>
                    <Block>
                      <CakeWalletBalance cakeBalance={cakeBalance} />
                      {account ? (
                        <div>
                          <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
                          <Sub>MIS in Wallet</Sub>
                        </div>
                      ):(<Sub>MIS in Wallet</Sub>)
                      }
                    </Block>
                </div>

                <Actions>
                  {account ? (
                    <Button
                      id="harvest-all"
                      disabled={balancesWithValue.length <= 0 || pendingTx}
                      onClick={harvestAllFarms}
                      variant='primary'
                      fullWidth
                      style={{'color': 'white',  'borderRadius': '10px !important', 
                      'background': '#2D3041', 'marginLeft': '1  0px', 'borderBlockEndColor': '#151621' }}
                    >
                      {pendingTx
                        ? TranslateString(999, 'Awaiting')
                        : TranslateString(999, `Claim All (${balancesWithValue.length})`)}
                    </Button>
                  ) : (
                    <UnlockButton fullWidth/>
                  )}
                </Actions>


              </FlowCol>
                  </DCard> */ }


            <DashCard style={{padding:'30px', marginLeft:'0px', marginRight:'0px'}}>
              


            <Flex  justifyContent='left' ml='20px' alignItems='left'marginBottom='10px' mt='10px'  > 
                <Test>{TranslateString(9299, 'Dashboard')}</Test>
              </Flex>

              <Flex justifyContent='space-between' alignItems='center' ml='20px' mr='20px' mt="15px"  marginBottom='-5px'  > 
                <Stat>${tokenPrice}</Stat>
                <Stat>${mCap}</Stat>
                 { /* <Stat>{ !marketCap.isZero() ? <CardValue value={getBalanceNumber(marketCap)} decimals={0} prefix="$" /> : '...' }</Stat> */ }
              </Flex>

              <Flex justifyContent='space-between' alignItems='center' ml='20px' mr='20px'  mt="20px"  marginBottom='6px'  >
                  <Sub>Price</Sub>
                  <Sub>Market Cap</Sub>
              </Flex>

              <Flex justifyContent='space-between' alignItems='center' ml='20px' mr='20px'    mt="15px"  marginBottom='-5px'  > 
                <Stat>{circulatingRVRS}</Stat>
                <Stat>{cakeBalance} RVRS</Stat>

              </Flex>

              <Flex justifyContent='space-between' alignItems='center'  ml='20px' mr='20px'  mt="15px"  marginBottom='20px'  >
                <Sub>Circulating Supply</Sub>
                <Sub>On Wallet</Sub>
              </Flex>

              <DCard>

              <Flex justifyContent='space-between' alignItems='center' mt="-1px"  marginBottom='-1px'  > 
                <Sub className="lightColor">Reverseum Treasury</Sub>
                <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)}/>
              </Flex>

      
              <ExpandingWrapper expanded={showExpandableSection}>
                <DetailsCard>

                  <Flex justifyContent="left" mt="15px"  marginBottom='8px' >
                    <Sub className="lightColor">Market Value</Sub>
                  </Flex>
                  
                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>$10,000,000</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="10px"  marginBottom='8px' >
                    <Sub className="lightColor">Distribution</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>- 40% UST</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>- 60% Liquidity</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>- 10% RVRS</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="10px"  marginBottom='8px' >
                    <Sub className="lightColor">Current Strategies (UST)</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>- 20% Mirror (APY: 45%)</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>- 20% Mirror (APY: 45%)</Sub>
                  </Flex>

                  <Flex justifyContent="left" mt="1px"  marginBottom='8px' >
                    <Sub>- 10% Aave (APY: 5%)</Sub>
                  </Flex>

                  




                </DetailsCard>
              </ExpandingWrapper>

              </DCard>





            </DashCard>
        </div>
        </DashboardCard>
    </DashboardPage>
  )
}
export default MoneyWheel

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const DetailsCard = styled.div`
  background: #2E3543;
  border-radius: 0px;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  position: center;
  text-align: center;
`