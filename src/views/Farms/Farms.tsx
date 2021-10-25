import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import labo from 'config/constants/labo'
import { provider } from 'web3-core'
import { Image, Heading, Alert, LinkExternal } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import {getTotalValueFromQuoteTokens, useFarms, usePriceBnbBusd, usePriceCakeBusd, usePrices} from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken } from 'config/constants/types'
import { FaUserCheck, FaLock, FaHistory } from 'react-icons/fa';
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'


export interface FarmsProps{
  tokenMode?: boolean
}

const Title = styled.p`
  text-align: center;
  font-size: 2em;
  margin-bottom: 20px;

`
const Sub = styled.p`
  text-align: center;
  font-size: 1em;
  color: #6E4EED;
  margin-bottom: 25px;
`

const Features = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 24px;
  @media screen and (max-width: 680px){
    flex-flow: column;
  }
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
const FeatureLink = styled.a`
  color: yellow !important
`

const SvgHero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 22px 1px;

  @media and all (max-width: 1000px) {
    max-width: 80%;
  }
  
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
  if (process.env.REACT_APP_DEBUG === "true"){ console.log(farms[0], 'testing viking per block') }
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

  {/* <div className="warningAlert" style={{'display': ( modalOpen ? 'block' : 'none' )}}>
      <Alert title="" variant="warning" onClick={handleModal}>
        <p>Artemis Earn rewards will begin on <a target="_blank" rel="noreferrer" style={{"color": "#0073ff"}} href="https://explorer.harmony.one/block/17996500">October 9th.</a></p>
      </Alert>
      </div>    */}


      <div>

        <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly} tokenMode={tokenMode}/>

        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}/history`}>
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
        
        <FlexLayout>

        <Feature >
          <FaHistory /><br />

          <p>The base emission rate is currently {vikingPerBlock} MIS per block.</p>
        </Feature>
          
        </FlexLayout>
      </div>
    </Page>
  )
}

const Hero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding: 0 12px 47px 12px;

  @media all and (max-width: 1350px) { 
    max-width: 100%;
  }
`

export default Farms
