import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  background: #1E2129;
  border: 2px;
  border-radius: 20px;
  padding: 20px;

  border:2px solid #fff;
  box-shadow: 0px 0px 15px #ccc;

  display: flex;
  flex-direction: column;
  position: relative;
`

export default Card
