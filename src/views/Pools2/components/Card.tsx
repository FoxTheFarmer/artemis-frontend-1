import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
align-self: baseline;
background: #1E2129;
border-radius: 20px;
box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
display: flex;
flex-direction: column;
justify-content: space-around;
padding: 20px;
position: relative;
text-align: center;
  `

export default Card
