import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Flex } from '@pancakeswap-libs/uikit'

import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import { BLOCKS_PER_YEAR } from 'config'
import FarmsFlex from 'components/layout/FarmsFlex'
import Page from 'components/layout/Page'
import {getTotalValueFromQuoteTokens, useFarms, usePriceBnbBusd, usePriceCakeBusd, usePrices} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import useI18n from 'hooks/useI18n'
import PoolsDashboard1 from 'views/PoolsDashboard1'

import ClaimBalance from 'views/ClaimBalance'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'


export interface FarmsProps{
  tokenMode?: boolean
}

const Flexed2 = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {

    width: 100%;
    margin: 0 6px;
    margin-bottom: 18px;
  }
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
  font-weight: 500;
  text-shadow: 0px 0px 10px #ccc;
`

const Sub = styled.p`
  font-size: 0.97em;
  color: #7D7D7D;
`

const Feature = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  margin: 19px;
  font-size: 1.1em !important;
  max-width: 180px;
  text-align: center;


  @media screen and (max-width: 680px){
    max-width: 64%;
    flex-flow: row;
    align-items: flex-start;
    & > svg{
      width: 42px;
    }
    & > p{
      text-align: left;
      margin-left: 15px;
    }
  
`

const Flexed = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  & > * {
    min-width: 450px;
    max-width: 40%;
    margin-bottom: 20px;
  }
`


const CardBG = styled.div`
  align-self: baseline;
  background-image: linear-gradient(to right, #2E3646, #3B4557 , #2B3344);
  border-radius:  20px;
  display: flex;
  flex-direction: ce;
  justify-content: space-around;
  padding: 50px;
  position: relative;
  text-align: center;
  max-width: 750px;
  min-height: 180px;

  margin-bottom: 50px;
  margin-top: 25px;

  border:2px solid #fff;
  box-shadow: 0px 0px 20px #ccc;

`


const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farms = useFarms();
  const prices = usePrices()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;
  const [modalOpen, setModalOpen] = useState(true) 
  const handleModal = async () => {
    setModalOpen(!modalOpen)
  }  
  // if (process.env.REACT_APP_DEBUG === "true") console.log(cakePrice, "testingg cakePrice");

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )
  let vikingPerBlock = 0;
  // if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
  if(farms && farms[0] && farms[0].vikingPerBlock){
    vikingPerBlock = new BigNumber(farms[0].vikingPerBlock).div(new BigNumber(10).pow(18)).toNumber();
  }
  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }

        const cakeRewardPerBlock = new BigNumber(farm.vikingPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)
      
        let apy = new BigNumber(cakePrice).times(cakeRewardPerYear);

        const totalValue = getTotalValueFromQuoteTokens(farm.quoteTokenAmount, farm.quoteTokenSymbol, prices);

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      return farmsToDisplayWithAPY.map((farm) => (
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
        />
      ))
    },
    [prices, cakePrice, bnbPrice, account, ethereum],
  )

  return (
    <Page>

    <Flexed2>

        <PoolsDashboard1/>


    </Flexed2>
    
        {/*
    <Flexed>
      <PoolsDashboard/>
              <CardBG>

    </Flexed>






 <div className="warningAlert" style={{'display': ( modalOpen ? 'block' : 'none' )}}>
      <Alert title="" variant="warning" onClick={handleModal}>
        <p>Artemis Earn rewards will begin on <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://explorer.harmony.one/block/17996500">October 9th.</a></p>
      </Alert>
      </div>    */}

      <div>



          <FarmsFlex>
            <Route exact path={`${path}`}>
              {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
            </Route>
            <Route exact path={`${path}/history`}>
              {farmsList(inactiveFarms, true)}
            </Route>
          </FarmsFlex>
          
          {/* <FarmsFlex>
            <Feature >
              <p>At current rates, {vikingPerBlock} RVRS is being minted per block.</p>
            </Feature>
          </FarmsFlex> */ }
                  <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} tokenMode={tokenMode}/>



      </div>
      
    </Page>
  )
}


export default Farms
