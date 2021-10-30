import React from 'react'
import { Route, useRouteMatch, Link } from 'react-router-dom'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { ButtonMenu, ButtonMenuItem, Heading, LinkExternal } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR } from 'config'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import useI18n from 'hooks/useI18n'
import useBlock from 'hooks/useBlock'
import { getBalanceNumber } from 'utils/formatBalance'
import {
  useFarms,
  usePriceBnbBusd,
  usePools,
  usePrices,
  getTotalValueFromQuoteTokens,
  usePriceTranq,
  lookupPrice,
} from 'state/hooks'
import { QuoteToken, PoolCategory } from 'config/constants/types'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { FaQuestionCircle , FaUserCheck, FaLock, FaHistory, FaExchangeAlt, FaWater, FaProjectDiagram } from 'react-icons/fa'
import Coming from './components/Coming'
import PoolCard from './components/PoolCard'
import PoolTabButtons from './components/PoolTabButtons'
import Hero2 from './components/Hero'

const Title = styled.p`
  font-size: 1.1em;
  margin-bottom: 40px;
  display: flex;
  flex-flow: row;
  justify-content: center;
  color: #2E2E2E;

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

const Sub = styled.p`
  font-size: 1em;
  color: #6E4EED;
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
const ActionsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2px;
  @media all and (max-width: 480px) {
      flex-flow: column;
  }
  
  
`


const Blablabla = styled.div`
  text-color: red;
  margin: 0px 18px;
  margin-bottom: 50px;
`
const GuideLink = styled.span`
  color: #0073ff;
`
const Divider = styled.div`
background-color: #4c68ef;
height: 3px;
margin-left: auto;
margin-right: auto;
margin-top: 25px;
margin-bottom: 25px;
width: 20%;

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

const Farm: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const farms = useFarms()
  const pools = usePools(account)
  const bnbPriceUSD = usePriceBnbBusd()
  const prices = usePrices()
  const priceTranq = usePriceTranq()
  const block = useBlock()

  const priceToBnb = (tokenName: string, tokenPrice: BigNumber, quoteToken: QuoteToken): BigNumber => {
    const tokenPriceBN = new BigNumber(tokenPrice)
    if (tokenName === 'BNB') {
      return new BigNumber(1)
    }
    if (tokenPrice && quoteToken === QuoteToken.BUSD) {
      return tokenPriceBN.div(bnbPriceUSD)
    }
    return tokenPriceBN
  }

  const poolsWithApy = pools.map((pool) => {

    let quoteTokens = new BigNumber(pool.quoteTokenPerLp).times(pool.totalStaked).div(new BigNumber(10).pow(18))
    if (pool.sousId === 4 || pool.tokenName === pool.quoteTokenSymbol) {
        // Handle single staking pools
        quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    }
     if (pool.sousId === 8 || pool.tokenName === pool.quoteTokenSymbol) {
      // Handle single staking pools
      quoteTokens = new BigNumber(pool.totalStaked).div(new BigNumber(10).pow(18)).div(2)
    } 

    const tvl = getTotalValueFromQuoteTokens(quoteTokens, pool.quoteTokenSymbol, prices)

    // console.log("APY", pool, tvl && tvl.toNumber())
    const rewardTokenPrice = lookupPrice(pool.tokenName, prices)
    // console.log("price", pool.tokenName, rewardTokenPrice && rewardTokenPrice.toNumber())

    const totalRewardPricePerYear = rewardTokenPrice.times(pool.tokenPerBlock).times(BLOCKS_PER_YEAR)
    // const totalStakingTokenInPool = stakingTokenPriceInBNB.times(getBalanceNumber(pool.totalStaked))
    const apy = totalRewardPricePerYear.div(tvl).times(100)
    // console.log("TVL", pool.stakingTokenName, tvl && tvl.toNumber(), apy && apy.toNumber())

    return {
      ...pool,
      isFinished: pool.sousId === 0 ? false : pool.isFinished || block > pool.endBlock,
      apy,
      tvl
    }
  })

  const [finishedPools, openPools] = partition(poolsWithApy, (pool) => pool.isFinished)
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()

  return (
    <Page>
      
      <SvgHero>
        <object 
        type="image/svg+xml" 
        data="images/incubator.svg"
        className="labhero" 
        style={{maxWidth: '600px', marginLeft: '0px'}}
        >&nbsp;</object>
      </SvgHero>





      <Wrapper>

        <ButtonMenu activeIndex={isExact ? 0 : 1} size="sm">

            <ButtonMenuItem as={Link} to={`${url}`} >
              {TranslateString(698, 'Active')}
            </ButtonMenuItem>

            <ButtonMenuItem as={Link} to={`${url}/history`}>
              {TranslateString(700, 'Inactive')}
            </ButtonMenuItem>

        </ButtonMenu>

      </Wrapper>
    
      <ActionsWrapper>

        <Blablabla >
          <FaQuestionCircle/> Learn more about the Incubator <a target="_blanK" rel="noreferrer" href="https://artemis-protocol.gitbook.io/artemis/the-protocol/launchpad-1/incubator"><GuideLink>here</GuideLink></a>
        </Blablabla>


        
        </ActionsWrapper>

      <FlexLayout>
        <Route exact path={`${path}`}>
          <>
            {orderBy(openPools, ['sortOrder']).map((pool) => (
              <PoolCard key={pool.sousId} pool={pool} />
            ))}
            {/*  <Coming /> */}
          </> 
        </Route>
        <Route path={`${path}/history`}>
          {orderBy(finishedPools, ['sortOrder']).map((pool) => (
            <PoolCard key={pool.sousId} pool={pool} />
          ))}
        </Route>
      </FlexLayout>

      <FlexLayout>
          <Feature >
            <FaProjectDiagram /><br /> Artemis Incubator




          </Feature>
      </FlexLayout>
          
    </Page>
  )
}

const Hero = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  padding-bottom: 33px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 25px;
  
`

export default Farm
