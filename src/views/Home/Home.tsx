import React from 'react'
import styled from 'styled-components'
import { Heading, Text, BaseLayout, Alert } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import HomePage from 'components/layout/HomePage'
import labo from 'config/constants/labo'
import FarmStakingCard from './components/FarmStakingCard'
import CakeStats from './components/CakeStats'
import TotalValueLockedCard from './components/TotalValueLockedCard'
import TwitterCard from './components/TwitterCard'
import FarmedStakingCard from './components/LotteryCard'

const Column = styled.div`
  column-count: 2;
  height: 100%;
  column-gap: 20px;
  
`
const FlowRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;
  align-items: flex-start;

  @media all and (max-width: 1000px) { 
    flex-wrap: wrap;
    align-items: center;
    padding-bottom: 21px;
  }

  @media all and (min-width: 1000px) {
    flex-flow: row-reverse;
    justify-content: center;
   }



  //ADD SPACE BETWEENS
`

const Cards = styled(BaseLayout)`
margin-right: 20px;

  & > div {
    grid-column: span 10;
    width: 120%;
    height: 95%;
    margin-top: 10px;
    flex-wrap: wrap;
    margin-left: -20px;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    & > div {
      grid-column: span 10;
      
    }
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    & > div {
      grid-column: span 10;
    }
  }
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

const Home: React.FC = () => {
  const TranslateString = useI18n()

  return (
    <div>
      <HomePage>

        {/*
        <SvgHero>
          <object type="image/svg+xml" data="images/banner.svg" className="labhero">&nbsp;</object>
        </SvgHero> */}

        <FlowRow>


          <Cards className="CardsLayout">
              <FarmStakingCard/>    
          </Cards>

          <Cards className="CardsLayout">
            <CakeStats />    
          </Cards>
        </FlowRow>

      </HomePage>
  </div>
  )
}

export default Home
