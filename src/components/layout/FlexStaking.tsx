import styled from 'styled-components'

const FlexStaking = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 50%;
    width: 100%;
    margin: 0 6px;
    margin-bottom: 18px;
  }
`

export default FlexStaking