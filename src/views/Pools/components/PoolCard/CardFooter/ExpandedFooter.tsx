import React from 'react';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { getBalanceNumber } from 'utils/formatBalance';
import { useTranslation } from 'contexts/Localization';
import {
  Flex,
  Text,
  TooltipText,
  TimerIcon,
  Skeleton,
  useTooltip
} from '@fox/uikit';
import { useBlock } from 'state/hooks';
import { Pool } from 'state/types';
import Balance from 'components/Balance';
// TODO: not used for now
// import { BASE_URL } from 'config';
// import { getAddress, getCakeVaultAddress } from 'utils/addressHelpers';

interface ExpandedFooterProps {
  pool: Pool;
  account: string;
  performanceFee?: number;
  isAutoVault?: boolean;
  totalCakeInVault?: BigNumber;
}

const ExpandedWrapper = styled(Flex)`
  svg {
    height: 14px;
    width: 14px;
  }
`;

const ExpandedFooter: React.FC<ExpandedFooterProps> = ({
  pool,
  performanceFee = 0,
  isAutoVault = false,
  totalCakeInVault
}) => {
  const { t } = useTranslation();
  const { currentBlock } = useBlock();
  const {
    stakingToken,
    startBlock,
    endBlock,
    isFinished
    // TODO: not used for now
    // earningToken,
    // totalStaked,
    // contractAddress
  } = pool;

  // TODO: not used for now
  // const tokenAddress = earningToken.address ? getAddress(earningToken.address) : '';
  // const poolContractAddress = getAddress(contractAddress);
  // const cakeVaultContractAddress = getCakeVaultAddress();
  // const imageSrc = `${BASE_URL}/images/tokens/${earningToken.symbol.toLowerCase()}.png`;
  // const isMetaMaskInScope = !!(window as WindowChain).ethereum?.isMetaMask;

  const shouldShowBlockCountdown = Boolean(!isFinished && startBlock && endBlock);
  const blocksUntilStart = Math.max(startBlock - currentBlock, 0);
  const blocksRemaining = Math.max(endBlock - currentBlock, 0);
  const hasPoolStarted = blocksUntilStart === 0 && blocksRemaining > 0;

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    t('Subtracted automatically from each yield harvest and burned.'),
    { placement: 'bottom-end' }
  );
  return (
    <ExpandedWrapper flexDirection='column'>
      <Flex
        mb='2px'
        justifyContent='space-between'
        alignItems='center'>
        <Text small>{t('Total staked:')}</Text>
        <Flex alignItems='flex-start'>
          <>
            <Balance
              fontSize='14px'
              value={
                getBalanceNumber(totalCakeInVault, 18)
              } />
            <Text
              ml='4px'
              fontSize='14px'>
              {stakingToken.symbol}
            </Text>
          </>
        </Flex>
      </Flex>
      {shouldShowBlockCountdown && (
        <Flex
          mb='2px'
          justifyContent='space-between'
          alignItems='center'>
          <Text small>{hasPoolStarted ? t('End') : t('Start')}:</Text>
          <Flex alignItems='center'>
            {blocksRemaining || blocksUntilStart ? (
              <Balance
                color='primary'
                fontSize='14px'
                value={hasPoolStarted ? blocksRemaining : blocksUntilStart}
                decimals={0} />
            ) : (
              <Skeleton
                width='54px'
                height='21px' />
            )}
            <Text
              ml='4px'
              color='primary'
              small>
              {t('blocks')}
            </Text>
            <TimerIcon
              ml='4px'
              color='primary' />
          </Flex>
        </Flex>
      )}
      {isAutoVault && (
        <Flex
          mb='2px'
          justifyContent='space-between'
          alignItems='center'>
          {tooltipVisible && tooltip}
          <TooltipText
            ref={targetRef}
            small>
            {t('Performance Fee')}
          </TooltipText>
          <Flex alignItems='center'>
            <Text
              ml='4px'
              small>
              {performanceFee / 100}%
            </Text>
          </Flex>
        </Flex>
      )}

      {/* account && isMetaMaskInScope && tokenAddress && (
        <Flex justifyContent="flex-end">
          <Button
            variant="text"
            p="0"
            height="auto"
            onClick={() => registerToken(tokenAddress, earningToken.symbol, earningToken.decimals, imageSrc)}
          >
            <Text color="primary" fontSize="14px">
              Add to Metamask
            </Text>
            <MetamaskIcon ml="4px" />
          </Button>
        </Flex>
      ) */}
    </ExpandedWrapper>
  );
};

export default React.memo(ExpandedFooter);
