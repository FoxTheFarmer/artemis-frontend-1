import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, LinkExternal, Link } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag, RiskTag, NoFeeTag } from 'components/Tags'
import { FaGhost, FaLongArrowAltRight, FaSeedling } from 'react-icons/fa';
import { TranslateString } from 'utils/translateTextHelpers';

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`

const MultiplierTag = styled(Tag)`
  margin-left: 3px;
  background-color: rgba(0,0,0,0);
  border-color: #6E4EED
  size: 1px;
`

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  risk,
  farmImage,
  tokenSymbol,
  depositFee,
}) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="20px">


      <object type="image/svg+xml" data="/images/farms/mis-one.svg" width="40px">&nbsp;</object>

      <Flex flexDirection="column" alignItems="flex-end">
        <Link style={{'color': '#FFF', 'fontSize': '15px'}} href='https://explorer.harmony.one/'>{lpLabel}</Link>
      </Flex>

      <Flex flexDirection="column" alignItems="flex-end">
        <Link style={{'color': '#CBCBCB', 'fontSize': '15px'}} href='https://game.defikingdoms.com/#/marketplace'><FaGhost/></Link>
      </Flex>


    </Wrapper>
  )
}

export default CardHeading
