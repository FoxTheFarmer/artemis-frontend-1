import React from 'react';
import {
  Flex,
  TooltipText,
  // TODO: not used for now
  // useModal,
  useTooltip } from '@fox/uikit';
import { useTranslation } from 'contexts/Localization';
import { aprToApy, getPoolApr } from 'utils/apr';
import { tokenEarnedPerThousandDollarsCompounding, getRoi } from 'utils/compoundApyHelpers';
import { usePriceCakeBusd } from 'state/hooks';
import Balance from 'components/Balance';
// TODO: not used for now
// import ApyCalculatorModal from 'components/ApyCalculatorModal';
// import { BASE_EXCHANGE_URL } from 'config';
import { Pool } from 'state/types';
import BigNumber from 'bignumber.js';

interface AprRowProps {
  pool: Pool;
  stakingTokenPrice: number;
  isAutoVault?: boolean;
  compoundFrequency?: number;
  performanceFee?: number;
  totalStaked?: BigNumber;
  isDaily?: boolean;
}

const AprRow: React.FC<AprRowProps> = ({
  pool,
  stakingTokenPrice,
  isAutoVault = false,
  // TODO: not used for now
  // compoundFrequency = 1,
  performanceFee = 0,
  totalStaked,
  isDaily = false
}) => {
  const { t } = useTranslation();
  const {
    // TODO: not used for now
    // stakingToken,
    // earningToken,
    isFinished,
    tokenPerBlock
  } = pool;

  const tooltipContent = isAutoVault ?
    t('APY includes compounding, APR doesn’t. This pool’s FOX is compounded automatically, so we show APY.') :
    t('This pool’s rewards aren’t compounded automatically, so we show APR');

  const { targetRef, tooltip, tooltipVisible } = useTooltip(tooltipContent, { placement: 'bottom-end' });

  const earningTokenPrice = usePriceCakeBusd().toNumber();
  const apr = getPoolApr(
    stakingTokenPrice,
    earningTokenPrice,
    Number(totalStaked),
    parseFloat(tokenPerBlock)
  );

  // special handling for tokens like tBTC or BIFI where the daily token rewards for $1000 dollars will be less than 0.001 of that token
  const isHighValueToken = Math.round(earningTokenPrice / 1000) > 0;
  const roundingDecimals = isHighValueToken ? 4 : 2;

  const earningsPercentageToDisplay = () => {
    if (isAutoVault) {
      const oneThousandDollarsWorthOfToken = 1000 / earningTokenPrice;
      const numDays = isDaily ? 1 : 365;
      const tokenEarnedPerThousand365D = tokenEarnedPerThousandDollarsCompounding({
        numberOfDays: numDays,
        farmApr: apr,
        tokenPrice: earningTokenPrice,
        roundingDecimals,
        compoundFrequency: 3000,
        performanceFee
      });
      return getRoi({
        amountEarned: tokenEarnedPerThousand365D,
        amountInvested: oneThousandDollarsWorthOfToken
      });
    }
    return aprToApy(apr);
  };

  // TODO: not used for now
  // const apyModalLink =
  //   stakingToken.address &&
  //   `${BASE_EXCHANGE_URL}/#/swap?outputCurrency=${stakingToken.address[process.env.REACT_APP_CHAIN_ID]}`;
  // const [onPresentApyModal] = useModal(
  //   <ApyCalculatorModal
  //     tokenPrice={earningTokenPrice}
  //     apr={apr}
  //     linkLabel={`${t('Get')} ${stakingToken.symbol}`}
  //     linkHref={apyModalLink || BASE_EXCHANGE_URL}
  //     earningTokenSymbol={earningToken.symbol}
  //     roundingDecimals={isHighValueToken ? 4 : 2}
  //     compoundFrequency={compoundFrequency}
  //     performanceFee={performanceFee} />
  // );

  return (
    <Flex
      alignItems='center'
      justifyContent='space-between'>
      {tooltipVisible && tooltip}
      <TooltipText ref={targetRef}>{isDaily ? t('Daily') : t('Yearly')}:</TooltipText>
      <Flex alignItems='center'>
        <Balance
          fontSize='16px'
          isDisabled={isFinished}
          value={earningsPercentageToDisplay()}
          decimals={2}
          unit='%'
          bold />
        {/* <IconButton onClick={onPresentApyModal} variant="text" scale="sm">
            <CalculateIcon color="textSubtle" width="18px" />
          </IconButton> */}
      </Flex>
    </Flex>
  );
};

export default AprRow;
