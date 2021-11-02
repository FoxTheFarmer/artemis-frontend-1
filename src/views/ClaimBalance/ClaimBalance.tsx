import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Button } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js/bignumber'
import { useAllHarvest } from 'hooks/useHarvest'
import useFarmsWithBalance from 'hooks/useFarmsWithBalance'
import UnlockButton from 'components/UnlockButton'
import { FaClock, FaUserClock } from 'react-icons/fa'
import { usePriceCakeBusd } from 'state/hooks'
import CakeHarvestBalance from 'views/Home/components/CakeHarvestBalance'
import CakeWalletBalance from 'views/Home/components/CakeWalletBalance'
import { getCakeAddress } from 'utils/addressHelpers'
import useTokenBalance from 'hooks/useTokenBalance'
import { getBalanceNumber } from 'utils/formatBalance'




const Wrapper = styled.div`
  margin-left: 12px;
  margin-right: 12px;
`

const Title = styled.p`
  font-size: 1.4em;
  margin-bottom: 21px;

`
const Sub = styled.p`
  font-size: 0.8em;
  color: gray;
`

const StyledFarmStakingCard = styled(Card)`
align-self: baseline;
background-image: linear-gradient(to right, #1E2129 , #1E2129);

border-radius: 20px;
display: flex;
flex-direction: column;
justify-content: space-around;
padding: 47px;
position: relative;
text-align: center;
margin-top: 19px;
margin-left: 0px;
margin-right: 00px;


border: 2px solid #fff;
box-shadow: 1px 1px 20px #ccc;
}`


const Block = styled.div`
  margin-bottom: 5px;
`

const CardImage = styled.img`
  margin-bottom: 5px;
`

const Label = styled.div`
  color: ${({ theme }) => theme.colors.textSubtle};
  font-size: 12px !important;
`

const Actions = styled.div`
  margin-top: 12px;
`

const FlowCol = styled.div`
  display: flex;
  flex-flow: column;
`

const FlowRow = styled.div`
  display: flex;
  flex-flow: row;
`

const ClaimCard = styled.div`
  align-self: baseline;
  background-image: linear-gradient(to right, #1E2129 , #1E2129);

  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 15px;
  position: relative;
  text-align: center;
  max-width: 500px;


  border: 2px solid #fff;
  box-shadow: 1px 1px 20px #ccc;

`

const ClaimBalance = () => {
  const [pendingTx, setPendingTx] = useState(false)
  const { account } = useWallet()
  const TranslateString = useI18n()
  const farmsWithBalance = useFarmsWithBalance()
  const cakeBalance = getBalanceNumber(useTokenBalance(getCakeAddress()))
  const eggPrice = usePriceCakeBusd().toNumber()
  const earningsSum = farmsWithBalance.reduce((accum, farm) => {
    return accum + new BigNumber(farm.balance).div(new BigNumber(10).pow(18)).toNumber()
  }, 0)
  const balancesWithValue = farmsWithBalance.filter((balanceType) => balanceType.balance.toNumber() > 0)

  const { onReward } = useAllHarvest(balancesWithValue.map((farmWithBalance) => farmWithBalance.pid))

  const harvestAllFarms = useCallback(async () => {
    setPendingTx(true)
    try {
      await onReward()
    } catch (error) {
      // TODO: find a way to handle when the user rejects transaction or it fails
    } finally {
      setPendingTx(false)
    }
  }, [onReward])

  return (
    <StyledFarmStakingCard>

        <Wrapper>
        <Title>
          <span><FaUserClock/> Pending Rewards</span>
        </Title>
        <FlowRow >
          <object type="image/svg+xml" data="images/mishero.svg" width="97px">&nbsp;</object>
          <FlowCol>
            <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 'marginBottom': '5px', 'marginTop': '20px'}}>
                <Block>
                  <CakeHarvestBalance earningsSum={earningsSum}/>
                  {account ? (
                    <div>
                      <Label>~${(eggPrice * earningsSum).toFixed(2)}</Label>
                      <Sub>MIS to Settle</Sub>
                    </div>
                  ):(<Sub>MIS to Settle</Sub>)
                  }
                  
                </Block>
            </div>
            <div style={{'display':'inline-block', 'paddingLeft': '15px', 'lineHeight': '19px', 'marginBottom': '5px'}}>
                <Block>
                  <CakeWalletBalance cakeBalance={cakeBalance} />
                  {account ? (
                    <div>
                      <Label>~${(eggPrice * cakeBalance).toFixed(2)}</Label>
                      <Sub>MIS in Wallet</Sub>
                    </div>
                  ):(<Sub>MIS in Wallet</Sub>)
                  }
                </Block>
            </div>
          </FlowCol>
        </FlowRow>
        <Actions>
          {account ? (
            <Button
              id="harvest-all"
              disabled={balancesWithValue.length <= 0 || pendingTx}
              onClick={harvestAllFarms}
              fullWidth
              style={{'color': 'white', 'borderRadius': '5px !important', 'background': '#4c68ef'}}
            >
              {pendingTx
                ? TranslateString(999, 'Settling MIS')
                : TranslateString(999, `Settle All (${balancesWithValue.length})`)}
            </Button>
          ) : (
            <UnlockButton fullWidth/>
          )}
        </Actions>
        </Wrapper>
    </StyledFarmStakingCard>
  )
}

export default ClaimBalance