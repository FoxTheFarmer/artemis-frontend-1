import styled from 'styled-components'

const FarmsFlex = styled.div`
  display: flex;
  justify-content: center;

  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 39%;
    width: 100%;
    margin: 0 9px;
    margin-bottom: 20px;
  }
`

export default FarmsFlex