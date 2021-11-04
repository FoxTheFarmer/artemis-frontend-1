import styled from 'styled-components'

const Card = styled.div<{ isActive?: boolean; isFinished?: boolean }>`
  align-self: baseline;
  background: #1E2129;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;

  border:0px solid #fff;
  box-shadow: 1px 1px 10px #ccc;


  `


  

export default Card
