import React from 'react'
import styled from 'styled-components'
import { useRouteMatch, Link } from 'react-router-dom'
import { ButtonMenu, ButtonMenuItem, Text } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import Switch from "react-switch";
import { FaQuestionCircle } from 'react-icons/fa'

const BtnMenu = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 120px;
  padding: 12px;
  `


const FarmTabButtons = ({ stakedOnly, setStakedOnly, tokenMode }) => {
  const { url, isExact } = useRouteMatch()
  const TranslateString = useI18n()


  return (
    <Wrapper>
      <ActionsWrapper style={{ marginTop: '20px'}}
>
        {/*
        <ToggleWrapper>
          <Switch checked={stakedOnly} onChange={() => setStakedOnly(!stakedOnly)} onColor='#fff' />
        <Text> {TranslateString(699, 'Staked Only')}</Text>
        </ToggleWrapper>
        */}



          <BtnMenu as={Link} to={`${url}`} 
          style={{
            marginRight: '10px',
            marginTop: '0px',
            marginLeft: '10px',
            width: '1180%',
          }} >
            {TranslateString(6928, 'Active Pools')}
          </BtnMenu>
          <BtnMenu as={Link} 
          to={`${url}/history`}
          style={{
            marginRight: '0px',
            marginTop: '0px',
            width: '80%',}} >
            {TranslateString(7200, 'Past')}
          </BtnMenu>
      </ActionsWrapper>

    </Wrapper>
  )
}

export default FarmTabButtons

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
  margin-bottom: 25px;
  
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
`
const GuideLink = styled.span`
  color: #0073ff;
`

const ToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 32px;
  @media all and (max-width: 480px) {
    margin-bottom: 21px;
}
  


  ${Text} {
    margin-left: 8px;
  }
`