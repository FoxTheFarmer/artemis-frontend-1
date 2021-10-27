import React from 'react'
import styled from 'styled-components'
import BigNumber from 'bignumber.js'
import { Text, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { FaArrowCircleUp, FaBook, FaClock, FaLink, FaWallet } from 'react-icons/fa'

export interface IfoCardDetailsProps {
  saleAmount: string
  raiseAmount: string
  cakeToBurn: string
  raisingAmount: BigNumber
  totalAmount: BigNumber
  misAmount: string
}



const Divider = styled.div`
background-color: #4c68ef;
height: 3px;
margin-left: 100;
margin-right: 0px;
margin-top: 5px;
margin-bottom: 5px;
width: 0%;
`

const DCard = styled.div`
  background: #3E4266;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
`


const StyledIfoCardDetails = styled.div`
  margin-bottom: 24px;
  padding:0px;
`

const Item = styled.div`
  align-items: center;
  color: ${({ theme }) => theme.colors.secondary};
  display: flex;
`

const Display = styled(Text)`
  flex: 1;
`

const IfoCardDetails: React.FC<IfoCardDetailsProps> = ({
  saleAmount,
  raiseAmount,
  cakeToBurn,
  raisingAmount,
  totalAmount,
  misAmount,
}) => {
  const TranslateString = useI18n()

  return (
    <>
      <StyledIfoCardDetails>
      <DCard>

      <Item>
          <Display bold><FaArrowCircleUp/> {TranslateString(5824, 'Tier')}</Display>
          <Text>1</Text>
        </Item>

        <Item>
          <Display bold><FaWallet/> {TranslateString(999, ' Required MIS in Wallet')}</Display>
          <Text>{misAmount}</Text>
        </Item>
        </DCard>

        <Divider/>

        <DCard>



        <Item>
          
          <Display>{TranslateString(5824, 'Tokens For Sale')}</Display>
          <Text>{saleAmount}</Text>
        </Item>
        <Item>
          <Display>{TranslateString(999, 'USD To Raise')}</Display>
          <Text>{raiseAmount}</Text>
        </Item>


        
        {/*
        <Item>
          <Display>{TranslateString(999, 'ONE to burn (USD)')}</Display>
          <Text>{cakeToBurn}</Text>
        </Item>
        */}
        <Item>
          <Display>{TranslateString(999, 'USD Raised')}</Display>
          <Text>{`${totalAmount.div(raisingAmount).times(100).toFixed(1)}%`}</Text>
        </Item>



        </DCard>


      </StyledIfoCardDetails>


    </>



  )
}

export default IfoCardDetails
