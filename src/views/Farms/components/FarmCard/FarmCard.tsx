import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Skeleton, LinkExternal, Card } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { PoolCategory, QuoteToken } from 'config/constants/types'
import { FaClock, FaFire, FaFlask, FaGhost, FaInfinity, FaLock, FaMountain, FaSeedling, FaTractor, FaTruck, } from 'react-icons/fa'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import {getTotalValueFromQuoteTokens, usePrices} from "../../../../state/hooks";

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 0.5px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: #232F3C;
  border-radius: 20px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px;
  position: relative;
  text-align: center;
`

const CCARD = styled.div`
background: #232F3C;
border-radius: 20px;
flex-direction: column;
justify-content: space-around;
padding: 15px;
position: center;
text-align: center;
`

const DCard = styled.div`
  background: #151515;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  position: center;
  text-align: center;
`


const Quote = styled.p`
    font-size: 15px;
    font-weight: 200;
    margin-bottom: 0px;
`

const APRTEXT = styled.p`
    font-size: 15px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const StyledLinkExternal = styled(LinkExternal)`
  svg {
    padding-left: 0px;
    height: 16px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }

  text-decoration: none;
  font-weight: bold;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: right;
`

const Divider = styled.div`
  background-color: #4c68ef;
  height: 2px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;`

const Divider2 = styled.div`
  background-color: #4c68ef;
  height: 0px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5px;
  margin-bottom: 5px;
  width: 0%;
`
interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
  poolCategory?: PoolCategory

}

const FarmCard: React.FC<FarmCardProps> = ({ 
  farm, 
  removed, 
  cakePrice, 
  bnbPrice, 
  ethereum, 
  account, 
}) => {

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()

  const lpLabel = ( farm.version ? `${farm.lpSymbol} V${farm.version}` : `${farm.lpSymbol}` )
  const earnLabel = 'MIS'
  const TranslateString = useI18n()
  const prices = usePrices()
  const [showExpandableSection, setShowExpandableSection] = useState(false)
  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`
  
  const totalValue = getTotalValueFromQuoteTokens(farm.quoteTokenAmount, farm.quoteTokenSymbol, prices)

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const BLOCKS_PER_YEAR = new BigNumber(30 * 60 * 24 * 365) // first 30 is for 2s block times
  const rewPerYear = new BigNumber(farm.vikingPerBlock).times(farm.poolWeight) .div(new BigNumber(10).pow(18)).times(BLOCKS_PER_YEAR)
  const farmApyFixed = rewPerYear.times(cakePrice).div(totalValue).times(100)
  const farmAPY = ( farmApyFixed ? ` ${farmApyFixed && farmApyFixed.toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  })}%` : '...loading' )
  const Daily = ( farmApyFixed ? ` ${farmApyFixed && farmApyFixed.div(365).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%` : '...loading' )

    
    // console.log("APY", farm.pid)
    // console.log("rewPerYear", rewPerYear && rewPerYear.toNumber())
    // console.log("cakePrice", cakePrice && cakePrice.toNumber())
    // console.log("totalValue", totalValue && totalValue.toNumber())
    // console.log("farmAPY", farmAPY)
  
  return (

    <FCard>
      
      {farm.tokenSymbol === 'MIS' && <StyledCardAccent />}

      <DCard>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          risk={risk}
          depositFee={farm.depositFeeBP}
          farmImage={farmImage}
          tokenSymbol={farm.tokenSymbol}
        />


        {!removed && (
          <Flex justifyContent='space-between' alignItems='center'  mt="15px"  marginBottom='6px'  >
            <span>ROI</span>
            <span>Daily</span>
          </Flex>
        )}

        <Flex justifyContent='space-between'>
        <Quote>{farmAPY}</Quote>
          <Quote>{Daily}</Quote>
        </Flex>
      </DCard>



      {/*
      <Flex justifyContent='space-between'>
        <span><FaLock/> Lockup</span>
        <Quote>{TranslateString(10006, '0 Hours')}</Quote>
      </Flex>
      */}



      {/* <Flex justifyContent="left">
        <StyledLinkExternal external href={
          farm.isTokenOnly ?
            `https://app.defikingdoms.com/#/marketplace?inputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
            :
            `https://app.defikingdoms.com/#/add/${liquidityUrlPathParts}`
        }>
          <span ><FaGhost/> Add Liquidity</span>
        </StyledLinkExternal>
      </Flex> */ }
      

      <Divider2/>

    <CCARD>
      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
    </CCARD>


      {/* <Flex justifyContent='right'>
        <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)}/>
      </Flex>

      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection
          removed={removed}
          isTokenOnly={farm.isTokenOnly}
          bscScanAddress={
            farm.isTokenOnly ?
              `https://explorer.harmony.one/address/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
              :
              `https://explorer.harmony.one/address/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
          }
          totalValueFormated={totalValueFormated}
          lpLabel={lpLabel}
          quoteTokenAdresses={quoteTokenAdresses}
          quoteTokenSymbol={quoteTokenSymbol}
          tokenAddresses={tokenAddresses}
        />
      </ExpandingWrapper> */ }
    </FCard>
  )
}

export default FarmCard
