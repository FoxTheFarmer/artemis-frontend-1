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

const Divider = styled.div`
background-color: #FAFAFA;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 30px;
margin-bottom: 5px;
width: 100%;
`

const StyledFarmStakingCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  border-radius: 14px;
`

const Block = styled.div`
  margin-bottom: 5px;
`

const DCard = styled.div`
  background: #2E3543;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  position: center;
  text-align: center;
`
const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px !important;
`

const Actions = styled.div`
  margin-top: 12px;
`

const FlowCol = styled.div`
  display: flex;
  flex-flow: column;
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
const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  padding: 42px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

const DashboardCard = styled.div`
  align-self: baseline;
  background: #1E2129;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
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




  const earningsSum = farmsWithBalance.reduce((accum, farm) => {
    return accum + new BigNumber(farm.balance).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const cakePriceUsd = usePriceCakeBusd()
  const misPrice = usePriceCakeBusd();

  const circSupply = totalSupply ? totalSupply.minus(burnedBalance).minus(100000) : new BigNumber(0);

  const cakeSupply = getBalanceNumber(circSupply);

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
    <DashboardPage style={{justifyContent: 'space-between',}} >


      <DashboardCard>

        <div>
        <SvgHero>
          <object 
          type="image/svg+xml" 
          data="images/farmhero.svg" 
          className="labhero" 
          style={{maxWidth: '200px', marginLeft: '0px'}}
          >&nbsp;</object>
        </SvgHero> 

          <DCard style={{'marginTop':'00px', justifyContent: 'space-between',}}>
            
              <FlowCol>


                <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 'marginBottom': '5px', 'marginTop': '20px'}}>
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
              </DCard>

              <DashboardCard style={{padding:'25px', marginLeft:'40px', marginRight:'40px'}}>


                
              <Flex justifyContent='space-between' alignItems='center'  mt="15px"  marginBottom='-5px'  >
                  
                  
                  <CardValue value={cakePriceUsd.toNumber()} decimals={2} prefix="$" />

                  <Sub className="lightColor">{ !marketCap.isZero() ? <CardValue value={getBalanceNumber(marketCap)} decimals={0} prefix="$" /> : '...loading' }</Sub>

                  
                  <Sub className="lightColor">
                  {cakeSupply && <CardValue value={cakeSupply} decimals={0} />}</Sub>

              </Flex>

              <Flex justifyContent='space-between' alignItems='center'  mt="15px"  marginBottom='6px'  >
                  <Sub>Price</Sub>
                  <Sub>Market Cap</Sub>
                  <Sub>Supply</Sub>
              </Flex>

                
              </DashboardCard>
        </div>
        </DashboardCard>
    </DashboardPage>
  )
}
export default MoneyWheel


