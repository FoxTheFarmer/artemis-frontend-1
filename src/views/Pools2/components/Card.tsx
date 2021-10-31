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

border:0px solid #fff;
box-shadow: 1px 1px 10px #ccc;

text-align: center;

  min-width: 280px;
  max-width: 70%;
  width: 80%;
  margin: 0 6px;
  margin-bottom: 18px;
}
  `

  

export default Card
