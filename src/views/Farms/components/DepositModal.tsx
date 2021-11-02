import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { Button, Modal } from '@pancakeswap-libs/uikit'
import ModalActions from 'components/ModalActions'
import TokenInput from 'components/TokenInput'
import useI18n from 'hooks/useI18n'
import { getFullDisplayBalance } from 'utils/formatBalance'
import styled from 'styled-components'


const StyledBtn = styled.button`
  -webkit-box-align: center;
  align-items: center;
  background-color: rgba(0, 0, 0,0) !important;
  border: 1px;
  border-style: solid !important;
  border-color: #ffff !important;
  border-radius: 10px;
  color: #ffff;
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  display: inline-flex;
  min-height: 18px;
  max-height: 30px;
  max-width: 100px;
  padding: 25px;
  `

interface DepositModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  onDismiss?: () => void
  tokenName?: string
  valueUsd?: number
  depositFeeBP?: number
}

const DepositModal: React.FC<DepositModalProps> = (
    { max, onConfirm, onDismiss, tokenName = '' , depositFeeBP = 0, valueUsd= 0}) => {
  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const TranslateString = useI18n()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max)
  }, [max])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (

    <Modal 
    title={`${TranslateString(3120, 'Deposit')} ${tokenName}`} 
    onDismiss={onDismiss}>
      
      <TokenInput
        value={val}
        valueUsd={valueUsd}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
        depositFeeBP={depositFeeBP}
      />

      <ModalActions>

        <StyledBtn 
          style={{justifyContent:"center" }}
          onClick={onDismiss}>{TranslateString(462, 'Cancel')}
        </StyledBtn>

        <StyledBtn 
          style={{justifyContent:"center" }}
          disabled={pendingTx}
          onClick={async () => {
            setPendingTx(true)
            await onConfirm(val)
            setPendingTx(false)
            onDismiss()}}>
            {pendingTx ? TranslateString(4818, 'Pending') : TranslateString(4624, 'Deposit')}
          </StyledBtn>

        </ModalActions>

    </Modal>
  )
}

export default DepositModal
