import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Flex } from '@pancakeswap-libs/uikit'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import ExpandableSectionButton from 'components/ExpandableSectionButton'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { PoolCategory, QuoteToken } from 'config/constants/types'
import { FaArrowRight, FaGhost, FaInfinity, FaPlus, FaPlusCircle } from 'react-icons/fa'
import styled from 'styled-components'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'
import {getTotalValueFromQuoteTokens, usePrices} from "../../../../state/hooks";

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const FCard = styled.div`
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

const CCARD = styled.div`
  background: #1E2129;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: center;
  text-align: center;
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

const DetailsCard = styled.div`
  background: #1E2129;
  border-radius: 20px;
  flex-direction: column;
  justify-content: space-around;
  padding: 30px;
  position: center;
  text-align: center;
`


const Quote = styled.p`
    font-size: 15px;
    font-weight: 100;
    margin-bottom: 0px;
`

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

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
    maximumFractionDigits: 0,
  })}%` : '...loading' )
  const Weekly = ( farmApyFixed ? ` ${farmApyFixed && farmApyFixed.div(52).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%` : '...loading' )


  const apy = new BigNumber (farmApyFixed).div(100).div(52).plus(1).pow(52).times(100)
  
  const APY = ( apy ? ` ${apy && apy.toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}%` : '...loading' )

    
    // console.log("APY", farm.pid)
    // console.log("rewPerYear", rewPerYear && rewPerYear.toNumber())
    // console.log("cakePrice", cakePrice && cakePrice.toNumber())
    // console.log("totalValue", totalValue && totalValue.toNumber())
    // console.log("farmAPY", farmAPY)
  
  return (

    <FCard>
      
      {farm.tokenSymbol === 'MIS'}
      

      <DCard>
        <CardHeading
          lpLabel={lpLabel}
          multiplier={farm.multiplier}
          risk={risk}
          depositFee={farm.depositFeeBP}
          farmImage={farmImage}
          tokenSymbol={farm.tokenSymbol}
        />


          <Flex justifyContent='space-between' alignItems='center'  mt="15px"  marginBottom='6px'  >
            <span>APY</span>
            <span>TVL</span>
          </Flex>


        {!removed && (
        <Flex justifyContent='space-between'>
          <Quote>{ APY }</Quote>
          <Quote>{totalValueFormated}</Quote>
        </Flex> )}

        <Flex justifyContent='space-between' alignItems='center'  mt="15px"  marginBottom='6px'  >
            <span>7 Days</span>
            <span>Lockup</span>
          </Flex>

          <Flex justifyContent='space-between'>
          <Quote>{Weekly}</Quote>
          <Quote>Infinte <FaInfinity/></Quote>
        </Flex>


      </DCard>


 
      

      <Divider2/>


      <CCARD>

      <Flex justifyContent='right'>
        <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)}/>
      </Flex>
      </CCARD>

      <ExpandingWrapper expanded={showExpandableSection}>

      <DetailsCard>
        <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />

        <Flex justifyContent="left">
        {/* <Link external href={
          farm.isTokenOnly ?
            `https://app.defikingdoms.com/#/marketplace?inputCurrency=${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
            :
            `https://app.defikingdoms.com/#/add/${liquidityUrlPathParts}`
        }>
          <span ><FaPlusCircle/> Add Liquidity </span>
      </Link> */ }
      </Flex>

      </DetailsCard>

      

      </ExpandingWrapper>
    </FCard>
  )
}

export default FarmCard
