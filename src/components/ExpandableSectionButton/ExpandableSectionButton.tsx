import React from 'react'
import styled from 'styled-components'
import { ChevronDownIcon, ChevronUpIcon, Text } from '@pancakeswap-libs/uikit'
import { FaAngleDown, FaArrowDown, FaExpand, FaLongArrowAltDown, FaPlusCircle } from 'react-icons/fa'

export interface ExpandableSectionButtonProps {
  onClick?: () => void
  expanded?: boolean
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

`

const Text1 = styled.text`
  font-size: 15px;
  font-weight: 600;
  text-shadow: 1px 1px 15px #ccc;
`

const ExpandableSectionButton: React.FC<ExpandableSectionButtonProps> = ({ onClick, expanded }) => {
  return (
    <Wrapper role="button" onClick={() => onClick()}>

      <Text1>
       {expanded ? 'Details ' : 'Details'} <FaAngleDown style={{color:'white'}}/>
      </Text1> 
    </Wrapper>
  )
}

ExpandableSectionButton.defaultProps = {
  expanded: false,
}

export default ExpandableSectionButton
