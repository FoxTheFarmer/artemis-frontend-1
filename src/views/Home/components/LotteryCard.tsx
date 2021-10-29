import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Heading, Card, CardBody, Button, useModal, LinkExternal } from '@pancakeswap-libs/uikit'
import useI18n from 'hooks/useI18n'
import { FaBroadcastTower, FaVoteYea } from 'react-icons/fa'

const StyledLotteryCard = styled(Card)`
  background-repeat: no-repeat;
  background-position: top right;
  min-height: 300px;
  min-width: 250px;

  margin-left: auto;
  margin-right: auto;
  border-radius: 14px;
`
// background-image: url('/images/ticket-bg.svg'); ^^^
const Divider = styled.div`
  background-color: #FAFAFA;
  height: 3px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
`

const Block = styled.div`
  margin-bottom: 16px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`

const FarmedStakingCard = () => {
  const TranslateString = useI18n()

  return (
    <StyledLotteryCard>
      <CardBody>

        <Title>
          <span><FaBroadcastTower/> Bridge</span>
        </Title>

        <Block>
          <LinkExternal fontSize='14px' href='https://bridge.harmony.one/erc20'>{TranslateString(999, 'Horizon Bridge')}</LinkExternal>
        </Block>

        <Block>
          <LinkExternal fontSize='14px' href='https://bridge.terra.money/'>{TranslateString(999, 'Terra Bridge')}</LinkExternal>
        </Block>

        <Divider />

        <Title>
          <span><FaVoteYea /> Misc</span>
        </Title>

        <Block>
          <LinkExternal href='https://gov.harmony.one/#/artemis'> Governance</LinkExternal>
        </Block>

        <Block>
          <LinkExternal href='https://artemischarts.northeurope.cloudapp.azure.com/'> Charts</LinkExternal>
        </Block>

      </CardBody>
    </StyledLotteryCard>
  )
}

export default FarmedStakingCard
