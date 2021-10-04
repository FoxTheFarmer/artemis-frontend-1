import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import { getBalanceNumber } from 'utils/formatBalance'
import useI18n from 'hooks/useI18n'
import { ChevronDown, ChevronUp, ExternalLink } from 'react-feather'
import Balance from 'components/Balance'
import { CommunityTag, CoreTag, BinanceTag } from 'components/Tags'
import { PoolCategory, QuoteToken } from 'config/constants/types'
import { Flex, LinkExternal } from '@pancakeswap-libs/uikit'
import ExpandableSectionButton from 'components/ExpandableSectionButton'

const tags = {
  [PoolCategory.BINANCE]: BinanceTag,
  [PoolCategory.CORE]: CoreTag,
  [PoolCategory.COMMUNITY]: CommunityTag,
}

interface Props {
  projectLink: string
  totalStaked: BigNumber
  blocksRemaining: number
  isFinished: boolean
  blocksUntilStart: number
  poolCategory: PoolCategory
}

const StyledFooter = styled.div<{ isFinished: boolean }>`
  border-top: 1px solid ${({ theme }) => (theme.isDark ? '#524B63' : '#E9EAEB')};
  color: ${({ isFinished, theme }) => theme.colors[isFinished ? 'textDisabled2' : 'primary2']};
  padding: 24px;
`

const StyledDetailsButton = styled.button`
  align-items: center;
  background-color: transparent;
  border: 0;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  display: inline-flex;
  font-size: 16px;
  font-weight: 600;
  height: 32px;
  justify-content: center;
  outline: 0;
  padding: 0;
  &:hover {
    opacity: 0.9;
  }

  & > svg {
    margin-left: 4px;
  }
`

const Details = styled.div`
  margin-top: 24px;
`

const Row = styled.div`
  align-items: center;
  display: flex;
`

const FlexFull = styled.div`
  flex: 1;
`
const Label = styled.div`
  font-size: 14px;
`
const TokenLink = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: #12aab5;
`

const Quote = styled.p`
    font-size: 15px;
    margin-bottom: 0px;
`

const CardFooter: React.FC<Props> = ({
  projectLink,
  totalStaked,
  blocksRemaining,
  isFinished,
  blocksUntilStart,
  poolCategory,
}) => {

  const [isOpen, setIsOpen] = useState(false)
  const TranslateString = useI18n()
  const Icon = isOpen ? ChevronUp : ChevronDown
  const handleClick = () => setIsOpen(!isOpen)
  const Tag = tags[poolCategory]

  return (
    <StyledFooter isFinished={isFinished}>
      <Row>
        <FlexFull>
          <Tag />
        </FlexFull>
        <ExpandableSectionButton onClick={handleClick}>
          {isOpen ? 'Details' : 'Details'} <Icon />
        </ExpandableSectionButton>
      </Row>

      {isOpen && (

        <Details>

          <LinkExternal href={projectLink} target="_blank">
            {TranslateString(4212, 'About the Project')}
          </LinkExternal>

          <LinkExternal href='https://viperswap.one/#/add/0xF2f587fD8A423880037F39828d593d4cE1961A98' target="_blank">
            {TranslateString(4212, 'Get LP Tokens')}
          </LinkExternal>
        
        </Details>
      )}
    </StyledFooter>
  )
}

export default React.memo(CardFooter)
function setShowExpandableSection(arg0: boolean): void {
  throw new Error('Function not implemented.')
}
